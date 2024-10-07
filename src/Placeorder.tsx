import React from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Placeorder: React.FC = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/Products');
  };

  const handleOrderhistory = () => {
    navigate('/Profile');
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      localStorage.clear();
      navigate('/Forms');
    }
  };

  return (
    <div className='order'>
    
          <div>
            Order will be sent to your previous address
          <button type="button"></button>
        </div>
 
      {/* <img src="/Images/check.jpg" alt='Successful' /> */}
      <img src="/Images/check.jpg" alt='Successful' />
      <p><b>Your order was placed successfully!!</b></p>
      <p>We have sent you an email with the order details</p>
      <button onClick={handleHome}>Go to Home</button>
      <button onClick={handleOrderhistory}>Order History</button>
      <button onClick={handleLogout}>Logout</button>
      
      <Footer />
      </div>
  );
};

export default Placeorder;












// import React from 'react';
// import './CSS_Files/Placeorder.css';
// import Footer from './Footer';
// import { useNavigate } from 'react-router-dom';
// // const appleId=sessionStorage.getItem("AppleID");



// const Placeorder = () => {
//   const navigate=useNavigate();
//   const handleHome=()=>{
//     navigate('/Products');
//   }
//   const handleOrderhistory=()=>{
//     navigate('/Profile');
//   }
//   const handleLogout=()=>{
//     alert("Are you sure want to logout!");
//     sessionStorage.clear();
//     localStorage.clear();
//     navigate('/Forms');

//   }
//   return (
//     <div className='order'>
//       <div class="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
//   <div class="d-flex">
//     <div class="toast-body">
//       Order will be sent to your previous address
//     </div>
//     <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
//   </div>
// </div>
//       <img src="/Images/check.jpg" alt='Successfull'></img>
//       <p><b>Your order placed successfully!!</b></p>
//       <p>We have sent you an email with the order details</p>
//       <button onClick={handleHome}>go to home</button>
//       <button onClick={handleOrderhistory}>Order History</button>
//       <button onClick={handleLogout}>Logout</button>
      
//       {/* <div style={{marginTop:"80px",width:"100%"}}><Footer/></div> */}
//       <Footer/>
//     </div>
    
    
    
//   )
// }

// export default Placeorder;