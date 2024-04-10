import React from "react";
import Dashboard from "../Components/Navnsidebar/dashboard";
import Sidebar from "../Components/Navnsidebar/sidebar";
import {useState} from 'react'

function Bar(){
const [sidebarToggle, setSidebarToggle] = useState(false) ;
	return (
		<div className="flex">
            <Sidebar sidebarToggle={sidebarToggle}/>
            <Dashboard 
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}/>
        </div>
	);
}

export default Bar;
