import { Post } from "./Post";
import { useContext, useEffect, useState } from "react";
import { PostListContext } from "../store/post-list-store.jsx";
import { WelcomeMessage } from "./WelcomeMessage.jsx";
import { Loader } from "./Loader.jsx";
export function PostList() {
  const { postList } = useContext(PostListContext);
  const { addPosts } = useContext(PostListContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addPosts(data.posts);
        setLoading(false);
      });
    return function () {
      console.log("Going");
      if (!signal.aborted) {
        controller.abort(); // Only abort if the request is still pending
      }
    };
  }, []);

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
