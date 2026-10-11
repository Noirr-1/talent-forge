
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#reviewContent');
  if (!root) return;

  const s = AC.getStore();
  const p = s.personal || {};
  const g = s.goals || {};
  const edu = s.education || [];
  const skills = s.skills || [];
  const interests = s.interests || [];

  const escape = (value) => AC.escapeHtml(String(value ?? ''));

  root.innerHTML = `
    <div class="review-box">
      <h3>Personal profile</h3>
      <p><strong>${escape(p.full_name || 'Not provided')}</strong></p>
      <p>${escape(p.location)}</p>
      <p>${escape(p.bio)}</p>
    </div>

    <div class="review-box">
      <h3>Experience</h3>
      <p>${escape(p.experience_level || '—')}</p>
      <p>${escape(p.years_of_experience ?? '—')} years</p>
    </div>

    <div class="review-box">
      <h3>Education</h3>
      ${
        edu.map(x => `
          <p>
            <strong>${escape(x.degree)}</strong>,
            ${escape(x.institution)}
          </p>
        `).join('') || '<p>None added</p>'
      }
    </div>

    <div class="review-box">
      <h3>Skills</h3>
      ${
        skills.map(x => `
          <span class="tag">
            ${escape(x.name)} · ${escape(x.level)}
          </span>
        `).join('') || '<p>None added</p>'
      }
    </div>

    <div class="review-box">
      <h3>Career goal</h3>
      <p><strong>${escape(g.target_role || '—')}</strong></p>
      <p>${escape(g.target_industry)}</p>
      <p>${escape(g.target_level)}</p>
    </div>

    <div class="review-box">
      <h3>Interests</h3>
      ${
        interests.map(x => `
          <span class="tag">${escape(x)}</span>
        `).join('') || '<p>None selected</p>'
      }
    </div>
  `;

  document
    .querySelector('#completeProfile')
    ?.addEventListener('click', () => {
      AC.updateStore({
        profileReadyForBackend: true
      });

      location.href = 'ai-profile.html';
    });
});
