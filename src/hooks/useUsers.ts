import { UserService } from "@/src/api/services/UserService";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getUsers(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserRepos = (username: string) => {
  return useQuery({
    queryKey: ["userRepos", username],
    queryFn: () => UserService.getUserRepos(username),
    staleTime: 1000 * 60 * 5,
  });
};

// Leave this shere for reference

// export const useUsers = () => {
//   return useQuery({
//     queryKey: ["users"],
//     queryFn: () => UserService.getUsers(),
//     staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh
//     gcTime: 10 * 60 * 1000, // 10 minutes - cache lifetime
//     // Enable background refetching
//     refetchInterval: false, // Disable automatic polling
//     // Refetch when data becomes stale
//     refetchOnMount: 'stale', // Only refetch if data is stale
//     refetchOnWindowFocus: true,
//     // Network mode: prefer cache, fallback to network
//     networkMode: 'online',
//   });
// };

// // Hook for manual refresh with stale check
// export const useUsersRefresh = () => {
//   const queryClient = useQueryClient();

//   const refreshUsers = async () => {
//     const queryState = queryClient.getQueryState(['users']);

//     // Only refresh if data is stale or doesn't exist
//     if (!queryState || queryState.isStale) {
//       await queryClient.invalidateQueries({ queryKey: ['users'] });
//     }

//     // Force refetch regardless of stale state (if you want to override)
//     // await queryClient.refetchQueries({ queryKey: ['users'] });
//   };

//   return { refreshUsers };
// };
