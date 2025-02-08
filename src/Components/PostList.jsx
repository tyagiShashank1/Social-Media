import { Post } from "./Post";
import { useContext } from "react";
import { PostListContext } from "../store/post-list-store.jsx";
import { WelcomeMessage } from "./WelcomeMessage.jsx";
import { Loader } from "./Loader.jsx";
export function PostList() {
  const { postList } = useContext(PostListContext);
  const { loading } = useContext(PostListContext);

  return (
    <>
      {loading && <Loader />}
      {!loading && postList.length === 0 && <WelcomeMessage />}
      {!loading &&
        postList.map((item, index) => {
          return (
            <Post
              key={index}
              id={item.id}
              title={item.title}
              body={item.body}
              tags={item.tags}
              reactions={item.reactions}
            />
          );
        })}
    </>
  );
}
