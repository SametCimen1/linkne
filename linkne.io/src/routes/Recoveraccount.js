import React, {useState, useEffect, useRef} from 'react'

import api from '../services/api'
import TokenService from "../services/token.service";
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate  } from "react-router-dom";

const Recoveraccount = () => {
    const navigate = useNavigate();
    const [type1, setType1] = useState(false);    
    const [type2, setType2] = useState(false);    
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState({value:''});
    const [errorMessage, setErrorMessage] = useState('');
    const [openVerifyModal, setOpenVerifyModal] = useState(false);
    const [openNewPassword, setOpenNewPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");


        
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref0 = useRef();
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();

    
    const [verificationCode1, setVerificationCode1] = useState("0");
    const [verificationCode2, setVerificationCode2] = useState("0");
    const [verificationCode3, setVerificationCode3] = useState("0");
    const [verificationCode4, setVerificationCode4] = useState("0");

    
    useEffect(() => {
        if(errorMessage.length > 0){
            setTimeout(() => {setErrorMessage("")}, 3000);
        }
        else if(successMessage.length > 0){
            setTimeout(() => {setSuccessMessage("")}, 3000);
        }

    }, [successMessage, errorMessage])

    const sendReq = async(e) => {
        e.preventDefault();

        await api.post("/auth/recoverpassword", {
            email
        }).then((res) => {
            const data = res.data;
            if(data === 'no user'){
                setErrorMessage("No user is found with that email address")
                setSuccessMessage("")
            }
            else if(data === 'wait'){
                setErrorMessage("Please wait 3 minutes before sending another email again")
                setSuccessMessage("")
            }
            else{
                setErrorMessage("")
                setSuccessMessage("Sent a recovery code to your email, please check it!")
                setOpenVerifyModal(true)
            }
        })

    }

    const verify = async(e) => {
        e.preventDefault();
        await api.post("/auth/recoververify", {
            email,
            verificationCode:verificationCode1+verificationCode2+verificationCode3+verificationCode4
        }).then((res) => {
            if(res.status === 500){
                setErrorMessage("Error occurred, please try again later")
            }
            else if(res.status === 200){    
                setOpenNewPassword(true)
                setOpenVerifyModal(false);   
            }
            else{
                setErrorMessage("Verification code is not right")
            }


        }).catch((res) => {
            if(res.response !== undefined){
                if(res.response.status===403){
                    setErrorMessage("Verification code is not right");
                }else{
                    const err = res.response.data;
                    setErrorMessage(err);
                }
            }else{
                setErrorMessage("Error occurred, please try again later");
            }

        })
    }

    const updatePassword = async() => {
        if(newPassword === "" || setNewPassword === ""){
            alert("please enter the required fields")
        }else if (newPassword.length < 6){
            alert("please make sure your password includes at least 6 characters")
        }else if (newPassword !== newPasswordAgain){
            alert("Passwords doesn't match");
        }
        else if(newPassword === newPassword){
            await api.post("/auth/updateforgottenpassword", {
                newPassword, email
            }).then((res) => {
                alert("Successfully updated your password, logging in");
                const data = res.data;      
                TokenService.updateNewRefreshToken(data.refreshToken)
                TokenService.updateAccessToken(data.accessToken)
                setSuccessMessage(true)
                setTimeout(() => navigate('/dashboard?action=refresh'), 2000);

            }).catch((err) => {
                alert("Error occured, please try again later");
            })
        }else{
            alert("Something went wrong, please try again later");
        }
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


    return (

    <div className='flex justify-center items-start w-full'>


                <div className='rounded-0 border p-5 mt-5 w-full mx-2 lg:w-1/3   bg-dark shadow-xl'>



                    <h1 className='text-center text-xl font-bold'>Let's recover your account!</h1>

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
                    {(!openVerifyModal && !openNewPassword) && 
                    <form className='w-full'>
                        <div class="my-3 ">
                            <label class="block text-gray-500 text-sm " for="username">
                                Email
                            </label>
                            <input value = {email.value} type="email" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="Email" onChange = {(e) => setEmail({value:e.target.value})} />
                        </div>


                        <div class="mb-3 form-check">
                            <a href = "/signup" className='text-blue-500 underline'>No account?</a>
                        </div>

                        <div class="mb-3 form-check">
                            <p onClick = {() => setOpenVerifyModal(!openVerifyModal)} className='text-blue-500 underline'>Have a recovery code?</p>
                        </div>


                        <div className='m-auto text-center w-full'>
                            <button onClick={(e) =>sendReq(e)} class="w-full btn btn-primary  hover:scale-105 transition  duration-100">SIGN IN</button>
                        </div>
                    </form>
                    }
                    {(openVerifyModal && !openNewPassword) &&
                    <div className='w-full'>
                        <div class="flex justify-center items-start">
                            <div class="mt-2 w-full ">
                                <h3 className="font-base text-lg">Please enter the verification code sent to your email</h3>
                            
                                <div className='flex justify-start mt-2'>
                                    <input onChange = {(e) => {setVerificationCode1(e.target.value); setCurrentIndex(0); updateRef(e, 0)}} ref={ref0} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" /> 
                                    <input onChange = {(e) => {setVerificationCode2(e.target.value); setCurrentIndex(1); updateRef(e, 1)}} ref={ref1} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" /> 
                                    <input onChange = {(e) => {setVerificationCode3(e.target.value); setCurrentIndex(2); updateRef(e, 2)}} ref={ref2} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                    <input onChange = {(e) => {setVerificationCode4(e.target.value); setCurrentIndex(3); updateRef(e, 3)}} ref={ref3} class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" />
                                </div>

                                <label onClick = {() => verify()} className='text-blue-500 mt-2 link'>Send another recovery code</label>
                                <div class="mb-3 form-check">
                                    <p onClick = {() => setOpenVerifyModal(!openVerifyModal)} className='text-blue-500 underline'>Don't have a recovery code?</p>
                                </div>
                                <p className='font-light text-sm'>Please check your spam and trash folder before clicking resend</p>
                                <div className="mt-2">
                                    <button htmlFor="my-modal-5" className="btn bg-blue-500 hover:bg-blue-700" onClick = {(e) => verify(e)}>VERIFY AND LOG IN!</button>
                                </div>
                            </div>
                        </div>
                     </div> 
                    }
                    {(!openVerifyModal && openNewPassword) &&
                    <div className='w-full'>
                        <div class="flex justify-center items-start">
                            <div class="mt-2 w-full ">
                                <h3 className="font-base text-lg">Enter your new password</h3>
                                        
                                    <div class="my-3 ">
                                        <label class="block text-gray-500 text-sm " for="username">
                                            New Password
                                        </label>
                                        <div class="input-cont w-full"> 
                                            <input value = {newPassword} type= {`${type1 ? 'text' : 'password'}`}  class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="New Password" onChange = {(e) => setNewPassword(e.target.value)} />
                                            <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-thin text-gray-400 text-sm' onClick = {(e) => {setType1(!type1); e.preventDefault()}}>{`${type1 ? 'Hide' : 'Show'}`}</a>
                                        </div>
                                    </div>


                                    <div class="my-3 ">
                                        <label class="block text-gray-500 text-sm " for="username">
                                            Enter New Password Again
                                        </label>
                                        <div class="input-cont w-full"> 
                                            <input value = {newPasswordAgain} type= {`${type2 ? 'text' : 'password'}`}  class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="Enter New Password Again" onChange = {(e) => setNewPasswordAgain(e.target.value)} />
                                            <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-thin text-gray-400 text-sm' onClick = {(e) => {setType2(!type2); e.preventDefault()}}>{`${type2 ? 'Hide' : 'Show'}`}</a>
                                        </div>
                                    </div>


                                <div className="mt-2">
                                    <button htmlFor="my-modal-5" className="btn bg-blue-500 hover:bg-blue-700" onClick = {(e) => updatePassword(e)}>VERIFY AND LOG IN!</button>
                                </div>
                            </div>
                        </div>
                     </div> 
                    }


                </div>
                
            </div>   
  )
}

export default Recoveraccount