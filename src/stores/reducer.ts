import { FuseResult } from 'fuse.js';
import { UserActionTypes } from './actions';
import { startFuzzySearch } from '../utils/helper';
import { NO_RESULT_FOUND, SET_SEARCHED_USER, SET_USERS, SORT_BY_NAME, SORT_BY_RANK, User, UserState } from '../utils/type/type';

const initialState: UserState = {
  users: [],
  searchedUserList: [],
  mostPossibleSearchRes: undefined,
  isNoResultFound: false,
};

export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_SEARCHED_USER:
      const fuzzyRes = startFuzzySearch(state.users, action.payload);
      const nearestUser = fuzzyRes[0];
      let top10UserRes: FuseResult<User>[] = [];
      let isNoResultFound = false;
      if (fuzzyRes[0]?.score && fuzzyRes[0]?.score < 0.35) {
        const sortedUsers: FuseResult<User>[] = fuzzyRes.sort((a, b) => b.item.bananas - a.item.bananas).map((user, idx) => ({...user, item: {...user.item, rank: idx + 1}}));
        
        const rankIdxOfNearestUser = sortedUsers.findIndex(user => user.item.uid == nearestUser?.item.uid);
        
        if (rankIdxOfNearestUser > 9) {
          sortedUsers[9] = {...nearestUser, item: {...nearestUser.item, rank: rankIdxOfNearestUser + 1}};
        }
        top10UserRes = sortedUsers.slice(0, 10);
      } else {
        isNoResultFound = true;
      }
      return {
        ...state,
        searchedUserList: [...top10UserRes],
        mostPossibleSearchRes: nearestUser,
        isNoResultFound,
      };
    case SORT_BY_NAME:
      const sortedByName = state.searchedUserList?.sort((a, b) => a.item.name.localeCompare(b.item.name));
      if (sortedByName) {
        return {
          ...state,
          searchedUserList: [...sortedByName],
        }
      }
      return {...state};
    case SORT_BY_RANK:
      const sortedByLowest = state.searchedUserList?.sort((a, b) => {
        if (a.item.bananas === b.item.bananas) {
          return a.item.name.localeCompare(b.item.name);
        }
        return a.item.bananas - b.item.bananas;
      });
      if (sortedByLowest) {
        return {
          ...state,
          searchedUserList: [...sortedByLowest],
        }
      }
      return {...state};
    case NO_RESULT_FOUND:
      return {
        ...state,
        isNoResultFound: action.payload,
      };
    default:
      return state;
  }
}