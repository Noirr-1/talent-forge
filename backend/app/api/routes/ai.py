from fastapi import APIRouter, HTTPException

from app.ai.client import analyze_profile
from app.schemas.ai import ProfileAnalysisRequest, ProfileAnalysisResponse

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/profile-analysis", response_model=ProfileAnalysisResponse)
def profile_analysis(payload: ProfileAnalysisRequest) -> ProfileAnalysisResponse:
    if not payload.profile:
        raise HTTPException(status_code=422, detail="Profile data is required.")

    try:
        return analyze_profile(payload.profile)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        print("OPENAI ERROR:", repr(exc))

        raise HTTPException(
            status_code=502,
            detail="The AI analysis service could not complete the request.",
        ) from exc