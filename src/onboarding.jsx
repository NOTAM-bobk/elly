import { useState } from "react";

// --- Original Icons ---
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 6h14M3 10h14M3 14h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="6" y="1.5" width="4" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 8.5a4.5 4.5 0 0 0 9 0M8 13v1.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// --- New Feature Icons ---
function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M11 2L4 11h6l-1 7 8-10h-6l2-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M15 4H5a2 2 0 00-2 2v10l3-3h9a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M5 4v12a2 2 0 002 2h6a2 2 0 002-2V8l-4-4H7a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 4v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Three-step onboarding:
 * 1. Features showcase
 * 2. Ask the person's name
 * 3. Greet them by name and let them type their first message
 */
export default function Onboarding({ assistantName = "Nova", onFinish }) {
  const [step, setStep] = useState("features");
  const [name, setName] = useState("");
  const [firstMessage, setFirstMessage] = useState("");

  function handleNameSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setStep("greet");
  }

  function handleFirstMessageSubmit(e) {
    e.preventDefault();
    const trimmed = firstMessage.trim();
    onFinish({ name: name.trim(), firstMessage: trimmed || null });
  }

  return (
    <div className="onboarding">
      {/* Micro-animations CSS (Production Ready, kept inline for portability) */}
      <style>{`
        .animate-slide-up {
          animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-orb {
          animation: orbPulse 3s ease-in-out infinite alternate;
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbPulse {
          from { transform: scale(1); filter: brightness(1); }
          to { transform: scale(1.05); filter: brightness(1.2); }
        }
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 24px 0;
          padding: 0;
          list-style: none;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px;
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 12px;
          transition: transform 0.2s ease, background 0.2s ease;
          text-align: left;
        }
        .feature-item:hover {
          transform: translateY(-2px) scale(1.01);
          background: rgba(0,0,0,0.04);
        }
        .feature-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
          color: inherit;
        }
        .feature-text h3 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
        }
        .feature-text p {
          margin: 0;
          font-size: 13px;
          opacity: 0.7;
          line-height: 1.4;
        }
      `}</style>

      <div className="top-bar" style={{ padding: "10px 0 0" }}>
        <span className="icon-btn disabled" aria-hidden="true">
          <MenuIcon />
        </span>
        <span />
      </div>

      <div className="onboarding-orb-wrap">
        <div 
          className={`orb ${step === 'greet' ? 'animate-pulse-orb' : ''}`} 
          style={{ transition: 'all 0.5s ease' }} 
        />
      </div>

      {step === "features" && (
        <div className="animate-slide-up">
          <div className="onboarding-copy">
            <p className="onboarding-eyebrow">
              Meet <span className="accent">{assistantName}</span>
            </p>
            <h1 className="onboarding-heading">Your personal AI</h1>
          </div>

          <ul className="feature-list">
            <li className="feature-item">
              <div className="feature-icon-wrap"><BoltIcon /></div>
              <div className="feature-text">
                <h3>Instant Answers</h3>
                <p>Ask anything and get context-aware, real-time responses.</p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-icon-wrap"><DocumentIcon /></div>
              <div className="feature-text">
                <h3>Analyze Documents</h3>
                <p>Upload files to extract data and summarize long texts.</p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-icon-wrap"><ChatIcon /></div>
              <div className="feature-text">
                <h3>Natural Conversations</h3>
                <p>Speak naturally with fluid voice interactions.</p>
              </div>
            </li>
          </ul>

          <button className="primary-btn" onClick={() => setStep("name")} style={{ width: '100%' }}>
            Get Started
          </button>
        </div>
      )}

      {step === "name" && (
        <form className="name-form animate-slide-up" onSubmit={handleNameSubmit}>
          <div className="onboarding-copy">
            <p className="onboarding-eyebrow">
              Hi, I'm <span className="accent">{assistantName}!</span>
            </p>
            <h1 className="onboarding-heading">What should I call you?</h1>
          </div>
          <label htmlFor="name-input">Your name</label>
          <input
            id="name-input"
            className="name-input"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />
          <button className="primary-btn" type="submit" disabled={!name.trim()}>
            Continue
          </button>
          <button
            type="button"
            className="skip-link"
            onClick={() => onFinish({ name: "", firstMessage: null })}
          >
            Skip for now
          </button>
        </form>
      )}

      {step === "greet" && (
        <form className="animate-slide-up" onSubmit={handleFirstMessageSubmit}>
          <div className="onboarding-copy">
            <p className="onboarding-eyebrow">
              Hi <b>{name.trim()}</b>, I'm <span className="accent">{assistantName}!</span> Your personal
              assistant.
            </p>
            <h1 className="onboarding-heading">How can I help you today?</h1>
          </div>
          <div className="composer">
            <button type="button" className="composer-icon-btn" tabIndex={-1} aria-hidden="true">
              <PlusIcon />
            </button>
            <input
              autoFocus
              value={firstMessage}
              onChange={(e) => setFirstMessage(e.target.value)}
              placeholder="Search or ask anything"
            />
            <button type="button" className="composer-icon-btn" tabIndex={-1} aria-hidden="true">
              <MicIcon />
            </button>
          </div>
          <button className="primary-btn" style={{ marginTop: 14, width: "100%" }} type="submit">
            {firstMessage.trim() ? "Start chatting" : "Go to chat"}
          </button>
        </form>
      )}
    </div>
  );
}
