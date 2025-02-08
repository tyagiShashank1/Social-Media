import { useReducer } from "react";

import { createContext } from "react";

//DECLARING DEFAULT POSTLIST
const DEFAULT_POST_LIST = [];

//JUST A STRUCTURE THAT THESE DATA/FUNCTION WILL BE AVAILABLE FOR ALL THE CHILDREN OF BELOW COMPONENT
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
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
    updatedList = [
      {
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
        reactions: action.payload.reactions,
        userId: action.payload.userId,
        tags: action.payload.tags,
      },

      ...currPostList,
    ];
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

  //add post function
  const addPost = (userId, title, body, reactions, tags) => {
    const actionItem = {
      type: "NEW_ITEM",
      payload: {
        id: Date.now(),
        title: title,
        body: body,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
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

  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, addPosts }}
    >
      {children}
    </PostListContext.Provider>
  );
}
