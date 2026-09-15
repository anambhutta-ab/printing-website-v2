import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


const EXAMPLE_QUESTIONS = [
  "What paper is best for business cards?",
  "What should I provide for a custom print order?",
  "Can your graphic designer create my brochure?",
  "Do you have ready-to-buy stationery items?",
];


const INITIAL_MESSAGE = {
  id: crypto.randomUUID(),
  role: "assistant",
  text: "Hello! I can help you with printing services, paper types, sizes, and finishes. I can help you understand our process and the information we need for custom orders. How can I assist you today?",
  sources: [],
};


function Chatbot({ isOpen, onOpen, onMinimize }) {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [expandedSourceMessageIds, setExpandedSourceMessageIds] = useState([]);
  const [chatHeight, setChatHeight] = useState(690); // px
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const resizingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);


  useEffect(() => {
    function handleMouseMove(e) {
      if (!resizingRef.current) return;
      const deltaY = startYRef.current - e.clientY;
      let newHeight = startHeightRef.current + deltaY;
      // Clamp between min and max
      newHeight = Math.max(320, Math.min(newHeight, Math.min(window.innerHeight * 0.85, 720)));
      setChatHeight(newHeight);
    }

    function handleMouseUp() {
      resizingRef.current = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    function handleTouchMove(e) {
      if (!resizingRef.current) return;
      const touch = e.touches[0];
      const deltaY = startYRef.current - touch.clientY;
      let newHeight = startHeightRef.current + deltaY;
      newHeight = Math.max(320, Math.min(newHeight, Math.min(window.innerHeight * 0.85, 720)));
      setChatHeight(newHeight);
    }

    function handleTouchEnd() {
      resizingRef.current = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);


  function handleResizeStart(e) {
    resizingRef.current = true;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    startHeightRef.current = chatHeight;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ns-resize";
  }


  function handleClearChat() {
    if (isLoading) {
      return;
    }

    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: crypto.randomUUID(),
      },
    ]);

    setQuestion("");
    setExpandedSourceMessageIds([]);
  }


  function handleExampleQuestion(exampleQuestion) {
    if (isLoading) {
      return;
    }

    setQuestion(exampleQuestion);
  }


  function toggleSources(messageId) {
    setExpandedSourceMessageIds((currentIds) => {
      const isExpanded = currentIds.includes(messageId);

      if (isExpanded) {
        return currentIds.filter((id) => id !== messageId);
      }

      return [...currentIds, messageId];
    });
  }


  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmedQuestion,
      sources: [],
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("The server returned an error.");
      }

      const data = await response.json();

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.answer || "The assistant returned an empty response.",
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "I'm having trouble connecting right now. Let's try that again in a few moments.",
          sources: [],
        },
      ]);

      console.error("Chat request failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-brand-navy px-4 py-3 
        drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] text-base text-brand-background shadow-xl transition hover:bg-brand-primary
         hover:shadow-2xl hover:text-white sm:bottom-5 sm:right-5 sm:gap-3 sm:px-5 sm:py-4"

        aria-label="Open Communicare Printing Assistant"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-background/15 text-lg">
          ✦
        </span>

        <span>Ask the assistant</span>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex min-h-0 w-full flex-col overflow-hidden bg-white shadow-2xl lg:inset-auto lg:bottom-5 
      lg:right-5 lg:h-auto lg:max-h-[calc(100vh-2.5rem)] lg:w-[calc(100%-2.5rem)] lg:max-w-xl lg:rounded-2xl lg:ring-1 lg:ring-slate-200"
      style={{ height: chatHeight }}
    >
      <div className="flex items-center justify-between bg-brand-navy px-4 py-4 text-white lg:px-5">
        <div>
          <p className="font-semibold">Communicare Assistant</p>

          <p className="text-xs text-brand-muted">
            {isLoading ? "Searching our printing knowledge base..." : "Online"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearChat}
            disabled={isLoading}
            className="rounded-md px-2 py-1 text-sm text-brand-background transition hover:bg-brand-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onMinimize}
            className="rounded-md px-2 py-1 text-xl text-brand-background transition hover:bg-brand-primary hover:text-white"
            aria-label="Minimize chatbot"
            title="Minimize chat"
          >
            −
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-white p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user"
              ? "ml-auto rounded-br-none bg-brand-secondary text-white"
              : "rounded-bl-none bg-brand-navy text-white shadow-sm ring-1 ring-brand-border"
              }`}
          >
            <div className="chat-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-3 last:mb-0">{children}</p>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-bold text-brand-primary">
                      {children}
                    </strong>
                  ),

                  ul: ({ children }) => (
                    <ul className="my-3 list-disc space-y-2 pl-5">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="my-3 list-decimal space-y-2 pl-5">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="pl-1">{children}</li>
                  ),

                  h1: ({ children }) => (
                    <h1 className="mb-3 mt-4 text-xl font-bold text-brand-text">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-4 text-lg font-bold text-brand-text">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-3 font-bold text-brand-text">
                      {children}
                    </h3>
                  ),

                  table: ({ children }) => (
                    <div className="my-4 overflow-x-auto rounded-lg border border-brand-border">
                      <table className="min-w-full border-collapse text-left text-xs">
                        {children}
                      </table>
                    </div>
                  ),

                  thead: ({ children }) => (
                    <thead className="bg-brand-background text-brand-text">
                      {children}
                    </thead>
                  ),

                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-brand-border bg-brand-surface">
                      {children}
                    </tbody>
                  ),

                  tr: ({ children }) => (
                    <tr className="align-top">{children}</tr>
                  ),

                  th: ({ children }) => (
                    <th className="whitespace-nowrap px-3 py-2 font-bold">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="min-w-[120px] px-3 py-3 leading-5 text-brand-muted">
                      {children}
                    </td>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="my-3 border-l-4 border-brand-primary pl-4 italic text-brand-muted">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>

            {message.role === "assistant" && message.sources?.length > 0 && (
              <div className="mt-4 border-t border-brand-border pt-3">
                <button
                  type="button"
                  onClick={() => toggleSources(message.id)}
                  className="flex items-center gap-2 text-xs font-semibold text-brand-navy transition 
                  hover:text-brand-primary"
                  aria-expanded={expandedSourceMessageIds.includes(message.id)}
                >
                  <span>
                    {expandedSourceMessageIds.includes(message.id)
                      ? "Hide sources"
                      : "Show sources"}{" "}
                    ({message.sources.length})
                  </span>

                  <span aria-hidden="true">
                    {expandedSourceMessageIds.includes(message.id) ? "▲" : "▼"}
                  </span>
                </button>

                {expandedSourceMessageIds.includes(message.id) && (
                  <div className="mt-3 space-y-3">
                    {message.sources.map((source, index) => (
                      <article
                        key={`${message.id}-${source.source}-${index}`}
                        className="rounded-lg border border-brand-border bg-brand-surface p-3 text-xs text-brand-muted"
                      >
                        <p className="font-semibold text-brand-text">
                          {source.source}
                        </p>

                        <p className="mt-1 leading-5 text-brand-muted">
                          {source.snippet}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-none bg-white px-4 py-3 shadow-sm">
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-navy [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-navy [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-navy" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && !isLoading && (
        <div className="shrink-0  p-3 sm:p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy">
            Ask a quick question
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {EXAMPLE_QUESTIONS.map((exampleQuestion) => (
              <button
                key={exampleQuestion}
                type="button"
                onClick={() => handleExampleQuestion(exampleQuestion)}
                className="flex h-10 w-full items-center text-left text-xs font-semibold rounded-xl border border-brand-border
                bg-brand-primary px-3 py-2 text-slate-200 transition-all duration-200 sm:h-14 sm:px-4
                hover:bg-brand-navy hover:border-brand-primary hover:text-white hover:shadow-sm"
              >
                {exampleQuestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t bg-brand-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about printing..."
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text outline-none
           focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 disabled:bg-brand-background"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:bg-brand-muted"
        >
          Send
        </button>
      </form>

      {/* Resize handle */}
      <div
        onMouseDown={handleResizeStart}
        onTouchStart={handleResizeStart}
        className="h-3 w-full cursor-ns-resize select-none border-t border-brand-border bg-brand-background/60 transition hover:bg-brand-border/40"
        title="Drag to resize"
        aria-label="Resize chatbot height"
      />
    </div>
  );
}


export default Chatbot;