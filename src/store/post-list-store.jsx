import { useReducer } from "react";

import { createContext } from "react";

//DECLARING DEFAULT POSTLIST
const DEFAULT_POST_LIST = [
  {
    id: 1,
    postTitle: "Going to Mumbai",
    postPara:
      "Hi Friends, Ia m going to Mumbai for my vacation. Hope to enjoy a lot. Peace out",
    reactions: 2,
    userId: "user-9",
    tags: ["Vacation", "Mumbai", "Enjoying"],
  },
  {
    id: 2,
    postTitle: "Going to Rajasthan",
    postPara:
      "Hi Friends, Ia m going to Rajasthan for my vacation. Hope to enjoy a lot. Peace out",
    reactions: 12,
    userId: "user-12",
    tags: ["Vacation", "Rajasthan", "Enjoying"],
  },
];

//JUST A STRUCTURE THAT THESE DATA/FUNCTION WILL BE AVAILABLE FOR ALL THE CHILDREN OF BELOW COMPONENT
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

//reducer function definition outside component
const postListReducer = (currPostList, action) => {
  let updatedList = currPostList;
  if (action.type === "NEW_ITEM") {
    updatedList = [
      {
        id: action.payload.id,
        postTitle: action.payload.title,
        postPara: action.payload.desc,
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
  const addPost = (userId, title, desc, reactions, tags) => {
    const actionItem = {
      type: "NEW_ITEM",
      payload: {
        id: Date.now(),
        title: title,
        desc: desc,
        reactions: reactions,
        userId: userId,
        tags: tags,
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
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
}
