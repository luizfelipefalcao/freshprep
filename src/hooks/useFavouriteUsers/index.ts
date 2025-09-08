import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { UserService } from "@/src/api/services/UserService";
import { TUser } from "@/src/api/types";
import { RootState } from "@/src/store";
import { usePaginatedUsers } from "../usePaginatedUsers";

interface UseFavouriteUsersReturn {
  data: TUser[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useFavouriteUsers = (): UseFavouriteUsersReturn => {
  const queryClient = useQueryClient();
  const { data: paginatedData, isLoading: isPaginatedLoading, error: paginatedError } = usePaginatedUsers();
  const favouriteIds = useSelector((state: RootState) => state.favourites.favouriteId);

  const queryKey = useMemo(() => {
    const sortedIds = [...favouriteIds].sort();
    return ["favourites", sortedIds.join(",")];
  }, [favouriteIds]);

  const {
    data: favouriteUsers,
    isLoading: isFavouritesLoading,
    error: favouritesError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (favouriteIds.length === 0) return [];

      const allCachedUsers = paginatedData?.pages?.flatMap((page) => page.data) || [];
      const cachedFavourites = allCachedUsers.filter(({ id, login }: TUser) => favouriteIds.includes(`${id}-${login}`));

      const missingIds = favouriteIds.filter((favouriteId) => {
        const [id, login] = favouriteId.split("-");
        return !allCachedUsers.some((user) => user.id.toString() === id && user.login === login);
      });

      const missingUsers = await Promise.all(
        missingIds.map(async (favouriteId) => {
          const [id] = favouriteId.split("-");
          return queryClient.fetchQuery({
            queryKey: ["user", parseInt(id)],
            queryFn: () => UserService.getUserById(parseInt(id)),
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
          });
        })
      );

      return [...cachedFavourites, ...missingUsers];
    },
    enabled: favouriteIds.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return {
    data: favouriteUsers || [],
    isLoading: isPaginatedLoading || isFavouritesLoading,
    error: paginatedError || favouritesError,
    refetch,
  };
};
