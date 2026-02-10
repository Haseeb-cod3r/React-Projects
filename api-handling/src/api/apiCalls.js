import toast from "react-hot-toast";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "./axiosConfig";

export function useFetchData(setProgress, startSmoothProgress) {
  return useInfiniteQuery({
    queryKey: ["users"],

    queryFn: async ({ pageParam = 1 }) => {
      const timer = startSmoothProgress();
      try {
        const res = await axiosInstance.get("user", {
          onDownloadProgress: async (e) => {
            if (e.total) {
              const prog = Math.round((e.loaded * 100) / e.total);
              setTimeout(() => {
                clearInterval(timer);
              }, 2000);
              setProgress(prog);
            }
          },
          params: {
            page: pageParam,
            limit: 15,
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 600));

        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 15) return undefined;
      return allPages.length + 1;
    },
  });
}
export function useAddData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ form }) => axiosInstance.post("user", form),

    onMutate: async ({ form }) => {
      await queryClient.cancelQueries(["users"]);
      const prev = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => [...page, { ...form, id: null }]),
        };
      });
      return prev;
    },
    onSuccess: (_, variables) => {
      toast.success("User added successfully ✅");
      variables.setForm({
        name: "",
        email: "",
        Role: "",
      });
      variables.setIsOpen(false);
    },

    onError: (err, variables, context) => {
      toast.error("Failed to add user ❌");
      console.log("edit failed:", err);
      variables.setIsOpen(false);
      variables.setForm({
        name: "",
        email: "",
        Role: "",
      });
      queryClient.setQueryData(["users"], context.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"], {
        refetchType: "inactive",
      });
    },
  });
}
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => axiosInstance.delete(`user/${id}`),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(["users"]);
      const prev = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (old) => {
        console.log(old);
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => page.filter((user) => user.id !== id)),
        };
      });
      return prev;
    },
    onSuccess: () => {
      toast.success("User deleted successfully 🗑️");
    },
    onError: (err, _, context) => {
      toast.error("Delete failed ❌");
      console.log("Delete failed:", err);
      queryClient.setQueryData(["users"], context.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"], {
        refetchType: "inactive",
      });
    },
  });
}
export function useEditData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, form }) => axiosInstance.put(`user/${id}`, form),

    onMutate: async ({ form, id }) => {
      await queryClient.cancelQueries(["users"]);
      const prev = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) =>
            page.map((user) => (user.id === id ? { ...form, id: id } : user)),
          ),
        };
      });
      return prev;
    },

    onSuccess: (_, variables) => {
      toast.success("User updated successfully ✏️");
      variables.setForm({
        name: "",
        email: "",
        Role: "",
      });
      variables.setIsOpen(false);
      variables.setIsEditMode({
        mode: false,
        id: null,
      });
    },

    onError: (err, variables, context) => {
      toast.error("Update failed ❌");
      console.log("edit failed:", err);
      variables.setIsOpen(false);
      variables.setForm({
        name: "",
        email: "",
        Role: "",
      });
      variables.setIsEditMode({
        mode: false,
        id: null,
      });
      queryClient.setQueryData(["users"], context.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"], {
        refetchType: "inactive",
      });
    },
  });
}
