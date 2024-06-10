import {useState, useRef} from 'react'
import api from '../services/api'
import { useSelector, useDispatch} from 'react-redux'
import AvatarEditor from 'react-avatar-editor'
import {logOut, saveInfo} from '../services/counterSlice'
import { useNavigate  } from "react-router-dom";

const Settings = ({menuChange}) => {
    let navigate  = useNavigate();

    const [selected, setSelected] = useState("1")
    const [picture, setPicture] = useState('');
    const user = useSelector((state) => state.counter)
    const editor = useRef(null);

    const [newUserName, setNewUserName] = useState('');
    const [scaleInput, setScaleInput] = useState(1);
    const [file, setFile] = useState(undefined);
    const dispatch = useDispatch()
    const [deleteModal, setDeleteModal] = useState(false);


    //update passwords
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");

    const [type1, setType1] = useState(false);
    const [type2, setType2] = useState(false);
    const [type3, setType3] = useState(false);


    const deleteAccount = async() => {
        setDeleteModal(!deleteModal);

    }
    const deleteFinalAccount = async() =>{
        await api.post('/user/deleteAccount').then(() => {
            dispatch(logOut());
            navigate('/')
            window.location.reload();
        }).catch((err) => {
            alert("Error Occured")
        })
    }


    const updatePicture = async() => {
        await api.post('/user/updatepicture',{
            picture
        }).then((res) => {
            //show if it is suc
            alert("updated profile picture")
        }).catch((err)=>{
        })
    }



    const onCrop = async() => {

        if (editor !== null) {
            const values = editor.current.getCroppingRect();
            //setImageSource("blobImage")

            const formData = new FormData()

            formData.append("image", file)
            formData.append("height", values.height)
            formData.append("width", values.width)
            formData.append("x", values.x)
            formData.append("y", values.y)

            const result = await api.post('/user/updatepicture', formData, { headers: {'Content-Type': 'multipart/form-data'}}).then(() => window.location.reload())
        }
    }


    const logMeOut = () => {
        dispatch(logOut());
        if(user.loggedIn){
            navigate('/');
        }
    }


    const changeUserName = async() => {
        if(newUserName.length < 6){
            alert("New name is too short")
            return;
        }else{
            await api.put("/user/updateUserName",{
                newUserName:newUserName.toLowerCase()
            }).then((res) => {
                const data = res.data;
                if(data === "max"){
                    alert("You have reached maximum amount of name changes available")
                }else{
                    alert("Name changed successfully, refreshing the page")
                    window.location.reload(true)
                }

            }).catch((err) => {
                alert("Error occurred, please try again later")
            })
        }


    }


    const updatePassword = async() => {
        if(newPassword==="" || oldPassword === "" || newPasswordAgain === ""){
            alert("Please enter the fields")
        }else if(newPassword !== newPasswordAgain){
            alert("The new password doesn't match")
        }else if(newPassword === newPasswordAgain){
            await api.post("/auth/changepassword", {oldPassword, newPassword}).then((res) => {
                const data = res.data;
                if(data === 'pass is not right'){
                    alert("password is not right")
                }else if (data === 'success'){
                    alert("Successfully updated your password")
                }else{
                    alert("something went wrong, please try again later")
                }
            }).catch((err) => {
                alert("Something went wrong, please try again later")
            })
        }
        else{
            alert("something went wrong, please try again later")
        }
    }

    return (
        <div className='z-0 w-4/5 md:w-full'>
            <div className='drop-shadow-2xl'>


                <div className='flex md:w-1/2  py-5 md:flex-row flex-col justify-center md:justify-start'>

                        <div className='md:w-1/3 w-full md:mx-0 mx-auto  '>
                            <div class="avatar w-full md:w-full">
                                <div class=" rounded border-2 border-blue-500  w-full">
                                    <img src= {`http://localhost:5500/images/${user.picture}`}/>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center items-align md:w-1/4 w-full  md:ml-3'>
                            <h1 className='font-bold text-4xl md:text-left '>{user.username}</h1>
                            {/* <div className = "flex p-1 text-base font-light   items-center">
                                <p className = "mr-1">341 Genel Link</p>
                                <span className='w-1 h-1 mr-1 bg-black rounded-full'></span>
                                <p className = "mr-1">5124 Toplam Tiklanma</p>
                                <span className='w-1 h-1 mr-1 bg-black rounded-full'></span>
                                <p className = "mr-1">184 Takipci</p>
                            </div> */}
                            <button className='mt-1 btn bg-red-700 hover:bg-red-800 w-full'  onClick = {() => {logMeOut()}}>Log out</button>
                        </div>
                </div>


                <div className='flex md:flex-row flex-col'>

                    <div className='p-1 md:w-2/12 border'>
                        <p   className= {`my-2 cursor-pointer rounded p-1 transition duration-200   rounded  ${selected === "1" ? " bg-blue-500 text-white" : " hover:bg-gray-200  "}`}onClick = {() => {setSelected("1")}}>Edit your profile</p>
                        <p   className= {`my-2 cursor-pointer rounded p-1 transition duration-200   rounded  ${selected === "2" ? " bg-blue-500 text-white" : " hover:bg-gray-200  "}`}  onClick = {() => {setSelected("2")}}>Privacy and security</p>
                        <p   className= {`my-2 cursor-pointer rounded p-1 transition duration-200   rounded  ${selected === "3" ? " bg-blue-500 text-white" : " hover:bg-gray-200  "}`} onClick = {() => {setSelected("3")}}>Delete Account</p>
                        {/* <p   className= {`my-2 cursor-pointer rounded p-1 transition duration-200   rounded  ${selected === "4" ? " bg-blue-500 text-white" : " hover:bg-gray-200  "}`} onClick = {() => {setSelected("4")}}>Ödeme bilgileri</p>
                        <p   className= {`my-2 cursor-pointer rounded p-1 transition duration-200   rounded  ${selected === "5" ? " bg-blue-500 text-white" : " hover:bg-gray-200  "}`} onClick = {() => {setSelected("5")}}>Bildirimler</p>  */}
                    </div>


                    {selected === "1" &&

                        <div className='w-full md:ml-5 '>




                            <div className='mt-5'>
                                <p className='font-bold text-xl'>Upload Profile Picture</p>

                                <div className='md:w-1/2 w-full'>
                                    <input disabled = {menuChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2" aria-describedby="user_avatar_help" id="user_avatar" onChange = {(e) => setFile(e.target.files[0])} type="file"  />
                                </div>


                                    {file !== undefined &&
                                        <div className='mt-3'>

                                            <p>Crop your picture!</p>
                                            <AvatarEditor
                                                image= {file}
                                                width={250}
                                                height={250}
                                                border={0}
                                                scale={scaleInput}
                                                rotate={0}
                                                ref={editor}
                                            />
                                            <div className='mt-3 flex w-1/2'>
                                                <label className='mr-2' >Scale</label>
                                                <input type="range"  min="1" max="4" step="0.2" value={scaleInput} className="range" onChange = {(e) => setScaleInput(e.target.value)}/>
                                            </div>
                                            <button className = "mt-3 btn btn-primary" onClick={() => {onCrop()}}>Save</button>

                                        </div>
                                    }



                            </div>


                            <div className='mt-5'>
                                <p className='font-bold text-xl'>Update User Name</p>
                                <p className='font-light text-sm'>You can only update your name 2 times. You have {2 - user.name_updates} name updates available.</p>


                                <div className='md:w-1/2 mt-2'>
                                    <input disabled = {menuChange} onChange = {(e) => setNewUserName(e.target.value.toLocaleLowerCase())} type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="New Username" />
                                </div>


                                <button onClick = {() => changeUserName()} className='btn bg-blue-500 mt-2 hover:bg-blue-700 md:w-1/5 w-full '>Save</button>


                            </div>








                            {/* <button className='btn btn-primary mt-2' onClick = {() => updatePicture()}>Kaydet</button> */}

                        </div>
                    }



                    {selected === "2" &&

                    <div className='w-full md:ml-5'>
                        <div>
                            <p className='font-bold text-xl'>Change Password</p>
                            <div className='md:w-1/2 mt-2'>
                                <div class="input-cont w-full">
                                    <input disabled = {menuChange} type= {`${type1 ? 'text' : 'password'}`} onChange = {(e) => setOldPassword(e.target.value)} class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Old Password" />
                                    <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-medium text-gray-400 text-sm' onClick = {(e) => {setType1(!type1); e.preventDefault()}}>{`${type1 ? 'Hide' : 'Show'}`}</a>
                                </div>

                                <div class="input-cont w-full mt-2">
                                    <input disabled = {menuChange} type= {`${type2 ? 'text' : 'password'}`} onChange = {(e) => setNewPassword(e.target.value)}  class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="New Password" />
                                    <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-medium text-gray-400 text-sm' onClick = {(e) => {setType2(!type2); e.preventDefault()}}>{`${type2 ? 'Hide' : 'Show'}`}</a>
                                </div>

                                <div class="input-cont w-full mt-2">
                                    <input disabled = {menuChange} type= {`${type3 ? 'text' : 'password'}`} onChange = {(e) => setNewPasswordAgain(e.target.value)} class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Enter New Password Again" />
                                    <a  id="showHide" className='mr-2 mt-2 cursor-pointer font-medium text-gray-400 text-sm' onClick = {(e) => {setType3(!type3); e.preventDefault()}}>{`${type3 ? 'Hide' : 'Show'}`}</a>
                                </div>


                            </div>
                            <button onClick = {() => updatePassword()} className='btn btn-primary mt-2'>Update</button>
                        </div>


                        {/* <div className='mt-5'>
                            <p className='font-bold text-xl'>Public Profile</p>
                            <div className='md:w-1/2 mt-2'>
                                <input  type="checkbox" class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1"><span className='font-bold'> Public Profil Özelliğini</span> Aktif Et </label>
                            </div>
                            <p className='text-gray-400 ml-5'>Public profiller başkalarının senin seçtiğin linkleri ve resmini görmeni sağlar. Eğer bu aktif ise insanlar senin profilini görebilirler. </p>
                        </div>


                        <div className='mt-5'>
                            <p className='font-bold text-xl'>Turn off +18 blur</p>
                            <div className='w-1/2 mt-2'>
                                <label class="form-check-label" for="exampleCheck1">Turn off +18 blur</label>
                            </div>
                            <p className='text-gray-400 ml-5'>Public profiller başkalarının senin seçtiğin linkleri ve resmini görmeni sağlar. Eğer bu aktif ise insanlar senin profilini görebilirler. </p>
                        </div> */}


{/*
                        <div className='mt-5'>
                            <p className='font-bold text-xl'>İki Faktörlü Kimlik Doğrulama</p>
                            <div className='w-1/2 mt-2'>
                                <input  type="checkbox" class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1"><span className='font-bold'> Aktif et İki Faktörlü Kimlik Doğrulama</span> Aktif Et </label>
                            </div>
                            <p className='text-gray-400 ml-5'>İki faktörlü kimlik doğrulama (2FA), kaynaklara ve verilere erişmek için iki kimlik biçimi gerektiren bir kimlik ve erişim yönetimi güvenlik yöntemidir. </p>
                        </div> */}

{/*
                        <div className='mt-5'>
                            <button className = "btn btn-primary hover:bg-blue-600" onClick = {() => {saveChanges()}}>Save Changes</button>
                        </div> */}

                    </div>
                    }


                    {selected === "3" &&

                    <div className='w-full md:ml-5 mt-2'>
                        <p className='font-bold text-xl'>Delete your account</p>
                        <p className='text-gray-500'>If you recover it and close it, your current profile will be gone forever with our control and your money. Are you sure? (Cannot be undone)</p>
                        <button onClick = {() => deleteAccount()} className='btn bg-red-700 md:w-1/4 mt-2  hover:bg-red-800'>Kapat</button>

                        {deleteModal &&
                            <div>
                                <p>Are you sure you want to delete your account?</p>
                                <button className='w-full md:w-1/2 btn bg-red-700 hover:bg-red-800' onClick = {() => deleteFinalAccount()}>Delete my account</button>
                            </div>
                        }
                    </div>

                    }


            </div>



        </div>
    </div>
  )
}

export default Settings