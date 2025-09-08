import { UserService } from "@/src/api/services/UserService";
import { IUserFollowing } from "@/src/api/types";
import { useQuery } from "@tanstack/react-query";

export const useUserFollowing = (username: string): IUserFollowing => {
  const {
    data: followingData,
    isLoading: isLoadingUserFollowing,
    error,
    refetch: refetchUserFollowing,
  } = useQuery({
    queryKey: ["userFollowing", username],
    queryFn: () => UserService.getUserFollowing(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return {
    data: followingData?.data || [],
    isLoading: isLoadingUserFollowing,
    error,
    refetch: refetchUserFollowing,
  };
};
