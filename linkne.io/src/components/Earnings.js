import  { useEffect, useState } from 'react'

import Eye from '../components/svgs/Eye'
import DashboardMoney from './svgs/DashboardMoney'
import DashboardReferans from './svgs/DashboardReferans'
import CPMSVG from './svgs/CPMSVG'
import api from "../services/api";
import { useNavigate  } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Last Month's Earnings (Will Work Soon)",
      },
    },
  };
  const labels = ['12/01','12/02','12/03','12/04','12/05','12/06','12/07','12/08','12/09','12/10','12/11','12/12','12/13','12/14','12/15','12/16','12/17','12/18','12/19','12/20','12/21','12/22','12/23','12/24','12/25', '12/26', '12/27'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Earnings',
        data: [1,2,3,1,2,4,70,7,0,8,6,4],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },

      
      // {
      //   label: 'Gunluk Tiklamalar',
      //   data: [91,112,62,73,21,42,10,71, 3, 84,61,48],
      //   borderColor: '#3CBF93',
      //   backgroundColor: '#3CBF93',
      // },
    ],
  };



const Earnings = () => {


  const [myData, setMyData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  let navigate  = useNavigate();
  
  const getMyData = async() => {

    await api.put('/user/getMyData').then((res) => {    
      if(res.data === undefined){
        navigate('/')
      }
      else{
        setMyData(res.data)
        setIsLoaded(true)
      }

  })
  }

  useEffect(() => {
    getMyData();
  },[])



  return (
    <div className='w-full'>

        {!isLoaded ? 

          <div className='flex items-center justify-center min-h-screen'>
            <div style = {{"borderTopColor":"transparent"}} className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
            <p className ="ml-2">Loading...</p>
          </div>

        : 
        <div className='w-full md:w-10/12 '>

          <div className='mt-3 flex justify-between flex-col md:flex-row break-normal '>
             
            <div className='w-full flex justify-between wrap'>



                <div className='saodwdasdsa md:w-4/5 px-2 md:w-1/5 shadow   p-2 text-center animate__animated animate__bounce In rounded border-0'>
                    <p className='text-md lg:text-lg font-medium  text-slate-900 specialFont '>Views</p>
                    <div className='flex items-center justify-center'>
                        <Eye></Eye>
                        <p className='mx-3 font-semibold text-xl'>{myData.sum}</p>
                    </div>
                </div>
              
              


                <div className='saodwdasdsa  px-2 md:w-1/5 shadow inline p-2 text-center animate__animated animate__bounceIn'>
                    <p className='text-md lg:text-lg font-medium  text-slate-900 specialFont'>Earnings</p>
                    <div className='flex items-center justify-center'>
                        <DashboardMoney></DashboardMoney>
                        <p className='mx-3 font-semibold text-xl'>$0</p>
                    </div>
                </div>

        



  

                <div className='saodwdasdsa px-2 md:w-1/5  shadow  inline p-2 text-center animate__animated animate__bounceIn'>
                    <p className=' text-md lg:text-lg font-medium  text-slate-900 specialFont'>Reference Earnings</p>
                    <div className='flex items-center justify-center'>
                        <DashboardReferans></DashboardReferans>
                        <p className='mx-3 font-semibold text-xl'>$0</p>
                    </div>
                </div>


                <div className='saodwdasdsa  px-2 md:w-1/5  shadow  inline p-2 text-center animate__animated animate__bounceIn'>
                    <p className=' text-md lg:text-lg font-medium  text-slate-900 specialFont'>Average CPM</p>
                    <div className='flex items-center justify-center'>
                        <CPMSVG></CPMSVG>
                        <p className='mx-3 font-semibold text-xl'>$0</p>
                    </div>
                </div>

             
            </div>

          </div>


          <div className=' mt-5 saodwdasdsa  shadow p-1'>
              <Line options={options} data={data} />
          </div>
        </div>
      }


    </div>
  )
}

export default Earnings