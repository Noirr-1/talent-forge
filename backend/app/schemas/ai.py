from typing import Any

from pydantic import BaseModel, Field


class ProfileAnalysisRequest(BaseModel):
    profile: dict[str, Any] = Field(
        ...,
        description="Freelancer profile data collected by the Module 1 wizard.",
    )


class ProfileAnalysisResponse(BaseModel):
    profile_summary: str
    career_guidance: list[str]
    profile_improvements: list[str]
