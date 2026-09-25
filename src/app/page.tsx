import VideoModalProvider from "@/components/providers/VideoModalProvider";
import RevealProvider from "@/components/providers/RevealProvider";
import VideoModal from "@/components/ui/VideoModal";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import QuienesSomos from "@/components/sections/QuienesSomos";
import ComoTrabajamos from "@/components/sections/ComoTrabajamos";
import QueHacemos from "@/components/sections/QueHacemos";
import Clientes from "@/components/sections/Clientes";
import Agendar from "@/components/sections/Agendar";

export default function Home() {
  return (
    <VideoModalProvider>
      <RevealProvider>
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <QuienesSomos />
          <ComoTrabajamos />
          <QueHacemos />
          <Clientes />
          <Agendar />
        </main>
        <VideoModal />
      </RevealProvider>
    </VideoModalProvider>
  );
}
