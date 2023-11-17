package train

import (
	"bytes"
	"encoding/json"
	"time"

	api "github.com/ncpleslie/wmata-train-tracker/app/utils"
)

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

type Config struct {
	TrainsUrl      string
	IncidentsUrl   string
	StationsUrl    string
	StationByIdUrl string
}

// Service represents a service for interacting with a tRPC-like API to fetch train-related data.
// It encapsulates the configuration and provides methods to retrieve information about trains, incidents, and stations.
//
// Fields:
//   - config: Configuration settings for the service.
type Service struct {
	config Config
}

// InitializeService initializes and returns a *Service instance with the provided configuration settings.
// It takes a Config as a parameter.
//
// Parameters:
//   - config: Configuration settings for the service.
//
// Returns:
//   - *Service: A pointer to the initialized *Service instance.
func InitializeService(config Config) *Service {
	return &Service{
		config: config,
	}
}

// GetTrainsByStationId retrieves information about trains based on the specified station ID.
// It sends a tRPC-like API query and returns a TrainsResponse and an error.
//
// Parameters:
//   - stationId: The ID of the station for which train information is requested.
//
// Returns:
//   - TrainsResponse: The response containing information about trains.
//   - error:          An error, if any, during the API query.
//
// Example:
//
//	trains, err := service.GetTrainsByStationId("B03")
func (t *Service) GetTrainsByStationId(stationId string) (TrainsResponse, error) {
	return api.QueryTrpcApiGet[TrainRequest, TrainsResponse](
		t.config.TrainsUrl,
		TrainRequest{StationId: stationId},
	)
}

// GetIncidentsByStationId retrieves information about incidents based on the specified station ID.
// It sends a tRPC-like API query and returns an IncidentsResponse and an error.
//
// Parameters:
//   - stationId: The ID of the station for which incident information is requested.
//
// Returns:
//   - IncidentsResponse: The response containing information about incidents.
//   - error:            An error, if any, during the API query.
//
// Example:
//
//	incidents, err := service.GetIncidentsByStationId("B03)
func (t *Service) GetIncidentsByStationId(stationId string) (IncidentsResponse, error) {
	return api.QueryTrpcApiGet[IncidentRequest, IncidentsResponse](
		t.config.IncidentsUrl,
		IncidentRequest{StationId: stationId},
	)
}

// GetStations retrieves a list of all available train stations.
// It sends a tRPC-like API query and returns a StationsResponse and an error.
//
// Returns:
//   - StationsResponse: The response containing information about all stations.
//   - error:            An error, if any, during the API query.
//
// Example:
//
//	stations, err := service.GetStations()
func (t *Service) GetStations() (StationsResponse, error) {
	return api.QueryTrpcApiGet[StationsRequest, StationsResponse](
		t.config.StationsUrl,
		StationsRequest{},
	)
}

// GetSelectedStationById retrieves information about a specific station based on its ID.
// It sends a tRPC-like API query and returns a Station and an error.
//
// Parameters:
//   - stationId: The ID of the station for which information is requested.
//
// Returns:
//   - Station: The response containing information about the specified station.
//   - error:   An error, if any, during the API query.
//
// Example:
//
//	selectedStation, err := service.GetSelectedStationById("B03")
func (t *Service) GetSelectedStationById(stationId string) (Station, error) {
	return api.QueryTrpcApiGet[StationRequest, Station](
		t.config.StationByIdUrl,
		StationRequest{StationId: stationId},
	)
}
