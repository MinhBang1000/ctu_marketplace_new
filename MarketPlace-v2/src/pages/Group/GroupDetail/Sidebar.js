// import './Sidebar.css'

import React, { useState } from 'react';

const Sidebar = (props) => {

    const [activeTab, setActiveTab] = useState(0)

    const onSidebarItemClick = (content, currenTab) => {
        props.onSidebaritemClick(content);
        setActiveTab(currenTab)
    }

    const renderItems = () => {
        if(props.items){
            return Object.values(props.items).map((item, index) => {
                return (
                    <button
                        to={item.path}
                        key={index}
                        onClick={e => onSidebarItemClick(item.content, index)}
                        className={
                            `btn ${activeTab === index ? 'btn-primary' : 'btn-secondary'}`
                        }
                    >
                        {/* <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                        </svg> */}

                        <span className="mx-4 font-medium">{ item.name }</span>
                    </button>
                )
            })
        }
    }

    return (
        <div className="row">
            <nav>
                <div className='d-flex flex-column gap-3'>
                    { renderItems() }
                </div>
                <hr className="border-danger" />
            </nav>
        </div>
    )
}

export default Sidebar;