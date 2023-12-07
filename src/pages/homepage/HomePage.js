import Navbar from "@/components/fragments/Navbar/Navbar";
import Head from "next/head";
import Hero from "../../components/fragments/Hero/Hero";
import { Container } from "react-bootstrap";
import Footer from "../../components/fragments/Footer/Footer";
import About from "@/components/fragments/About/About";
import Feature from "@/components/fragments/Feature/Feature";

const SpacedContainer = ({ children }) => (
  <div style={{ marginBottom: "20px" }}>{children}</div>
);
export default function LandingPage() {
  return (
    <>
      <main>
        <Navbar/>
        <Container>
          <SpacedContainer />
          <Hero />
          <SpacedContainer />
          <Feature />
          <About />
        </Container>
        <Footer />
      </main>
    </>
  );
}
