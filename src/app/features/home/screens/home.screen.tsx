import DealsBanner from "../components/DealsBanners";
import FeaturedProducts from "../components/FuturesProducts";
import Newsletter from "../components/Newsletter";
import OurCategories from "../components/OurCategories";
import PromoBanners from "../components/PromoBanner";
import Slider from "../components/slider";

export default function HomeScreen() {
  return <>
  
<Slider/>
<PromoBanners/>
<OurCategories/>
<DealsBanner/>
<FeaturedProducts/>
<Newsletter/>
  </>;
}