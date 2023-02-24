import gql from 'graphql-tag';
 // Added mutation.js to client\src\utils\queries.js

export const GET_ME = gql`
    {
        me{
            _id
            username
            email
            bookCount
            savedBooks{
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
