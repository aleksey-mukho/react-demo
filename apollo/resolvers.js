import { fetchApi } from "./utils";

function users(root, args) {
  return fetchApi("https://jsonplaceholder.typicode.com/users");
}

function user(root, args) {
  return fetchApi(`https://jsonplaceholder.typicode.com/users/${args.userId}`);
}

function posts(root, args) {
  return fetchApi("https://jsonplaceholder.typicode.com/posts").then(posts => {
    posts.length = 25;
    return posts;
  });
}

function post(root, args) {
  return fetchApi(`https://jsonplaceholder.typicode.com/posts/${args.postId}`);
}

function comments(root, args) {
  return fetchApi(
    `https://jsonplaceholder.typicode.com/comments?postId=${args.postId}`
  );
}

export const resolvers = {
  Query: {
    user,
    users,
    posts,
    post,
    comments,
  },
  Post: {
    user(parent) {
      return user({}, { userId: parent.userId });
    },
    comments(parent) {
      return comments({}, { postId: parent.id });
    },
  },
};
