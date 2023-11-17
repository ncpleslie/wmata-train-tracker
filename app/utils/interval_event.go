package utils

import (
	"context"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// IntervalEvent represents an interface for objects capable of running at regular intervals.
// Types implementing this interface should provide a Run method that returns data and an error.
//
// Methods:
//   - Run(): Runs the interval event and returns data and an error.
//
// Example:
//
//	type MyIntervalEvent struct { /* implementation */ }
//	func (m *MyIntervalEvent) Run() (interface{}, error) { /* implementation */ }
type IntervalEvent interface {
	Run() (interface{}, error)
}

// DataRetrieverConfig represents the configuration for an interval-based data retriever event.
//
// Fields:
//   - EventName:            The name associated with the interval event.
//   - PollingRateInSeconds: The interval rate in seconds for running the event.
type DataRetrieverConfig struct {
	EventName            string
	PollingRateInSeconds int
}

// RunIntervalEvent runs an interval-based event that periodically retrieves data and emits events.
// It takes an IntervalEvent, a DataRetrieverConfig, and a context.Context as parameters.
//
// Parameters:
//   - ctx:          The context.Context for managing the interval event.
//   - retrieveData: An object implementing the IntervalEvent interface for data retrieval.
//   - config:       The configuration for the interval event.
//
// Note: The function runs the interval event in a loop, emitting events based on success or failure.
//
// Example:
//
//	ctx := context.Background()
//	var myDataRetriever MyIntervalEvent
//	config := DataRetrieverConfig{ /* initialization */ }
//	RunIntervalEvent(ctx, &myDataRetriever, config)
func RunIntervalEvent(ctx context.Context, retrieveData IntervalEvent, config DataRetrieverConfig) {
	for {
		data, err := retrieveData.Run()
		if err != nil {
			runtime.EventsEmit(ctx, config.EventName+"_error", data)
			time.Sleep(time.Duration(config.PollingRateInSeconds) * time.Second)
			continue
		}

		runtime.EventsEmit(ctx, config.EventName, data)
		time.Sleep(time.Duration(config.PollingRateInSeconds) * time.Second)
	}
}
