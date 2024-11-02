import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          title
          description
          image
          link
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
      }
    }
  }
`;

export const SAVE_USER = gql`
  mutation saveUser($username: String!, $password: String!) {
    saveUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          title
          description
          image
          link
        }
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookID: String, $title: String) {
    removeBook(bookID: $bookID, title: $title) {
      book {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
