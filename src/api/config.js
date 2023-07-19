const axios = require("axios");
// const token = process.env.REACT_APP_REDDIT_BEARER_TOKEN;

export const AuthRouter = axios.create({
  baseURL: `https://bookstore.toolsqa.com/Account/v1`,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const BookRouter = axios.create({
  baseURL: `https://bookstore.toolsqa.com/BookStore/v1`,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});



