import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import Features from "./components/Features";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import LeadModal from "./components/LeadModal";

function App() {
  return (
    <div className="min-h-screen">
      <LeadModal />
      <Header />
      <Hero />
      <Calculator />
      <Features />
      <Services />
      <CTA />
      <HowItWorks />

      <Testimonials />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
