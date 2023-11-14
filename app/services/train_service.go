package train

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"
)

// type TRPCMetaRequest[T any] struct {
// 	Values T `json:"values"`
// }

// Custom time that could be returned from the WMATA API
// E.g. Time may be in the format of "2023-10-09T06:40:46"
// which is not handled by JSON Unmarshal.
// This will handle appending the "Z" at the end.
type WmataTime time.Time

// Unmarshall a JSON time.Time value.
// If it is missing a "Z", append it with a "Z"
// and unmarshall as usual.
func (m *WmataTime) UnmarshalJSON(data []byte) error {
	if string(data) == "null" || string(data) == `""` {
		return nil
	}

	timezoneIdentifier := []byte{'Z'}
	if bytes.Contains(data, timezoneIdentifier) {
		return (*time.Time)(m).UnmarshalJSON(data)
	}

	index := len(data) - 1
	data = append(data[:index], append(timezoneIdentifier, data[index:]...)...)

	return json.Unmarshal(data, (*time.Time)(m))
}

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

type IncidentRequest struct {
	StationId string `json:"stationId"`
}

type Incident struct {
	DateUpdated   WmataTime `json:"dateUpdated"`
	Description   string    `json:"description"`
	IncidentID    string    `json:"incidentId"`
	IncidentType  string    `json:"incidentType"`
	LinesAffected []string  `json:"linesAffected"`
}

type IncidentsResponse struct {
	Incidents []Incident `json:"incidents"`
}

type StationRequest struct {
	StationId string `json:"stationId"`
}

type StationsRequest struct {
}

type StationsResponse struct {
	Stations []Station `json:"stations"`
}

type Station struct {
	Code             string         `json:"code"`
	Name             string         `json:"name"`
	StationTogether1 string         `json:"stationTogether1"`
	StationTogether2 string         `json:"stationTogether2"`
	LineCode1        string         `json:"lineCode1,omitempty"`
	LineCode2        string         `json:"lineCode2,omitempty"`
	LineCode3        string         `json:"lineCode3,omitempty"`
	LineCode4        string         `json:"lineCode4,omitempty"`
	Lat              float64        `json:"lat"`
	Lon              float64        `json:"lon"`
	Address          StationAddress `json:"address"`
}

type StationAddress struct {
	Street string `json:"street"`
	City   string `json:"city"`
	State  string `json:"state"`
	Zip    string `json:"zip"`
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
