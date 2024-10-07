import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CSS_Files/ProductDescription.css';
import { addToCart } from './Cartslice';
import Footer from './Footer';
import { Toast, ToastContainer } from 'react-bootstrap';


interface ProductSpecs {
  processor?: string;
  ram?: string;
  storage: string;
  color?: string;
  screenSize?: string;
}

interface Product {
  id: string;
  image: string;
  model: string;
  brand: string;
  price: number;
  oldPrice?: number;
  description: string;
  specs: ProductSpecs;
}

const ProductDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartbtn, setCartbtn] = useState<string>("Add to cart");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response is not good");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setCartbtn("Added");
      setTimeout(() => {
        setCartbtn("Add more (+)");
      }, 1500);
      setShowToast(true);
    }
  };

  return (
    <div>
      <div className="product-description">
        <div className="image-container">
          <img
            src={product.image}
            alt={product.model}
          />
        </div>
        <div className="details-container">
          <h2>{product.model}</h2>
          <div className='button'>
            <button onClick={handleAddToCart}>{cartbtn}</button>
            <ToastContainer />
          </div>
          <p style={{ color: "rgb(101,157,218)" }}>{product.brand}</p>
          <p>
            <strong>Price:</strong> {product.price}$ 
            {product.oldPrice && (
              <del style={{ fontWeight: "lighter", paddingLeft: "15px", fontSize: "small" }}>
                {product.oldPrice}$
              </del>
            )}
          </p>
          <p><strong>Description: </strong>{product.description}</p>
          {product.specs.processor ? (
            <>
              <p><strong>Processor:</strong> {product.specs.processor}</p>
              <p><strong>RAM:</strong> {product.specs.ram}</p>
              <p><strong>Storage:</strong> {product.specs.storage}</p>
            </>
          ) : (
            <>
              <p><strong>Storage:</strong> {product.specs.storage}</p>
              <p><strong>Color:</strong> {product.specs.color}</p>
              <p><strong>Screen Size:</strong> {product.specs.screenSize}</p>
            </>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-end" className='custom-toast-container'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={1400}
          autohide
          className='custom-toast'>
          <Toast.Body>Item added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ProductDescription;
















// import React,{useState,useEffect} from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import './CSS_Files/ProductDescription.css';
// import { addToCart } from './Cartslice';
// import Footer from './Footer';
// import { Toast, ToastContainer } from 'react-bootstrap';

// const ProductDescription = () => {
//     const { id } = useParams(); 
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [cartbtn,setCartbtn] = useState("Add to cart");
//     const dispatch = useDispatch();
//     const [showToast,setShowToast]=useState(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/products/${id}`);
//                 if (!response.ok) {
//                     throw new Error("Network response is not good");
//                 }
//                 const data = await response.json();
//                 setProduct(data);
//             } catch (error) {
//                 console.log("Error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (!product) {
//         return <p>Product not found</p>;
//     }

//     const handleAddToCart = () => {
//         dispatch(addToCart(product));
//         setCartbtn("Added");
        
//         setTimeout(() => {
//             setCartbtn("Add more (+)");
//         }, 1500);
//         setShowToast(true);
        
//     };

//     return (
//         <div>
//         <div className="product-description">
//             <div className="image-container">
//                 <img
//                     src={product.image}
//                     alt={product.model}
//                 />
//             </div>
//             <div className="details-container">
//                 <h2>{product.model}</h2>
//                 <div className='button'>
                  
//                     <button onClick={handleAddToCart} >{cartbtn}</button>
//                     <ToastContainer/>
//                 </div>
//                 <p style={{color:"rgb(101,157,218)"}}>{product.brand}</p>
//                 <p><strong>Price:</strong> {product.price}$  <del style={{fontWeight:"lighter" ,paddingLeft:"15px",fontSize:"small"}}>{product.oldPrice}$</del></p>
//                 <p><strong>Description: </strong>{product.description}</p>
//                 {product.specs.processor ? (
//                     <>
//                         <p><strong>Processor:</strong> {product.specs.processor}</p>
//                         <p><strong>RAM:</strong> {product.specs.ram}</p>
//                         <p><strong>Storage:</strong> {product.specs.storage}</p>
//                     </>
//                 ) : (
//                     <>
//                         <p><strong>Storage:</strong> {product.specs.storage}</p>
//                         <p><strong>Color:</strong> {product.specs.color}</p>
//                         <p><strong>Screen Size:</strong> {product.specs.screenSize}</p>
//                     </>
//                 )}
//             </div>        
//         </div>
//         <Footer/>
//         <ToastContainer position="top-end" className='custom-toast-container'>
//             <Toast 
//                 onClose={()=>setShowToast(false)}
//                 show={showToast}
//                 delay={1400}
//                 autohide
//                 className='custom-toast'>
                
//                 <Toast.Body>Item added to cart!</Toast.Body>
                
//             </Toast>
//         </ToastContainer>



//         </div>
        
//     );
// };

// export default ProductDescription;




// import React,{useState,useEffect} from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import './ProductDescription.css';
// import { addToCart } from './Cartslice';
// import Footer from './Footer';
// import { Toast, ToastContainer } from 'react-bootstrap';

// const ProductDescription = () => {
//     const { id } = useParams(); 
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [cartbtn,setCartbtn] = useState("Add to cart");  
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/products/${id}`);
//                 if (!response.ok) {
//                     throw new Error("Network response is not good");
//                 }
//                 const data = await response.json();
//                 setProduct(data);
//             } catch (error) {
//                 console.log("Error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (!product) {
//         return <p>Product not found</p>;
//     }

//     const handleAddToCart = () => {
//         dispatch(addToCart(product));
//         setCartbtn("Added");
//         Toast("Item Added to Cart!");
        
//     };

//     return (
//         <div>
//         <div className="product-description">
//             <div className="image-container">
//                 <img
//                     src={product.image}
//                     alt={product.model}
//                 />
//             </div>
//             <div className="details-container">
//                 <h2>{product.model}</h2>
//                 <div className='button'>
                  
//                     <button onClick={handleAddToCart}>{cartbtn}</button>
//                     <ToastContainer/>
//                 </div>
//                 <p style={{color:"rgb(101,157,218)"}}>{product.brand}</p>
//                 <p><strong>Price:</strong> {product.price}$  <del style={{fontWeight:"lighter" ,paddingLeft:"15px",fontSize:"small"}}>{product.oldPrice}</del></p>
//                 <p><strong>Description: </strong>{product.description}</p>
//                 {product.specs.processor ? (
//                     <>
//                         <p><strong>Processor:</strong> {product.specs.processor}</p>
//                         <p><strong>RAM:</strong> {product.specs.ram}</p>
//                         <p><strong>Storage:</strong> {product.specs.storage}</p>
//                     </>
//                 ) : (
//                     <>
//                         <p><strong>Storage:</strong> {product.specs.storage}</p>
//                         <p><strong>Color:</strong> {product.specs.color}</p>
//                         <p><strong>Screen Size:</strong> {product.specs.screenSize}</p>
//                     </>
//                 )}
//             </div>        
//         </div>
//         <Footer/>
//         </div>
        
//     );
// };

// export default ProductDescription;