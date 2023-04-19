import React from 'react';
import { Link } from 'react-router-dom';

import routes from './routes';

const Sidebar = (props) => {

  const renderRoutes = () => {
    if(routes && routes.length > 0) {
      const renderedList = routes.map((route,index) => {

        const { path, name, icon } = route;

        return (
            <Link to={`/admin${path}`} className='list-group-item list-group-item-action list-group-item-light p-3' key={index}>
              <section className='col-sm-1'>
                <i 
                  className={ `${icon} ` } 
                  aria-hidden="true">
                </i> 
              </section>
              <section className='col'>
                  { name }
              </section>
            </Link>
        )
      })

      return (
        <div 
          className="border-end bg-white" 
          id="sidebar-wrapper"
          
        >
          <div className="sidebar-heading border-bottom bg-light">Danh sách chức năng</div>
          <div className="list-group list-group-flush">
            { renderedList }
          </div>
        </div>
      )
    }
    return null;
  }

  return (
    <div 
      className='container'
      // style={{
      //   backgroundImage: `url(${sidebarImage})`,
      //   backgroundSize: 'cover',
      //   position: 'relative',
      // }}
    >
      { renderRoutes() }
    </div>
  )
}

export default Sidebar;