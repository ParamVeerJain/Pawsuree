import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import Pups from '@/components/Pups';
import ComingNext from '@/components/ComingNext';
import Testimonials from '@/components/Testimonials';
import Apply from '@/components/Apply';
import JoinCTA from '@/components/JoinCTA';
import Footer from '@/components/Footer';
import Wave from '@/components/Wave';

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Wave />
        <Services />
        <Wave flip />
        <HowItWorks />
        <Wave />
        <Pups />
        <Wave flip />
        <ComingNext />
        <Wave />
        <Testimonials />
        <Wave flip />
        <Apply />
        <Wave />
        <JoinCTA />
        <Wave fill="#142E4C" className="bg-mist" />
      </main>
      <Footer />
    </>
  );
}
