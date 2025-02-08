import { useReducer, useState, useEffect } from "react";

import { createContext } from "react";

//DECLARING DEFAULT POSTLIST
const DEFAULT_POST_LIST = [];

//JUST A STRUCTURE THAT THESE DATA/FUNCTION WILL BE AVAILABLE FOR ALL THE CHILDREN OF BELOW COMPONENT
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  loading: false,
});

//reducer function definition outside component
const postListReducer = (currPostList, action) => {
  let updatedList = currPostList;
  if (action.type === "BULK_ADD") {
    let newList = action.payload.data.map(({ reactions, ...rest }) => ({
      ...rest,
      reactions: reactions.likes,
    }));
    updatedList = [...currPostList, ...newList];
  } else if (action.type === "NEW_ITEM") {
    updatedList = [action.payload, ...currPostList];
  } else if (action.type === "DELETE_ITEM") {
    updatedList = currPostList.filter((item) => item.id !== action.payload.id);
  }
  return updatedList;
};
//-------------------------------------------------------------------------------------------------------------------
//REACT COMPONENT
export function PostListProvider({ children }) {
  //useReducer Hook for PostList
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const [loading, setLoading] = useState(false);

  //add post function
  const addPost = (post) => {
    const actionItem = {
      type: "NEW_ITEM",
      payload: post,
    };
    dispatchPostList(actionItem);
  };

  //add intital posts in bulk function
  const addPosts = (data) => {
    const actionItem = {
      type: "BULK_ADD",
      payload: {
        data: data,
      },
    };
    dispatchPostList(actionItem);
  };

  //delete post fucntion
  const deletePost = (id) => {
    const actionItem = {
      type: "DELETE_ITEM",
      payload: { id: id },
    };
    dispatchPostList(actionItem);
  };

  //USE EFFECT
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
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, loading }}
    >
      {children}
    </PostListContext.Provider>
  );
}
