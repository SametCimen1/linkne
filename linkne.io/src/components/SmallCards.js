const smallCards = (props) => {
  return ( 
    <div className = "md:w-15 w-full mt-5   d-flex  py-1">
        <img className = "w-75 m-auto" src = {props.image}></img>      
    </div>
  )
}

export default smallCards