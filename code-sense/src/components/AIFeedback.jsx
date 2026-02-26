import { appContext } from "@/contexts/AppContext";
import { Loader2 } from "lucide-react";
import { useContext } from "react";

export default function AIFeedback({ orientation }) {
  const { loading, feedback, status, message } = useContext(appContext);

  return (
    <div
      className={`
        bg-[var(--color-card)] 
        border 
        border-[var(--color-border)] 
        p-4 
        flex-1 
        rounded-2xl 
        flex flex-col 
        h-[45%] 
        transition-colors 
        duration-300
        ${orientation === "vertical" ? "min-h-[400px]" : ""}
      `}
    >
      <div className="flex-none mb-4">
        <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
          AI Feedback
        </h2>
        <div className="h-px bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)] to-transparent opacity-60"></div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div
          className={`
            text-sm 
            leading-relaxed 
            text-[var(--color-foreground)] 
            opacity-90
            ${loading ? "flex items-center justify-center h-full" : ""}
          `}
        >
          {loading ? (
            <Loader2
              size={40}
              className="animate-spin text-[var(--color-primary)]"
            />
          ) : status === "mismatch" ? (
            <span className="text-red-500 font-medium">{message}</span>
          ) : feedback ? (
            <div className="flex flex-col gap-6 w-full max-w-[800px] mt-8">
              {feedback.overview && (
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-primary)] opacity-80">
                      Overview
                    </h3>
                  </div>
                  <div className="pl-2 transition-all duration-300">
                    <p className="text-[var(--color-foreground)] text-sm leading-relaxed whitespace-pre-wrap opacity-90 font-medium">
                      {feedback.overview}
                    </p>
                  </div>
                </div>
              )}

              {feedback.issuesFound?.length > 0 && (
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-primary)] opacity-80">
                      Issues Found
                    </h3>
                  </div>
                  <div className="pl-2 transition-all duration-300">
                    <p className="text-[var(--color-foreground)] text-sm leading-relaxed whitespace-pre-wrap opacity-90 font-medium">
                      {feedback.issuesFound.join("\n• ")}
                    </p>
                  </div>
                </div>
              )}

              {feedback.improvements?.length > 0 && (
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-primary)] opacity-80">
                      Improvements
                    </h3>
                  </div>
                  <div className="pl-2 transition-all duration-300">
                    <p className="text-[var(--color-foreground)] text-sm leading-relaxed whitespace-pre-wrap opacity-90 font-medium">
                      {feedback.improvements.join("\n• ")}
                    </p>
                  </div>
                </div>
              )}

              {feedback.seniorAdvice && (
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-primary)] opacity-80">
                      Senior Advice
                    </h3>
                  </div>
                  <div className="pl-2 transition-all duration-300">
                    <p className="text-[var(--color-foreground)] text-sm leading-relaxed whitespace-pre-wrap opacity-90 font-medium">
                      {feedback.seniorAdvice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <span className="text-[var(--color-muted-foreground)]">
              Waiting for analysis...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
