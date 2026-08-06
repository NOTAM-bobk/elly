import { useState } from "react";

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

/**
 * Two-step onboarding:
 *  1. Ask the person's name
 *  2. Greet them by name (orb + headline) and let them type their first
 *     message straight into a search-style composer
 */
export default function Onboarding({ assistantName, onFinish }) {
  const [step, setStep] = useState("name");
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
      <div className="top-bar" style={{ padding: "10px 0 0" }}>
        <span className="icon-btn disabled" aria-hidden="true">
          <MenuIcon />
        </span>
        <span />
      </div>

      <div className="onboarding-orb-wrap">
        <div className="orb" />
      </div>

      {step === "name" ? (
        <form className="name-form" onSubmit={handleNameSubmit}>
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
      ) : (
        <form onSubmit={handleFirstMessageSubmit}>
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
