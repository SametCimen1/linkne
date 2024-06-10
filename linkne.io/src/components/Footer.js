 const Footer = () => {
  return (
    <div className='w-full bg-black'>
        <div className = "container flex justify-between py-3 mx-auto">
            <div className='w-30 md:block hidden'>
                <h1 className='text-4xl font-bold text-white'>linkne<span className = "green">.io</span></h1>
                <p className='text-gray-400 mt-1'>linkne.io is much more than a URL-shortener. We are constantly updating our website and bringing lots of great new features. Shorten a link and start making money.</p>
            </div>

            <div className='flex flex-col md:flex-row md:w-1/2  md:justify-between mx-auto text-center md:text-left'>
                <div className='md:w-33 mt-3 md:mt-0'>
                    <h5 className='text-white text-2xl font-bold'>Payment</h5>
                    <ul className='text-muted navbar-nav'>
                        <li><a className='green text-decoration-none line-through'>Payment rates</a></li>
                        <li><a className='text-gray-400 line-through'>About payment</a></li>
                        <li><a  className='text-gray-400 line-through'>Anonymity</a></li>
                    </ul>
                </div>

                <div className='md:w-33 mt-3 md:mt-0'>
                    <h5 className='text-white text-2xl font-bold'>Privacy Policy</h5>
                    <ul className='text-muted navbar-nav'>
                        <li className=''><a className='green text-decoration-none' href = "/termsofuse">Terms of Use</a></li>
                        <li><a className='text-gray-400' href = "/privacy">Privacy Policy</a></li>
                    </ul>
                </div>


                <div className='md:w-33 mt-3 md:mt-0'>
                    <h5 className='text-white display-20 text-2xl font-bold'>Contact us</h5>
                    <ul className='text-muted navbar-nav'>
                        <li className=''><a className=' text-gray-400 text-decoration-none' href = "mailto:support@linkne.io">Send us an E-mail</a></li>
                        <div className='flex justify-center'>
                            <img src = "images/twitter.svg"></img>
                            <img src = "images/instagram.svg"></img>
                            <img src = "images/telegram.svg"></img>
                        </div>
                    </ul>
                </div>

            </div>
            

        </div>
    </div>
  )
}


export default Footer