import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { User, Post, Comment, Todo } from '../services/api';

// 数据列表类型
export type DataItem = {
  title: string;
  subtitle: string;
  detail: string;
};

// 请求状态类型
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

// 状态 atoms
export const loadingAtom = atom<boolean>(false);
export const statusTextAtom = atom<string>('等待请求...');
export const statusColorAtom = atom<string>('#666666');
export const progressTextAtom = atom<string>('');
export const dataListAtom = atom<DataItem[]>([]);

// 用户输入 atoms
export const nameInputAtom = atom<string>('');
export const emailInputAtom = atom<string>('');

// 请求历史（使用 localStorage 持久化）
export const requestHistoryAtom = atomWithStorage<string[]>('request-history', []);

// 派生 atom：数据数量
export const dataCountAtom = atom((get) => get(dataListAtom).length);

// 派生 atom：是否可以发送 POST 请求
export const canSubmitAtom = atom((get) => {
  const name = get(nameInputAtom);
  const email = get(emailInputAtom);
  return name.length > 0 && email.length > 0;
});

// 工具函数：转换数据为 DataItem
export const convertUsersToDataItems = (users: User[]): DataItem[] => {
  return users.slice(0, 20).map((user) => ({
    title: user.name,
    subtitle: user.email,
    detail: user.phone,
  }));
};

export const convertPostsToDataItems = (posts: Post[]): DataItem[] => {
  return posts.slice(0, 20).map((post) => ({
    title: post.title,
    subtitle: post.body.substring(0, 100),
    detail: `User ID: ${post.userId}`,
  }));
};

export const convertCommentsToDataItems = (comments: Comment[]): DataItem[] => {
  return comments.slice(0, 20).map((comment) => ({
    title: comment.name,
    subtitle: comment.body.substring(0, 100),
    detail: comment.email,
  }));
};

export const convertTodosToDataItems = (todos: Todo[]): DataItem[] => {
  return todos.slice(0, 20).map((todo) => ({
    title: todo.title,
    subtitle: todo.completed ? '✅ 已完成' : '⏳ 未完成',
    detail: `User ID: ${todo.userId}`,
  }));
};
