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
		Title:  "WMATA Train Tracker",
		Width:  800,
		Height: 480,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Frameless:        false,
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		OnStartup:        application.Startup,
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
