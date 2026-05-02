import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error:', error.message);
    return Promise.reject(error);
  }
);

// API 接口类型
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website?: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// API 方法
export const apiService = {
  // GET 请求
  getUsers: (cancelToken?: CancelTokenSource) => 
    api.get<User[]>('/users', { cancelToken: cancelToken?.token }),
  
  getPosts: (cancelToken?: CancelTokenSource) => 
    api.get<Post[]>('/posts', { cancelToken: cancelToken?.token }),
  
  getComments: (cancelToken?: CancelTokenSource) => 
    api.get<Comment[]>('/comments', { cancelToken: cancelToken?.token }),
  
  getTodos: (cancelToken?: CancelTokenSource) => 
    api.get<Todo[]>('/todos', { cancelToken: cancelToken?.token }),

  // POST 请求
  createUser: (data: Partial<User>) => 
    api.post<User>('/users', data),

  // 带进度的请求
  getUsersWithProgress: (
    onProgress: (progress: number) => void,
    cancelToken?: CancelTokenSource
  ) => 
    api.get<User[]>('/users', {
      cancelToken: cancelToken?.token,
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      },
    }),
};

export default api;
