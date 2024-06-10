import React, {useState} from 'react'
import LinkSVG from './svgs/LinkSVG'


import api from '../services/api'
import Eye from '../components/svgs/Eye'
import DashboardMoney from './svgs/DashboardMoney'
import {Link } from "react-router-dom";
import EighteenSVG from './svgs/EighteenSVG'


const SmallLinks = (props) => {
    const [visibility, setVisibility] = useState(props.elem.is_visible);
    const [showGraph, setShowGraph] = useState(false);
    const id = 3;

    let myNewName = '';
    if(props.elem.oldname.includes('.com')){
        myNewName = props.elem.oldname.split('.com')[0]
    }
    else if(props.elem.oldname.includes('.info')){
        myNewName = props.elem.oldname.split('.info')[0]
    }
    else if(props.elem.oldname.includes('.net')){
        myNewName = props.elem.oldname.split('.net')[0]
    }
    else if(props.elem.oldname.includes('.ru')){
        myNewName = props.elem.oldname.split('.ru')[0]
    }
    else if(props.elem.oldname.includes('.org')){
        myNewName = props.elem.oldname.split('.org')[0]
    }
    else if(props.elem.oldname.includes('.tr')){
        myNewName = props.elem.oldname.split('.tr')[0]
    }


    const hideLink = async() => {
        const id = props.elem.id;
        const reverseVisibility = !visibility
        setVisibility(reverseVisibility)


        await api.put('/user/hideMyLink', {
            id,
            reverseVisibility
        })
    }

    return (
        <div className= 'md:w-10/12  shadow currentColor rounded py-2 px-3 mt-3 animate__animated'>

                <div className='flex md:justify-between md:flex-row flex-col  items-center cursor-pointer  select-none '>

                    <div className='w-full flex mx-auto' onClick = {() => {if(!props.menuChange){setShowGraph((prev) => (!prev))}}}>

                        <div className=' ml-3 mx-auto'>
                            <p>/{props.elem.newname}</p>
                            <div className='flex'>
                                <a href = {props.elem.oldname} className='font-light text-blue-500 cursor-pointer'>{myNewName}</a>
                            </div>
                        </div>

                    </div>


                    <div className='lg:w-1/5  flex flex-col select-none  w-full sm:flex-row md:justify-end hidden md:flex'>

                        <a className='btn btn-ghost mt-2 sm:mt-0 sm:mr-2 '  target="_blank" rel="noreferrer" href = {`https://linkne.link/${props.elem.newname}`}>OPEN</a>
                        <button className='btn btn-primary bg-blue-500 mt-2 sm:mt-0 sm:mr-2 ' onClick={() => {navigator.clipboard.writeText(`https://linkne.link/${props.elem.newname}`)}}>COPY</button>
                        <Link to = {`/editlink/${props.elem.id}`}><button className='w-full md:w-min btn btn-warning bg-yellow-500 mt-2 sm:mt-0'>EDIT</button></Link>
                        {visibility  ?   <button className='btn btn-error bg-red-500  sm:mt-0 sm:ml-2 mt-2' onClick = {() => hideLink()}>HIDE</button> : <button className='btn border-2 border-green-500 text-black  sm:mt-0 sm:ml-2 mt-2 hover:bg-green-700' onClick = {() => hideLink()}>SHOW</button>   }

                    </div>


                </div>



                <p className = "text-sm text-zinc-600 mt-1">{props.elem.header}</p>

                <div className={` ${showGraph ? "block mt-3 w-4/5 mx-auto " : "hidden" }`}>


                    <div className='md:hidden visible'>
                        <div className='flex w-full mt-2 justify-between'>
                            <a className='forty40 btn btn-ghost  sm:mt-0' target="_blank" rel="noreferrer" href = {`https://linkne.link/${props.elem.newname}`}>OPEN</a>
                            <button className=' forty40  btn btn-primary bg-blue-500 sm:mt-0 ' onClick={() => {navigator.clipboard.writeText(`https://linkne.link/${props.elem.newname}`)}}>COPY</button>
                        </div>

                        <div className='flex w-full mt-2 justify-between'>
                            <Link className='forty40' to = {`/editlink/${props.elem.id}`}><button className='w-full btn btn-warning bg-yellow-500'>EDIT</button></Link>
                            {visibility  ?   <button className='btn btn-error bg-red-500  forty40' onClick = {() => hideLink()}>HIDE</button> : <button className='btn border-2 border-green-500 text-black hover:bg-green-700 forty40' onClick = {() => hideLink()}>SHOW</button>   }
                        </div>
                    </div>


                    <div className='flex justify-between items-center md:flex hidden '>



                        <div className='saodwdasdsa w-1/3 shadow text-center rounded '>
                            <p>VIEWS</p>
                            <div className='flex items-center justify-center'>
                                <Eye></Eye>
                                <p className='mx-3'>{props.elem.views}</p>
                            </div>
                        </div>


                        <div className='saodwdasdsa w-1/3 shadow text-center  rounded '>
                            <p>EARNINGS</p>
                            <div className='flex items-center justify-center'>
                                <DashboardMoney></DashboardMoney>
                                <p className='mx-3'>$</p>
                            </div>

                        </div>

                </div>
                 {/* <div className='mt-3 md:block hidden'>
                    <Link to = {`/mylinks/${id}`}><button className="btn w-full bg-blue-500">Detailed Stats</button></Link>
                </div> */}

            </div>


        </div>
  )
}

export default SmallLinks