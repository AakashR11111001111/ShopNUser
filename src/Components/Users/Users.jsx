import { useEffect, useRef, useState } from 'react';
import styles from './Users.module.css';
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
const Users = () => {
    const noOfUserPerPage = 20;
    const [userListData, setUserListData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const arraylength = Math.ceil(userListData.length / noOfUserPerPage);
    const increaseBtnRef = useRef("");

    const start = currentPage * noOfUserPerPage;
    const end = start + noOfUserPerPage;

    const onPageChangeClick = (p) => {
        setCurrentPage(p);
    }

    const onNavClick = (e) => {
        if(e == "dec" && currentPage > 0) setCurrentPage(val => val - 1)
        else if(e == "inc" && currentPage < arraylength - 1){
            setCurrentPage(val => val + 1)
        }
    }


    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get('https://dummyjson.com/users?limit=300');
            setUserListData(res.data.users);
        }
        getData();
    },[])
    return (
        <div className={styles.usersDataContainer}>
            <table>
                <tbody>
                    {
                        userListData
                        .slice(start, end)
                        .map(user => <UserCard {...user} key={user.id} />)
                    }
                </tbody>
            </table>
                    <div className={styles.pagination}><button onClick={()=>onNavClick("dec")} className={styles.navigationBtn}>&lt;</button>{[...new Array(arraylength).keys()].map((p,idx) => <span className={currentPage == p ? styles.activePage: ""} onClick={()=>onPageChangeClick(p)} key={idx}>{p + 1}</span>)} <button ref={increaseBtnRef} onClick={()=>onNavClick("inc")} className={styles.navigationBtn}>&gt;</button></div>
        </div>
    )
}
export default Users;