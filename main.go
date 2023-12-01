package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"

	app "github.com/ncpleslie/wmata-train-tracker/app"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	application := app.NewApp()

	err := wails.Run(&options.App{
		Title:     "WMATA Train Tracker",
		Width:     800,
		Height:    480,
		MinWidth:  800,
		MinHeight: 480,
		MaxWidth:  800,
		MaxHeight: 480,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Frameless:        true,
		CSSDragProperty:  "--wails-draggable",
		CSSDragValue:     "drag",
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		OnStartup:        application.Startup,
		OnDomReady:       application.OnReady,
		Bind: []interface{}{
			application,
		},
		Linux: &linux.Options{
			Icon:                icon,
			WindowIsTranslucent: false,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
