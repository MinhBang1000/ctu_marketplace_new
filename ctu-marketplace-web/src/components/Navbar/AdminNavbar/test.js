import '../UserNavbar/index.css'

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import { logout } from '../../../store/authSlice'

import logo from "../../../assets/logo.png";

const Test = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.auth.data.userProfile.data);

  const onLogOut = () => {
      dispatch(logout(history))
  }

  const renderUserProfile = (props) =>{
    return (
      <>
        {
          !user.userProfile
          ? (
              <div className='row align-items-center'>
                {/* <Link 
                    to={renderURLToHomeBaseOnRole()} 
                    className='col-sm-3 d-flex align-items-center'
                >
                    <AccountCircle fontSize="large" color="action" />
                </Link> */}
                <div className="col-sm">
                    <button 
                        onClick={ () => onLogOut() } 
                        className="btn btn-danger p-2 text-white rounded-3"
                    >
                        Đăng xuất
                    </button>
                </div>
              </div>
            )
          : (
                <Link 
                    to={'/dang-nhap'} 
                    className="btn btn-success " 
                    style={{ color: 'white', textDecoration: 'none' }} 
                    name="btnDangXuat">
                        Đăng nhập
                </Link>
            )
        }
      </>
    )
  }

  return (
    <header
      style={{ backgroundColor: "#0065C1", position:"fixed", zIndex:"10", maxWidth:"1936px", maxHeight: '60px'}}
      className="mk-header navbar navbar-expand-lg"
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand d-flex gap-2 align-items-center"
          style={{ backgroundColor: "#0065C1" }}
        >
          <img src={logo} alt="" width="50" height="50" />
          <h5 className="text-light mb-0">CTU Market Place</h5>
        </Link>
        <div className="">
            { renderUserProfile() }
        </div>
      </div>
      
    </header>
  );
};

export default Test;
