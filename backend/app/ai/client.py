import json

from openai import OpenAI

from app.ai.prompts import SYSTEM_PROMPT
from app.core.config import GROQ_API_KEY, GROQ_MODEL
from app.schemas.ai import ProfileAnalysisResponse


def analyze_profile(profile: dict) -> ProfileAnalysisResponse:
    if not GROQ_API_KEY:
        raise RuntimeError(
            "GROQ_API_KEY is not configured. Add it to backend/.env."
        )

    client = OpenAI(
        api_key=GROQ_API_KEY,
        base_url="https://api.groq.com/openai/v1",
    )

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": (
                    "Analyze this Talent Forge freelancer profile.\n"
                    "Return your response as a valid JSON object with exactly "
                    "these fields: profile_summary, career_guidance, "
                    "profile_improvements.\n"
                    "career_guidance and profile_improvements must be JSON arrays "
                    "of strings.\n\n"
                    "Freelancer profile:\n"
                    + json.dumps(profile, ensure_ascii=False, indent=2)
    ),
            },
        ],
        response_format={"type": "json_object"},
    )

    content = response.choices[0].message.content

    if not content:
        raise RuntimeError("Groq did not return a profile analysis.")

    data = json.loads(content)

    return ProfileAnalysisResponse(**data)