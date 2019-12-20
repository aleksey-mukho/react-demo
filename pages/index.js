import React from "react";
import { withApollo } from "../apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { css } from "linaria";
import { useQuery } from "@apollo/react-hooks";

const ViewerQuery = gql`
  query ViewerQuery {
    posts {
      id
      body
      title
      user {
        username
      }
      comments {
        body
        name
      }
    }
  }
`;

const table = css`
  display: block;
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 1em;
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;

  td {
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
    text-align: center;
  }

  th[scope="row"] {
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
  }

  caption {
    width: 100%;
  }
`;

const colIdsStyle = css`
  width: 30px;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
`;

const colStyle = css`
  padding: 0.75rem;
  vertical-align: top;
  width: calc(33vw - 30px);
  border-top: 1px solid #dee2e6;
`;

const quoteStyle = css`
  border-left: 3px solid #00cc8f;
  color: #1a1a1a;
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 1em;
  font-style: italic;
  line-height: 1.2em;
  margin: 1.1em 0;
  padding: 1em 2em;
  position: relative;
  transition: 0.2s border ease-in-out;
  z-index: 0;
`;

const cellStyle = css`
  color: #1a1a1a;
  font-size: 1.2em;
  line-height: 1.2em;
  vertical-align: middle;
`;

const renderCells = ({ posts }) =>
  posts.map(post => (
    <tr key={post.title}>
      <th scope="row">{post.id}</th>
      <td className={cellStyle}>{post.title}</td>
      <td className={cellStyle}>{post.body}</td>
      <td className={cellStyle}>{post.user.username}</td>
      <td>
        {post.comments.map(comment => (
          <blockquote className={quoteStyle} key={comment.name}>
            {comment.body}
          </blockquote>
        ))}
      </td>
    </tr>
  ));

const Index = () => {
  const {
    data: { posts },
  } = useQuery(ViewerQuery);

  if (posts) {
    return (
      <table className={table}>
        <caption>List of users</caption>
        <thead>
          <tr>
            <th scope="col" className={colIdsStyle}>
              #
            </th>
            <th scope="col" className={colStyle}>
              Post Title
            </th>
            <th scope="col" className={colStyle}>
              Post Body
            </th>
            <th scope="col" className={colStyle}>
              Username
            </th>
            <th scope="col" className={colStyle}>
              Comments
            </th>
          </tr>
        </thead>
        <tbody>{renderCells({ posts })}</tbody>
      </table>
    );
  }

  return null;
};

export default withApollo(Index);
