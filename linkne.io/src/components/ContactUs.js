import {useState, useEffect} from 'react';
import api from '../services/api'

export const ContactUs = ({menuChange}) => {
    const [email, setEmail] = useState("")
    const [header, setHeader] = useState("")
    const [body, setBody] = useState("")
    const [errorMessage, setErrorMessage] = ("")

    const sendConact = async(e) => {
        e.preventDefault();

        if(email === '' || header === '' || body === ''){
            setErrorMessage("Please fill everything")
        }
        else{
            const data = await api.post("/user/senderror", {
                email, header, body
            })
            if(data.status === 200){
                alert("Your message has been sent successfully!")
                window.location.reload();
            }
            else{
                setErrorMessage("An error occurred, please try again")
            }
        }

    }

    return (
        <div className='w-full md:w-10/12 mt-3 cursor-none disabled -z-50'>
            
            {(errorMessage !== undefined &&errorMessage.length) > 1 && 
                <div className='w-75 m-auto mt-1'>
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{errorMessage}</span>
                        </div>
                    </div>
                 </div>
            }

            <div className='w-full  p-3 shadow'>
                <div className=''>
                    <label>Subject</label>
                    <input  type="text" class= {`bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outlin text-area ${menuChange && "bg-gray-400"} `} disabled = {menuChange}  id="header" placeholder="Subject"  onChange = {(e) => setHeader(e.target.value)} />
                </div>

                <div className='mt-3'>
                    <label>Your Email</label>
                    <input  type="email" class= {`bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outlin text-area ${menuChange && "bg-gray-400"} `} disabled = {menuChange}  id="email" placeholder="Email"  onChange = {(e) => setEmail(e.target.value)}  />
                </div>

                
                <div className='mt-3'>
                    <label>Message</label>
                    <textarea   class= {`bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outlin text-area ${menuChange && "bg-gray-400"} `} disabled = {menuChange}   placeholder="Message" onChange = {(e) => setBody(e.target.value)}   />
                </div>
                

                <div className='mt-3'>
                    <div class=" form-check">
                        <input   type="checkbox" class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">I agree to the collection of my name and e-mail address. See our <a href = "https://linkne.io/privacy" className='text-blue-500 underline'> Privacy Policy</a> for more details.</label>
                    </div>

                </div>

                
                <div className='mt-3'>
                    <button className='btn bg-blue-500  hover:bg-blue-700' onClick = {(e) => sendConact(e)}>Send</button>
                </div>

            </div>
        </div>
  )
}
