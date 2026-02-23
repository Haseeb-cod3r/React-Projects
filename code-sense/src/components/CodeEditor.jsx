import { appContext } from "@/contexts/AppContext";
import { useRef, useContext } from "react";

export default function CodeEditor() {
  const { userCode, setUserCode } = useContext(appContext);
  const textareaRef = useRef(null);
  const lineNumberRef = useRef(null);
  const lineCount = userCode.split("\n").length;

  function handleScroll() {
    if (lineNumberRef.current && textareaRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }

  return (
    <div
      className="
        flex-1
        bg-[var(--color-card)]
        border
        border-[var(--color-border)]
        p-4
        relative
        flex
        flex-col
        overflow-hidden
        rounded-xl
        transition-colors
        duration-300
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          mb-3
          text-sm
          text-[var(--color-muted-foreground)]
        "
      >
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>

      <div className="flex flex-1 overflow-hidden text-sm font-mono">
        <div
          ref={lineNumberRef}
          className="
            text-[var(--color-muted-foreground)]
            pr-4
            text-right
            select-none
            overflow-hidden
          "
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          onScroll={handleScroll}
          placeholder="// Paste your code here to analyze..."
          className="
            flex-1
            bg-transparent
            outline-none
            resize-none
            whitespace-nowrap
            text-[var(--color-foreground)]
            placeholder:text-[var(--color-muted-foreground)]
          "
        />
      </div>
      <div className="flex justify-between items-center border-t-1 border-(--color-border)">
        <div
          className="
              pt-3 
              flex 
              gap-2
              items-center 
              justify-between 
              text-xs 
              font-medium 
              uppercase 
              tracking-wider 
              text-[var(--color-muted-foreground)]
"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{userCode.length} Characters</span>
        </div>
        <button
          onClick={() => setUserCode("")}
          className="
      max-w-[600px]
        bg-[var(--color-primary)]
        text-[var(--color-primary-foreground)]
        font-semibold
        cursor-pointer
        py-1
        px-3
        rounded-full
        mt-4
        border
        border-[var(--color-border)]
        hover:opacity-80
        active:opacity-100
      "
        >
          Clear
        </button>
      </div>
    </div>
  );
}
