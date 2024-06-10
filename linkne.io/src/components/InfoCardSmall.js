const  InfoCardSmall = (props) =>  {
  return (
    <div className = "w-full mt-2 card md:w-1/5">
      <div className="rounded-lg hover:border-blue-500 py-2"> 
        <div className='fill-neutral mx-auto  mt-1'>{props.children}</div>
        <div className="mt-2 p-3">
          <h5 className="text-center font-bold  text-2xl ">{props.title}</h5>
          <p className="text-center mt-2">{props.text}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoCardSmall