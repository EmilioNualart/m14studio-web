"use client";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import VideoModalProvider from "@/components/providers/VideoModalProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FilmGrain from "@/components/ui/FilmGrain";
import MeshGradientBackground from "@/components/ui/MeshGradientBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import SectionDivider from "@/components/ui/SectionDivider";
import VideoModal from "@/components/ui/VideoModal";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Reel from "@/components/sections/Reel";
import Servicios from "@/components/sections/Servicios";
import Portfolio from "@/components/sections/Portfolio";
import SobreNosotros from "@/components/sections/SobreNosotros";
import Ubicaciones from "@/components/sections/Ubicaciones";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <VideoModalProvider>
        <ScrollProgress />
        <FilmGrain />
        <MeshGradientBackground />
        <CustomCursor />
        <Navbar />
        <Hero />
        <Servicios />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <SobreNosotros />
        <Ubicaciones />
        <SectionDivider />
        <Contacto />
        <Footer />
        <VideoModal />
      </VideoModalProvider>
    </SmoothScrollProvider>
  );
}
