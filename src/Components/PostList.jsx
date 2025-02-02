import { Post } from "./Post";
import { useContext } from "react";
import { PostListContext } from "../store/post-list-store.jsx";
export function PostList() {
  const { postList } = useContext(PostListContext);
  return (
    <>
      {postList.map((item, index) => {
        return (
          <Post
            key={index}
            id={item.id}
            title={item.postTitle}
            desc={item.postPara}
            tags={item.tags}
            reactions={item.reactions}
          />
        );
      })}
    </>
  );
}
