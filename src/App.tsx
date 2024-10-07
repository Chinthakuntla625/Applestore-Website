import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './CSS_Files/App.css';
import Products from './Products'; 
import ProductDescription from './ProductDescription'; 
import CartPage from './CartPage';
import Placeorder from './Placeorder';
import Laptops from './Laptops';
import Forms from './Forms';
import Signup from './Signup';
import Profile from './Profile';
import Address from './Address';
import { ToastContainer } from 'react-toastify';
import { clearCart } from './Cartslice';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './Payment';
import Addresspack from './Addresspack';
import { FaShoppingCart, FaApple } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

interface RootState {
  cart: {
    count: number;
  };
}

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const location = useLocation();

  const HeaderPaths = [
    '/Products', '/ProductDescription', '/CartPage', '/Laptops', '/LaptopDescription', '/Placeorder',
    '/Profile', '/Forms', '/Signup', '/', '/Address', '/Addresspack',
  ];

  const showHeaderPaths = HeaderPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="App">
      {showHeaderPaths && <Header search={search} setSearch={setSearch} />}
      <Routes>
        <Route path="/" element={<Products searchQuery={search} />} />
        <Route path="/ProductDescription/:id" element={<ProductDescription />} />
        <Route path="/LaptopDescription/:id" element={<ProductDescription />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path='/Placeorder' element={<Placeorder />} />
        <Route path='/Products' element={<Products searchQuery={search} />} />
        <Route path='/Laptops' element={<Laptops searchQuery={search} />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Forms' element={<Forms />} />
        <Route path='/Address' element={<Address />} />
        <Route path='/Payment' element={<Payment />} />
        <Route path='/Addresspack' element={<Addresspack />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

interface HeaderProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const count = useSelector((state: RootState) => state.cart.count);
  const appleId = sessionStorage.getItem("AppleID");
  const dispatch = useDispatch();

  const handleCart = () => {
    navigate('/CartPage');
  };

  const handleProfile = () => {
    navigate('/Profile');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      localStorage.clear();
      dispatch(clearCart());
      navigate('/Forms');
    }
  };

  const handleLogin = () => {
    navigate('/Forms');
  };

  return (
    <nav className="Header">
      <FaApple style={{ fontSize: "35px" }} />
      <h2 style={{ paddingRight: "0px" }}>
        <b>APPLE</b><span style={{ fontWeight: "normal" }}>STORE</span>
      </h2>
      <Link to={'/Products'} className='home'>HOME</Link>
      <Link to={'/Laptops'} className='home'>Mac$</Link>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder='Search for Iphones and Mac$'
      />
      <div className='cart'>
        <FaShoppingCart onClick={handleCart} /> <sup>{count}</sup>
      </div>
      <button onClick={handleProfile}>OrderHistory</button>
      {appleId === null ? (
        <button onClick={handleLogin}>Log In</button>
      ) : (
        <button onClick={handleLogout}>
          <b style={{ color: "Violet" }}>A/c:{appleId}</b>||Logout
        </button>
      )}
    </nav>
  );
};

export default App;












// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
// import './CSS_Files/App.css';
// import Products from './Products'; 
// import ProductDescription from './ProductDescription'; 
// import CartPage from './CartPage';
// import { useDispatch, useSelector } from 'react-redux';
// import Placeorder from './Placeorder';
// import Laptops from './Laptops';
// import Forms from './Forms';
// import Signup from './Signup';
// import Profile from './Profile';
// import { FaShoppingCart } from "react-icons/fa";
// import Address from './Address';
// import { ToastContainer } from 'react-toastify';
// import {clearCart} from './Cartslice.js';
// import 'react-toastify/dist/ReactToastify.css';
// // import Wishlist from './Wishlist';
// // import { CiHeart } from "react-icons/ci";
// // import { CgProfile } from "react-icons/cg";
// import Payment from './Payment.js';
// import { FaApple } from "react-icons/fa";
// import Addresspack from './Addresspack.js';

// function App() {
//   return (
//     <Router>
//       <AppContent />
//       <ToastContainer/>
//     </Router>
    
//   );
// }

// const AppContent = () => {
//   const [search, setSearch] = useState("");
//   const location = useLocation();


//   const HeaderPaths = [
//     '/Products', '/ProductDescription', '/CartPage', '/Laptops', '/LaptopDescription', '/Placeorder'
//     ,'/Profile','/Forms','/Signup','/','/Address','/Addresspack',
//   ];

//   const showHeaderPaths = HeaderPaths.some(path => location.pathname.startsWith(path));

//   return (
//     <div className="App">
//       {showHeaderPaths && <Header search={search} setSearch={setSearch} />}
//       <Routes>
//         <Route path="/" element={<Products searchQuery={search} />} />
//         <Route path="/ProductDescription/:id" element={<ProductDescription />} />
//         <Route path="/LaptopDescription/:id" element={<ProductDescription />} />
//         <Route path="/CartPage" element={<CartPage />} />
//         <Route path='/Placeorder' element={<Placeorder />} />
//         <Route path='/Products' element={<Products searchQuery={search} />} />
//         <Route path='/Laptops' element={<Laptops searchQuery={search} />} />
//         <Route path='/Signup' element={<Signup />} />
//         <Route path='/Profile' element={<Profile />} />
//         <Route path='/Forms' element={<Forms />} />
//         {/* <Route path='/Wishlist' element={<Wishlist/>}/> */}
//         <Route path='/Address' element={<Address />} />
//         <Route path='/Payment' element={<Payment />} />
//         <Route path='/Addresspack' element={<Addresspack />} />
//       </Routes>
//       <ToastContainer/>
//     </div>
//   );
// }

// const Header = ({ search, setSearch }) => {
//   const navigate = useNavigate();
//   const count = useSelector((state) => state.cart.count);
//   const appleId=sessionStorage.getItem("AppleID");
//   const dispatch=useDispatch();
//   // const wishcount = useSelector((state) => state.cart.wishcount);


//   // const handleWish = () => {
//   //   navigate('/Wishlist');
//   // };



//   const handleCart = () => {
//     navigate('/CartPage');
//   };


//   const handleProfile=()=>{
//     navigate('/Profile');
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };
//   const handleLogout=()=>{
//     alert("Are you sure want to logout!");
//     sessionStorage.clear();
//     localStorage.clear();
//     dispatch(clearCart());
//     navigate('/Forms');

