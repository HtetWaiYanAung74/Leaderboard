import { NO_RESULT_FOUND, SET_SEARCHED_USER, SET_USERS, SORT_BY_NAME, SORT_BY_RANK, User } from '../utils/type/type';

export interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

export interface SetSearchedUserAction {
  type: typeof SET_SEARCHED_USER;
  payload: string;
}

export interface SetNoResultFound {
  type: typeof NO_RESULT_FOUND;
  payload: boolean;
}

export interface SetSortByName {
  type: typeof SORT_BY_NAME;
}

export interface SetSortByRank {
  type: typeof SORT_BY_RANK;
}

export type UserActionTypes =
  SetUsersAction | SetSearchedUserAction | SetNoResultFound |
  SetSortByName | SetSortByRank;

export const setUsers = (users: User[]) => ({
  type: SET_USERS,
  payload: users,
});

export const setSearchedUser = (username: string) => ({
  type: SET_SEARCHED_USER,
  payload: username,
});

export const setNoResultFound = (status: boolean) => ({
  type: NO_RESULT_FOUND,
  payload: status,
});

export const sortByLowestRankedUser = () => ({
  type: SORT_BY_RANK,
});

export const sortByName = () => ({
  type: SORT_BY_NAME,
});