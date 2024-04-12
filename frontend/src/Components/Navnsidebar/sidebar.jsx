import React from 'react'
import {FaHome,FaRegFileAlt,FaPoll,FaRegEnvelope, FaCog, FaStore, FaUserPlus, FaUserCircle, FaPills } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetUser from '../../utils/useGetUser';


const Sidebar = ({sidebarToggle}) => {

    useGetUser();
	const user = useSelector((state) => state.user.userLoggedIn);
	const role = user?.role;
	// useEffect(() => {
	// 	if (role === "user") window.location.href = "/user";
	// }, [role]);

    const getUserSidebarItems = () => {
        switch (role) {
            case "user":
                return [
                    { icon: <FaPills />, text: "Search Medicine", link: "/user" },
                    
                    { icon: <FaPoll />, text: "Order History", link: "/orderstatus" },
                    { icon: <FaRegFileAlt />, text: "Track Order", link: "" },
                    {icon: <FaUserCircle />, text: "Profile", link: "/profile" },
                ];
            case "ceo":
                return [
                    { icon: <FaStore />, text: "Inventories", link: "/inventories" },
                    { icon: <FaUserPlus />, text: "Add Manager", link: "/managerceo" },
                    { icon: <FaUserPlus />, text: "Add Supplier", link: "/suppliers" },
                    { icon: <FaPills  />, text: "Add Medicine", link: "/add-medicine" },

                ];
            case "manager":
                return [
                    { icon: <FaPoll />, text: "Sales", link: "/store-manager" },
                    { icon: <FaUserPlus />, text: "Suppliers", link: "/suppliers" },
                ];
            default:
                return [];
        }
    };

  return (
    <div className={`${sidebarToggle? " hidden " : " block "} w-64 bg-gray-800 fixed h-full px-4 py-2`}>
        <div className='my-2 mb-4'>
            <h1 className='text-2x text-white font-bold'> Dashboard </h1>
        </div>
        <hr />
        <ul className='mt-3 text-white font-bold'>
        {getUserSidebarItems().map((item, index) => (
                    <li key={index} className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                        <Link to={item.link} className='px-3'>
                        <div style={{display:'flex',fontSize:'18px'}}>
                            {item.icon} <div className='inline-block w-9 h-0 ml-4 -mt-1'>{item.text}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href="/user" className='px-3'>
                    <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
                    Home
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href="" className='px-3'>
                    <FaRegFileAlt className='inline-block w-6 h-6 mr-2 -mt-2' ></FaRegFileAlt>
                    Track Order
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href="/orderstatus" className='px-3'>
                    <FaPoll className='inline-block w-6 h-6 mr-2 -mt-2' />
                    Order History
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <Link to="/profile" className='px-3'>
                    <FaRegEnvelope className='inline-block w-6 h-6 mr-2 -mt-2'/>
                    Profile
                </Link>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href="" className='px-3'>
                    <FaCog className='inline-block w-6 h-6 mr-2 -mt-2' />
                    Settings
                </a>
            </li>
        </ul>  */}
    </div>
  )
}

export default Sidebar