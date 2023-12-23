// import { useState } from 'react'
// import { Card } from '@mui/material';
import './App.css'
import Banner from './Components/Banner/Banner'
import Marquee from "react-fast-marquee";
import Card from './Components/Card/Card';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    Aos.init();
  }, [])
  return (
    <>
<div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500">

      <Banner />
</div>
      <div>
        <div className='bg-gray-900'>
          <div className='py-20 '>
            <h2 className='text-3xl lg:text-5xl text-center font-bold italic uppercase font-serif text-blue-300 pb-20'>Who is utilizing this website?</h2>
            <Marquee pauseOnHover speed={100} >
             <div data-aos="fade-up" className='flex gap-9 lg:gap-20  pl-8 lg:pl-0'>
            
             <Card  name={'Programmers'} title={'Connect with programmers, showcase skills, and collaborate on projects in our coding community. Whether you`re seasoned or just starting, join for networking and collaborative opportunities.'}/>
             <Card name={'Bankers'} title={'Connect with fellow bankers, showcase expertise, and foster collaboration in our professional community dedicated to financial professionals networking and growth'}/>
             <Card name={'Project Managers'} title={'Empower your projects with our platform for project managers. Streamline tasks, foster team collaboration, and achieve successful project outcomes.'}/>
             <Card name={'Developer'} title={'Join our platform for software developers. Collaborate on projects, share insights, and connect with a vibrant community driving innovation in coding.'}/>
             <Card name={'corporations'} title={'Connect with businesses and corporations on our platform. Streamline collaboration, network with industry peers, and drive growth together.'}/>
             <Card name={'Students'} title={'Unite remote teams effortlessly on our platform. Foster collaboration, enhance communication, and achieve collective success from anywhere'}/>
             </div>
            </Marquee>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
