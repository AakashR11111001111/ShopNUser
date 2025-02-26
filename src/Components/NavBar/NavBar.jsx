import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    let userDetails = null;

    try {
        const storedUser = localStorage.getItem("userDetails");
        userDetails = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing userDetails from localStorage:", error);
        userDetails = null;
    }

    const navigate = useNavigate();

    const onLogOutClick = () => {
        localStorage.removeItem("userDetails");
        navigate("/");
    }

    return (
        <nav className={styles.nav}>
            <h2>ShopSphere🌍</h2>
            <ul>
                <li><NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : "")}><h3>Home</h3></NavLink></li>
                <li><NavLink to="/products" className={({ isActive }) => (isActive ? styles.active : "")}><h3>Products</h3></NavLink></li>
                <li><NavLink to="/users" className={({ isActive }) => (isActive ? styles.active : "")}><h3>Users</h3></NavLink></li>
                <li><NavLink to="/contactus" className={({ isActive }) => (isActive ? styles.active : "")}><h3>Contact Us</h3></NavLink></li>
                {userDetails && userDetails.photoURL ? <img src={userDetails.photoURL} alt="Profile" /> : ""}
                {userDetails ? <img onClick={onLogOutClick} className={styles.logoutBtn} src="/logout.png" alt="Logout" /> : ""}
            </ul>
        </nav>
    );
}

export default NavBar;
