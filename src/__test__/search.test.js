import { setUsers, setSearchedUser, sortByLowestRankedUser, sortByName } from '../stores/actions';
import { userReducer } from '../stores/reducer';
import { getRandomValue, isAlphabeticallyOrdered, isLowestRankByAlphabeticalOrdered } from '../utils/helper';
import { mockUserList, mockUserSliceData } from '../utils/mock';

test('insert user data from json file into redux user slice', () => {
  expect(userReducer({
    users: [],
    searchedUserList: [],
    mostPossibleSearchRes: undefined,
    isNoResultFound: false,
  },
  setUsers(mockUserList)
)).toEqual({
    users: mockUserList,
    searchedUserList: [],
    mostPossibleSearchRes: undefined,
    isNoResultFound: false,
  });
});

test('search with possible real name', () => {
  const username = getRandomValue(['mic', 'alex', 'tony']);
  const userDataStore = userReducer(mockUserSliceData, setSearchedUser(username));
  const isFound = userDataStore.isNoResultFound == false && userDataStore.mostPossibleSearchRes.item.name.toLowerCase().includes(username);
  expect(isFound).toBe(true);
});

test('search with impossible characters', () => {
  const username = getRandomValue(['asdf', 'qwer', 'zxcv']);
  const userDataStore = userReducer(mockUserSliceData, setSearchedUser(username));
  const isNotFound = userDataStore.isNoResultFound == true;
  expect(isNotFound).toBe(true);
});

test('search result found but not in first place', () => {
  const username = 'Jayne';
  const userDataStore = userReducer(mockUserSliceData, setSearchedUser(username));
  const isNotInFirstPlace = userDataStore.mostPossibleSearchRes.item.uid != userDataStore.searchedUserList[0].item.uid;
  const isIncludeInTop10 = userDataStore.searchedUserList.findIndex(user => user.item.uid == userDataStore.mostPossibleSearchRes.item.uid) < 10;
  expect(isIncludeInTop10 && isNotInFirstPlace).toBe(true);
});

test('user found but rank is too low, so only show in no. 10', () => {
  const username = 'Chip';
  const userDataStore = userReducer(mockUserSliceData, setSearchedUser(username));
  const isNotInFirstPlace = userDataStore.mostPossibleSearchRes.item.uid != userDataStore.searchedUserList[0].item.uid;
  const isInLastPlace = userDataStore.mostPossibleSearchRes.item.uid == userDataStore.searchedUserList[9].item.uid;
  const isRankOutOfTop10 = userDataStore.searchedUserList[9].item.rank > 10;
  expect(isNotInFirstPlace && isInLastPlace && isRankOutOfTop10).toBe(true);
});

test('sort user list by name', () => {
  const username = 'Chip';
  const userDataStore = userReducer(mockUserSliceData, setSearchedUser(username));
  const sortedDataStore = userReducer(userDataStore, sortByName());
  const isAlphabetical = isAlphabeticallyOrdered(sortedDataStore.searchedUserList);
  expect(isAlphabetical).toBe(true);
});

test('sort user list by lowest rank and alphabetical order', () => {
  const username = 'Chip';
  const userDataStore = userReducer(mockUserSliceData, setSearchedUser(username));
  const sortedDataStore = userReducer(userDataStore, sortByLowestRankedUser());
  const isLowestAndAlphabetical = isLowestRankByAlphabeticalOrdered(sortedDataStore.searchedUserList);
  expect(isLowestAndAlphabetical).toBe(true);
});