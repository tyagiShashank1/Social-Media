import { useContext } from "react";
import { PostListContext } from "../store/post-list-store.jsx";
import { useRef } from "react";
import { useState } from "react";
export function CreatePost() {
  const { addPost } = useContext(PostListContext);

  const userIdValue = useRef();
  const titleValue = useRef();
  const descValue = useRef();
  const reactionsValue = useRef();
  const tagsValue = useRef();

  return (
    <>
      <form className="create-post">
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            Enter your User Id here
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="userId"
            ref={userIdValue}
            placeholder="Your User Id"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="title"
            ref={titleValue}
            placeholder="How are you feeling today..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Post Content
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            ref={descValue}
            placeholder="Tell us more about it"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Number of reactions
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="reactions"
            ref={reactionsValue}
            placeholder="How many people reacted to this post"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Enter your hastags here{" "}
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="tags"
            ref={tagsValue}
            placeholder="Please enter tags using space"
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            addPost(
              userIdValue.current.value,
              titleValue.current.value,
              descValue.current.value,
              reactionsValue.current.value,
              tagsValue.current.value.split(/\s+/)
            );
            userIdValue.current.value = "";
            titleValue.current.value = "";
            descValue.current.value = "";
            reactionsValue.current.value = "";
            tagsValue.current.value = "";
          }}
        >
          Add Post
        </button>
      </form>
    </>
  );
}
