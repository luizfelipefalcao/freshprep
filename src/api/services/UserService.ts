import { httpClient } from "@/src/api/client/HttpClient";
import { IUser, IUserFollowers, IUserFollowing, TUser } from "@/src/api/types";

export const UserService = {
  getUsers: () => httpClient.get("/users") as Promise<IUser>,
  getUser: (username: string) => httpClient.get(`/users/${username}`) as Promise<TUser>,
  getUserRepos: (username: string) => httpClient.get(`/users/${username}/repos`) as Promise<any>,
  getPaginatedUsers: (page: number) => httpClient.get(`/users?since=${page}&per_page=20`) as Promise<IUser>,
  getUserById: (id: number) => httpClient.get(`/users/${id}`) as Promise<TUser>,
  getUserFollowers: (username: string) => httpClient.get(`/users/${username}/followers`) as Promise<IUserFollowers>,
  getUserFollowing: (username: string) => httpClient.get(`/users/${username}/following`) as Promise<IUserFollowing>,
};
