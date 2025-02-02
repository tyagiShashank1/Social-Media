import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Sidebar } from "./Components/Sidebar";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { CreatePost } from "./Components/CreatePost";
import { PostList } from "./Components/PostList";
import { useState } from "react";
import { PostListProvider } from "./store/post-list-store";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="content">
          <Header />
          {selectedTab === "Home" && <PostList />}
          {selectedTab === "CreatePost" && <CreatePost />}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
