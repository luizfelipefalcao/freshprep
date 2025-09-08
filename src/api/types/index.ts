type TUser = {
  login?: string;
  id: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  user_view_type?: string;
  site_admin: boolean;
};

interface IUser {
  data: TUser[];
}

interface IFavouriteUsers {
  data: TUser[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

interface IUserRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  size: number;
  open_issues_count: number;
  archived: boolean;
  fork: boolean;
}

interface IUserRepos {
  data: IUserRepo[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

interface IUserFollowing {
  data: TUser[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

interface IUserFollowers {
  data: TUser[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export type { IFavouriteUsers, IUser, IUserFollowers, IUserFollowing, IUserRepo, IUserRepos, TUser };
