package utils

import (
	"encoding/json"
	"net/http"
	"time"
)

// TRPCRequest represents a tRPC-like API request structure.
// It is used to wrap the JSON payload of a request.
//
// Fields:
//   - Json: The JSON payload of the request.
type TRPCRequest[T any] struct {
	Json T `json:"json"`
}

// TRPCResponse represents a tRPC-like API response structure.
// It contains the result, which is further wrapped in TRPCResponseData.
//
// Fields:
//   - Result: The result of the tRPC-like API response.
type TRPCResponse[T any] struct {
	Result TRPCResponseData[T] `json:"result"`
}

// TRPCResponseData represents the data structure within a tRPC-like API response.
// It wraps the actual data in TRPCResponseDataJson.
//
// Fields:
//   - Data: The actual data within the tRPC-like API response.
type TRPCResponseData[T any] struct {
	Data TRPCResponseDataJson[T] `json:"data"`
}

// TRPCResponseDataJson represents the JSON payload within a tRPC-like API response.
// It directly holds the desired JSON data.
//
// Fields:
//   - Json: The JSON data within the tRPC-like API response.
type TRPCResponseDataJson[T any] struct {
	Json T `json:"json"`
}

// createHTTPClient creates and returns an HTTP client with custom settings.
//
// Returns:
//   - *http.Client: An HTTP client with specific transport settings.
func createHTTPClient() *http.Client {
	tr := &http.Transport{
		MaxIdleConns:       10,
		IdleConnTimeout:    30 * time.Second,
		DisableCompression: true,
	}
	return &http.Client{Transport: tr}
}

// QueryTrpcApiGet queries a tRPC API with a GET request.
// It sends a GET request to the specified URL with a request payload,
// and returns the parsed response data.
//
// Parameters:
//   - url:             The URL for the tRPC-like API.
//   - requestPayload: The request payload for the API query.
//
// Returns:
//   - U:    The parsed response data.
//   - error: An error, if any, during the API query.
//
// Example:
//
//	var requestPayload YourRequestType
//	response, err := QueryTrpcApiGet<YourRequestType, YourResponseType>("https://api.example.com/api/trpc/example.getData", requestPayload)
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
