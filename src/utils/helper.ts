import Fuse, { FuseResult } from 'fuse.js';
import { User } from './type/type';

export const startFuzzySearch = (userList: User[], username: string) => {
  const fuse = new Fuse(userList, {
    includeScore: true,
    keys: ['name'],
    threshold: 0.7,
  });
  return fuse.search(username);
}

export const getRandomValue = (arr: []) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const isAlphabeticallyOrdered = (arr: FuseResult<User>[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].item.name.localeCompare(arr[i + 1].item.name) > 0) {
      return false;
    }
  }
  return true;
}

export const isLowestRankByAlphabeticalOrdered = (arr: FuseResult<User>[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].item.bananas > arr[i + 1].item.bananas) {
      return false;
    } else if (arr[i].item.bananas === arr[i + 1].item.bananas) {
      if (arr[i].item.name.localeCompare(arr[i + 1].item.name) > 0) {
        return false;
      }
    }
  }
  return true;
}