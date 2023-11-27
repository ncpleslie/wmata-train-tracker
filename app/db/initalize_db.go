package train_db

import (
	"context"
	"database/sql"
	_ "embed"

	_ "modernc.org/sqlite"
)

//go:embed schema.sql
var ddl string

// Initialize initializes an SQLite database connection and returns a *Queries instance for interaction.
// It takes a context.Context and a DBUrl (SQLite database URL) as parameters.
//
// Parameters:
//   - ctx:   The context.Context for managing the database initialization.
//   - DBUrl: The URL specifying the SQLite database.
//
// Returns:
//   - *sql.DB:      A pointer to the *sql.DB instance representing the SQLite database connection.
//   - *Queries:     A pointer to the *Queries instance for interacting with the initialized database.
//   - error:        An error, if any, during the database initialization.
func Initialize(ctx context.Context, DBUrl string) (*sql.DB, Querier, error) {
	db, err := sql.Open("sqlite", DBUrl)
	if err != nil {
		return nil, nil, err
	}

	if _, err := db.ExecContext(ctx, ddl); err != nil {
		return nil, nil, err
	}

	return db, Querier(New(db)), nil
}
