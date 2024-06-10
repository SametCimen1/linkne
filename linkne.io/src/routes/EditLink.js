import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'
import api from '../services/api'


const EditLink = () => {
    const { id } = useParams();
    const [normalLink, setNormalLink] = useState("");
    const [picture, setPicture] = useState("")
    const [linkInfo, setLinkInfo] = useState(undefined)
    let navigate  = useNavigate();

    const [newOldName, setNewOldName] = useState("") 
    const [newPicURL, setNewPicURL] = useState("")
    const [file, setFile] = useState(undefined);
    const [tags, setTags] = useState ([]); 
    const [successMessage, setSuccessMessage] = useState("")


    const createLink = async(e) => {
        e.preventDefault();
        if((newOldName !== linkInfo.oldname && newOldName !== "") || file !== undefined || newPicURL !== ""){
            if(newPicURL !== "" && file !== undefined){
                alert("Lütfen sadece 1 tane resim seçeneği seçiniz")
            }else{
                if(newPicURL !== "" || newOldName !== ''){ // user wants to update header and pic URL
                    await api.post('/user/updatelink', {
                        newOldName, newPicURL,id   
                    })
                    if(file === undefined){
                        alert("Link başarı ile değiştirildi")
                        navigate('/dashboard?action=links')
                    }
                }
                if(file !== undefined){
                    updatePicture()
                }

            }
        }
        else if(tags.length !== 0){
            if(tags.length < 5){
                alert("please enter at least 5 tags")
            }else{
                await api.post('/user/updateTags', {
                    tags,id
                })
                alert("link updated successfully")
                navigate('/dashboard?action=links')
            }

        }
        else{
            alert("no change has been made")
        }
    }

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);   
    };
    
    const checkIfIncludes = (myTag) => {
        tags.includes(myTag)
    }

    const addTags = event => {
        if(tags.length === 20){
            alert("You can add maximum 20 tags")
        }else{
            if(event.target === undefined){
                if(event.length > 50){
                    alert("The Tag is too long")
                }else{
                    setTags([...tags, event.toLowerCase()]);
                }

            }
            else if (event.target.value !== "") {
                if(event.target.value.length > 50){
                    alert("The Tag is too long")
                }else{
                    setTags([...tags, event.target.value.toLowerCase()]);
                    event.target.value = "";
                }
            }
        }

    };


    const updatePicture = async() => {

        const formData = new FormData()
        formData.append("image", file)
        formData.append('id', id)
        if(file !== undefined){
            const result = await api.post('/user/uploadLinkPicture', formData, { headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                if(res.data === true || res.data === 'true'){
                    alert("Link image successfully changed")
                    navigate('/dashboard?action=links')
         
                }
            })
        }
        else if(file !== null &&picture !== ""){
            alert("choose one of the options")
        }

    }



    const deleteLink = async(e) => {
        e.preventDefault();
        await api.post("/user/deletelink", {
            id
        }).then((res) => {
            const data= res.data;
            navigate('/dashboard?action=links')
        }).catch((err) => {
            alert("Error occurred, please try again later");
        })
    }

    const getLinkInfo = async() => {
        await api.put('/user/getLinkInfo', {
            id
        }).then((res) => {setLinkInfo(res.data); setNewOldName(res.data.oldname)})
    }

    useEffect(() => {
        getLinkInfo()
    },[])


    return (
        <div className='mt-3 '>
            {linkInfo === undefined ? <div><h1>Sorry, we cannot find the link</h1></div> : 
                <div className='md:w-1/2 bg-white p-3 mx-auto'>
                    
                    <div className='mt-5'>
                        <label>Link</label>
                        <input  type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder = {linkInfo.oldname}  value = {newOldName} onChange = {(e) => {setNewOldName(e.target.value)}}/>
                    </div>

                    <div className='mt-5'>
                        <label>Link Name (You can't change it for now)</label>
                        <input  type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" disabled id="Password" value = {linkInfo.newname} />
                    </div>


                    
                    <div className='mt-5'>
                        <div>
                            <label>Picture</label>
                        </div>
                        
                        <div className='flex md:flex-row flex-col justify-between items-center'>
                            <input  type="text" class="bg-gray-100 appearance-none border rounded md:w-2/5 w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Image URL'si"   value = {newPicURL} onChange = {(e) => {setNewPicURL(e.target.value)}} />
                            <p>Or</p>
                            <input  type="file" class="bg-gray-100 appearance-none border rounded md:w-2/5 w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Image Link" onChange = {(e) => setFile(e.target.files[0])}  />
                        </div>

                        <div className='w-full my-5'>
                            <label>New Tags (Max 20) Press Enter After Writing the Tag</label>
                            <input placeholder = "Tags" onKeyUp={event => event.key === "Enter" ? addTags(event) : null} type = "text" className="bg-gray-100  appearance-none border rounded w-full  py-2 px-3 text-gray-700 focus:shadow-outline p-3"></input>
                            
                            <div className='rounded shadow p-3 flex flex-col bg-white'>
                                
                                <ul className = 'flex items-center  mt-2' id="tags">
                                    <label className='p-1'>Selected Tags:</label>
                                    <div className='flex wrap'>
                                        {tags.map((tag, index) => (
                                            <li key={index} className="tag bg-gray-100 p-1 mx-2 mt-1">
                                                <span className='tag-title'>{tag}</span>
                                                <span className='tag-close-icon rounded-full'
                                                    onClick={() => removeTags(index)}
                                                >
                                                    x
                                                </span>
                                            </li>
                                        ))}
                                    </div>
                                </ul>

                            </div>
                        </div> 

                    </div> 


                    <div className='mt-5'>
                        <button className='btn bg-blue-500 hover:bg-blue-700  w-full' onClick = {(e) => {createLink(e)}}>Save</button>
                    </div>



                    <div className='mt-5'>
                        <button className='btn btn-ghost hover:bg-red-700 bg-red-500 w-full' onClick = {(e) => {deleteLink(e)}}>Delete</button>
                    </div>
                    <p className='mt-5 text-sm font-light text-slate-500'>You will lose all of the amount of views you got if you delete the link! Your money will not be affected</p>

                    {successMessage.length > 1 && 
                        <div>
                            <div class="alert alert-info">
                                <div className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Link updated successfully</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                  
            }
        </div>
    )
}



export default EditLink