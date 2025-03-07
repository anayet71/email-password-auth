import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SingUp = () => {

    const [success, setSuccess] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    
    const [showPassword, setShowPassword] = useState(false)


    const handleSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const terms = e.target.terms.checked
        console.log(email, password, terms)

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
        
        if(!terms){
            setErrorMessage('Please accept out terms and condition')
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



    return (
        <div className=" bg-base-200 pt-24 py-10   ">
            <div className=" flex-col lg:flex-row-reverse  text-[#f7b538] ">
                <form onSubmit={handleSignUp}>
                    <div className=" bg-base-100 w-full rounded max-w-sm mx-auto shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center pb-6">Sign Up</h1>
                            <fieldset className="fieldset relative">
                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />
                                <label className="fieldset-label">Password</label>

                                <input type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" />

                                <button onClick={() => setShowPassword(!showPassword)} type="button" className="  btn btn-xs absolute bottom-3 right-7">
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : < FaEye />
                                    }
                                </button>
                            </fieldset>
                            <div className="py-2"><a className="link link-hover ">Forgot password?</a></div>
                            {/* Checkbox */}
                            <div className=" pb-5 bg-base-100 rounded-box w-64">

                                <label className="fieldset-label">
                                    <input type="checkbox" name="terms"  className="checkbox" />
                                    Accept Our Terms and Condition
                                </label>
                            </div>
                            <button className="btn bg-[#f7b538] text-[#780116] ">Sign Up</button>
                        </div>
                    <div>
                        {
                            success && <p className="text-green-400 text-semibold py-5 text-center">  Sign up is successful</p>
                        }
                    </div>
                    {
                        errorMessage && <p className="text-red-500  font-semibold py-5 text-center">{errorMessage}</p>
                    }
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SingUp;