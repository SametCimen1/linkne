import React, {useEffect, useState} from 'react'
import SmallLinks from './SmallLinks'
import api from '../services/api'

function Links({menuChange}) {
  const [links, setLinks] = useState([]);
  const [showName, setShowName] = useState(true);
  
  const getLinks = async() =>{
    api.get('/user/getmylinks').then((res)=>{
      const data = res.data.sort(function(a, b) {
        return b.id - a.id;
      });
      setLinks(data)
    })
  } 
  useEffect(() => {
    getLinks();
  },[])

  return (

    <div>
      
        <div className='mt-5'>

          {links.length> 0 ? links.map((elem) => {
            return(
              <SmallLinks menuChange = {menuChange} elem = {elem}></SmallLinks>
            )
          })
          :
          <p>You do not have any links yet! You can create one by clicking the 'create link' button. Email us or dm us on discord if you have any questions</p>
          }
          
          

        </div>
    </div>
  )
}

export default Links