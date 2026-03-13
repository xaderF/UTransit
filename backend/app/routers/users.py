from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import hash_password
from app.database import get_db
from app.models import User
from app.routers.auth import get_current_user
from app.schemas import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, db: Session = Depends(get_db)) -> User:
    email_exists = db.scalar(select(User).where(User.email == payload.email))
    if email_exists:
        raise HTTPException(status_code=409, detail="Email already exists")

    if payload.student_id:
        student_exists = db.scalar(select(User).where(User.student_id == payload.student_id))
        if student_exists:
            raise HTTPException(status_code=409, detail="Student ID already exists")

    if payload.utorid:
        utorid_exists = db.scalar(select(User).where(User.utorid == payload.utorid))
        if utorid_exists:
            raise HTTPException(status_code=409, detail="UTORid already exists")

    user = User(
        email=payload.email,
        password_hash=hash_password(payload.password),
        student_id=payload.student_id,
        utorid=payload.utorid,
        is_student=payload.is_student,
        full_name=payload.full_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> User:
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this user")
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
