all: test lint sql-generate build-app copy-config run-app

build-app:
	@echo "### Building Wails Application ###"
	@wails build

copy-config:
	@echo "### Copying current config ###"
	@cp config.cfg build/bin/

run-app:
	@echo "### Application starting... Press 'q' to quit  ###"
	@build/bin/wmata-train-tracker

dev:
	@wails dev

dev-no-bind:
	@wails dev -s -skipbindings

sql-generate:
	@echo "### Generating SQLC Code ###"
	@sqlc generate

test:
	@echo "### Testing ###"
	@go test -v ./...

lint:
	@echo "### Linting ###"
	@golangci-lint run ./...

clean:
	@echo "### Cleaning ###"
	@rm -f db.sql 
	@rm -rf tmp
	@rm -rf build/bin

action:
	@echo "### Running Action ###"
	@mkdir -p tmp
	@act --artifact-server-path ./tmp