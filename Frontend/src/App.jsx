import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SearchBar from "./components/searchBar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import MyProfile from "./pages/MyProfile";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
import ScrollToTop from './components/ScrollToTop';
import BecomeSeller from "./pages/becomeSeller";
import Verify from "./pages/Verify";

function App() {
    // Initialize AOS when the component mounts
    useEffect(() => {
      Aos.init({
        duration: 1000, // Animation duration (in ms)
        once: true,     // Whether animation should happen only once
      });
    }, []);

    
    
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <ScrollToTop/>
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/my-profile" element={<MyProfile />}/>
          <Route path="/seller-register" element={<BecomeSeller/>}/>
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
