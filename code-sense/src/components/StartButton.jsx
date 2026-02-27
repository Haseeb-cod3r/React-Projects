import { appContext } from "@/contexts/AppContext";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { GeminiService } from "@/services/geminiService";

export default function StartButton() {
  const {
    lang,
    framework,
    feature,
    userCode,
    setCorrectedCode,
    setFeedback,
    setLoading,
    setStatus,
    setMessage,
  } = useContext(appContext);

  function validation() {
    if (!userCode.trim()) {
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
    mutationFn: () => GeminiService(userCode, lang, framework, feature),
    onMutate: () => {
      setLoading(true);
      setFeedback(null);
      setStatus("");
      setMessage("");
      setCorrectedCode("");
    },

    onSuccess: (response) => {
      setLoading(false);

      console.log(response);
      setStatus(response.status);

      if (response.status === "mismatch") {
        setMessage(response.message);
        return;
      }

      if (response.status === "success") {
        setCorrectedCode(response.correctedCode || "");
        setFeedback(response.feedback || null);
      }

      if (response.error) {
        toast.error("Something went wrong please try again later", {
          style: {
            background: "var(--color-primary)",
            color: "white",
          },
        });
      }
    },

    onError: (error) => {
      console.error(error);
      if (error.message.includes("quota") || error.message.includes("429")) {
        toast.error(
          "AI analysis limit has been reached please check back shortly.",
          {
            style: {
              background: "var(--color-primary)",
              color: "white",
            },
          },
        );
      } else {
        toast.error("Something went wrong. Please try again.", {
          style: {
            background: "var(--color-primary)",
            color: "white",
          },
        });
      }
      setLoading(false);
    },
  });

  return (
    <>
      <button
        onClick={validation}
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
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            Analyzing...
            <Loader2 size={20} className="animate-spin" />
          </span>
        ) : (
          "Analyze Code"
        )}
      </button>

      <Toaster position="top-center" />
    </>
  );
}
