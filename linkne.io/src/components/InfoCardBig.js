const InfoCardBig = (props) => {
  return (
    <div className='w-full  hover:border-blue-500 lg:w-5/12  rounded-md flex items-center mt-2 '>
        <div className = "w-full  ">
            <div className=" p-5 flex lg:flex-row flex-col flex items-center w-full"> 
                <div className=' '> 
                    <div className = "m-auto w-full">{props.children}</div>
                </div>
            <div className="lg:w-10/12 lg:ml-1 mt-2 lg:p-3 text-center lg:text-left">
                    <h5 className=" py-1 text-2xl font-bold">{props.title}</h5>
                    <p className="card-text text-muted mt-2">{props.text}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InfoCardBig