import "./App.css";
import Nav from "./components/Nav.jsx";
import NavUser from "./components/NavUser.jsx";
import Home from "./components/AllPost.jsx";
import Header from "./components/Header.jsx";
import PostPage from "./components/PostPage.jsx";
import Create from "./components/Create.jsx";
import RegLog from "./components/RegLog.jsx";
import RegSign from "./components/RegSign.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { ProtectPage } from "./ProtectedPages/ProtectPage.jsx";
import { ProtectPost } from "./ProtectedPages/ProtectPost.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectProfilePage } from "./ProtectedPages/ProtectProfilePage.jsx";
import Edit from "./components/Edit.jsx"; // Import Edit component

function App() {
  const [user, setUser] = useState(null);
  const [fix, setFix] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const newUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setFix(false);
        return;
      }
      setUser(null);
      setFix(false);
    });
    return () => newUser();
  }, []);

  useEffect(() => {
    // Fetch posts data or any initial data loading if needed
    // Example: setPosts([...]);
  }, []); // Ensure proper dependency array if fetching posts

  if (fix) {
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            className="w-18 h-18 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Header />
              <Home/>
            </>
          }
        />
        <Route
          path="/Home"
          element={
            <>
              <NavUser />
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/Posts"
          element={
            <>
              <NavUser />
              <Home posts={posts} />
            </>
          }
        />
        <Route
          path="/LogIn"
          element={
            <>
              <Nav />
              <RegLog user={user} />
            </>
          }
        />
        <Route
          path="/SignUp"
          element={
            <>
              <Nav />
              <RegSign user={user}/>
            </>
          }
        />
        <Route
          path="/PostPage/:postId"
          element={
            <ProtectPage user={user}>
              <NavUser />
              <PostPage posts={posts} />
            </ProtectPage>
          }
        />
        <Route
          path="/Create"
          element={
            <ProtectPost user={user}>
              <NavUser />
              <Create />
            </ProtectPost>
          }
        />
        <Route
          path="/ProfilePage"
          element={
            <ProtectProfilePage user={user}>
              <NavUser />
              <ProfilePage />
            </ProtectProfilePage>
          }
        />
        {/* Route for Edit component with dynamic postId */}
        <Route
          path="/EditPost/:postId"
          element={
            <ProtectProfilePage user={user}>
              <NavUser />
              <Edit />
            </ProtectProfilePage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
