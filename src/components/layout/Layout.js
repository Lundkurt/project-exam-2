import React from "react";
import { useLocation } from "react-router-dom";
import ProfileSidebar from "../profile/ProfileSidebar";
import Logo from "./Logo";
import Navigation from "./Navigation";

const sidebarRoutes = ["/home", "/search", "/post", "edit"];

function Layout({ children }) {
  const location = useLocation();

  const showSidebar = sidebarRoutes.includes(location.pathname);

  return (
    <>
      {showSidebar ? (
        <div>
          <div className="d-block d-xl-none">
            <Logo />
          </div>
          <div className="flex-row">
            <div className="d-none d-xl-block">
              <div className="d-xl-flex">
                <Logo />
                <Navigation />
              </div>
              <ProfileSidebar />
            </div>
            <div className="d-block d-xl-none">
              <Navigation />
            </div>
            <div className="layout-children">{children}</div>
            <div className="container-placeholder d-none d-xl-block">
              <div className="container-placeholder-content">
                <h4 className="padding">For future content</h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-xl-flex">
            <Logo />
            <Navigation />
          </div>

          <div>{children}</div>
        </div>
      )}
    </>
  );
}

export default Layout;
