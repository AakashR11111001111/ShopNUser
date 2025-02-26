import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import styles from './Layout.module.css'
import NavBar from "./Components/NavBar/NavBar";

const Layout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const userDetails = localStorage.getItem("userDetails");
        console.log(userDetails);
        
        if(!userDetails){
            navigate("/");
        }
    },[])
    
    return (
        <div className={styles.main}>
            <NavBar />
            <Outlet />
        </div>
    )
}
export default Layout;