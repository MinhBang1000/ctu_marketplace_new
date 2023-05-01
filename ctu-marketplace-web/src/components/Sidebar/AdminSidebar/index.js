import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROLE_SUPER_ADMIN } from '../../../environments/constraints';
import routes from './routes';

const Sidebar = (props) => {

  const [userFunctions, setUserFunctions] = useState([])

  const { t } = useTranslation('common');

  useEffect(() => {
    renderUserFunctions()
}, [])

  const renderUserFunctions = () => {
        let userDataLocalStorage = localStorage.getItem("userData");
        let user = JSON.parse(userDataLocalStorage).data;

        if(user){
            let functions;
            
            if(user.role.code === ROLE_SUPER_ADMIN){
              functions = routes;
            }
            else {
              functions = user.userFunctionList.map(userFunction => {
                if(userFunction.isEnabled){
                    return routes[userFunction.function.code]
                }
                return null
            })
            }
            setUserFunctions(functions)
        }
    }

  const renderIcon = (item) => {
    const { useMaterialIcon, materialIcon, icon } = item;

    if(useMaterialIcon){
      return materialIcon
    }

    return (
        <>
          <i 
            className={ `${icon} ` } 
            aria-hidden="true">
          </i> 
        </>
    )
  }

  const renderRoutes = () => {
    // if(routes && Object.values(routes).length > 0) {
    if(userFunctions && Object.values(userFunctions).length > 0) {
      let renderedList = [];
      Object.values(userFunctions).map((route,index) => {
          if(route){
            const { path } = route;

            renderedList.push(
                <Link 
                  to={`/admin${path}`} 
                  className='list-group-item list-group-item-action list-group-item-light p-3 text-white'
                  style={{ backgroundColor: '#0065C1' }}
                  key={index}
                >
                  <div className='row align-self-start text-start gap-2'>
                    <section className='col-sm-1 align-self-center'>
                      { renderIcon(route) }
                    </section>
                    <section className='col align-self-center '>
                        { t(`admin.sidebar.${path}`) }
                    </section>
                  </div>
                </Link>
            )
          }
          return null
          
      })

      return (

          <div 
            className="list-group list-group-flush"
            style={{ height: '100%', backgroundColor: '#0065C1' }}
          >
            { renderedList.length
              ? renderedList 
              : (
                <div className='text-white'>
                  Hiện tại không có chức năng
                </div>
            ) }
          </div>
      )
    }
    return null;
  }

  return (
    <>
      { renderRoutes() }
    </>
  )
}

export default Sidebar;