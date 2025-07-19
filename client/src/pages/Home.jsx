import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Feature from "../components/Hotel/Feature.jsx";
import Exclusive from "../components/Exclusive.jsx";
import Testimonial from "../components/Testimonial.jsx";
import NewsLetter from "../components/NewsLetter.jsx";

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <Feature />
        <Exclusive />
        <Testimonial />
        <NewsLetter />
      </Layout>
    </>
  );
};

export default Home;
