import { context } from "../contexts/ThemeContext";
import { useContext, useState } from "react";

export default function Dropdown({ title, options, state }) {
  const [selected, setSelected] = useState(title);
  const [open, setOpen] = useState(false);
  const { setTheme } = useContext(context);

  function handleOnClick(state, opt) {
    if (state === "theme") {
      setTheme(opt);
    }
  }

  return (
    <div className="relative w-40">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          bg-[var(--color-card)]
          border
          border-[var(--color-border)]
          text-[var(--color-foreground)]
          px-3
          py-2
          cursor-pointer
          text-sm
          flex
          justify-between
          items-center
          rounded-md
          transition-colors
          duration-200
          hover:border-[var(--color-primary)]
        "
      >
        {selected}
        <span className="text-xs opacity-70">▼</span>
      </button>

      {open && (
        <div
          className="
            absolute
            mt-2
            w-full
            bg-[var(--color-card)]
            border
            border-[var(--color-border)]
            shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            rounded-md
            overflow-hidden
            z-50
          "
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
                handleOnClick(state, opt);
              }}
              className="
                px-3
                py-2
                text-sm
                text-[var(--color-foreground)]
                cursor-pointer
                transition-colors
                duration-150
                hover:bg-[var(--color-muted)]
              "
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
