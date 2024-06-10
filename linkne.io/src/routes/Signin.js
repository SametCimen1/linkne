import React, {useState, useEffect} from 'react'

import api from '../services/api'
import TokenService from "../services/token.service";
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate  } from "react-router-dom";

function Signin() {
    let navigate  = useNavigate();

    const [successMessage, setSuccessMessage] = useState(false);
    const [email, setEmail] = useState({value:""});
    const [password, setPassword] = useState({value:""});
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState(false);    
    const user = useSelector((state) => state.counter);

    const dispatch = useDispatch()


    useEffect(() => {
        if(user.loggedIn){
            navigate('/')
        }
    },[user])  
    
    const submitForm = async(e) => {
        e.preventDefault();     
        await api.post("/auth/signin", {
            email,
            password,
        }).then((res) => {
            if(res.status === 500){
                setErrorMessage("Error occurred, please try again later");
            }
            else if(res.status === 403){
                setErrorMessage("Please verify your account!");
            }
            else if(res.status === 200){            
                const data = res.data;
                TokenService.updateNewRefreshToken(data.refreshToken)
                TokenService.updateAccessToken(data.accessToken)
                // dispatch(saveAccessToken(data.accessToken))
                setSuccessMessage(true)
                setTimeout(() => navigate('/dashboard?action=refresh'), 2000);


            }
            else{
                setErrorMessage("Error occurred, please try again later");
            }
        }).catch((res) => {
            if(res.response !== undefined){
                if(res.response.status===403){
                    setErrorMessage("You need to verify, your account. Redirecting you to the verification page");
                    setTimeout(() => navigate("/verification"), 2000);
                }else{
                    const err = res.response.data;
                    setErrorMessage(err);
                }
            }else{
                setErrorMessage("Error occurred, please try again later");
            }

        })

    }

  
    return (
        <div className='flex justify-center items-start w-full'>
                {successMessage && 
                    <div className="toast">
                        <div className="alert alert-info">
                            <div>
                                <span>Logged in successfully, page is being redirected</span>
                            </div>
                        </div>
                    </div>
                }

                <div className='rounded-0 border p-5 mt-5 w-full mx-2 lg:w-1/3   bg-dark shadow-xl'>



                    <h1 className='text-center text-xl font-bold'>Sign in</h1>

                    {errorMessage.length>0 &&
                    <div className='w-75 m-auto mt-1'>
                        <div className="alert alert-error shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errorMessage}</span>
                            </div>
                        </div>
                    </div>
                    }

                    <form className='w-full'>
                        <div class="my-3 ">
                            <label class="block text-gray-500 text-sm " for="username">
                                Email
                            </label>
                            <input value = {email.value} type="email" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="Email" onChange = {(e) => setEmail({value:e.target.value})} />
                        </div>
                        <div class="mb-3">
                            <label class="block text-gray-500 text-sm " for="username">
                                Password
                            </label>

                            <div class="input-cont w-full">
                                <input value = {password.value} type= {`${type ? 'text' : 'password'}`} class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline " id="Password" placeholder="Password" onChange = {(e) => setPassword({value:e.target.value})} />
                                <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-thin text-gray-400 text-sm' onClick = {(e) => {setType(!type); e.preventDefault()}}>{`${type ? 'Hide' : 'Show'}`}</a>
                            </div>

                        </div>

                        <div class="mb-3 form-check">
                            <a href = "/signup" className='text-blue-500 underline'>No account?</a>
                        </div>
                        <div class="mb-3 form-check">
                            <a href = "/recoveraccount" className='text-blue-500 underline'>Forgot password?</a>
                        </div>

                        <div className='m-auto text-center w-full'>
                            <button type="submit " onClick = {(e) => {submitForm(e)}} class="w-full btn btn-primary  hover:scale-105 transition  duration-100">SIGN IN</button>
                        </div>
                    </form>
                </div>
                
            </div>   
    )
}

export default Signin