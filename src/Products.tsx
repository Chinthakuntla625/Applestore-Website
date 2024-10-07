import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS_Files/Products.css';
import Footer from './Footer';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


interface Product {
  id: string;
  image: string;
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
}

interface ProductsProps {
  searchQuery: string;
}

const MyCarouselcomponent: React.FC = () => {
  return (
    <Carousel className='carousel'>
      <Carousel.Item>
        <img src='https://www.iphonelife.com/sites/iphonelife.com/files/blog_top_image_iphone15_v22x.jpg' alt='Special deals today'
          className='carousel-image'>
        </img>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/Laptops">
          <img src='https://cdnb.artstation.com/p/assets/images/images/016/802/459/large/shuja-shuaib-banner.jpg?1553535424' alt='Special deals today'
            className='carousel-image'>
          </img>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={'/Laptops'}>
          <img src='https://images.macrumors.com/article-new/2023/09/iPhone-15-and-15-Pro-Pre-Orders-Live-Feature.jpg' alt='Special deals today'
            className='carousel-image'>
          </img>
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};

const Products: React.FC<ProductsProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/ProductDescription/${productId}`);
  };

  const filteredProducts = products.filter(product =>
    product.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='Products'>
      <MyCarouselcomponent />

      <div className='v-c'>
        <h6 className='v'>Iphones</h6>
        <h6 className='v'>Mac$</h6>
      </div>

      <div className='video-container'>
        <video className='video-item' autoPlay loop muted>
          <source src='/Images/iphonevideo.mp4' type='video/mp4' />
          Browser does not support video.
        </video>
        <video className='video-item' autoPlay loop muted>
          <source src='/Images/macvideo.mp4' type='video/mp4' />
          Browser does not support video.
        </video>
      </div>

      <h4 style={{ fontWeight: "Normal", paddingTop: "7px", marginLeft: "525px" }}><b>PRODUCTS</b></h4>
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
                  <del style={{ fontWeight: "lighter", paddingLeft: "80px", fontSize: "small" }}>{product.oldPrice}$</del>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default Products;













// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; 
// import './CSS_Files/Products.css';
// import Footer from './Footer';
// import axios from 'axios';
// import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


// const MyCarouselcomponent = () => {
//   return (
//     <Carousel className='carousel'>
//       <Carousel.Item>
//         <img src='https://www.iphonelife.com/sites/iphonelife.com/files/blog_top_image_iphone15_v22x.jpg' alt='Special deals today'
//           className='carousel-image'>
//         </img>
//       </Carousel.Item>
//       <Carousel.Item>
//         <Link to="/Laptops">
//           <img src='https://cdnb.artstation.com/p/assets/images/images/016/802/459/large/shuja-shuaib-banner.jpg?1553535424' alt='Special deals today'
//             className='carousel-image'>
//           </img>
//         </Link>
//       </Carousel.Item>
//       <Carousel.Item>
//         <Link to={'/Laptops'} >
//           <img src='https://images.macrumors.com/article-new/2023/09/iPhone-15-and-15-Pro-Pre-Orders-Live-Feature.jpg' alt='Special deals today'
//             className='carousel-image'>
//           </img>
//         </Link>
//       </Carousel.Item>
//     </Carousel>
//   )
// }

// const Products = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate(); 
//   // const appleId=sessionStorage.getItem("AppleID");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.log("Error:", error);
//       } 
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/ProductDescription/${productId}`);
//   };

//   const filteredProducts = products.filter(product =>
//     product.model.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className='Products'>
//       {/* <p><b>WELCOME {appleId}</b></p> */}
//       <MyCarouselcomponent />

//       <div className='v-c'>
//         <h6 className='v'>Iphones</h6>
//         <h6 className='v'>Mac$</h6>
//       </div>
     
//       <div className='video-container'>
//         <video className='video-item' autoPlay loop muted>
//           <source src='/Images/iphonevideo.mp4' type='video/mp4' />
//           brows doent support
//         </video>
//         <video className='video-item' autoPlay loop muted>
//           <source src='/Images/macvideo.mp4' type='video/mp4' />
//           brows doent support
//         </video>
//       </div>

