import React from 'react'
import Header from '../Header/Header'
import SlidingCards from '../Sinsection/SlidingCards'
import Navbar from '../../components/Navbar/Navbar'
import Program from '../Program/Program'
import ConfessSection from '../Confess/ConfessSection'
import Title from '../Title/Title'
import VideoSection from '../doodles/VideoSection'
import VideoSectionSad from '../video2/VideoSectionSad'
import VideoSectionLeft from '../videosection3/VideoSectionLeft'
import HeroSection from '../Hero/HeroSection'




const Home = () => {
  return (
  <div>
     {/* <Header />  */}
     <HeroSection />
   
    
    
    
   
   {/* <ConfessSection /> */}
   {/*<VideoSectionLeft /> */}
   {/* <VideoSection /> */}
  {/* <VideoSectionSad />*/}
<SlidingCards/>
       <Program />
   
   
  </div>
  )
}

export default Home
