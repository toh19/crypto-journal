import Head from "next/head";
import Container from "react-bootstrap/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BodyComponents from '@/components/BodyComponents'

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto Journal</title>
        <meta name="description" content="Cryptocurrency News" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container as="main" className="py-4 px-3 mx-auto">
        <Header />

        <h1>Build Bootstrap with React</h1>
        <h2>And my name is Tarek Oueld Hammoud & I will learn everything and will be a billionaire $B</h2>

        <BodyComponents />      
        <Footer />
      </Container>
    </>
  )
}