//APP.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Logout from "./components/Logout";
import CreatePost from "./components/post/createPost/CreatePost";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/home/Home";
import UpdateProfile from "./components/postAuthor/UpdateProfile";
import PostDetails from "./components/post/createPost/PostDetails";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/post/create"
              element={<ProtectedRoute element={CreatePost} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={UpdateProfile} />}
            />
            <Route path="/user/logout" element={<Logout />} />
            <Route path="/post/getPostDetails/:id" element={<PostDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
