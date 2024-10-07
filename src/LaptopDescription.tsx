import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CSS_Files/ProductDescription.css';
import { addToCart } from './Cartslice';
import Footer from './Footer';


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

const LaptopDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Type the useParams return value
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/laptops/${id}`);
        if (!response.ok) {
          throw new Error("Network response is not good");
        }
        const data: Product = await response.json(); // Type the response data
        setProduct(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
            <button onClick={handleAddToCart}>Add to cart</button>
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
      <Footer/>
    </div>
  );
};

export default LaptopDescription;










// import React,{useState,useEffect} from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import './CSS_Files/ProductDescription.css';
// import { addToCart } from './Cartslice';
// import Footer from './Footer';

// const LaptopDescription = () => {
//     const { id } = useParams(); 
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/laptops/${id}`);
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
//                     <button onClick={handleAddToCart}>Add to cart</button>
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
//         </div>
        
//     );
// };

// export default LaptopDescription;
