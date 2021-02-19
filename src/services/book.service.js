import config from "../config/config";
import { handleResponse } from "../helpers/HandleResponse";

const requestOptions = {
  method: "GET",
};

const searchBooks = (query, pageNumber) => {
  return fetch(
    `${config.apiUrl}/search.json?q=${query}${pageNumber}`,
    requestOptions
  ).then(handleResponse);
};

const bookDetails = (search) => {
  return fetch(`${config.apiUrl}/isbn/${search}.json`, requestOptions).then(
    handleResponse
  );
};

const getAuthor = (authorId) => {
  return fetch(`${config.apiUrl}${authorId}.json`, requestOptions).then(
    handleResponse
  );
};

export const bookService = {
  searchBooks,
  bookDetails,
  getAuthor,
};
