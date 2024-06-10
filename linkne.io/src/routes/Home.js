import {React, useEffect, useState} from 'react'

import InfoCardSmall from '../components/InfoCardSmall'
import InfoCardBig from '../components/InfoCardBig';
import SmallCards from '../components/SmallCards';
import Footer from '../components/Footer'



import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useParams } from 'react-router-dom';

import Referans from '../components/svgs/Referans';
import ClickSVG from '../components/svgs/ClickSVG';
import LinkSVGBig from '../components/svgs/LinkSVGBig';
import MoneySVG from '../components/svgs/MoneySVG';
import WhoAreWeSVG from '../components/svgs/WhoAreWeSVG';
import HeartSVG from '../components/svgs/HeartSVG';
import IstatistikSVG from '../components/svgs/IstatistikSVG';
import Money2SVG from '../components/svgs/Money2SVG';


function Home() {
  const [agreed, setAgreed] = useState(undefined)
  const [convert, setConvert] = useState(false);
  const { ref } = useParams();
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
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      }
    );
    AOS.refresh();
  }, []);

  const setReference = () => {
    localStorage.setItem('ref', ref)
    window.location.replace('/');
  }

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
    if(ref === undefined || ref === 'undefined'){

    }else{
      setReference()
    }
  },[])

  useEffect(() => {
    if(convert === true){
      setTimeout(() => {
        setConvert(false)
      }, 4000)
    }
  }, [convert])

  const changePreferences = () => {
    localStorage.setItem('agreed', true)
    window.location.reload();
  }


  return (
    <div>
      {!agreed &&

      <div class="fixed z-50 px-4  bottom-0 w-full bg-black opacity-70" >
        <div className = "opacity-100 container mx-auto">
          <p class="py-4  text-white ">Our website is open for early access. Many features are disabled but will be available soon. We use cookies to optimize site functionality and give you the best possible experience. <a href = "https://linkne.io/privacy" className = "text-blue-500">Learn More</a>. By using our site you agree to our <a href = "https://linkne.io/privacy" className='text-blue-500'> privacy and policy</a> and <a href = "https:/linkne.io/terms" className='text-blue-500'>terms of use</a> <button className='btn hover:bg-green-700 btn-green text-black' onClick = {() => changePreferences ()}>OK</button></p>
        </div>
      </div>

    }

    {convert &&
        <div className="toast z-50">
          <div className="alert alert-error">
            <div>
              <span>This feature is currently out of use, but you can convert links in the 'dashboard' page after login.</span>
            </div>
          </div>
        </div>
      }



        <div className='w-full bg-black'>
          <section data-aos="fade-up"id = "home" className = "h-45 flex align-items-center justify-center">
            <div className=' container  flex flex-col  justify-center '>
              {/* <h2 className=  "px-5 text-center text-white text-4xl">Kısalt, <span className = "green">Tıkla</span> & Kazan</h2> */}
              <h2 className=  "px-5 text-center text-white text-4xl">Shorten, <span className = "green">Share</span> & Earn</h2>
              <div className='w-full '>
                <form className="flex   mx-auto mt-3 justify-center flex-col w-11/12  md:w-7/12 md:flex-row ">
                  <input type = "text" placeholder="Enter your URL and start earning" className = "input w-full bg-white rounded "></input>
                  <button type = "button" className="btn hover:bg-green-700 btn-green w-full border-0 text-black mt-3 md:mt-0 md:ml-2 md:w-1/4" onClick = {()=> setConvert(true)} >Convert</button>
                </form>
              </div>
            </div>

          </section>
        </div>


        <main className = "container mx-auto">





        <section className = " py-5 mx-2 md:mx-0 " data-aos="fade-up">

<div className='text-left '>
  <h2 className = "text-2xl md:text-3xl font-bold">You are not limited to creating links.</h2>
  <p className='text-base md:text-lg mt-1'>You can create links and we will share it for you. Isn't it great? Everyone wins on our website!</p>
</div>

<div className = "flex justify-between items-stretch mt-2  flex-col  md:flex-row  ">
    {/* <InfoCardSmall title = "Diğer Linklere Tıklayın" text ="Diğer kişilerin bağlantılarına tıklayarak ödeme alabilirsiniz.">
     <ClickSVG></ClickSVG>
    </InfoCardSmall> */}
    <InfoCardSmall title = "Create Links" text ="You get paid for every click you receive (multiple visits by a person counts).">
      <LinkSVGBig></LinkSVGBig>
    </InfoCardSmall>
    <InfoCardSmall title = "Reference" text ="Earn 15% of the income earned by your referrals.">
      <Referans></Referans>
    </InfoCardSmall>

    <InfoCardSmall title = "Withdraw Money" text ="You can withdraw your money at any time when you have at least $5 in your account.">
      <MoneySVG></MoneySVG>
    </InfoCardSmall>

</div>
</section>








          <section className='mt-10 py-10 mx-2 md:mx-0' data-aos="fade-up">

              <div>
                <h2 className='text-2xl md:text-3xl font-bold'>Your connection name no longer has to be random like <span className = "text-red-700">“JhpTH”</span> or <span className = "text-red-700">“Myr0RbW”</span>.</h2>
                <p className='text-base md:text-lg'>You can change your URL link as you wish. This way, you and your audience can know which links are for what.</p>
              </div>

              <div className= 'w-full rounded py-10  text-center  mt-1'>
                  <h3 className='text-base md:text-xl '>https://linkne.io/<span className = "green font-bold ">YourName/YourLinkName</span></h3>
                  <p className= "text-sm text-slate-500 md:text-base mt-1">*You can also use a random link name</p>
                  <div className="">
                    <Link to = "/signup"><button type="button" className="btn btn-primary mt-1">Get your link now</button></Link>
                  </div>
              </div>

            </section>



            <section className='py-5 mx-2 md:mx-0' data-aos="fade-up">
            <div className = "">
                <h2 className = "text-2xl md:text-3xl  font-bold">Why linkne.io?</h2>
                <p className='text-base md:text-lg'></p>
              </div>
            <div className = "flex flex-wrap justify-between flex-col lg:flex-row">

                <InfoCardBig title = "Who Are We?" text ="linkne.io is much more than a URL-shortener. We are constantly updating our website and bringing lots of great new features.">
                  <WhoAreWeSVG></WhoAreWeSVG>
                </InfoCardBig>

                <InfoCardBig title = "High Rates" text ="We pay very high compared to other sites. Also, we don't have a single way to make money. If you want to see how much we paid, you can go to our payment rates page.">
                  <Money2SVG></Money2SVG>
                </InfoCardBig>

                <InfoCardBig title = "Trustable" text ="Your information is safe with us. Our database is encrypted, no one can read it, including us.">
                  <HeartSVG> </HeartSVG>
                </InfoCardBig>

                <InfoCardBig title = "Detailed Statistics" text ="Get to know your audience. Analyze in detail what brings you the most revenue and what strategies you need to adapt.">
                  <IstatistikSVG> </IstatistikSVG>
                </InfoCardBig>

              </div>

            </section>



            <section className='mt-10 py-10 mx-2 md:mx-0' data-aos="fade-up">
              <div>
                <h2 className = "text-2xl md:text-3xl  font-bold">Get paid from multiple platforms.</h2>
                <p className='text-base md:text-lg'>You can get paid with Paypal, Bitcoin, Payeer, advcash. You must have a minimum of $5 to withdraw funds.</p>
              </div>

              <div className='mt-3 flex md:flex-row flex-col  md:justify-between items-start'>
                <SmallCards image = "images/Payeer.svg"></SmallCards>
                <SmallCards image = "images/paypal.svg"></SmallCards>
                <SmallCards image = "images/tether.svg"></SmallCards>
                <SmallCards image = "images/bitcoin.svg"></SmallCards>
                <SmallCards image = "images/advcash.svg"></SmallCards>
              </div>

            </section >


            <section className='mt-10 py-10 mx-2 md:mx-0' data-aos="fade-up">
            <div className="w-full">
                  <div className="flex items-center flex-col  w-full flex justify-between md:flex-row">
                    <div className="w-full">
                      {/* <h1 className="display-5 fw-bold lh-1 mb-3">Responsive left-aligned hero with image</h1> */}
                      <h2 className = "text-2xl md:text-3xl font-bold">Get the best reports to analyze.</h2>
                      <p className="text-base md:text-lg">Personalized profile reports let you see where clicks came from, how many clicks you got in a given time frame, CPM rate and more.</p>
                    </div>

                    <div className="w-full mt-2 ">
                      <img className='w-100 m-auto ' src = "images/HomeWorld.svg"></img>
                    </div>

                  </div>
              </div>
            </section>


            <section className='mt-10 py-10 mx-2 md:mx-0' data-aos="fade-up">
              <div className="w-full">

                    <h2 className = "text-2xl md:text-3xl font-bold">Create an account and start earning in seconds!</h2>

                    <div className=" flex items-center py-5 flex justify-around flex-col md:flex-row">

                        <div className="w-full">
                            <img className='w-full m-auto ' src = "images/HomeAnaliz.svg"></img>
                        </div>

                        <div className="w-full">
                          <p className="text-base md:text-lg">Join linkne.io to earn money and have control over how many ads your users see and how your links appear.</p>
                          <a href = ""><button className='btn btn-ghost btn-shadow w-1/4 mt-2'>our discord channel</button></a>
                        </div>

                    </div>

                </div>
            </section>

        </main>


        <Footer></Footer>


    </div>
  )
}

export default Home