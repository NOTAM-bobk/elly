import { useEffect, useRef, useState } from "react";
import Onboarding from "./onboarding.jsx";
import Settings from "./settings.jsx";

const ASSISTANT_NAME = "Anna";
const MODEL = "gemini-3.6-flash"; // change model here if needed
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const STORAGE_KEYS = {
  name: "anna:userName",
  messages: "anna:messages",
  onboarded: "anna:onboarded",
};

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 6h14M3 10h14M3 14h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8.5 14 2.5 8 14.5l-1.6-5-4.4-1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function ChatBubbleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M2 3h13v8.5H6.5L3 14.5V11.5H2V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <circle cx="8.5" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8.5 2v1.6M8.5 13.4V15M15 8.5h-1.6M3.6 8.5H2M12.9 4.1l-1.1 1.1M5.2 11.8l-1.1 1.1M12.9 12.9l-1.1-1.1M5.2 5.2 4.1 4.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState("loading"); // loading | onboarding | chat | settings
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]); // { role: 'user'|'model', text }
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Load persisted state on mount
  useEffect(() => {
    const onboarded = localStorage.getItem(STORAGE_KEYS.onboarded);
    const storedName = localStorage.getItem(STORAGE_KEYS.name) || "";
    const storedMessages = localStorage.getItem(STORAGE_KEYS.messages);
    setName(storedName);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch {
        setMessages([]);
      }
    }
    setView(onboarded ? "chat" : "onboarding");
  }, []);

  // Persist messages
  useEffect(() => {
    if (view === "loading") return;
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
  }, [messages, view]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendToGemini(nextMessages) {
    if (!API_KEY) {
      setMessages((m) => [
        ...m,
        {
          role: "error",
          text: "No API key found. Set VITE_GEMINI_API_KEY in your environment and redeploy.",
        },
      ]);
      return;
    }

    setIsTyping(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: nextMessages
            .filter((m) => m.role === "user" || m.role === "model")
            .map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
          generationConfig: { maxOutputTokens: 2048 },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.error?.message || "Unknown API error";
        setMessages((m) => [...m, { role: "error", text: "Error: " + errMsg }]);
        return;
      }

      const replyText =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "(no response)";

      setMessages((m) => [...m, { role: "model", text: replyText }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "error", text: "Network error: " + err.message }]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSend(textOverride) {
    const text = (textOverride ?? input).trim();
    if (!text) return;
    setInput("");
    const next = [...messages, { role: "user", text }];
    setMessages(next);
    sendToGemini(next);
  }

  function handleOnboardingFinish({ name: chosenName, firstMessage }) {
    setName(chosenName);
    localStorage.setItem(STORAGE_KEYS.name, chosenName);
    localStorage.setItem(STORAGE_KEYS.onboarded, "1");
    setView("chat");
    if (firstMessage) {
      const next = [...messages, { role: "user", text: firstMessage }];
      setMessages(next);
      sendToGemini(next);
    }
  }

  function handleNameChange(newName) {
    setName(newName);
    localStorage.setItem(STORAGE_KEYS.name, newName);
  }

  function handleClearChat() {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS.messages);
  }

  if (view === "loading") return null;

  if (view === "onboarding") {
    return (
      <div className="app-shell">
        <Onboarding assistantName={ASSISTANT_NAME} onFinish={handleOnboardingFinish} />
      </div>
    );
  }

  if (view === "settings") {
    return (
      <div className="app-shell">
        <Settings
          name={name}
          assistantName={ASSISTANT_NAME}
          model={MODEL}
          hasApiKey={Boolean(API_KEY)}
          messageCount={messages.length}
          onNameChange={handleNameChange}
          onClearChat={handleClearChat}
          onBack={() => setView("chat")}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="menu-drawer">
            <div className="menu-header">
              <div className="orb" />
              <span className="greeting">Hi {name || "there"}</span>
            </div>
            <button className="menu-item active">
              <ChatBubbleIcon /> Chat
            </button>
            <button
              className="menu-item"
              onClick={() => {
                setView("settings");
                setMenuOpen(false);
              }}
            >
              <GearIcon /> Settings
            </button>
            <div className="menu-spacer" />
            <div className="menu-footer">Powered by the Gemini API</div>
          </div>
        </>
      )}

      <div className="chat-view">
        <div className="chat-header">
          <button className="icon-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <div className="orb" />
          <div className="chat-header-text">
            <span className="name">{ASSISTANT_NAME}</span>
            <span className="status">
              <span className="status-dot" /> Online
            </span>
          </div>
        </div>

        <div className="messages">
          {messages.length === 0 && !isTyping && (
            <div className="empty-state">
              Hi {name || "there"}, I'm {ASSISTANT_NAME}. Ask me anything to get started.
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`bubble-row ${m.role === "user" ? "user" : ""}`}>
              <div className={`bubble ${m.role}`}>{m.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="bubble-row">
              <div className="typing-row">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="composer-wrap">
          <div className="composer">
            <button type="button" className="composer-icon-btn" tabIndex={-1} aria-hidden="true">
              <PlusIcon />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message Anna..."
            />
            {input.trim() ? (
              <button
                type="button"
                className="composer-icon-btn composer-send"
                onClick={() => handleSend()}
                aria-label="Send"
              >
                <SendIcon />
              </button>
            ) : (
              <button type="button" className="composer-icon-btn" tabIndex={-1} aria-hidden="true">
                <MicIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
