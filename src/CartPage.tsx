import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addItem, removeItem } from './Cartslice';
import './CSS_Files/Cartpage.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiFillPlusCircle } from "react-icons/ai";
import { HiMinusCircle } from "react-icons/hi";
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';


interface CartItem {
  id: string;
  image: string;
  model: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
}

const CartPage: React.FC = () => {
  const items = useSelector((state: { cart: CartState }) => state.cart.items);
  const totalPrice = useSelector((state: { cart: CartState }) => state.cart.totalPrice);
  const count = useSelector((state: { cart: CartState }) => state.cart.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = sessionStorage.getItem("LoginData");

  const handleRemoveFromCart = (item: CartItem) => {
    dispatch(removeFromCart(item.id));
    toast.success("Item successfully removed");
  };

  const handleAddItem = (item: CartItem) => {
    dispatch(addItem(item.id));
  };

  const handleDelItem = (item: CartItem) => {
    dispatch(removeItem(item.id));
  };

  const handlePlaceOrder = async () => {
    try {
      const appleId = sessionStorage.getItem("AppleID");

      if (!appleId) {
        alert("You don't have an account, please login to continue");
        toast.error("Please Login to continue");
        navigate('/Forms');
        return;
      }

      const order = {
        items,
        totalPrice,
        count,
        appleId,
        date: new Date().toISOString()
      };

      await axios.post('http://localhost:5000/Orderhistory', order);

      const response = await axios.get("http://localhost:5000/address");
      const userdata = response.data.find((i: any) => i.AppleID === appleId);

      if (userdata) {
        navigate('/Addresspack');
      } else {
        navigate('/Addresspack');
      }

      if (email) {
        const templateParams = {
          user_email: email,
          order: JSON.stringify(order),
        };

        await emailjs.send('', 'template_pws7z2b', templateParams, 'nQS9ek_wYFqpkeu6h');
        console.log('Email sent successfully!');
      }

    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  if (items.length === 0) {
    return (
      <div className='empt-cart'>
        <b className='text'>Your cart is empty</b>
        <img src='https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif' alt='Add items to continue'/>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div className='items'>
          <h2><b style={{ color: "rgb(68, 133, 145)" }}>CHECKOUT</b></h2><hr/>
          <p><b style={{ color: "black", paddingBottom: "18px" }}>Total Items: {count}</b></p>
          <p><hr /></p>
          <ul>
            {items.map((item) => (
              <li key={item.id} className='cart-item'>
                <div className='gst-amt'>
                  <div className='gst'>
                    <Link to={`/ProductDescription/${item.id}`}><img src={item.image} alt="item" /></Link>
                  </div>
                  <div className='amt'>
                    <p><b>Quantity: </b>{item.quantity}</p>
                    <AiFillPlusCircle onClick={() => handleAddItem(item)} />
                    <HiMinusCircle onClick={() => handleDelItem(item)} />
                    <p><b>Name: </b>{item.model}</p>
                    <p><b>Price: </b>${item.price}</p>
                  </div>
                  <div className='only-btn'>
                    <button onClick={() => handleRemoveFromCart(item)}>Remove from cart</button>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>

        <div className='amount'>
          <p><b style={{ color: "rgb(68, 133, 145)" }}>Estimated Amount</b></p><hr/>
          <div className='gst-amt'>
            <p className='gst'><b style={{ color: "black" }}>Sub total:</b></p>
            <p className='amt'>${totalPrice.toFixed(2)}</p>
          </div>
          <div className='gst-amt'>
            <p className='gst'><b>GST:</b></p> <p className='amt'>₹0</p>
          </div>
          <div className='gst-amt'>
            <p className='gst'><b>Delivery charges:</b></p> <p className='amt'><del>₹69</del> <span style={{ color: "deepgreen" }}>FREE</span></p>
          </div>
          <div className='gst-amt'>
            <p className='gst'><b>Platform fees:</b></p> <p className='amt'><del>₹100</del> <span style={{ color: "deepgreen" }}>FREE</span></p>
          </div>
          <hr/>
          <p><b style={{ color: "rgb(68, 133, 145)" }}>Estimated Total: ${totalPrice.toFixed(2)}</b></p><hr />
          <button onClick={handlePlaceOrder} className="headache">
            CheckOut
          </button>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default CartPage;












// import React,{} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, addItem, removeItem } from './Cartslice';
// import './CSS_Files/Cartpage.css';
// import { Link, useNavigate } from 'react-router-dom';
// import Footer from './Footer';
// import axios from 'axios';
// import { ToastContainer,toast } from 'react-toastify';
// import { AiFillPlusCircle } from "react-icons/ai";
// import { HiMinusCircle } from "react-icons/hi";
// import emailjs from 'emailjs-com';
// import 'bootstrap/dist/css/bootstrap.min.css';


// const CartPage = () => {
//     const items = useSelector((state) => state.cart.items);
//     const totalPrice = useSelector((state) => state.cart.totalPrice);
//     const count = useSelector((state) => state.cart.count);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     let email=sessionStorage.getItem("LoginData");
    


//     const handleRemoveFromCart = (item) => {
//         dispatch(removeFromCart(item.id));
//         toast.success("Item successfully removed");
//     };

//     const handleAddItem = (item) => {
//         dispatch(addItem(item.id));
//     };

//     const handleDelItem = (item) => {
//         dispatch(removeItem(item.id));
//     };

//     const handlePlaceOrder = async () => {
//         try {
//             const appleId = sessionStorage.getItem("AppleID");
    
//             const order = {
//                 items,
//                 totalPrice,
//                 count,
//                 appleId,
//                 date: new Date().toISOString()
//             };      
            
//             await axios.post('http://localhost:5000/Orderhistory', order);
    
//             const response=await axios.get("http://localhost:5000/address");
//             const userdata=response.data.find(i=>i.AppleID===appleId);
            
//             if (appleId === null) {
//                 alert("You don't have an account, please login to continue");
//                 toast.error("Please Login to continue");
//                 navigate('/Forms');

//             } else if (userdata) {
//                 // toast.info("Your order will be placed with previous address");
//                 // setTimeout(() => {
//                 //     navigate('/Payment');
                    
//                 // }, 3000);
//                 navigate('/Addresspack');
                
                
                
//             }
//             else{
//                 navigate('/Addresspack');
//             }
    
//             const templateParams = {
//                 user_email: email.AppleID,
//                 order: JSON.stringify(order),
//             };
    
//             await emailjs.send('', 'template_pws7z2b', templateParams, 'nQS9ek_wYFqpkeu6h');
//             console.log('Email sent successfully! service_uq96hwb');
    
//         } catch (error) {
//             console.error("Error placing order: ", error);
            
//         }
//     };
    

//     if (items.length === 0) {
//         return (
//             <div className='empt-cart'>
//                 <b className='text'>Your cart is empty</b>
//                 <img src='https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif' alt='Add items to continue'/>
//             </div>
//         );
//     }


//     return (
//         <div>
//             <div className="container">
//                 <div className='items'>
//                     <h2><b style={{ color:"rgb(68, 133, 145)" }}>CHECKOUT</b></h2><hr/>
//                     <p><b style={{ color: "black" ,paddingBottom:"18px"}}>Total Items: {count}</b></p>
//                     <p><hr></hr></p>
//                     <ul>
//                         {items.map((item) => (
//                             <li key={item.id} className='cart-item'>
//                                 <div className='gst-amt'>
//                                     <div className='gst'>
//                                         <Link to={`/ProductDescription/${item.id}`}><img src={item.image} alt="item"/></Link>
//                                     </div>
//                                     <div className='amt'>
//                                         <p><b>Quantity: </b>{item.quantity}</p>
//                                         <AiFillPlusCircle onClick={() => handleAddItem(item)} />
//                                         <HiMinusCircle onClick={() => handleDelItem(item)} />
//                                         <p><b>Name: </b>{item.model}</p>
//                                         <p><b>Price: </b>${item.price}</p>
//                                     </div>
//                                     <div className='only-btn'>
//                                         <button onClick={() => handleRemoveFromCart(item)}
//                                             >Remove from cart</button>
//                                     </div>
//                                 </div>
//                                 <hr />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className='amount'>
//                     <p><b style={{ color: "rgb(68, 133, 145)" }}>Estimated Amount</b></p><hr/>
//                     <div className='gst-amt'>
//                         <p className='gst'><b style={{ color: "black" }}>Sub total:</b></p>
//                         <p className='amt'>${totalPrice.toFixed(2)}</p>
//                     </div>
//                     <div className='gst-amt'>
//                         <p className='gst'><b>GST:</b></p> <p className='amt'>₹0</p>
//                     </div>
//                     <div className='gst-amt'>
//                         <p className='gst'><b>Delivery charges:</b></p> <p className='amt'><del>₹69</del> <span style={{color:"deepgreen"}}>FREE</span>  </p>
//                     </div>
//                     <div className='gst-amt'>
//                         <p className='gst'><b>Platform fees:</b></p> <p className='amt'><del>₹100</del> <span style={{color:"deepgreen"}}>FREE</span>  </p>
//                     </div>
//                     <hr/>
//                     <p><b style={{ color: "rgb(68, 133, 145)" }}>Estimated Total: ${totalPrice.toFixed(2)}</b></p><hr></hr>
//                     <button onClick={handlePlaceOrder} class="headache" >
//                         CheckOut
//                     </button>
//                 </div>
//             </div>
//             <Footer/>
//             <ToastContainer />

//         </div>
//     );
// };

// export default CartPage;