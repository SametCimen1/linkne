import {useState, useEffect} from 'react'

import CreateLinkSVG from '../components/svgs/CreateLinkSVG'
import Earnings from '../components/Earnings';
import HomeSVG from '../components/svgs/HomeSVG';
import LinkSVG from '../components/svgs/LinkSVG';
import WithdrawSVG from '../components/svgs/WithdrawSVG';
import EtkinlikSVG from '../components/svgs/EtkinlikSVG';
import WhoAreWeSVG from '../components/svgs/WhoAreWeSVGDashboard'
import CommentsSVG from '../components/svgs/CommentsSVG'
import SettingsSVG from '../components/svgs/SettingsSVG';


import Links from '../components/Links';
import CreateLink from '../components/CreateLink';
import Settings from '../components/Settings';
import { ContactUs } from '../components/ContactUs';
import { Referans } from '../components/Referans';


import api from "../services/api";
import { useSelector} from 'react-redux'
import { useNavigate,useSearchParams  } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
    useEffect(() => {
        AOS.init(
          {
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            offset: 220, // offset (in px) from the original trigger point
            delay: 100, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
          }
        );
        AOS.refresh();
      }, []);

    let navigate  = useNavigate();
    const [normalLink, setNormalLink] = useState("");
    const [linkName, setLinkName] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");
    const [header, setHeader] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [menuChange, setMenuChange] = useState(false);
    const [file, setFile] = useState(undefined);
    const [linkId, setLinkId] = useState(undefined);
    const myUser = useSelector((state) => state.counter);
    const [searchParams] = useSearchParams();
    const [category, setCategory] = useState('')
    const [finalCreation, setFinalCreation] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [fileName, setFileName] = useState("");

    const action = searchParams.get("action");
    const [maxiumum, setMaxiumum] = useState(false);
    const [selected, setSelected] = useState("2");


    const [allTags, setAllTags] = useState(['turk', 'olgun', 'sikis', 'milf', 'uvey', 'konulu', 'gay', 'lez'])
    const [tags, setTags] = useState([]);
