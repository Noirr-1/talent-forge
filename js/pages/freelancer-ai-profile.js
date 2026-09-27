document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.querySelector("#generateAnalysis");
  const statusTitle = document.querySelector("#aiStatusTitle");
  const statusText = document.querySelector("#aiStatusText");
  const summaryRoot = document.querySelector("#profileSummary");
  const guidanceRoot = document.querySelector("#careerGuidance");
  const improvementRoot = document.querySelector("#profileImprovement");

  if (!generateButton) return;

  const renderList = (root, items, emptyMessage) => {
    if (!Array.isArray(items) || items.length === 0) {
      root.innerHTML = `<p>${AC.escapeHtml(emptyMessage)}</p>`;
      return;
    }

    root.innerHTML = `
      <ul class="ai-recommendation-list">
        ${items.map((item) => `<li>${AC.escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
  };

  const renderAnalysis = (data) => {
    summaryRoot.innerHTML = `<p>${AC.escapeHtml(data.profile_summary || "No summary returned.")}</p>`;

    renderList(
      guidanceRoot,
      data.career_guidance,
      "No career guidance was returned."
    );

    renderList(
      improvementRoot,
      data.profile_improvements,
      "No profile improvements were returned."
    );
  };

  generateButton.addEventListener("click", async () => {
    const profile = AC.getStore();

    generateButton.disabled = true;
    generateButton.textContent = "Analyzing profile…";
    statusTitle.textContent = "AI analysis in progress";
    statusText.textContent = "Talent Forge is sending your completed profile to the Module 1 AI endpoint.";

    try {
      const result = await AC.api(AC.endpoints.aiProfileAnalysis, {
        method: "POST",
        body: JSON.stringify({ profile })
      });

      renderAnalysis(result);
      AC.updateStore({ aiAnalysis: result });

      statusTitle.textContent = "AI analysis complete";
      statusText.textContent = "Your three Module 1 AI outputs are shown below.";
      generateButton.textContent = "Regenerate analysis";
    } catch (error) {
      statusTitle.textContent = "Backend connection needed";
      statusText.textContent = "The AI results page is ready. We will connect this button to FastAPI when we build the Module 1 backend.";
      generateButton.textContent = "Try again";
      AC.toast("AI backend is not connected yet.");
    } finally {
      generateButton.disabled = false;
    }
  });

  const savedAnalysis = AC.getStore().aiAnalysis;
  if (savedAnalysis) {
    renderAnalysis(savedAnalysis);
    statusTitle.textContent = "Saved AI analysis";
    statusText.textContent = "These are the latest AI results saved in this browser.";
    generateButton.textContent = "Regenerate analysis";
  }
});
