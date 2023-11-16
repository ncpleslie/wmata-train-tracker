package utils

import (
	"encoding/json"
	"net/http"
	"time"
)

type TRPCRequest[T any] struct {
	Json T `json:"json"`
	// Meta TRPCMetaRequest[T] `json:"meta"`
}

type TRPCResponse[T any] struct {
	Result TRPCResponseData[T] `json:"result"`
}

type TRPCResponseData[T any] struct {
	Data TRPCResponseDataJson[T] `json:"data"`
}

type TRPCResponseDataJson[T any] struct {
	Json T `json:"json"`
}

func createHTTPClient() *http.Client {
	tr := &http.Transport{
		MaxIdleConns:       10,
		IdleConnTimeout:    30 * time.Second,
		DisableCompression: true,
	}
	return &http.Client{Transport: tr}
}

// A "tRPC-like" API GET query
func QueryTrpcApiGet[T any, U any](url string, requestPayload T) (U, error) {
	client := createHTTPClient()

	requestJSON, err := json.Marshal(&TRPCRequest[T]{Json: requestPayload})
	if err != nil {
		return *new(U), err
	}

	url += "?input=" + string(requestJSON)

	response, err := client.Get(url)
	if err != nil {
		return *new(U), err
	}
	defer response.Body.Close()

	var responseBody TRPCResponse[U]
	if err := json.NewDecoder(response.Body).Decode(&responseBody); err != nil {
		return *new(U), err
	}

	return responseBody.Result.Data.Json, nil
}
