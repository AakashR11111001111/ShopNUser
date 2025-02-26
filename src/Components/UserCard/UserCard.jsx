import styles from './UserCard.module.css';
const UserCard = ({id, firstName, lastName, gender, image}) => {
    return (
        <tr className={styles.row}>
            <td><img src={image} alt="" /></td>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{gender}</td>
        </tr>
    )
}
export default UserCard;