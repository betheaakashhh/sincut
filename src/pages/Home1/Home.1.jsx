import {React } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import HeaderSectionTest from "../Hero/HeroSectionTest";
import HeroSectionWithProfile from "../ProfileHero/HeroSectionWithProfile";
import Program from "../Program/Program";
export const Home1 = () => {
  return (
    <div>   
        <HeroSectionWithProfile />
        <HeaderSectionTest />
        <Program />
    </div>
  );
}   
export default Home1;