import React from 'react'




import MainHeroSection from '../Hero/MainHeroSection'
import ImageHeroSection from '../ImageSection/ImageHeroSection'




import ModernHeroSection from '../MidSection/ModernHeroSection'
import HashTag from '../Hashtag/HashTag'
import VideoSection from '../doodles/VideoSection'
import ScrollingShowcase from '../ContinueScroll/ScrollingShowcase'
import ScrollFade from '../../components/FadeIn/ScrollFade'
import Navbar from '../../components/Navbar/Navbar'

// import ConfessSection from '../Confess/ConfessSection'







const Home = () => {
  return (
  <div>
     {/* <Header />  */}
     <Navbar />
     <ScrollFade> <MainHeroSection /></ScrollFade>
     <ScrollFade><ImageHeroSection /></ScrollFade>
     <ScrollFade> <ModernHeroSection /></ScrollFade>
     <ScrollFade> <HashTag /></ScrollFade>
      <ScrollFade>  <ScrollingShowcase /></ScrollFade>

    
    
     
    
    
    
     
     {/* <HeroSectionTest />  */}
   
    
    
    

   {/* <ConfessSection /> */}
   {/*<VideoSectionLeft /> */}
    {/* <VideoSection /> */}
  

   
   
  </div>
  )
}

export default Home
