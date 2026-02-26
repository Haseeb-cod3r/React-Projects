import { CodeXml } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { context } from "@/contexts/ThemeContext";
import Typewriter from "typewriter-effect";

export default function Navbar() {
  const { theme, setTheme } = useContext(context);

  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-8
        py-4
        border-b
        border-[var(--color-border)]
        bg-[var(--color-background)]
        transition-colors
        duration-300
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            bg-[var(--color-primary)]
            text-[var(--color-primary-foreground)]
            p-2
            rounded-md
          "
        >
          <CodeXml size={22} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-primary)]">
          <Typewriter
            options={{
              strings: ["CodeSense"],
              autoStart: true,
              loop: true,
              delay: 100,
              deleteSpeed: 60,
              pauseFor: 3000,
              cursor: "_",
              wrapperClassName: "typewriter-text",
              cursorClassName: "typewriter-cursor",
            }}
          />
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="
            bg-[var(--color-muted)]
            text-[var(--color-muted-foreground)]
            px-3
            py-1
            rounded-full
            text-sm
            max-sm:hidden
          "
        >
          ● Powered By " llama-3.3-70b-versatile "
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{theme}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="Midnight">
                  Midnight
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Pastel">
                  Pastel
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Forest">
                  Forest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Light">
                  Light
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
