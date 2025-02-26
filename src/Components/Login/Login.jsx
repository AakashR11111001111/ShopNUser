import { useContext, useState } from 'react';
import styles from './Login.module.css'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../../firebase';
import { userContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const user = useContext(userContext);

    const [haveAnAccount, setHaveAnAccount] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const toggleHaveAnAccount = (e) => {
        e.preventDefault();
        setHaveAnAccount((prev) => !prev);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password || !username) {
            setError("All fields are required.");
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userAuth = {
                displayName: username,
                email: res.user.email,
                photoURL: "https://hypixel.net/attachments/20180908_214510-jpg.1009203/",
            };

            user.setUserData(userAuth);
            localStorage.setItem("userDetails", JSON.stringify(userAuth));
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    const googleSignInBtn = async () => {
        try {
            const res = await signInWithPopup(auth, googleAuthProvider);
            const userAuth = {
                displayName: res.user.displayName,
                email: res.user.email,
                photoURL: res.user.photoURL || "https://hypixel.net/attachments/20180908_214510-jpg.1009203/",
            };
            user.setUserData(userAuth);
            localStorage.setItem("userDetails", JSON.stringify(userAuth));
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.loginContainer}>
                <h1 className={styles.formHead}>{haveAnAccount ? "Sign In" : "Sign Up"}</h1>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <form className={styles.form} onSubmit={haveAnAccount ? () => {} : handleSignUp}>
                    <div className={styles.field}>
                        <label htmlFor="UserName">Username</label>
                        <input type="text" id="UserName" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    {!haveAnAccount && (
                        <div className={styles.field}>
                            <label htmlFor="Email">Email</label>
                            <input type="email" id="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                    )}
                    <div className={styles.field}>
                        <label htmlFor="Password">Password</label>
                        <input type="password" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    {
                        haveAnAccount ? (
                            <>
                                <button className={styles.loginBtn} type="submit">Login</button>
                                <div className={styles.formEnd}>
                                    <p>Don&apos;t have an account? <button className={styles.toggleBtn} onClick={toggleHaveAnAccount}>Sign Up</button></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <button className={styles.loginBtn} type="submit">Register</button>
                                <div className={styles.formEnd}>
                                    <p>Already have an account? <button className={styles.toggleBtn} onClick={toggleHaveAnAccount}>Sign In</button></p>
                                </div>
                            </>
                        )
                    }
                    <div className={styles.formEnd}>
                        <div style={{ margin: "20px auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <p>You may also {haveAnAccount ? "Sign-In" : "Sign-Up"} with</p>
                            <img src="/googleIcon.png" onClick={googleSignInBtn} alt="" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
