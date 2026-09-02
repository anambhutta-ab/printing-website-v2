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
  text: "Hello! I can help you with printing services, paper types, sizes, and finishes.",
  sources: [],
};

function Chatbot({ isOpen, onOpen, onMinimize }) {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [expandedSourceMessageIds, setExpandedSourceMessageIds] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

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
          text: "I could not connect to the backend. Please make sure FastAPI is running.",
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
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-brand-ruby px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-brand-ruby-dark hover:shadow-2xl sm:bottom-5 sm:right-5 sm:gap-3 sm:px-5 sm:py-4"
      aria-label="Open Communicare Printing Assistant"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">
        ✦
      </span>

      <span>Ask the assistant</span>
    </button>
  );
}
  return (
    <div className="fixed inset-0 z-50 flex w-full flex-col overflow-hidden bg-white shadow-2xl lg:inset-auto lg:bottom-5 lg:right-5 lg:h-auto lg:w-[calc(100%-2.5rem)] lg:max-w-2xl lg:rounded-2xl lg:ring-1 lg:ring-slate-200">
      <div className="flex items-center justify-between bg-brand-navy px-4 py-4 text-white lg:px-5">
        <div>
          <p className="font-semibold">Communicare Assistant</p>

          <p className="text-xs text-brand-gold">
            {isLoading ? "Searching our printing knowledge base..." : "Online"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearChat}
            disabled={isLoading}
            className="rounded-md px-2 py-1 text-xs text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onMinimize}
            className="rounded-md px-2 py-1 text-xl text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label="Minimize chatbot"
            title="Minimize chat"
          >
            −
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto 	bg-brand-background p-4 lg:h-[32rem] lg:flex-none">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user"
              ? "ml-auto rounded-br-none bg-brand-ruby text-white"
              : "rounded-bl-none bg-white text-brand-ink shadow-sm ring-1 ring-brand-border"
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
                    <strong className="font-bold text-slate-900">
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
                    <h1 className="mb-3 mt-4 text-xl font-bold text-slate-900">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-4 text-lg font-bold text-slate-900">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-3 font-bold text-slate-900">
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
                    <thead className="bg-brand-background text-slate-800">
                      {children}
                    </thead>
                  ),

                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-slate-200 bg-white">
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
                    <blockquote className="my-3 border-l-4 border-brand-ruby pl-4 italic text-brand-muted">
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
                  className="flex items-center gap-2 text-xs font-semibold text-brand-ruby transition hover:text-brand-ruby-dark"
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
                        className="rounded-lg border border-brand-border bg-brand-rose p-3 text-xs text-brand-muted"
                      >
                        <p className="font-semibold text-brand-ink">
                          {source.source}
                        </p>

                        <p className="mt-1 leading-5 text-slate-500">
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
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-ruby [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-ruby [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-ruby" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      {messages.length === 1 && !isLoading && (
        <div className="mb-2">
          <p className="mb-4 pl-4 text-s font-semibold uppercase tracking-[0.16em] text-brand-muted">
            Ask a quick question
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {EXAMPLE_QUESTIONS.map((exampleQuestion) => (
              <button
                key={exampleQuestion}
                type="button"
                onClick={() => handleExampleQuestion(exampleQuestion)}
                className="w-full text-left text-xs font-semibold rounded-full border border-brand-border bg-brand-background px-4 py-2.5 text-brand-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-ruby hover:text-brand-ruby hover:shadow-sm"
              >
                {exampleQuestion}
              </button>
            ))}
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about printing..."
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-ruby focus:ring-2 focus:ring-brand-ruby/15 disabled:bg-brand-background"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-brand-navy-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbot;