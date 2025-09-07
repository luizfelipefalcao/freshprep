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
