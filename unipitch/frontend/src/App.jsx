import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navigation bar
import Home from "./pages/Home"; // Home page
import About from "./pages/About"; // About page
import Contact from "./pages/Contact"; // Contact page
import Projects from "./pages/Projects"; // Projects page
import Login from "./pages/Login"; // Login page
import Dashboard from "./pages/Dashboard"; // Dashboard page
import Register from "./pages/Register"; // Import the Register component
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      {/* Include the Navbar component */}
      <Navbar />
      <Footer />

      {/* Define application routes */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />

        {/* Projects Page */}
        <Route path="/projects" element={<Projects />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Dynamic Dashboard Page based on user role */}
        <Route path="/dashboard/:role" element={<Dashboard />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        <Route path="/" element={<Hero />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} /> 

      </Routes>
    </>
  );
};

export default App;