//   const [tagSearch, setTagSearch] = useState('')
//   const [selectedTags, setSelectedTags] = useState([]);


    const createLink = async(e) => {

        e.preventDefault();
        setFinalCreation(false);
        setIsCreated(false);

        if(normalLink === ''){
            setErrorMessage("Please enter the link")
        }

        else if(category === '' ||category === 'Select a Category' ){
            setErrorMessage("Please select a category")
            return;
        }
        else if(header === ""){
            setErrorMessage("Please enter a name for the link")
            return;
        }
        else if(header.length > 100){
            setErrorMessage("Link name can't be more than 100 characters")
            return;
        }
        else if(tags.length < 5){
            setErrorMessage("Please enter at least 5 tags");
            return;
        }
        else if(file !== undefined && file.size > 1000000){
            setErrorMessage("Image can't be larger than 1MB")
            return;
        }
        else{
            await api.post('/user/createlink', {
                normalLink,
                linkName,
                picture,
                header,
                description,
                category,
                tags
            }).then((res) => {
                if(typeof(res.data) === 'number'){
                    setIsCreated(true)
                }
                setLinkId(res.data)
            })


        }


    }


    useEffect(() => {
        if(isCreated === true && picture === '' && file !== undefined){
            updatePicture()
        }else if (isCreated === true && file === undefined){
            setFinalCreation(true)
        }
    },[isCreated])

    useEffect(()=> {
        if(finalCreation){
            setNormalLink("")
            setLinkName("")
            setPicture("")
            setHeader("")
            setDescription("")
            setTags([])
            setFile(undefined)
            setTimeout(() => setFinalCreation(false), 3000)
        }
        if(errorMessage.length > 1){
            setTimeout(() => setErrorMessage(''), 3000)
        }
    }, [finalCreation, errorMessage])

    useEffect(() => {
        getUser();
        if(action !== "" && action !== undefined){
            if(action === "refresh"){
                navigate("/dashboard?action=refreshed")
                window.location.reload();
            }
            if(action === "links"){
                setSelected("3")
            }
        }
    },[])

    const updatePicture = async() => {
        const formData = new FormData()
        formData.append("image", file)
        formData.append('id', linkId)
        if(file !== undefined){
            const result = await api.post('/user/uploadLinkPicture', formData, { headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                setFinalCreation(true)
            }).catch()
        }
        else if(file !== undefined && picture !== ""){
            setErrorMessage("choose one of the image options")
        }
        else if(file === undefined && picture !== ""){
            setFinalCreation(true)
        }

    }



    const getUser = async() => {
        api.get("/user/getUser").then((res) => {
            if(res.data === undefined){
                navigate('/')
            }
            setUser(res.data)
        })
    }






    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    const checkIfIncludes = (myTag) => {
        tags.includes(myTag)
    }

    const addTags = event => {
        if(tags.length === 20){
            setErrorMessage("You can add maximum 20 tags")
        }else{
            if(event.target === undefined){
                if(event.length > 50){
                    setErrorMessage("The Tag is too long")
                }else{
                    setTags([...tags, event.toLowerCase()]);
                }

            }
            else if (event.target.value !== "") {
                if(event.target.value.length > 50){
                    setErrorMessage("The Tag is too long")
                }else{
                    setTags([...tags, event.target.value.toLowerCase()]);
                    event.target.value = "";
                }
            }
        }

    };



  if(myUser.loggedIn === false){
    return (
        <div>
            Loading...
        </div>
    )

  }


  else{
  return (
    <div className = {`w-full flex ${menuChange && 'bg-gray-400 select-none'} h-screen`}>

      <div className='hidden  md:block md:w-24 lg:w-2/12 min-h-screen backdrop-blur-lg'>

      <div className='w-full  min-h-full'>

            <div className='py-5 '>
                {/* <div className= {`p-1 cursor-pointer my-3 flex  items-center round transition duration-200 rounded ${ selected === "1" ? "bg-green-500 " : "hover:bg-gray-200 "}`} onClick = { () => setSelected("1") }> */}


                <label  htmlFor="my-modal-5" className= {`px-3 py-2  flex cursor-pointer items-center  transition duration-200 rounded-br-lg rounded-tr-lg   ${ selected === "1" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black "}`}>
                        <div className='w-1/5'>
                            <CreateLinkSVG></CreateLinkSVG>
                        </div>
                        <div className='lg:w-4/5 xl:ml-0 hidden sm:ml-2 lg:ml-2 lg:block'>
                            <p className='text-xl ml-2'>Create Link</p>
                        </div>
                    </label>





                <div className={` px-3 py-2 my-3 flex cursor-pointer items-center  transition duration-200 rounded-br-lg rounded-tr-lg   ${ selected === "2" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => setSelected("2") }>
                    <div className='lg:w-1/5'>
                        <HomeSVG></HomeSVG>
                    </div>
                    <div className='lg:w-4/5 xl:ml-0 hidden sm:ml-2 lg:ml-2 lg:block'>
                        <p className='text-xl ml-2'>Dashboard</p>
                    </div>
                </div>



                <div className={`px-3 py-2 cursor-pointer my-3 flex  items-center  transition duration-200 rounded-br-lg rounded-tr-lg   ${ selected === "3" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => setSelected("3") }>
                    <div className='lg:w-1/5'>
                        <LinkSVG></LinkSVG>
                    </div>
                    <div className='lg:w-4/5 xl:ml-0 hidden sm:ml-2 lg:ml-2 lg:block'>
                        <p className='text-lg ml-2'>Links</p>
                    </div>
                </div>



                {/* <div className={`px-3 py-2 cursor-pointer my-3 flex items-center transition duration-200  rounded-br-lg rounded-tr-lg   ${ selected === "4" ? "bg-green-500 text-black" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => setSelected("4") }>
                    <div className='lg:w-1/5'>
                        <WithdrawSVG></WithdrawSVG>
                    </div>
                    <div className='lg:w-4/5 hidden lg:block ml-2'>
                        <p className='text-lg'>Çekilen Paralar</p>
                    </div>
                </div> */}


{/*
                <div className={`px-3 py-2 cursor-pointer my-3 flex items-center transition duration-200   rounded-br-lg rounded-tr-lg  ${ selected === "5" ? "bg-green-500 text-black" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => setSelected("5") }>
                    <div className='lg:w-1/5'>
                        <EtkinlikSVG></EtkinlikSVG>
                    </div>
                    <div className='lg:w-4/5 hidden lg:block ml-2'>
                        <p className='text-lg'>Görevler</p>
                    </div>
                </div> */}


                <div className={`px-3 py-2  cursor-pointer my-3 flex items-center transition duration-200  rounded-br-lg rounded-tr-lg   ${ selected === "6" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => setSelected("6") }>
                    <div className='md:w-1/5'>
                        <WhoAreWeSVG></WhoAreWeSVG>
                    </div>
                    <div className='lg:w-4/5 xl:ml-0 hidden sm:ml-2 lg:ml-2 lg:block '>
                        <p className='text-lg ml-2'>References</p>
                    </div>
                </div>





                <div className={`px-3 py-2  cursor-pointer my-3 flex items-center transition duration-200  rounded-br-lg rounded-tr-lg   ${ selected === "7" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => setSelected("7") }>
                    <div className='md:w-1/5'>
                        <CommentsSVG></CommentsSVG>
                    </div>
                    <div className='lg:w-4/5 xl:ml-0 hidden sm:ml-2 lg:ml-2 lg:block '>
                        <p className='text-lg ml-2'>Contact Us</p>
                    </div>
                </div>

                <div className={`px-3 py-2 cursor-pointer my-3 flex items-center transition duration-200  rounded-br-lg rounded-tr-lg   ${ selected === "8" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => setSelected("8") }>
                    <div className='lg:w-1/5'>
                        <SettingsSVG></SettingsSVG>
                    </div>
                    <div className='lg:w-4/5 xl:ml-0 hidden sm:ml-2 lg:ml-2 lg:block'>
                        <p className='text-lg ml-2'>Settings</p>
                    </div>
                </div>








            </div>



        </div>
      </div>

      {/* <div className=' dcxzcxz w-full bg-black'> */}

      <div className='w-full lg:w-full  bg-currentColor'>

          <button className='btn btn-ghost mt-2 md:hidden bg-gray-200 ml-1' onClick={() => setMenuChange(!menuChange)}>Panel</button>

          <div className='mx-2  mx-auto mt-2'>







                {menuChange && <div data-aos="fade-right" className = 'animate__animated animate__backInLeft  z-50   drawer-content w-72 top-0 left-0 bg-white  p-2 text-white fixed h-full z-40  ease-in-out duration-300 translate-x-0'>

                    <div className = "bg-white w-full flex backdrop-blur-lg">

                                <div className = "mt-5 mx-auto w-full text-black">


                                <label  htmlFor="my-modal-5" className= {`w-full py-2 my-3 flex cursor-pointer items-center  transition duration-200 rounded-lg   ${ selected === "1" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black "}`}>
                                        <div className='w-12 ml-1 '>
                                            <CreateLinkSVG></CreateLinkSVG>
                                        </div>
                                        <div className=''>
                                            <p className='ml-3 font-semibold'>Create Link</p>
                                        </div>
                                    </label>




                                    <div className={`w-full py-2 my-3 flex cursor-pointer items-center  transition duration-200 rounded-lg ${ selected === "2" ? "bg-green-500 text-black activeDashboard" : ""}`} onClick = { () => {setSelected("2"); setMenuChange(false);} }>
                                        <div className='lg:w-1/5 ml-1'>
                                            <HomeSVG></HomeSVG>
                                        </div>
                                        <div className='lg:w-4/5  ml-2'>
                                            <p className='font-semibold ml-2 '>Dashboard</p>
                                        </div>

                                    </div>





                                    <div className={`w-full py-2 my-3 flex cursor-pointer items-center  transition duration-200 rounded-lg   ${ selected === "3" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`} onClick = { () => { setSelected("3"); setMenuChange(false);}}>
                                        <div className='w-12 ml-1'>
                                            <LinkSVG></LinkSVG>
                                        </div>
                                        <div className='w-4/5 ml-2'>
                                            <button className='ml-3 font-semibold'>Links</button>
                                        </div>
                                    </div>



                                    <div className={`w-full py-2 my-3 flex cursor-pointer items-center  transition duration-200 rounded-lg   ${ selected === "6" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`}  onClick = { () => { setSelected("6"); setMenuChange(false);}}>
                                        <div className='w-12 ml-1'>
                                            <WhoAreWeSVG></WhoAreWeSVG>
                                        </div>
                                        <div className='w-4/5 ml-2'>
                                            <button className='ml-3 font-semibold'>References</button>
                                        </div>
                                    </div>



                                    <div className={`w-full py-2 my-3 flex cursor-pointer items-center  transition duration-200 rounded-lg   ${ selected === "7" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`}  onClick = { () => { setSelected("7"); setMenuChange(false);}}>
                                        <div className='w-12 ml-1'>
                                            <CommentsSVG></CommentsSVG>
                                        </div>
                                        <div className='w-4/5 ml-2'>
                                            <button className='ml-3 font-semibold'>Contact Us</button>
                                        </div>
                                    </div>




                                <div className={`w-full py-2 my-3 flex cursor-pointer items-center  transition duration-200 rounded-lg   ${ selected === "8" ? "bg-green-500 text-black activeDashboard" : "hover:bg-gray-200 hover:text-black"}`}  onClick = { () => { setSelected("8"); setMenuChange(false);}}>
                                        <div className='w-12 ml-1'>
                                            <SettingsSVG></SettingsSVG>
                                        </div>
                                    <div className='w-4/5 ml-2'>
                                        <button className='ml-3 font-semibold'>Settings</button>
                                    </div>
                                </div>


                                <div className={`w-full  my-2 flex cursor-pointer items-center text-thin text-base`}  onClick = { () => {setMenuChange(false);}}>

                                    <button className=' w-full  font-semibold bg-red-400 p-2 rounded'>Close</button>

                                </div>

                            </div>
                        </div>

                    </div>
                }





            {/* MODAL */}
            <input type="checkbox" id="my-modal-5" class="modal-toggle" />


                    <div class="modal">
                        <div class="modal-box w-11/12 max-w-5xl">

                        <h3 class="font-bold text-lg   ">Create A Link</h3>


                        {finalCreation ?
                    <div>
                        <div class="alert alert-info">
                            <div className=''>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Link created successfully, you can see it on the links page</span>
                            </div>
                        </div>
                    </div>
                    : "" }


                    {errorMessage.length > 1 &&
                    <div>
                        <div class="alert alert-error">
                            <div className=''>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{errorMessage}</span>
                            </div>
                        </div>
                    </div>
                     }

                    <div className='mt-5'>
                        <label>Link</label>
                        <input  type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Link"  value = {normalLink} onChange = {(e) => {setNormalLink(e.target.value)}}/>
                    </div>



                    <div className='mt-5'>
                        <label>Name ({header.length > 100 ? 0 : 100 - header.length} characters left)</label>
                        <input  type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Link Name" maxLength={100}   value = {header} onChange = {(e) => {setHeader(e.target.value)}}/>
                    </div>

                    <div className='mt-5'>

                        <div>
                            <label>Image (Optional) </label>
                        </div>

                        <div className='flex md:flex-row flex-col  justify-between items-center'>
                            <input  type="text" class="bg-gray-100 appearance-none border rounded w-full md:w-2/5 py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Image URL"  value = {picture} onChange = {(e) => {setPicture(e.target.value)}} />
                            <p>Or</p>
                            <input  type="file" class="bg-gray-100 appearance-none border rounded w-full md:w-2/5 py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Upload Picture" onChange = {(e) => {setFile(e.target.files[0]); setFileName(e.target.files[0].name)}}  />
                        </div>

                    </div>



                        <div className='mt-5 appearance-none  rounded w-full text-gray-700'>
                            <label>Category</label>
                            <div className='w-full'>
                                <select onChange = {(e) => setCategory(e.target.value)} value = {category} className="select w-full select-primary bg-gray-100">
                                    <option selected>Select a Category</option>
                                    <option value = "games">Games</option>
                                    <option value = "movies">Movies</option>
                                    <option value = "movies">Other</option>
                                </select>
                            </div>
                        </div>

                    <div className='appearance-none  rounded w-full text-gray-700'>
                        {/* <label>Tags (Seperate tags with a comma ' , ', maximum 5 tags )</label>
                        <input type="text" class=" bg-gray-100  appearance-none border rounded w-full  py-2 px-3 text-gray-700 focus:shadow-outline p-3" placeholder='tags (optional)' onChange = {(e) => {setTags(e.target.value)}} ></input> */}

                        <div className='w-full my-5'>
                            <label>Tags (Max 20)</label>
                            <input placeholder = "Tags" onKeyUp={event => event.key === "Enter" ? addTags(event) : null} type = "text" className="bg-gray-100  appearance-none border rounded w-full  py-2 px-3 text-gray-700 focus:shadow-outline p-3"></input>

                            <div className='rounded shadow p-3 flex flex-col bg-white'>

                                <div>
                                    <span className='p-1 '>Popular Tags: </span>
                                    <div className='flex w-full wrap'>
                                        {allTags.map((elem) => {
                                            if(tags.includes(elem)){
                                                return ''
                                            }else{
                                                return(<p onClick = {() => addTags(elem)} className='bg-gray-100 p-1  mx-1 mt-1'>{elem}</p>)
                                            }
                                        })}
                                    </div>
                                </div>

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



                    <div className = "flex justify-end">
                        <div class="modal-action mr-5">
                            <label for="my-modal-5" class="btn bg-red-500 hover:bg-red-700" onClick={() => setFinalCreation(false)}>Close</label>
                        </div>

                        <div class="modal-action">
                            <label for="my-modal-5" class="btn btn-primary" onClick = {(e) => createLink(e)}>Create</label>
                        </div>
                    </div>


                    </div>
            </div>
        </div>

            <div className={`w-full mt-2 pl-2 pr-2  ${menuChange && 'bg-gray-400 select-none'}`}>

                {selected === "1" &&
                <div>
                    <CreateLink ></CreateLink>
                </div>
                }


                {selected === "2" &&
                <div  className = "">
                    <Earnings></Earnings>
                </div>
                }



                {selected === "3" &&
                <div>
                    <Links menuChange = {menuChange}></Links>
                </div>
                }



                {selected === "6" &&
                <div>
                    <Referans></Referans>
                </div>
                }



                {selected === "7" &&
                <div className='cursor-none'>
                    <ContactUs menuChange = {menuChange}></ContactUs>
                </div>
                }



                {selected === "8" &&
                <div className=''>
                    <Settings menuChange = {menuChange}></Settings>
                </div>
                }

                <p className='ml-1 mr-1 mt-3 font-semibold text-slate-700 text-sm z-0 w-4/5 md:w-10/12 '>Our website is currently under construction. Most of the features are disabled for now, but will be available soon :) If you have any questions, you can send us <a className='link text-blue-500' href='mailto:support@linkne.io'>Email</a> or <a href = "" className='link text-blue-500'>Discord</a> you can join our channel</p>
            </div>


          </div>

      </div>


  )
}
}


export default Dashboard