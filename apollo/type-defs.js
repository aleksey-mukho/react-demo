import gql from "graphql-tag";

export const typeDefs = gql`
  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
  }

  type User {
    id: ID!
    name: String
    username: String
    email: String
    phone: String!
    website: String!
    address: Address!
    company: Company!
  }

  type Post {
    userId: ID!
    id: ID!
    title: String!
    body: String!
    user: User!
    comments: [Comment]!
  }

  type Comment {
    postId: ID!
    id: ID!
    name: String
    body: String
    email: String
  }

  type Query {
    user(userId: ID!): User!
    users: [User!]!
    posts: [Post!]!
    post(postId: ID!): Post!
    comments(postId: ID!): [Comment!]!
    postsByUserId(postId: ID!): [Post!]!
  }
`;
