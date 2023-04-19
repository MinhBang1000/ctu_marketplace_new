/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
// import { useCookies } from 'react-cookie';

import { ROUTE_NNC_CREATE_PROJECT, ROUTE_NNC_EDIT_PROJECT, ROUTE_PREFIX_NNC } from '../../components/Router/constants'
import {
  ROLE_ADMIN,
  ROLE_NNC, ROLE_SUPER_ADMIN
} from '../../environments/constraints'
import { navItems } from './router.admin.data'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = useSelector(state => state.auth.isSignedIn);
  const userDataLocalStorage = localStorage.getItem("userData");
  const user = JSON.parse(userDataLocalStorage);
  const userRole = user ? user.data.role.code : undefined
  const userFunctions = user ? user.data.userFunctionList : undefined

  const renderComponents = (props) => {

    if(isLoggedIn || userRole){
      if(userRole){
        if(props.location.pathname.startsWith(ROUTE_NNC_CREATE_PROJECT) || props.location.pathname === ROUTE_NNC_EDIT_PROJECT){
            if(userRole !== ROLE_NNC){
              return <Redirect to={{ pathname: '/dang-nhap', state: { from: props.location } }} />
            }
        }
        if(props.location.pathname.startsWith(ROUTE_PREFIX_NNC)){
            if(userRole !== ROLE_NNC){
              return <Redirect to={{ pathname: '/dang-nhap', state: { from: props.location } }} />
            }
        }
        if(props.location.pathname.startsWith('/admin')){
            if(userRole !== ROLE_ADMIN && userRole !== ROLE_SUPER_ADMIN){
              return <Redirect to={{ pathname: '/dang-nhap', state: { from: props.location } }} />
            }

            let canRouterTo = false;
            if(props.location.pathname !== '/admin'){
              if(userFunctions.length){
                canRouterTo = userFunctions.some( userFunction => navItems[userFunction.function.code]?.path && props.location.pathname.startsWith('/admin'+navItems[userFunction.function.code].path) && userFunction.isEnabled )
                // canRouterTo = userFunctions.some( userFunction => props.location.pathname.startsWith(navItems[userFunction.function.code].path))
              }
              if(userRole === ROLE_SUPER_ADMIN){
                canRouterTo = true;
              }
              if(!canRouterTo){
                return <Redirect to={{ pathname: '/dang-nhap', state: { from: props.location } }} />
              }
            }
        }
      }

      return <Component {...props} />
    }

    return <Redirect to={{ pathname: '/dang-nhap', state: { from: props.location } }} />
  }

  return (
    <Route
      {...rest}
      render={props =>
        // isLoggedIn || userRole
        //   ? (
        //     <Component {...props} />
        //   ) 
        //   : (
        //     <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
        //   )
        renderComponents(props)
      }
    />
  )
}

export default PrivateRoute