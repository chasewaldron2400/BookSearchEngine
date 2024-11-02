import { gql } from "@apollo/client"

export const GET_ME = gql`
  query getME {
    getMe {
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
`;