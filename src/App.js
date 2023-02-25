import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Styleguide from "./pages/styleguide/Styleguide";
import Navigation from "./components/Navigation";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/AuthProvider";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
import Logo from "./components/Logo";
import Edit from "./pages/edit/Edit";
import ProtectedRoutes from "./context/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Logo />
        <Navigation />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
