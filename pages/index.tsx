import Script from "next/script";
import Seo from "./components/Seo";

const Home = () => {
  return (
   <div>
      <Script src="https://unpkg.com/aos@next/dist/aos.js"></Script>
       <script>
           AOS.init();
       </script>
     <Seo title="야나두키즈"/>
   </div>
  )
}

export default Home
