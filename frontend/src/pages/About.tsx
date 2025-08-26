import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import '@/assets/css/about.css'
import AboutUsComponent from '@/components/AboutUsComponent'


const About = () => {
  const onLoad = () => { };


  return (
    <Layout onLoad={onLoad} strict={false}>
      <div style={{marginTop: "32px"}}>
        <AboutUsComponent drawMap={true} drawTitle={true}></AboutUsComponent>
      </div>
      <Footer />
    </Layout>
  )
}

export default About
