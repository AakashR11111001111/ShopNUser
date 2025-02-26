import styles from './ContactUs.module.css'
const ContactUs = () => {
    return (
        <>
            <div className={styles.main}>
                <form action="https://formspree.io/f/mblddrpl" method="POST">
                    <div className={styles.field}>
                        <input name="Name" type="text" required />
                        <div className={styles.label}>Enter Name</div>
                    </div>

                    <div className={styles.field}>
                        <input name="Email" type="text" required />
                        <div className={styles.label}>Enter E-Mail</div>
                    </div>

                    <div className={styles.field}>
                        <textarea name="Message" required></textarea>
                        <div className={styles.label}>Message</div>
                    </div>
                    
                    <button className={styles.submitBtn}>Submit</button>
                </form>
            </div>
        </>
    )
}
export default ContactUs;