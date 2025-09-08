import { UserService } from "@/src/api/services/UserService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function usePaginatedUsers() {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await UserService.getPaginatedUsers(pageParam);
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.length === 0) return undefined;
      return lastPage?.data[lastPage?.data?.length - 1]?.id;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    networkMode: "online",
  });
}

export function useUserById(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await UserService.getUserById(id);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    networkMode: "online",
  });
}
