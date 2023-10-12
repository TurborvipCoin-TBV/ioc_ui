import { NextPage } from "next";
import React from "react";
import InvestView from "../src/views/invests";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <InvestView></InvestView>
      <Footer />
    </>
  );
};
export default Home;
