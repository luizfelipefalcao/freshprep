import { RootState } from "@/src/store";
import { useSelector } from "react-redux";
import { TUser } from "../api/types";
import { useUsers } from "./useUsers";

export const useFavouriteUsers = () => {
  const { data: allUsers, isLoading, error, refetch } = useUsers();
  const favouriteIds = useSelector((state: RootState) => state.favourites.favouriteId);

  const favouriteUsers = allUsers?.data?.filter((user: TUser) => favouriteIds.includes(`${user.id}-${user.login}`)) || [];

  return {
    data: favouriteUsers,
    isLoading,
    error,
    favouriteIds,
    refetch,
  };
};
