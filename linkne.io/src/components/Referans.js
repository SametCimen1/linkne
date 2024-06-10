import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Line } from 'react-chartjs-2';
import api from "../services/api";

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
          text: 'Son aydaki kazanclar',
        },
      },
    };
    const labels = ['12/01','12/02','12/03','12/04','12/05','12/06','12/07','12/08','12/09','12/10','12/11','12/12','12/13','12/14','12/15','12/16','12/17','12/18','12/19','12/20','12/21','12/22','12/23','12/24','12/25', '12/26', '12/27'];

    export const data = {
      labels,
      datasets: [
        {
          label: 'Tiklamalar',
          data: [91,112,62,73,21,42,10,71, 3, 84,61,48],
          borderColor: '#3CBF93',
          backgroundColor: '#3CBF93',
        },
      ],
    };




export const Referans = () => {
  const [count, setCount] = useState(0);

  const user = useSelector((state) => state.counter)

  useEffect(() => {
    getCount()
  },[])

  const getCount = async() => {
    api.put("/user/getRefCount").then((res) => setCount(res.data)).catch((err) => alert("error occured, please try again later"));
  }

  return (
    <div>
            <div className='mt-3 shadow p-2'>
                <p className='text-gray-500'>The linkne.io referral program is a great way to spread the word of this great service and make even more money with your short links!</p>
                <div className='roundedflex mt-2 flex items-center'>
                    <p className='border-2 text-xl p-2'>https://linkne.io/ref/{user.username}</p>
                    <button className='ml-2 btn btn-primary' onClick = {() => navigator.clipboard.writeText(`https://linkne.io/ref/${user.username}`)}>Copy</button>
                </div>


                <div className='mt-3'>
                  <p>{count} users signed up using your url. Join our <a href = "" className='link text-blue-500'>Discord</a> and text admins to get your money for the people who signed up using your url.</p>
                </div>

            </div>



            {/* <div className=' mt-5 shadow p-1'>
                <Line options={options} data={data} />
            </div>         */}
    </div>
  )
}
