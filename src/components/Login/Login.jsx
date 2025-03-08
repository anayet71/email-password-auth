import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [success, setSuccess] = useState('')
    const [loginError, setLoginError] = useState('')
    const emailRef = useRef()

    const handleLogIn = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        // reset status
        setSuccess(false)
        setLoginError('')

        // Login user 
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    setLoginError('Please verify your email')
                }
                else {
                    setSuccess(true)
                }
            })
            .catch(error => {
                console.log('Error', error.message);
                setLoginError(error.message)
            })

    }
    const handleForgetPassword = () => {
        // sendPasswordResetEmail(auth, email)
        console.log('get me email', emailRef.current.value);
        const email = emailRef.current.value
        if (!email) {
            console.log('Please provide a valid email address');
        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert(' Password Reset email sent, please check your email')
                })
                .catch((error) => {
                    setLoginError(error)
                });
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogIn} className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input ref={emailRef} type="email" name="email" className="input" placeholder="Email" />
                                <label className="fieldset-label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" />
                                <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>

                        <p> New to this site? <Link className="link-hover" to={'/signUp'}>Sign Up</Link></p>
                        {
                            success && <p className="text-green-500">User login successful</p>
                        }
                        {
                            loginError && <p className="text-red-600">{loginError}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;