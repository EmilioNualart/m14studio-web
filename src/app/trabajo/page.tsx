import type { Metadata } from "next";
import VideoModalProvider from "@/components/providers/VideoModalProvider";
import RevealProvider from "@/components/providers/RevealProvider";
import VideoModal from "@/components/ui/VideoModal";
import Navbar from "@/components/sections/Navbar";
import Agendar from "@/components/sections/Agendar";
import IndiceTrabajo from "@/components/sections/IndiceTrabajo";

export const metadata: Metadata = {
  title: "Trabajo | M14 Studio",
  description: "Índice completo de piezas de M14 Studio: moda, publicidad, corporativo e inmobiliario.",
  alternates: { canonical: "/trabajo" },
};

export default function TrabajoPage() {
  return (
    <VideoModalProvider>
      <RevealProvider>
        <Navbar />
        <main>
          <IndiceTrabajo />
          <Agendar />
        </main>
        <VideoModal />
      </RevealProvider>
    </VideoModalProvider>
  );
}