//       <h4 style={{ fontWeight: "Normal", paddingTop: "7px", marginLeft:"525px" }}><b>PRODUCTS</b></h4>
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
//               <div><b style={{ color: "rgb(101,157,218)" }}>{product.price}$</b> <del style={{ fontWeight: "lighter", paddingLeft: "80px", fontSize: "small" }}>{product.oldPrice}$</del></div>
//             </li>
//           ))
//         )}
//       </ul>
//       <Footer />
//     </div>
//   );
// };

// export default Products;









// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, } from 'react-router-dom'; 
// import './Products.css';
// import Footer from './Footer';
// import axios from 'axios';
// import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { CiHeart } from "react-icons/ci";
// import { addToWish } from './Cartslice';
// import { useDispatch } from 'react-redux';

// const MyCarouselcomponent = () => {
//   return (
//     <Carousel className='carousel'>
//       <Carousel.Item>
//         <img src='https://www.iphonelife.com/sites/iphonelife.com/files/blog_top_image_iphone15_v22x.jpg' alt='Special deals today'
//           className='carousel-image'>
//         </img>
//       </Carousel.Item>
//       <Carousel.Item>
//         <Link to="/Laptops">
//           <img src='https://cdnb.artstation.com/p/assets/images/images/016/802/459/large/shuja-shuaib-banner.jpg?1553535424' alt='Special deals today'
//             className='carousel-image'>
//           </img>
//         </Link>
//       </Carousel.Item>
//       <Carousel.Item>
//         <Link to={'/Laptops'} >
//           <img src='https://images.macrumors.com/article-new/2023/09/iPhone-15-and-15-Pro-Pre-Orders-Live-Feature.jpg' alt='Special deals today'
//             className='carousel-image'>
//           </img>
//         </Link>
//       </Carousel.Item>
//     </Carousel>
//   )
// }

// const Products = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate(); 
//   const dispatch=useDispatch();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.log("Error:", error);
//       } 
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/ProductDescription/${productId}`);
//   };

//   const handleHeart = (product) => {
//     dispatch(addToWish(product));
//     navigate('/Wishlist');
// }


//   const filteredProducts = products.filter(product =>
//     product.model.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className='Products'>
//       <MyCarouselcomponent />

//       <div className='v-c'>
//         <h6 className='v'>Iphones</h6>
//         <h6 className='v'>Mac$</h6>
//       </div>
     
//       <div className='video-container'>
//         <video className='video-item' autoPlay loop muted>
//           <source src='/Images/iphonevideo.mp4' type='video/mp4' />
//           brows doent support
//         </video>
//         <video className='video-item' autoPlay loop muted>
//           <source src='/Images/macvideo.mp4' type='video/mp4' />
//           brows doent support
//         </video>
//       </div>

//       <h4 style={{ fontWeight: "Normal", paddingTop: "7px", marginLeft:"525px" }}><b>PRODUCTS</b></h4>
//       <ul className='list-container'>
//         {filteredProducts.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           filteredProducts.map((product) => (
//             <li key={product.id}  className='list-box'>
//               <div className='heart'><button onClick={handleHeart(product)}><CiHeart  /></button>
//               </div>
//               <div>
//                 <img
//                   src={product.image}
//                   alt={product.model}
//                   style={{ width: '150px', height: '150px' ,cursor:"pointer"}}
//                   onClick={() => handleProductClick(product.id)}
//                 />
//               </div>
//               <div>{product.brand}</div>
//               <div><b>{product.model}</b></div>
//               <div><b style={{ color: "rgb(101,157,218)" }}>{product.price}$</b> <del style={{ fontWeight: "lighter", paddingLeft: "80px", fontSize: "small" }}>{product.oldPrice}$</del></div>
//             </li>
//           ))
//         )}
//       </ul>
//       <Footer />
//     </div>
//   );
// };

// export default Products;
