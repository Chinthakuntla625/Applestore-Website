// import React,{} from 'react';
// import { useSelector} from 'react-redux';
// import './CSS_Files/Cartpage.css';
// import { Link } from 'react-router-dom';
// import Footer from './Footer';
// import { ToastContainer } from 'react-toastify';


// const Wishlist = () => {
//     const items = useSelector((state) => state.cart.wishitems);

//     if (items.length === 0) {
//         return (
//             <div className='empt-cart'>
//                 <b className='text'>Your Wishlist is empty</b>
//                 <img src='https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif' alt='Add items to continue'/>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="container">
//                 <div className='items'>
//                     <h2><b style={{ color:"rgb(68, 133, 145)" }}>WISHLIST</b></h2><hr/>
//                     <ul>
//                         {items.map((item) => (
//                             <li key={item.id} className='cart-item'>
//                                 <div className='gst-amt'>
//                                     <div className='gst'>
//                                         <Link to={`/ProductDescription/${item.id}`}><img src={item.image} alt="item"/></Link>
//                                     </div>
//                                     <div className='amt'>
//                                         <p><b>Name: </b>{item.model}</p>
//                                         <p><b>Price: </b>${item.price}</p>
//                                     </div>
//                                 </div>
//                                 <hr />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//             <Footer/>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={1500}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 className="tc"
//             />
//         </div>
//     );
// };

// export default Wishlist;