//   }
//   const handleLogin=()=>{
//     navigate('/Forms');

//   }

//   return (
//     <nav className="Header">
//       {/* <img src='https://th.bing.com/th/id/OIP.2fUyDXyp_RN9nJ74ekERwgHaEK?w=276&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' alt='apple'></img> */}
//       <FaApple style={{fontSize:"35px"}} />
//       <h2 style={{ paddingRight:"0px" }}><b>APPLE</b><l style={{ fontWeight: "normal" }}>STORE</l></h2>
//       <Link to={'/Products'} className='home'>HOME</Link>
//       <Link to={'/Laptops'} className='home'>Mac$</Link>
//       <input
//         type="text"
//         value={search}
//         onChange={handleSearchChange}
//         placeholder='Search for Iphones and Mac$'
//       />
//     <div className='cart'><FaShoppingCart onClick={handleCart} /> <sup>{count}</sup></div>
      
//       {/* <button onClick={handleWish}> <CiHeart /> <sup>{wishcount}</sup></button>  */}
//       {/* <button> <CgProfile /></button>  */}
//       <button onClick={handleProfile}>OrderHistory</button>
//       {appleId === null ? (
//         <button onClick={handleLogin}>Log In</button>
//       ) : (
// //         <button onClick={handleLogout}><b style={{color:"Violet"}}><CgProfile style={{color:"Black",height:"30px",width:"30px"}}/>
// // {appleId}</b>||Logout</button>
// <button onClick={handleLogout}><b style={{color:"Violet"}}>A/c:{appleId}</b>||Logout</button> 

// )}
      

//     </nav>
//   );
// };

// export default App;





