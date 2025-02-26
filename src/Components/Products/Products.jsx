import { useEffect, useRef, useState } from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
const ProdPerPage = 15;
const Products = () => {
    const [productsList, setProductsList] = useState([]);
    const [searchValue,setSearchValue] = useState("");
    const searchedValue = useRef("")
    const [currentPage, setCurrentPage] = useState(0);
    const onInputChange = () => {
        setSearchValue(searchedValue.current.value);
    }
    const listLength = Math.ceil(productsList.length / ProdPerPage);
    const start = currentPage * ProdPerPage;
    const end = start + ProdPerPage;
    
    const onPageNoClick = (e) => {
        setCurrentPage(e);
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    const onScrollToTop = () => {
        window.scrollTo({top: 0, behavior:"smooth"})
    }

    const onNavClick = (e) => {
        if(e == "dec" && currentPage > 0) setCurrentPage(val => val - 1)
        else if(e == "inc" && currentPage < listLength - 1){
            setCurrentPage(val => val + 1)
        }
    }

    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get('https://dummyjson.com/products?limit=200');
            setProductsList(res.data.products);
        }
        getData();
    },[])

    return (
        <div className={styles.main}>
            <div className={styles.filterDiv}>
                <input ref={searchedValue} onChange={onInputChange} type="text" id='SearchByName' placeholder='Search Item By Name'/>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.prodContainer}>
                {
                    productsList
                    .filter(prod => prod.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .slice(start,end)
                    .map(prod => <ProductCard {...prod} key={prod.id} />)
                }
            </div>
                <div className={styles.pagination}><button className={styles.navigationBtn} onClick={()=> onNavClick("dec")}>&lt;</button>{[...new Array(listLength).keys()].map((k,idx)=><span className={currentPage == k ? styles.activePage : ""} onClick={()=> onPageNoClick(k)} key={idx}>{k + 1}</span>)} <button onClick={()=> onNavClick("inc")} className={styles.navigationBtn}>&gt;</button></div>
                <div className={styles.scrollToTopBtn} onClick={onScrollToTop}><img src="/scrollToTop.png" alt="" /></div>
        </div>
    )
}

export default Products;