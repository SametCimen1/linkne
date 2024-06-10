import React, {useState, useEffect} from 'react'
import api from "../services/api";
import { useSelector, useDispatch } from 'react-redux'
import {logOut, saveInfo} from '../services/counterSlice'


function Layout({children}) {

  const [theme, setTheme] = useState("light");
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  

  const getAuth = async() => {
    await api.post("/auth/check").then((res) => {
      dispatch(saveInfo(res.data))
      setIsLoaded(true)
    }); 
  }



  

  
  useEffect(() => { 
    const currentTheme = localStorage.getItem('theme');
    if(currentTheme !== null){
      setTheme(currentTheme)
    }
    else{
      localStorage.setItem('theme', "light")
      setTheme("light")
    }
    getAuth();
  }, [])
  
  const  changeTheme = (theme) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }

  return (
    <div data-theme = {theme} className="main min-h-screen">

      <div className = " bg-black px-2  sm:px-0 lg:w-full ">
        <div className=''>
          <div className='py-3 flex items-center mx-auto  justify-between container'>
              
              
              <div className='md:w-1/3 w-11/12 '>
                <a href ="https://linkne.io" className = ""><h1 className = "text-4xl text-white" >linkne.<span className="green">io</span></h1></a>
                <a href ="https://linkne.link" className = ""><h1 className = "text-md text-gray-500" >for linkne.<span className="green">link</span></h1></a>
              </div>



              <div className="dropdown dropdown-end  inline-flex md:hidden text-white">

 
            {user.loggedIn ?
                    <div className="dropdown  dropdown-end text-black">
                      <img tabIndex="0" className = "w-14 h-14  rounded-xl cursor-pointer  object-cover ml-2" src = {`${user.picture.includes("http") ? user.picture : "http://localhost:5500/images/" + user.picture} `}  /> 
                      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='mt-1 focus:bg-slate-300'><a className = "focus:bg-slate-300 hover:bg-slate-200"  href = "/dashboard">Panel</a></li>
                        <li className='mt-1'><a className = "focus:bg-slate-300 hover:bg-slate-200" href = {`/${user.username}`}>Public Profile</a></li>
                        <li className='border-2  bg-red-500 rounded-2xl mt-1' ><a  href = "/" className = "hover:bg-red-700 " onClick = {() => {dispatch(logOut()); window.location.reload()}}>Log out</a></li>
                      </ul>
                    </div>
              :  
              <div>
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                  <li><a href = "/">Home</a></li>
                  <li><a href = "/signin">Sign in</a></li>
                  <li><a href = "/signup">Sign up</a></li>
                </ul>
              </div>
              }  

            </div>

            {user !== undefined && 
             <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <nav className = "list-none flex items-center md:flex-row md:space-x-3 md:mt-0  ">
                

                <div className = "dropdown">
                  <li  href = "/" tabIndex="0" className=" text-white nav-link hover:cursor-pointer ">Languages</li>
                  <ul tabIndex="0" className="dropdown-content menu  shadow bg-base-100 rounded-box  w-40">
                    <li><a href = "https://en.linkne.io">English</a></li>
                    <li><a href = "https://tr.linkne.io">Türkçe</a></li>
                  </ul>
                </div>

                <div className = "dropdown">
                  <li  href = "/" tabIndex="0" className=" text-white nav-link hover:cursor-pointer ">Themes</li>
                  <ul tabIndex="0" className="dropdown-content menu  shadow bg-base-100 rounded-box  w-40">
                    <li onClick = {e => changeTheme("light")}><a>Light</a></li>
                    <li onClick = {e => changeTheme("black")}><a>Dark</a></li>
                    <li onClick = {e => changeTheme("valentine")}><a>Pink</a></li>
                    <li onClick = {e => changeTheme("night")}><a>Night</a></li>
                    <li onClick = {e => changeTheme("synthwave")}><a>Synthwave</a></li>
                  </ul>
                </div>
                
                {isLoaded === false 
                ?
                <div>
                  <div class="flex justify-center items-center">
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  </div>
                </div>
                : 
                <div className='flex items-center justify-between'>
                  {!user.loggedIn && 
                    <div c>
                      <a className = "text-white nav-link mx-2 " href = "/">Payment rates</a>
                    </div>
                  }


                  {!user.loggedIn && 
                    <div>
                      <a className = "text-white nav-link mx-2" href = "/">Advertise</a>
                    </div>
                  }


                  {!user.loggedIn &&
                    <div> 
                      <a href = "/signin"><button type = "button" className = "btn btn-primary" style = {{"marginRight":"1rem"}}>SIGN IN</button></a>
                      <a href = "/signup"><button type = "button" className = "btn hover:bg-green-700 btn-green border-0 text-black ">SIGN UP</button></a>                
                    </div>
                  } 
                  </div>}

                  {/* {user.loggedIn && <a className = "text-white nav-link " href >Ayarlar</a>}
                   */}

 
                  {user.loggedIn &&
                    <div className="dropdown  dropdown-end">
                      <img tabIndex="0" className = "w-14 h-14  rounded-xl cursor-pointer  object-cover " src = {`${user.picture.includes("http") ? user.picture : "http://localhost:5500/images/" + user.picture} `}  /> 
                      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='mt-1 focus:bg-slate-300'><a className = "focus:bg-slate-300 hover:bg-slate-200"  href = "/dashboard">Panel</a></li>
                        <li className='mt-1'><a className = "focus:bg-slate-300 hover:bg-slate-200" href = {`/${user.username}`}>Public Profile</a></li>
                        <li className='border-2  bg-red-500 rounded-2xl mt-1' ><a href = "/" className = "hover:bg-red-700 " onClick = {() => {dispatch(logOut()); window.location.reload()}}>Log out</a></li>
                      </ul>
                    </div>
                  }  


                
              
            


                </nav>
                
                  
                </div>
          } 

        </div>
      
        
</div>

</div>


      <main>
        
        {children }
      
      </main>



      
    </div>
  )
}

export default Layout