package train_db

import (
	"context"
	"database/sql"
	_ "embed"
)

//go:embed schema.sql
var ddl string

func Initialize(ctx context.Context, DBUrl string) (*Queries, error) {
	db, err := sql.Open("sqlite", DBUrl)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	if _, err := db.ExecContext(ctx, ddl); err != nil {
		return nil, err
	}

	return New(db), nil
}
