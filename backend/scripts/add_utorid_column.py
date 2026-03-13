#!/usr/bin/env python3
"""Add utorid and is_student columns to users table. Run against existing RDS if needed."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sqlalchemy import text

from app.database import engine


def migrate() -> None:
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS utorid VARCHAR(64) UNIQUE"))
            conn.commit()
            print("Added utorid column.")
        except Exception as e:
            err = str(e).lower()
            if "duplicate column" in err or "already exists" in err:
                print("Column utorid already exists.")
            else:
                raise

        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_student BOOLEAN DEFAULT true NOT NULL"))
            conn.commit()
            print("Added is_student column.")
        except Exception as e:
            err = str(e).lower()
            if "duplicate column" in err or "already exists" in err:
                print("Column is_student already exists.")
            else:
                raise


if __name__ == "__main__":
    migrate()

