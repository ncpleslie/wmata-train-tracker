package app

import (
	"context"
	"fmt"
	"sync"
	"time"

	train "github.com/ncpleslie/wmata-train-tracker/app/services"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx    context.Context
	config Config
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.config = generateConfig()

}

func (a *App) OnReady(ctx context.Context) {

	stationChan := make(chan string)
	go func() {
		stationChan <- a.config.DefaultStationId
		time.Sleep(2 * time.Second)
		stationChan <- "B02"
		time.Sleep(20 * time.Second)
		stationChan <- "E03"
	}()

	stationId := <-stationChan
	trainRetriever := &TrainsDataRetriever{
		eventName:            "trains",
		pollingRateInSeconds: a.config.TrainUpdateInSeconds,
		url:                  a.config.BaseUrl + "train.getTrains",
		stationId:            <-stationChan,
	}

	go a.runIntervalEvent(trainRetriever, trainRetriever.eventName, trainRetriever.pollingRateInSeconds)
}

type IntervalEvent interface {
	run() (interface{}, error)
}

func (a *App) runIntervalEvent(retrieveData IntervalEvent, eventName string, intervalPeriodInSeconds int) {
	for {
		data, err := retrieveData.run()
		if err != nil {
			runtime.EventsEmit(a.ctx, eventName+"_error", data)
			time.Sleep(time.Duration(intervalPeriodInSeconds) * time.Second)
			continue
		}

		runtime.EventsEmit(a.ctx, eventName, data)
		time.Sleep(time.Duration(intervalPeriodInSeconds) * time.Second)
	}
}

type TrainsDataRetriever struct {
	eventName            string
	pollingRateInSeconds int
	url                  string
	stationId            string
	mu                   sync.Mutex
}

func (t *TrainsDataRetriever) run() (interface{}, error) {
	fmt.Println("StationID")
	fmt.Println(t.stationId)
	return train.QueryTrpcApiGet[train.TrainRequest, train.TrainsResponse](
		t.url,
		train.TrainRequest{StationId: t.stationId},
	)
}

// type IncidentsDataRetriever struct {
// 	// Fields specific to the other data retrieval
// 	eventName            string
// 	pollingRateInSeconds int
// 	url                  string
// }

// func (o *OtherDataRetriever) Retrieve() (interface{}, error) {
// 	// Implement other data retrieval logic
// 	return train.QueryTrpcApiGet[train.TrainRequest, train.TrainsResponse](
// 		o.config.BaseUrl+"train.getTrains",
// 		train.TrainRequest{StationId: o.config.DefaultStationId},
// 	)
// }

// // Gets a collection of trains based on the provided stationId
// func (a *App) GetTrainsByStationId() (train.TrainsResponse, error) {
// 	return train.QueryTrpcApiGet[train.TrainRequest, train.TrainsResponse](
// 		a.config.BaseUrl+"train.getTrains",
// 		train.TrainRequest{StationId: a.config.DefaultStationId},
// 	)
// }

// Possible solution

// type MyStruct struct {
//     Value int
//     mu    sync.Mutex
// }

// func main() {
//     myData := &MyStruct{
//         Value: 0,
//     }

//     go func() {
//         for i := 1; i <= 5; i++ {
//             // Lock the mutex to update the struct
//             myData.mu.Lock()
//             myData.Value = i
//             // Unlock the mutex to release the lock
//             myData.mu.Unlock()
//             time.Sleep(time.Second)
//         }
//     }()

//     go func() {
//         for {
//             // Lock the mutex to safely read the struct
//             myData.mu.Lock()
//             value := myData.Value
//             myData.mu.Unlock()
//             fmt.Println("Value:", value)
//             time.Sleep(time.Second)
//         }
//     }()

//     // Wait for a while to allow the goroutines to run
//     time.Sleep(10 * time.Second)
// }

// type MyStruct struct {
//     Value int
// }

// func main() {
//     myData := &MyStruct{
//         Value: 0,
//     }

//     updateCh := make(chan int)

//     go func() {
//         for i := 1; i <= 5; i++ {
//             updateCh <- i
//             time.Sleep(time.Second)
//         }
//     }()

//     go func() {
//         for {
//             select {
//             case value := <-updateCh:
//                 myData.Value = value
//                 fmt.Println("Value:", myData.Value)
//             }
//         }
//     }()

//     // Wait for a while to allow the goroutines to run
//     time.Sleep(10 * time.Second)
// }
