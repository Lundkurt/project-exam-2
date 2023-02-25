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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Logo />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
