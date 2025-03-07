import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";


const SingUp = () => {

    const [success, setSuccess] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false)


    const handleSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        setErrorMessage('')

        if (password.length < 6) {
            setErrorMessage('password should be 6 character or longer')
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lower case, one number, one special character ')
            return
        }

        // create user with email password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(result.user)
            })
            .catch(error => {
                console.log('Error', error)
                setErrorMessage(error.message)
            })

            
        }
        //  Show password
        

    return (
        <div className=" bg-base-200 pt-24 py-10  text-center">
            <div className=" flex-col lg:flex-row-reverse text-[#f7b538] ">
                <form onSubmit={handleSignUp}>
                    <div className=" bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center pb-6">Sign Up</h1>
                            <fieldset className="fieldset relative">
                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />
                                <label className="fieldset-label">Password</label>

                                <input type={showPassword? 'text' : 'password'} name='password' className="input" placeholder="Password" />
                                <button onClick={() => setShowPassword(!showPassword)}  type="button" className="btn btn-xs absolute right-6 bottom-25"><FaEye></FaEye></button>
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn bg-[#f7b538] text-[#780116] mt-4">Sign Up</button>
                            </fieldset>
                        </div>
                    </div>
                </form>

            </div>
            <div>
                {
                    success && <p className="text-green-400 text-semibold">  Sign up is successful</p>
                }
            </div>
            {
                errorMessage && <p className="text-red-500  font-semibold">{errorMessage}</p>
            }
        </div>
    );
};

export default SingUp;