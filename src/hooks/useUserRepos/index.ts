import { UserService } from "@/src/api/services/UserService";
import { IUserRepos } from "@/src/api/types";
import { useQuery } from "@tanstack/react-query";

export const useUserRepos = (username: string): IUserRepos => {
  const {
    data: reposData,
    isLoading: isLoadingUserRepos,
    error,
    refetch: refetchUserRepos,
  } = useQuery({
    queryKey: ["userRepos", username],
    queryFn: () => UserService.getUserRepos(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return {
    data: reposData?.data || [],
    isLoading: isLoadingUserRepos,
    error,
    refetch: refetchUserRepos,
  };
};
