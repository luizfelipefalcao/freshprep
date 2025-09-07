import { httpClient } from "@/src/api/client/HttpClient";
import { IUser, TUser } from "@/src/api/types";

export const UserService = {
  getUsers: () => httpClient.get("/users") as Promise<IUser>,
  getUser: (username: string) => httpClient.get(`/users/${username}`) as Promise<TUser>,
  getUserRepos: (username: string) => httpClient.get(`/users/${username}/repos`) as Promise<any>,
};
