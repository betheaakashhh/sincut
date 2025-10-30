import {React } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import HeaderSectionTest from "../Hero/HeroSectionTest";
import HeroSectionWithProfile from "../ProfileHero/HeroSectionWithProfile";
export const Home1 = () => {
  return (
    <div>   
        <HeroSectionWithProfile />
        <HeaderSectionTest />
    </div>
  );
}   
export default Home1;