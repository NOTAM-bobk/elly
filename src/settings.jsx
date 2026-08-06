import { useState } from "react";

// --- Original Icons ---
function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 4.5 6 10l6.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// --- New Expressive Icons ---
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>
    </svg>
  );
}

function BotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );
}

export default function Settings({
  name,
  assistantName,
  model,
  hasApiKey,
  messageCount,
  onNameChange,
  onClearChat,
  onBack,
}) {
  const [draftName, setDraftName] = useState(name);
  
  // New local states for the added settings (can be lifted to parent later)
  const [theme, setTheme] = useState("system");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [responseTone, setResponseTone] = useState("balanced");

  function handleSave(e) {
    e.preventDefault();
    onNameChange(draftName.trim());
  }

  return (
    <div className="settings-view">
      {/* Embedded Styles for Expressive UI & Micro-animations */}
      <style>{`
        .settings-view {
          animation: fadeSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .orb-pulse {
          animation: subtlePulse 4s ease-in-out infinite alternate;
          box-shadow: 0 0 30px rgba(138, 43, 226, 0.15);
        }
        @keyframes subtlePulse {
          0% { transform: scale(1); filter: brightness(1); }
          100% { transform: scale(1.05); filter: brightness(1.2); }
        }
        .settings-group-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: inherit;
        }
        .settings-group-icon {
          opacity: 0.6;
        }
        .interactive-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: rgba(120, 120, 120, 0.04);
          border: 1px solid rgba(120, 120, 120, 0.1);
          border-radius: 12px;
          margin-bottom: 8px;
          transition: all 0.2s ease;
        }
        .interactive-card:hover {
          background: rgba(120, 120, 120, 0.08);
          transform: translateY(-1px);
        }
        .card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .card-title {
          font-weight: 500;
          font-size: 14px;
        }
        .card-desc {
          font-size: 12px;
          opacity: 0.6;
        }
        
        /* Modern Toggle Switch */
        .toggle-switch {
          position: relative;
          width: 44px;
          height: 24px;
          background: rgba(120, 120, 120, 0.2);
          border-radius: 24px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .toggle-switch[data-active="true"] {
          background: #6366f1; /* Indigo color */
        }
        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .toggle-switch[data-active="true"] .toggle-thumb {
          transform: translateX(20px);
        }

        /* Modern Select */
        .modern-select {
          appearance: none;
          background: rgba(120, 120, 120, 0.1);
          border: 1px solid rgba(120, 120, 120, 0.2);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: inherit;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
        }
        .modern-select:hover {
          background: rgba(120, 120, 120, 0.15);
        }
      `}</style>

      <div className="top-bar">
        <button className="icon-btn" onClick={onBack} aria-label="Back">
          <BackIcon />
        </button>
        <span className="top-bar-title font-medium">Settings</span>
        <span style={{ width: 32 }} />
      </div>

      <div className="settings-body" style={{ paddingBottom: 40 }}>
        <div className="settings-orb-row">
          <div className="orb orb-pulse" />
        </div>

        {/* PROFILE SECTION */}
        <form className="settings-group" onSubmit={handleSave}>
          <div className="settings-group-header">
            <span className="settings-group-icon"><UserIcon /></span>
            <span className="settings-group-label" style={{ margin: 0 }}>Profile</span>
          </div>
          <div className="interactive-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
            <input
              className="name-input"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="What should we call you?"
              style={{ background: 'transparent', border: '1px solid rgba(120,120,120,0.2)', padding: '10px 14px', borderRadius: '8px' }}
            />
            <button
              className="primary-btn"
              type="submit"
              disabled={draftName.trim() === (name || "").trim()}
              style={{ width: '100%', padding: '10px' }}
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* PREFERENCES SECTION (NEW) */}
        <div className="settings-group">
          <div className="settings-group-header">
            <span className="settings-group-icon"><PaletteIcon /></span>
            <span className="settings-group-label" style={{ margin: 0 }}>Preferences</span>
          </div>
          
          <div className="interactive-card">
            <div className="card-info">
              <span className="card-title">Theme</span>
              <span className="card-desc">Choose your visual style</span>
            </div>
            <select 
              className="modern-select" 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="system">System Auto</option>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          <div className="interactive-card" onClick={() => setVoiceEnabled(!voiceEnabled)} style={{ cursor: 'pointer' }}>
            <div className="card-info">
              <span className="card-title">Voice Responses</span>
              <span className="card-desc">Assistant will speak out loud</span>
            </div>
            <div className="toggle-switch" data-active={voiceEnabled}>
              <div className="toggle-thumb" />
            </div>
          </div>

          <div className="interactive-card">
            <div className="card-info">
              <span className="card-title">Response Tone</span>
              <span className="card-desc">Adjust how {assistantName} replies</span>
            </div>
            <select 
              className="modern-select" 
              value={responseTone} 
              onChange={(e) => setResponseTone(e.target.value)}
            >
              <option value="concise">Concise & Direct</option>
              <option value="balanced">Balanced</option>
              <option value="creative">Creative & Detailed</option>
            </select>
          </div>
        </div>

        {/* AI ENGINE SECTION */}
        <div className="settings-group">
          <div className="settings-group-header">
            <span className="settings-group-icon"><BotIcon /></span>
            <span className="settings-group-label" style={{ margin: 0 }}>AI Engine</span>
          </div>
          
          <div className="interactive-card">
            <div className="card-info">
              <span className="card-title">Assistant Name</span>
            </div>
            <span className="value" style={{ fontWeight: 500 }}>{assistantName}</span>
          </div>
          
          <div className="interactive-card">
            <div className="card-info">
              <span className="card-title">Language Model</span>
            </div>
            <span className="value" style={{ opacity: 0.8 }}>{model}</span>
          </div>
          
          <div className="interactive-card">
            <div className="card-info">
              <span className="card-title">API Connection</span>
            </div>
            <span className="value">
              {hasApiKey ? (
                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}/> Active
                </span>
              ) : (
                <span style={{ color: '#ef4444' }}>Not set</span>
              )}
            </span>
          </div>
          <p className="settings-hint">
            The Gemini API key is read from the <code>VITE_GEMINI_API_KEY</code> environment variable at
            build time. Update it in your host settings and redeploy.
          </p>
        </div>

        {/* DATA & PRIVACY SECTION */}
        <div className="settings-group">
          <div className="settings-group-header">
            <span className="settings-group-icon"><ShieldIcon /></span>
            <span className="settings-group-label" style={{ margin: 0 }}>Data & Privacy</span>
          </div>
          
          <div className="interactive-card">
            <div className="card-info">
              <span className="card-title">Chat History</span>
              <span className="card-desc">{messageCount} messages stored locally</span>
            </div>
          </div>
          
          <button 
            className="danger-btn" 
            onClick={onClearChat} 
            type="button"
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              marginTop: '8px'
            }}
          >
            <TrashIcon />
            Clear conversation
          </button>
        </div>
      </div>
    </div>
  );
}
