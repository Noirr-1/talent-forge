window.AC = {
  API_BASE_URL:
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000/api/v1"
    : "/api/v1",
  storeKey: "talentForgeWizard",
  tokenKey: "talentForgeToken",
  getStore() {
    try {
      return JSON.parse(localStorage.getItem(this.storeKey))|| {
      }
    } catch {
      return {
      }
    }
  },
  setStore(data) {
    localStorage.setItem(this.storeKey,JSON.stringify(data));
    return data;
  },
  updateStore(patch) {
    return this.setStore( {
      ...this.getStore(),...patch
    }
    );
  },
  clearStore() {
    localStorage.removeItem(this.storeKey);
  },
  getToken() {
    return localStorage.getItem(this.tokenKey)||"";
  },
  setToken(token) {
    token?localStorage.setItem(this.tokenKey,token):localStorage.removeItem(this.tokenKey);
  },
  escapeHtml(value="") {
    const d=document.createElement("div");
    d.textContent=String(value);
    return d.innerHTML;
  },
  toast(message) {
    let t=document.querySelector('.toast');
    if(!t) {
      t=document.createElement('div');
      t.className='toast';
      document.body.appendChild(t)
    }
    t.textContent=message;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),2400);
  },
  formToObject(form) {
    return Object.fromEntries(new FormData(form).entries());
  },
  async api(path,options= {
  }
  ) {
    const headers= {
      ...(options.body instanceof FormData? {
      }
      : {
        "Content-Type":"application/json"
      }
      ),...(options.headers|| {
      }
      )
    };
    const token=this.getToken();
    if(token) headers.Authorization=`Bearer ${token}`;
    const response=await fetch(`${this.API_BASE_URL}${path}`, {
      ...options,headers
    }
    );
    const text=await response.text();
    let data= {
    };
    try {
      data=text?JSON.parse(text): {
      }
    } catch {
      data= {
        message:text
      }
    }
    if(!response.ok) throw new Error(data.detail||data.message||`Request failed (${response.status})`);
    return data;
  },
  // Backend-ready: page scripts can switch from localStorage to these methods later.
  endpoints: {
    signup:'/auth/signup',signin:'/auth/signin',me:'/auth/me',freelancerProfile:'/freelancer/profile',
    education:'/education',skills:'/skills',freelancerSkills:'/freelancer/skills',interests:'/interests',
    freelancerInterests:'/freelancer/interests',careerGoals:'/career-goals',clientProfile:'/client/profile',
    completeProfile:'/freelancer/profile/complete',cv:'/freelancer/cv',
    aiProfileAnalysis:'/ai/profile-analysis'
  }
};
