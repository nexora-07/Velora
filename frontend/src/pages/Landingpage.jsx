import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductSection from "../components/ProductSection";
import PromoBanner from "../components/PromoBanner";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <ProductSection />
      <PromoBanner />
      <Footer />
    </>
  );
};

export default LandingPage;
