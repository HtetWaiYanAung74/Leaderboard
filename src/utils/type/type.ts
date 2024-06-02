import { FuseResult } from 'fuse.js';

export const NO_RESULT_FOUND = 'NO_RESULT_FOUND';
export const SET_SEARCHED_USER = 'SET_SEARCHED_USER';
export const SET_USERS = 'SET_USERS';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_RANK = 'SORT_BY_RANK';

export type User = {
  uid: string;
  name: string;
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  stars: number;
  subscribed: boolean;
  rank?: number;
}

export type UserInfoList = {
  [key: string]: User;
}

export interface UserState {
  users: User[];
  searchedUserList: FuseResult<User>[] | undefined;
  mostPossibleSearchRes: FuseResult<User> | undefined;
  isNoResultFound: boolean;
}