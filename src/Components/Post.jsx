import { useContext } from "react";
import { PostListContext } from "../store/post-list-store.jsx";
import { MdDeleteSweep } from "react-icons/md";
export function Post({ id, title, body, tags, reactions }) {
  const { deletePost } = useContext(PostListContext);
  return (
    <>
      <div className="card post-card" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {title}
            <span
              className=" btn position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              onClick={() => {
                deletePost(id);
              }}
            >
              <MdDeleteSweep />
              <span className="visually-hidden">unread messages</span>
            </span>
          </h5>
          <p className="card-text">{body}</p>
          {tags.map((item, index) => {
            return (
              <span key={index} className="badge text-bg-primary hastag">
                {item}
              </span>
            );
          })}
          <div className="alert alert-success reactions" role="alert">
            This post has been reacted by {reactions} people.
          </div>
        </div>
      </div>
    </>
  );
}
