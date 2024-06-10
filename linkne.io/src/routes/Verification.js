import React, {useState, useEffect, useRef} from 'react'

import api from '../services/api'
import TokenService from "../services/token.service";
import { useSelector, useDispatch } from 'react-redux'

import { useFetcher, useNavigate  } from "react-router-dom";


const Verification = () => {
    let navigate  = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref0 = useRef();
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();

    



    const [verificationCode1, setVerificationCode1] = useState("0");
    const [verificationCode2, setVerificationCode2] = useState("0");
    const [verificationCode3, setVerificationCode3] = useState("0");
    const [verificationCode4, setVerificationCode4] = useState("0");
    
    const [type, setType] = useState(false);    
    const [openModal, setOpenModal] = useState(false);    
    
    const verify = async(e) => {
        e.preventDefault();
        await api.post("/auth/verify", {
            email,
            verificationCode:verificationCode1+verificationCode2+verificationCode3+verificationCode4
        }).then((res) => {
            if(res.status === 500){
                setErrorMessage("Error occurred, please try again later");
            }
            else if(res.status === 200){    
                const data = res.data;       
                TokenService.updateNewRefreshToken(data.refreshToken)
                TokenService.updateAccessToken(data.accessToken)
                setSuccessMessage("Llogged in successfully, redirecting to the dashboard page")
                setTimeout(() => navigate('/dashboard?action=refresh'), 2000);
            }
            else{
                setErrorMessage("Error occurred, please try again later");
            }


        }).catch((res) => {
            if(res.response !== undefined){
                if(res.response.status===403){
                    const data = res.data;
                    setErrorMessage("Verification code is not right");
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

    const submitForm = async(e) => {
        if(email === '' || password === ''){
            alert("please input the fields")
        }else{
        e.preventDefault();     
            await api.post("/auth/checkauthinfo", {
                email,
                password,
            }).then((res) => {
                if(res.status === 500){
                    setErrorMessage("Error occurred, please try again later");
                }
                else if(res.status === 200){            
                    setOpenModal(true)
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

    }

    const getAnotherLink = async() => {
        await api.post("/auth/getnewverification", {email}).then((res) =>{
            const data = res.data;
            if(data === 'You have to wait 3 minutes'){
                setErrorMessage("You have to wait at least 3 minutes before getting another verification code")
            }else{
                setSuccessMessage("Resent the email")
            }

        }).catch((err) => {alert("error occurred")})
    }


    const updateRef = (e, index) => {
        if(e.keyCode === 8){

        }else{
            const refs = [ref0, ref1, ref2, ref3];
            if(index < 3){
                refs[index+ 1].current.focus();
            }
        }
    
    }


    useEffect(() => {
        if(errorMessage.length > 0){
            setTimeout(() => {setErrorMessage("")}, 3000);
        }
        else if(successMessage.length > 0){
            setTimeout(() => {setSuccessMessage("")}, 3000);
        }

    }, [successMessage, errorMessage])

    return (
        <div className='flex justify-center items-start w-full '>




                    <div className='rounded-0 border p-5 mt-5 w-full mx-2 lg:w-1/3   bg-dark shadow-xl '>



                        <h1 className='text-center text-xl font-bold'>Verify Your Account!</h1>

                        {errorMessage.length>0 &&
                        <div className='w-75 m-auto mt-1 z-50'>
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{errorMessage}</span>
                                </div>
                            </div>
                        </div>
                        }


                        {successMessage.length>0 &&
                        <div className='w-75 m-auto mt-1 z-50'>
                            <div className="alert alert-info shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{successMessage}</span>
                                </div>
                            </div>
                        </div>
                        }

                        {!openModal ?
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
                        :
                        <div>
                                <div class="flex justify-center items-center">
                                    <div class="mt-2 w-11/12 max-w-5xl">
                                        <h3 className="font-base text-lg">Please enter the verification code sent to your email</h3>
                                    
                                        <div className='flex justify-start mt-2'>
                                            <input onChange = {(e) => {setVerificationCode1(e.target.value); setCurrentIndex(0); updateRef(e, 0)}} ref={ref0} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxLength="1" /> 
                                            <input onChange = {(e) => {setVerificationCode2(e.target.value);  setCurrentIndex(1); updateRef(e, 1)}}  ref={ref1} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxLength="1" /> 
                                            <input onChange = {(e) => {setVerificationCode3(e.target.value);  setCurrentIndex(2); updateRef(e, 2)}} ref={ref2} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxLength="1" />
                                            <input onChange = {(e) => {setVerificationCode4(e.target.value);  setCurrentIndex(3); updateRef(e, 3)}} ref={ref3} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxLength="1" />
                                        </div>

                                        <label onClick = {() => getAnotherLink()} className='text-blue-500 mt-2 link'>Send another verification code</label>
                                        <p className='font-light text-sm'>Please check your spam and trash folder before clicking resend</p>
                                        <div className="mt-2">
                                            <button htmlFor="my-modal-5" className="btn bg-blue-500 hover:bg-blue-700" onClick = {(e) => verify(e)}>VERIFY AND LOG IN!</button>
                                        </div>
                                    </div>
                                </div>
                        </div>    
                    }


                    </div>
                    
        </div>   

    )
}

export default Verification