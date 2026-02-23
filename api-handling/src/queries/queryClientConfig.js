import { QueryClient } from "@tanstack/react-query";

 const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect:true,
      retry: 1,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 5,
      placeholderData:(prev)=>prev
    },
  },
});
export default queryClient