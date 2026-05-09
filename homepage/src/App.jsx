import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AppsSection from './components/AppsSection';
import FeaturesSection from './components/FeaturesSection';
import ParentsSection from './components/ParentsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppsSection />
        <FeaturesSection />
        <ParentsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
