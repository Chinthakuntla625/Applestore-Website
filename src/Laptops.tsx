import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CSS_Files/Products.css';
import Footer from './Footer';
import axios from 'axios';


interface Product {
  id: string;
  image: string;
  model: string;
  brand: string;
  price: number;
  oldPrice?: number;
}

interface LaptopsProps {
  searchQuery: string;
}

const Laptops: React.FC<LaptopsProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:5000/laptops");
        setProducts(response.data);
      } catch (error) {
        console.log("Error:", error);
      } 
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/LaptopDescription/${productId}`);
  };

  const filteredProducts = products.filter(product =>
    product.model.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className='Products'>
      <video 
        style={{
          width: "1220px",
          paddingTop: "13px",
          height: "410px",
          objectFit: "cover",
          borderRadius: "11px"
        }} 
        autoPlay 
        loop 
        muted
      >
        <source src='/Images/macvideo.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <h4 style={{ fontWeight: "normal", paddingTop: "7px", marginLeft: "525px" }}>
        <b>LAPTOPS</b>
      </h4>
      <ul className='list-container'>
        {filteredProducts.length === 0 ? (
          <p>No products available</p>
        ) : (
          filteredProducts.map((product) => (
            <li key={product.id} onClick={() => handleProductClick(product.id)} className='list-box'>
              <div>
                <img
                  src={product.image}
                  alt={product.model}
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <div>{product.brand}</div>
              <div><b>{product.model}</b></div>
              <div>
                <b style={{ color: "rgb(101,157,218)" }}>{product.price}$</b>
                {product.oldPrice && (
                  <del style={{ fontWeight: "lighter", paddingLeft: "15px", fontSize: "small" }}>
                    {product.oldPrice}$
                  </del>
                )}
              </div>
            </li>  
          ))
        )}
      </ul>
      <Footer/>
    </div>
  );
};

export default Laptops;












// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import './CSS_Files/Products.css';
// import Footer from './Footer';
// import axios from 'axios';

// const Laptops = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchProducts = async () => {
   
//       try {
//         const response = await axios.get("http://localhost:5000/laptops");
       
//         setProducts(response.data);
//       } catch (error) {
//         console.log("Error:", error);
//       } 
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/LaptopDescription/${productId}`);
//   };

  
//   const filteredProducts = products.filter(product =>
//     product.model.toLowerCase().startsWith(searchQuery.toLowerCase())
//   );

 

//   return (
//     <div className='Products'>
//       <video style={{width: "1220px",
//       paddingTop:"13px",
//   height: "410px" ,
//   objectFit: "cover",
//   borderRadius: "11px"}} autoPlay loop muted>
//           <source src='/Images/macvideo.mp4' type='video/mp4' />
//           brows doent support
//         </video>
//       <h4 style={{ fontWeight: "normal", paddingTop: "7px", marginLeft:"525px" }}><b>LAPTOPS</b></h4>
//       <ul className='list-container'>
//         {filteredProducts.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           filteredProducts.map((product) => (
//             <li key={product.id} onClick={() => handleProductClick(product.id)} className='list-box'>
//               <div>
//                 <img
//                   src={product.image}
//                   alt={product.model}
//                   style={{ width: '150px', height: '150px' }}
//                 />
//               </div>
//               <div>{product.brand}</div>
//               <div><b>{product.model}</b></div>
              
//               <div><b style={{color:"rgb(101,157,218)"}}>{product.price}$</b> <del style={{fontWeight:"lighter" ,paddingLeft:"15px",fontSize:"small"}}>{product.oldPrice}$</del></div>
//             </li>  
//           ))
//         )}
//       </ul>
//       <Footer/>
//     </div>
//   );
// };

// export default Laptops;








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import './Products.css';
// import Footer from './Footer';
// import axios from 'axios';
// import { CiHeart } from "react-icons/ci";
// import { addToWish } from './Cartslice';
// import { useDispatch } from 'react-redux';

// const Laptops = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const dispatch=useDispatch();
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchProducts = async () => {
   
//       try {
//         const response = await axios.get("http://localhost:5000/laptops");
       
//         setProducts(response.data);
//       } catch (error) {
//         console.log("Error:", error);
//       } 
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/LaptopDescription/${productId}`);
//   };

//   const handleHeart =(product)=>{
//     dispatch(addToWish(product));
//     navigate('/Wishlist')
//   }

  
//   const filteredProducts = products.filter(product =>
//     product.model.toLowerCase().startsWith(searchQuery.toLowerCase())
//   );

 

//   return (
//     <div className='Products'>
//       <video style={{width: "1600px",
//       paddingTop:"15px",
//   height: "410px" ,
//   objectFit: "cover", 
//   borderRadius: "9px"}} autoPlay loop muted>
//           <source src='/Images/macvideo.mp4' type='video/mp4' />
//           brows doent support
//         </video>
//       <h4 style={{ fontWeight: "normal", paddingTop: "7px", marginLeft:"525px" }}><b>LAPTOPS</b></h4>
//       <ul className='list-container'>
//         {filteredProducts.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           filteredProducts.map((product) => (
//             <li key={product.id}  className='list-box'>
//               <div className='heart'><button onClick={()=>handleHeart(product)}><CiHeart  /></button>
//               </div>
//               <div>
//                 <img
//                   src={product.image}
//                   alt={product.model}
//                   style={{ width: '150px', height: '150px' }}
//                   onClick={() => handleProductClick(product.id)}
//                 />
//               </div>
//               <div>{product.brand}</div>
//               <div><b>{product.model}</b></div>
              
//               <div><b style={{color:"rgb(101,157,218)"}}>{product.price}$</b> <del style={{fontWeight:"lighter" ,paddingLeft:"15px",fontSize:"small"}}>{product.oldPrice}$</del></div>
//             </li>  
//           ))
//         )}
//       </ul>
//       <Footer/>
//     </div>
//   );
// };

// export default Laptops;
