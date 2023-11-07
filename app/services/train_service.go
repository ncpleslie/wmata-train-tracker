package train

import (
	"encoding/json"
	"net/http"
	"time"
)

// type TRPCMetaRequest[T any] struct {
// 	Values T `json:"values"`
// }

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

type TrainRequest struct {
	StationId string `json:"stationId"`
}

type Train struct {
	Car             string `json:"car,omitempty"`
	Destination     string `json:"destination"`
	DestinationCode string `json:"destinationCode,omitempty"`
	DestinationName string `json:"destinationName"`
	Group           string `json:"group"`
	Line            string `json:"line"`
	LocationCode    string `json:"locationCode"`
	LocationName    string `json:"locationName"`
	Min             string `json:"min"`
	Seconds         string `json:"seconds,omitempty"`
	ServiceType     string `json:"serviceType,omitempty"`
	TrainId         string `json:"trainId,omitempty"`
}

type TrainsResponse struct {
	Trains      []Train   `json:"trains"`
	LastUpdated time.Time `json:"lastUpdated"`
}

func createHTTPClient() *http.Client {
	tr := &http.Transport{
		MaxIdleConns:       10,
		IdleConnTimeout:    30 * time.Second,
		DisableCompression: true,
	}
	return &http.Client{Transport: tr}
}

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
