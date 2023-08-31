import  Header  from "@/components/layout/headers/Header";
import GetApp from "@/components/homes/getApp/GetApp";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";

export const metadata = {
  title: 'lambda',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
}

export default function HomePage() {
  return (
    
    <>
    <Preloader/>
    <Header />
    
    <div className="content-wrapper  js-content-wrapper overflow-hidden">
    
      <GetApp/>
      <FooterOne/>
      
    </div>
  </>
  );
}


