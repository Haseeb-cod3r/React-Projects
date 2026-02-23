import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import GeneratedCode from "./components/GeneratedCode";
import AIFeedback from "./components/AIFeedback";
import StartButton from "./components/StartButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useEffect, useState } from "react";

import { Group, Panel, Separator } from "react-resizable-panels";
import { appContext } from "./contexts/AppContext";

export default function App() {
  const [orientation, setOrientation] = useState("horizontal");

  const { lang, setLang, framework, setFramework, feature, setFeature } =
    useContext(appContext);

  useEffect(() => {
    const onResize = () => {
      window.innerWidth <= 750
        ? setOrientation("vertical")
        : setOrientation("horizontal");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-(--color-background) text-(--color-foreground) transition-colors duration-300 overflow-hidden">
      <Navbar />

      <main className="flex-1 w-full overflow-hidden">
        <Group
          orientation={orientation}
          id="main-layout-group"
          className="w-full h-full"
        >
          <Panel id="left-editor-panel" defaultSize="50%" minSize="30%">
            <div className="h-full border-r border-(--color-border) p-6 flex flex-col gap-4 overflow-y-auto">
              <div className="flex flex-wrap gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{lang}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-56">
                    <DropdownMenuRadioGroup
                      value={lang}
                      onValueChange={setLang}
                    >
                      <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                      <DropdownMenuRadioItem value="JavaScript">
                        JavaScript
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="TypeScript">
                        TypeScript
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{framework}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-56">
                    <DropdownMenuRadioGroup
                      value={framework}
                      onValueChange={setFramework}
                    >
                      <DropdownMenuLabel>Select Framework</DropdownMenuLabel>
                      <DropdownMenuRadioItem value="React">
                        React
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Angular">
                        Angular
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Vue.js">
                        Vue.js
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Next.js">
                        Next.js
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Nuxt.js">
                        Nuxt.js
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Svelte">
                        Svelte
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{feature}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-56">
                    <DropdownMenuRadioGroup
                      value={feature}
                      onValueChange={setFeature}
                    >
                      <DropdownMenuLabel>Select Feature</DropdownMenuLabel>
                      <DropdownMenuRadioItem value="Review">
                        Review
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Optimize">
                        Optimize
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Debug">
                        Debug
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CodeEditor />
              <div className=" flex items-center justify-center">
                <StartButton />
              </div>
            </div>
          </Panel>

          <Separator
            id="main-separator"
            className={`group w-1.5 ${orientation === "vertical" ? "bg-(--color-primary) hover:bg-(--color-primary)" : "bg-transparent hover:bg-(--color-primary)/10"}  py-1 rounded-2xl   transition-colors cursor-col-resize flex items-center justify-center outline-none`}
          >
            <div
              className={`w-[2px] h-10 rounded-full transition-all ${orientation === "vertical" ? "bg-(--color-border)" : "bg-(--color-primary)"}`}
            />
          </Separator>
          <Panel id="right-output-panel" defaultSize="50%" minSize="30%">
            <div
              className="h-full p-6 flex 
            flex-col gap-6 overflow-y-auto"
            >
              <GeneratedCode />
              <AIFeedback />
            </div>
          </Panel>
        </Group>
      </main>
    </div>
  );
}
