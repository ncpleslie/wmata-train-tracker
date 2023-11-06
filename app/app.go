package app

import (
	"encoding/json"
	"io"
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

func convertTRPCResponseToJson[T any](r io.ReadCloser) (T, error) {
	var responseBody TRPCResponse[T]
	decoder := json.NewDecoder(r)
	if err := decoder.Decode(&responseBody); err != nil {
		return *new(T), err
	}

	return responseBody.Result.Data.Json, nil
}

func GetTrainsByStationId(stationId string) (TrainsResponse, error) {
	req, err := http.NewRequest("GET", "https://wmata-train-tracking.vercel.app/api/trpc/train.getTrains", nil)
	if err != nil {
		return TrainsResponse{}, err
	}

	q := req.URL.Query()

	trainRequest := &TrainRequest{
		StationId: stationId,
	}
	requestParams := &TRPCRequest[TrainRequest]{
		Json: *trainRequest,
	}

	requestJson, err := json.Marshal(requestParams)
	if err != nil {
		return TrainsResponse{}, err
	}

	q.Add("input", string(requestJson))
	req.URL.RawQuery = q.Encode()

	client := createHTTPClient()
	response, err := client.Get(req.URL.String())
	if err != nil {
		return TrainsResponse{}, err
	}

	defer response.Body.Close()

	parsedResponse, err := convertTRPCResponseToJson[TrainsResponse](response.Body)
	if err != nil {
		return TrainsResponse{}, err
	}

	return parsedResponse, nil
}
