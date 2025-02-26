import styles from './ProductCard.module.css';
const ProductCard = ({thumbnail, title, price}) => {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={thumbnail} alt="" />
            </div>
            <p className={styles.title}>{title}</p>
            <div><p>{`$${price}`}</p></div>
        </div>
    )
}
export default ProductCard;