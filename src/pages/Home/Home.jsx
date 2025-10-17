import React from 'react'
import Header from '../Header/Header'
import SinSection from '../Sinsection/SinSection'
import Navbar from '../../components/Navbar/Navbar'
import Program from '../Program/Program'
import ConfessSection from '../Confess/ConfessSection'
import Title from '../Title/Title'
import VideoSection from '../doodles/VideoSection'
import VideoSectionSad from '../video2/VideoSectionSad'
import VideoSectionLeft from '../videosection3/VideoSectionLeft'



const Home = () => {
  return (
  <div>
     <Header /> 
   
    
    <Program />
    
   
   <ConfessSection />
   <VideoSection />
   <VideoSectionLeft />
   <VideoSectionSad />
   
   <div className="container">

    <Title subtitle={"What Legends Say"} title={"Hear from those who have experienced the transformative power of SinCut. Their stories of redemption and positive change will inspire you to take the first step towards a better you."}/>
   </div>
   
  </div>
  )
}

export default Home