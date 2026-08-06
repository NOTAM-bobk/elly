import { useState } from "react";

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 4.5 6 10l6.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

  function handleSave(e) {
    e.preventDefault();
    onNameChange(draftName.trim());
  }

  return (
    <div className="settings-view">
      <div className="top-bar">
        <button className="icon-btn" onClick={onBack} aria-label="Back">
          <BackIcon />
        </button>
        <span className="top-bar-title">Settings</span>
        <span style={{ width: 32 }} />
      </div>

      <div className="settings-body">
        <div className="settings-orb-row">
          <div className="orb" />
        </div>

        <form className="settings-group" onSubmit={handleSave}>
          <span className="settings-group-label">Your name</span>
          <input
            className="name-input"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="Type your name"
          />
          <button
            className="primary-btn"
            type="submit"
            disabled={draftName.trim() === (name || "").trim()}
          >
            Save name
          </button>
        </form>

        <div className="settings-group">
          <span className="settings-group-label">Assistant</span>
          <div className="settings-card">
            <span className="label">Name</span>
            <span className="value">{assistantName}</span>
          </div>
          <div className="settings-card">
            <span className="label">Model</span>
            <span className="value">{model}</span>
          </div>
          <div className="settings-card">
            <span className="label">API key</span>
            <span className="value">{hasApiKey ? "Connected via environment variable" : "Not set"}</span>
          </div>
          <p className="settings-hint">
            The Gemini API key is read from the <code>VITE_GEMINI_API_KEY</code> environment variable at
            build time, so it can't be changed from this screen. Update it in your Vercel project settings
            and redeploy.
          </p>
        </div>

        <div className="settings-group">
          <span className="settings-group-label">Conversation</span>
          <div className="settings-card">
            <span className="label">Messages in this chat</span>
            <span className="value">{messageCount}</span>
          </div>
          <button className="danger-btn" onClick={onClearChat} type="button">
            Clear conversation
          </button>
        </div>
      </div>
    </div>
  );
}
