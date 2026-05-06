import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import ChatWidget from "./components/ChatWidget";
import customCursor from "./components/customCursor";
import SchedulePage from "./components/SchedulePage";
import "./index.css";

function MainLayout() {
  return (
    <div style={{ background: "#0C0C0E", minHeight: "100vh" }}>
      <customCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <customCursor />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}
