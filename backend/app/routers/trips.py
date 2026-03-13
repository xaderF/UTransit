from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Trip, User
from app.routers.auth import get_current_user
from app.schemas import TripOut

router = APIRouter(tags=["trips"])


@router.get("/trips/history", response_model=list[TripOut])
def trip_history(
    user: User = Depends(get_current_user),
    limit: int = Query(default=20, ge=1, le=200),
    db: Session = Depends(get_db),
) -> list[Trip]:
    stmt = select(Trip).where(Trip.user_id == user.id).order_by(Trip.started_at.desc()).limit(limit)
    return list(db.scalars(stmt).all())
