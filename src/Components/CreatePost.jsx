import { useContext } from "react";
import { PostListContext } from "../store/post-list-store.jsx";
import { useRef } from "react";
export function CreatePost() {
  const { addPost } = useContext(PostListContext);

  const userIdValue = useRef();
  const titleValue = useRef();
  const descValue = useRef();
  const reactionsValue = useRef();
  const tagsValue = useRef();

  return (
    <>
      <form className="create-post card p-4 shadow-lg">
        <h2 className="text-center text-success">Create a New Post</h2>

        <div className="mb-3">
          <label htmlFor="userId" className="form-label fw-bold">
            Enter your User Id
          </label>
          <input
            required
            type="text"
            className="form-control form-control-lg"
            id="userId"
            ref={userIdValue}
            placeholder="Your User Id"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            required
            type="text"
            className="form-control form-control-lg"
            id="title"
            ref={titleValue}
            placeholder="How are you feeling today..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Post Content
          </label>
          <textarea
            required
            className="form-control form-control-lg"
            id="description"
            ref={descValue}
            placeholder="Tell us more about it..."
            rows="4"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="reactions" className="form-label fw-bold">
            Number of Reactions
          </label>
          <input
            required
            type="number"
            className="form-control form-control-lg"
            id="reactions"
            ref={reactionsValue}
            placeholder="How many people reacted to this post"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label fw-bold">
            Enter Hashtags
          </label>
          <input
            required
            type="text"
            className="form-control form-control-lg"
            id="tags"
            ref={tagsValue}
            placeholder="Enter tags separated by spaces"
          />
        </div>

        <button
          type="button"
          className="btn btn-lg btn-primary w-100"
          onClick={() => {
            ////////////////////////////////////////////////////////////////////////////////
            fetch("https://dummyjson.com/posts/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: titleValue.current.value,
                body: descValue.current.value,
                reactions: reactionsValue.current.value,
                userId: userIdValue.current.value,
                tags: tagsValue.current.value.split(/\s+/),
              }),
            })
              .then((res) => res.json())
              .then((data) => addPost(data));
            ///////////////////////////////////////////////////////////////////////////////////////////

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
