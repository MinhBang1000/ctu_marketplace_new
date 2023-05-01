import jwt from "jwt-decode";
import React from "react";
import { Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store/authSlice";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const renderComponent = () => {
    const token = getUrlParameter("token");
    const error = getUrlParameter("error");
    console.log(token)

    if (token) {
      localStorage.setItem("token", token);

      const tokenParsed = jwt(token);
      const username = tokenParsed?.sub;

      const data = {
        username,
        token
      }

      dispatch(fetchUserProfile(data));

      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: props.location
            },
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/dang-nhap",
            state: {
              from: props.location,
              error: error,
            },
          }}
        />
      );
    }
  };

  return renderComponent();
};

export default OAuth2RedirectHandler;
