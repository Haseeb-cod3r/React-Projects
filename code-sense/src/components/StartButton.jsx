import { appContext } from "@/contexts/AppContext";
import { GroqServices } from "@/services/groqService";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function StartButton() {
  const {
    lang,
    framework,
    feature,
    userCode,
    setCode,
    setSummary,
    setFixed,
    setSuggestion,
    setLoading,
  } = useContext(appContext);

  function validation() {
    if (userCode === "") {
      return toast.error("Source code missing.", {
        style: {
          background: "var(--color-primary)",
          color: "white",
        },
      });
    }
    if (lang === "Language") {
      return toast.error("Please select the Language", {
        style: {
          background: "var(--color-primary)",
          color: "white",
        },
      });
    }
    if (framework === "Framework") {
      return toast.error("Please select the Framework", {
        style: {
          background: "var(--color-primary)",
          color: "white",
        },
      });
    }
    if (feature === "Feature") {
      return toast.error("Please select the Feature", {
        style: {
          background: "var(--color-primary)",
          color: "white",
        },
      });
    }

    mutate();
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return GroqServices(userCode, lang, framework, feature);
    },

    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      setLoading(false);
      setCode(response.code);
      setSummary(response.summary);
      setFixed(response.fixed);
      setSuggestion(response.suggestion);
    },
    onError: (err) => {
      console.log(err);
      setLoading(false);
      toast.error("Some thing went wrong please try again later", {
        style: {
          background: "var(--color-primary)",
          color: "white",
        },
      });
    },
  });

  return (
    <>
      <button
        onClick={() => validation()}
        className={`
      w-full
      max-w-[600px]
        bg-[var(--color-primary)]
        text-[var(--color-primary-foreground)]
        font-semibold
        
        py-3
        rounded-full
        mt-4
        border
        border-[var(--color-border)]
        hover:opacity-80
        active:opacity-100
        ${isPending ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            Analyzing... <Loader2 size={20} className="animate-spin " />
          </span>
        ) : (
          "Start Analyze"
        )}
      </button>
      <Toaster position="top-center" />
    </>
  );
}
