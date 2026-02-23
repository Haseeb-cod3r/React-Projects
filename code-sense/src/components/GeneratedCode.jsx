import { appContext } from "@/contexts/AppContext";
import { Copy, Check, Loader2 } from "lucide-react";
import { useContext, useState } from "react";

export default function GeneratedCode() {
  const { code, loading } = useContext(appContext);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      setCopied(false);
    }
  }

  return (
    <div
      className="
        bg-[var(--color-card)]
        border
        border-[var(--color-border)]
        p-4
        flex-1
        rounded-xl
        transition-colors
        duration-300
        h-[45%] 
        flex flex-col 
      "
    >
      <div className="flex-none mb-4 w-full">
        <div className="w-full">
          <h2 className="w-full text-xs uppercase tracking-[0.1em] text-[var(--color-primary)] mb-2 flex justify-between items-center">
            AI Generated Code
            {code === "" ? (
              ""
            ) : (
              <button
                onClick={handleCopy}
                className="text-sm flex items-center justify-center gap-1 cursor-pointer text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span className="text-[12px] tracking-normal">Copy code</span>
              </button>
            )}
          </h2>

          <div className="h-px bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)] to-transparent opacity-60"></div>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <pre
          className={`text-sm text-[var(--color-foreground)] whitespace-pre-wrap font-mono ${loading ? "flex items-center justify-center h-full" : ""}`}
        >
          {loading ? (
            <Loader2
              size={40}
              className="animate-spin text-[var(--color-primary)] "
            />
          ) : (
            code || (
              <span className="text-[var(--color-muted-foreground)]">
                Waiting for code generation...
              </span>
            )
          )}
        </pre>
      </div>
    </div>
  );
}
