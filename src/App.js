import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Styleguide from "./components/styleguide/Styleguide";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { AuthProvider } from "./context/AuthProvider";
import Profile from "./components/profile/Profile";
import Search from "./components/search/Search";
import Post from "./components/post/Post";
import Edit from "./components/edit/Edit";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/styleguide" element={<Styleguide />} />
              <Route path="/profile/:name" element={<Profile />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
