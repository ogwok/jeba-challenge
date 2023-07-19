import { AuthRouter, BookRouter } from "./config";

const api = {
  createUser: (username, password) => AuthRouter.post('/User', { userName: username, password: password }),
  login: (username, password) => AuthRouter.post('/Authorized', {userName : username, password: password}),
  getBooks: () => BookRouter.get('/Books'),
  getBook: (isbn) => BookRouter.get(`/Book?ISBN=${isbn}`),
};

export default api;