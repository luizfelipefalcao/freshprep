import { UserService } from "@/src/api/services/UserService";
import { IUserFollowers } from "@/src/api/types";
import { useQuery } from "@tanstack/react-query";

export const useUserFollowers = (username: string): IUserFollowers => {
  const {
    data: followersData,
    isLoading: isLoadingUserFollowers,
    error,
    refetch: refetchUserFollowers,
  } = useQuery({
    queryKey: ["userFollowers", username],
    queryFn: () => UserService.getUserFollowers(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return {
    data: followersData?.data || [],
    isLoading: isLoadingUserFollowers,
    error,
    refetch: refetchUserFollowers,
  };
};
