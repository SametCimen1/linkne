import React, {useState} from 'react'
import api from '../services/api'
import { useNavigate  } from "react-router-dom";
function Signup() {

        
    const [email, setEmail] = useState({value:""});
    const [username, setUsername] = useState({value:""});
    const [password, setPassword] = useState({value:""});
    const [passwordAgain, setPasswordAgain] = useState({value:""});
    const [read, setRead] = useState({value: false});
    const [errorMessage, setErrorMessage] = useState({value:""})
    const [successMessage, setSuccessMessage] = useState(false)
    const [type, setType] = useState(false); 
    const [type2, setType2] = useState(false); 


    let navigate  = useNavigate();

    const submitForm = async(e) => {
        setErrorMessage({value:""})
        e.preventDefault();

        const err = read.value;
        
        if(!err){
            setErrorMessage({value:"You need to accept the Terms of Use and Privacy Policy"})
            return;
        }
        else if(password.value === ''){
            setErrorMessage({value:"Please enter a valid password"})
            return;
        }
        else if(password.value.length <= 6){
            setErrorMessage({value:"Please make your password at least 6 characters"})
            return;            
        }
        else if(!email.value.includes("@")){
            setErrorMessage({value:"Please enter a valid email"})
            return;
        }
        else if((password.value === passwordAgain.value)){
            const ref = localStorage.getItem("ref");
            const newUserName = username.value.toLowerCase();
            await api.post("/auth/signup", {
                email,
                username:newUserName,
                password,
                ref
            }).then((res) => {
                localStorage.removeItem("ref");
                setSuccessMessage(true);
                setTimeout(() => navigate('/verification'), 2000);

            }).catch((err) => {
                setErrorMessage({value:err.response.data});
            })

        


        }
        else{
            setErrorMessage({value:"Password is not the same"})
            return;
        }
    }
    
    return (
        <div className='flex justify-center items-start w-full'>
                <div className='rounded-0 border p-5 mt-5 w-full mx-2 lg:w-1/3   bg-dark shadow-xl'>
                <h1 className='text-center text-xl font-bold'>Sign up</h1>
                
                {errorMessage.value.length > 1 && 
                    <div className='w-75 m-auto mt-1'>
                        <div className="alert alert-error shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errorMessage.value}</span>
                            </div>
                        </div>
                    </div>
                }


                {successMessage && 
                    <div className="toast">
                        <div className="alert alert-info">
                            <div>
                            <span>You have successfully registered, now you are taken to the login screen.</span>
                            </div>
                        </div>
                    </div>
                }


                <form className='w-75 m-auto'>
                   
                   
                    <div class="my-3">
                        <label class="block text-gray-500 text-sm " for="username">
                                Email
                        </label>
                        <input value = {email.value} onChange = {(e) => setEmail({value:e.target.value})} type="email" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="Email" />
                    </div>
                    {/* <div class="mb-3">
                        <input value = {tel.value} onChange = {(e) => setTel({value:e.target.value})} type="tel" class="form-control" id="phoneNumber" placeholder="Telefon numarası (isteğe bağlı)" />
                    </div> */}
                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Username
                        </label>
                        <input  value = {username.value} onChange = {(e) => setUsername({value:e.target.value})} type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="username" placeholder="Username" />
                    </div>
                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Password   
                        </label>

                        <div class="input-cont w-full">
                            <input value = {password.value} onChange = {(e) => setPassword({value:e.target.value})} type= {`${type ? 'text' : 'password'}`} class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="password" placeholder="Password" />
                            <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-thin text-gray-400' onClick = {(e) => {setType(!type); e.preventDefault()}}>{`${type ? 'Hide' : 'Show'}`}</a>                            
                        </div>

                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Enter Password Again
                        </label>

                        <div class="input-cont w-full">
                            <input value = {passwordAgain.value} onChange = {(e) => setPasswordAgain({value:e.target.value})} type= {`${type2 ? 'text' : 'password'}`} class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="passwordAgain" placeholder="Enter password again" />    
                            <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-thin text-gray-400' onClick = {(e) => {setType2(!type2); e.preventDefault()}}>{`${type2 ? 'Hide' : 'Show'}`}</a>                            
                        </div>
                        
                    </div>

                    <div class="mb-3 form-check">
                        <a href = "/signin" className='text-blue-500 underline'>Already have an account?</a>
                    </div>

                    <div class="mb-3 form-check">
                        <input  value = {read.value} onChange = {(e) => setRead({value:!read.value})} type="checkbox" class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">I accept the <a href = "https://linkne.io/termsofuse" className='link text-blue-500'>Terms of Use</a> and <a href = "https://linkne.io/privacy" className='link text-blue-500'>Privacy Policy</a>.</label>
                    </div>

                    
                    <div className='m-auto w-full text-center'>
                        <button onClick = {(e) => {submitForm(e)}}  class="w-full btn btn-primary">SIGN UP</button>
                    </div>
                
                </form>
            </div>
        </div>   
  )
}

export default Signup