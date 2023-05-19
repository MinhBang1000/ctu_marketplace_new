import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import "./App.css";
import "./assets/css/all.min.css";
import "./assets/css/owl.carousel.min.css";
// import Footer from "./components/Footer";
// import UserNavbar from "./components/Navbar/UserNavbar";
import Router from "./components/Router/Router";
// import AdminSidebar from "./components/Sidebar/AdminSidebar";
import Loading from "./pages/Loading";
import { logout } from "./store/authSlice";
import projectService from "./services/project.service";
import NFooter from "./components/NFooter";
import NNavbar from "./components/NNavbar";

const expiredTimeLocalStorage = localStorage.getItem("expiredTime");
const expiredTime = JSON.parse(expiredTimeLocalStorage);

const App = () => {
  const isLoadingSelector = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const now = new Date();
    if (expiredTime && now.getTime() > expiredTime) {
      dispatch(logout(history));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComercialProject = async () => {
    try {
      const res = await projectService.getAll();
    } catch (error) {
    }
  }
  getComercialProject();

  const renderUserLayout = () => {
    return (
      <>
        <header className="sticky-top">
          {/* <UserNavbar /> */}
          <NNavbar />
        </header>
        <div className="main-content">
          <Router />
        </div>
        <footer className="mk-footer">
          <NFooter />
        </footer>
      </>
    );
  };

  // const renderResearchLayout = () => {
  //   return (
  //     <div>
  //       <header className="sticky-top">
  //         {/* <UserNavbar /> */}
  //         <NNavbar />
  //       </header>
  //       <div className="main-content">
  //         <Router />
  //       </div>
  //       <footer className="mk-footer">
  //         <NFooter />
  //       </footer>
  //     </div>
  //   );
  // };

  // const renderAdminLayout = () => {
  //   return (
  //     <div style={{ minWidth: "1366px" }}>
  //       <header className="sticky-top">
  //         {/* <UserNavbar /> */}
  //         <NNavbar />
  //       </header>
  //       <div className="main-content">
  //         <div className="container-fluid">
  //           <div className="row">
  //             <div className="col">
  //               <div className="row">
  //                 <div
  //                   className="col-3"
  //                   style={{ paddingLeft: "0", width: "300px" }}
  //                 >
  //                   <AdminSidebar />
  //                 </div>
  //                 <div className="col-9">
  //                   <Router />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <footer className="mk-footer">
  //         <NFooter />
  //       </footer>
  //     </div>
  //   );
  // };

  const renderApp = () => {
    // if (window.location.pathname.startsWith("/admin")) {
    //   return renderAdminLayout();
    // }
    // if (window.location.pathname.startsWith(ROUTE_PREFIX_NNC)) {
    //   return renderResearchLayout();
    // }
    return renderUserLayout();
  };

  return <>{isLoadingSelector ? <Loading /> : renderApp()}</>;
};

export default withRouter(App);
