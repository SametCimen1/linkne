import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Masonry,  {ResponsiveMasonry} from "react-responsive-masonry"
import api from '../services/api'
import LinkSVG from '../components/svgs/LinkSVG'
import EyeSVG from '../components/svgs/EyeSVG'



function PublicProfile(){
    const [userName, setUserName] = useState();
    const { name } = useParams();
    const [user, setUser] = useState();
    const [links, setLinks] = useState();
    const [search, setSearch] = useState('')
    const [newLinks, setNewLinks] = useState([]);
    const [selectedTab, setSelectedTab] = useState(1);
    const [agreed, setAgreed] = useState(undefined)
    let navigate  = useNavigate();

    const GetName = async() =>{
        setUserName(name);
        await api.put("/user/getUserByName", {
            name
        }).then((res) => {
            const data= res.data;
            if(data === undefined){navigate('/404')}
            else{setUser(data);}
        }).catch(()=> {})
    }

    const getLinks = async() =>{

        await api.put("/user/getlinks", {
            name
        }).then((res) => {

            const data= res.data;

            data.sort(function(a, b) {
                return b.id - a.id;
            });
            setLinks(data)

        }).catch(()=> {navigate('/404')})

    }








    useEffect(() => {
        if(search.length > 0){

            setNewLinks(links.filter((elem) => {
                return (elem.header.toLowerCase().includes(search.toLowerCase()))
            }));
        }
        else{
            setNewLinks([]);
        }


    },[search])

    useEffect(() => {
        const allowedornot = localStorage.getItem("agreed");

        if(allowedornot !== undefined){

          const newVal = (allowedornot === 'true');
          setAgreed(newVal)

        }
        else{
          localStorage.setItem('agreed', false)
          setAgreed(false)
        }

      },[])

      const changePreferences = () => {
        localStorage.setItem('agreed', true)
        window.location.reload();


    return(
        <div>


        {!agreed &&

        <div class="fixed z-50 px-4  bottom-0 w-full bg-black opacity-70" >
            <div className = "opacity-100 container mx-auto">
            <p class="py-4  text-white ">We use cookies to optimize site functionality and give you the best possible experience. <a href = "https://linkne.io/privacy" className = "text-blue-500">Learn More</a>. By using our site, you agree to our <a href = "https://linkne.io/privacy" className='text-blue-500'> privacy and policy</a> and <a href = "https://linkne.io/terms" className='text-blue-500'>terms of use</a>       <button className='btn hover:bg-green-700 btn-green' onClick = {() => changePreferences()}>okay</button></p>
            </div>
        </div>
        }
        <div className='container px-md:px-0 mx-auto min-h-screen screen'>
            {user !== undefined &&
            <div className='container mb-5'>
                <div className='flex py-5 flex-col md:flex-row'>

                    <div className='w-4/5 md:w-1/5 mx-auto lg:mx-0'>
                        <div class="avatar ">
                            <div class=" rounded  border-2 border-black">
                                <img className = "w-full " src= {`${user.picture.includes('http') ? `${user.picture}`:`http://localhost:5500/images/${user.picture}`} `} />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-align  w-4/5 mx-auto md:ml-2 '>
                        <h1 className='font-bold text-4xl text-center md:text-left  '>{userName}</h1>
                        <div className = "flex p-1 text-base font-light   items-center flex-col md:flex-row">
                            <p className = "mr-1 ">{user.totalLinks} Links </p>
                            {/* <span className='w-1 h-1 mx-1 bg-black rounded-full hidden md:block'></span> */}
                            {/* <p className = "mr-1">5124 Toplam Tiklanma</p>
                            <span className='w-1 h-1 mx-1 bg-black rounded-full hidden md:block'></span>
                            <p className = "mr-1">184 Takipci</p> */}
                        </div>

                        {/* {user.me ?

                            <button className='mt-1 btn bg-red-500 hover:bg-red-400 bg-transparent border-2 border-red-300  w-full text-black  mx-auto md:w-1/3 md:mx-0'>Herkese Açık Profili Kapat</button>

                            :

                            <button className='mt-1 btn btn-primary w-full  mx-auto md:w-1/3 md:mx-0 '>Haber Ver</button>
                        } */}

                        {/* <p className='text-gray-400 text-sm'>*Açık profil herkesin sizi gormesini saglar</p> */}

                    </div>

                </div>



                        <div className='mt-4 flex w-4/5 align-center mx-auto justify-center  md:mx-0 md:justify-start  '>
                            <input type="text" placeholder="Search for link names or tags" class="input input-bordered w-full max-w-xs" value = {search} onChange = {(e) => setSearch(e.target.value)}/>
                            <button className='btn btn-primary ml-1' >Search</button>
                        </div>


                        <div className="tabs mt-5 justify-center">
                            <a className={`tab tab-lifted ${selectedTab === 1 && "tab-active"}`} onClick = {(e) => setSelectedTab(1)}>List</a>

                            <a className={`tab tab-lifted ${selectedTab === 2 && "tab-active"}`} onClick = {(e) => setSelectedTab(2)}>Masonry</a>
                        </div>



                {/*card area*/}




                {selectedTab === 2 ?
                    <ResponsiveMasonry columnsCountBreakPoints={{640: 1, 768: 2, 1024: 3, 1280: 4}}>
                        <Masonry columnsCount={4} gutter="20px" className='px-2 md:px-0 '>

                                { ((search.length ===0) &&links !== undefined) ?
                                    links.map( (elem)=> {
                                        return(
                                            <div className='mx-1 mt-2 rounded'>
                                                <a class=" rounded  overflow-hidden mt-5 transition ease-in-out delay-150 hover:cursor-pointer duration-300" href = {`https://linkne.link/${elem.newname}`}>

                                                        <div className={`w-full ${elem.picture !== "" ?  "" : "border-2 imageBorder"}`}>
                                                            { elem.picture !== "" ? <img class={`w-full `} src = {`${elem.picture.includes("http") ? elem.picture : "http://localhost:5500/images/" + elem.picture} `} alt="Link Picture" /> : <div className = "h-48 flex justif-center items-center"><LinkSVG> </LinkSVG></div>}
                                                        </div>

                                                        <div class=" flex flex-col justify-center">
                                                            <div class="font-semibold md:text-base text-sm">{elem.header}</div>
                                                            <p class="text-gray-500  text-medium">{elem.description}</p>
                                                        </div>

                                                        <div className='mb-2'>
                                                            <div className='flex'>
                                                              <a className='hover:text-blue-500 text-sm' href = {`https://en.linkne.io/${elem.username}`}>{elem.username}</a>
                                                              <p className='ml-2 font-light text-sm'>{elem.link_time}</p>
                                                              <div className='flex items-center ml-2'>
                                                                <EyeSVG></EyeSVG>
                                                                <p className='text-sm ml-1'>{elem.views}</p>
                                                              </div>
                                                            </div>
                                                        </div>

                                                </a>
                                            </div>
                                        )
                                    })

                                    :

                                    newLinks.map( (elem)=> {
                                        return(

                                          <div className='mx-1 mt-2 rounded'>
                                          <a class=" rounded  overflow-hidden mt-5 transition ease-in-out delay-150 hover:cursor-pointer duration-300" href = {`https://linkne.link/${elem.newname}`}>

                                                  <div className={`w-full ${elem.picture !== "" ?  "" : "border-2 imageBorder"}`}>
                                                      { elem.picture !== "" ? <img class={`w-full `} src = {`${elem.picture.includes("http") ? elem.picture : "http://localhost:5500/images/" + elem.picture} `} alt="Link Picture" /> : <div className = "h-48 flex justif-center items-center"><LinkSVG> </LinkSVG></div>}
                                                  </div>

                                                  <div class=" flex flex-col justify-center">
                                                      <div class="font-semibold md:text-base text-sm">{elem.header}</div>
                                                      <p class="text-gray-500  text-medium">{elem.description}</p>
                                                  </div>

                                                  <div className='mb-2'>
                                                      <div className='flex'>
                                                        <a className='hover:text-blue-500 text-sm' href = {`https://en.linkne.io/${elem.username}`}>{elem.username}</a>
                                                        <p className='ml-2 font-light text-sm'>{elem.link_time}</p>
                                                        <div className='flex items-center ml-2'>
                                                          <EyeSVG></EyeSVG>
                                                          <p className='text-sm ml-1'>{elem.views}</p>
                                                        </div>
                                                      </div>
                                                  </div>

                                          </a>
                                      </div>
                                        )
                                    })


                                }




                        </Masonry>
                    </ResponsiveMasonry>

                    :

                        <div className='w-11/12 mx-auto md:justify-around justify-center lg:justify-start lg:mx-auto flex  wrap md:w-full '>

                                {((search.length === 0) && links !== undefined ) ?
                                    links.map( (elem)=> {
                                            return(
                                                <div className='md:w-publicCardMd lg:w-publicCardLg w-publicCard   mt-3 rounded md:mx-1'>
                                                    <a class=" rounded overflow-hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  hover:cursor-pointer duration-300" href = {`https://linkne.link/${elem.newname}`}>
                                                        <div className={`w-full object-cover ${elem.picture !== "" ?  "" : "border-2 imageBorder"}`}>
                                                            { elem.picture !== "" ? <img class={`w-full  h-48 object-cover `} src = {`${elem.picture.includes("http") ? elem.picture : "http://localhost:5500/images/" + elem.picture} `} alt="Link Picture" /> : <div className = " h-48 flex justif-center items-center"><LinkSVG> </LinkSVG></div>}
                                                        </div>

                                                        <div class=" flex flex-col justify-center">
                                                            <div class="font-semibold md:text-base text-sm">{elem.header}</div>
                                                            <p class="text-gray-500  text-medium">{elem.description}</p>
                                                        </div>

                                                        <div className='mb-2'>
                                                            <div className='flex'>
                                                              <a className='hover:text-blue-500 text-sm' href = {`https://en.linkne.io/${elem.username}`}>{elem.username}</a>
                                                              <p className='ml-2 font-light text-sm'>{elem.link_time}</p>
                                                              <div className='flex items-center ml-2'>
                                                                <EyeSVG></EyeSVG>
                                                                <p className='text-sm ml-1'>{elem.views}</p>
                                                              </div>
                                                            </div>
                                                        </div>

                                                    </a>
                                                </div>

                                            )
                                        })

                                    :

                                    newLinks.map( (elem)=> {
                                          return(

                                            <div className='md:w-publicCardMd lg:w-publicCardLg w-publicCard   mt-3 rounded mx-1'>
                                            <a class=" rounded overflow-hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  hover:cursor-pointer duration-300" href = {`https://linkne.link/${elem.newname}`}>
                                                <div className={`w-full object-cover ${elem.picture !== "" ?  "" : "border-2 imageBorder"}`}>
                                                    { elem.picture !== "" ? <img class={`w-full  h-48 object-cover `} src = {`${elem.picture.includes("http") ? elem.picture : "http://localhost:5500/images/" + elem.picture} `} alt="Link Picture" /> : <div className = " h-48 flex justif-center items-center"><LinkSVG> </LinkSVG></div>}
                                                </div>

                                                <div class=" flex flex-col justify-center">
                                                    <div class="font-semibold md:text-base text-sm">{elem.header}</div>
                                                    <p class="text-gray-500  text-medium">{elem.description}</p>
                                                </div>

                                                <div className='mb-2'>
                                                    <div className='flex'>
                                                      <a className='hover:text-blue-500 text-sm' href = {`https://en.linkne.io/${elem.username}`}>{elem.username}</a>
                                                      <p className='ml-2 font-light text-sm'>{elem.link_time}</p>
                                                      <div className='flex items-center ml-2'>
                                                        <EyeSVG></EyeSVG>
                                                        <p className='text-sm ml-1'>{elem.views}</p>
                                                      </div>
                                                    </div>
                                                </div>

                                            </a>
                                        </div>
                                          )
                                      })



                                }

                        </div>
                    }




            </div>
            }
        </div>
        </div>
    )
      }

    }
export default PublicProfile;