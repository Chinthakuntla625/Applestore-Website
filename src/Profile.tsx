import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS_Files/Profile.css';
import Footer from './Footer';


interface Item {
  model: string;
  price: number;
  quantity: number;
}

interface Order {
  date: string;
  totalPrice: number;
  items: Item[];
  appleId: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const appleId = sessionStorage.getItem("AppleID");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>('http://localhost:5000/Orderhistory');
        const userOrders = response.data.filter(order => order.appleId === appleId);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    if (appleId) {
      fetchOrders();
    }
  }, [appleId]);

  return (
    <div>
      <div className="order-history">
        {appleId === null ? (
          <p><b style={{ color: "coralBlue" }}>PLEASE LOGIN TO VIEW YOUR ORDER HISTORY</b></p>
        ) : (
          <>
            <button><b>ORDER HISTORY</b></button>
            <button style={{ width: "290px" }}>
              <b style={{ paddingRight: "90px" }}>
                USER NAME: <b style={{ color: "violet" }}> {appleId}</b>
              </b>
            </button>
          </>
        )}
        
        <ul style={{ listStyleType: "decimal" }}>
          {orders.map((order, index) => (
            <li key={index}>
              <button><b>Order-{index + 1}</b></button>
              <p><b>Date:</b> {new Date(order.date).toLocaleString()}</p>
              <p><b>Total Price:</b> ${order.totalPrice.toFixed(2)}</p>
              <button><b>Apple ID:</b> {appleId}</button>
              <ul style={{ listStyleType: "none" }}>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    <p><b>Item:</b> {item.model} - ${item.price}</p>
                    <p><b>Quantity:</b> {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
};

export default OrderHistory;










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './CSS_Files/Profile.css';
// import Footer from'./Footer.js';


// const OrderHistory = () => {
//     const [orders, setOrders] = useState([]);
//     const appleId=sessionStorage.getItem("AppleID");
//     // const userID= appleId.toUpperCase();
    
    
//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/Orderhistory');
//                 const userOrders = response.data.filter(order => order.appleId === appleId);
//             setOrders(userOrders);
//             } catch (error) {
//                 console.error("Error fetching orders: ", error);
//             }
//         };
//         if (appleId) {
//             fetchOrders();
//         }
//     }, [appleId]);


//     return (
//         <div>
//         <div className="order-history">
//             {appleId === null ? (
//         <p><b style={{color:" coralBlue"}}>PLEASE LOGIN TO VIEW YOUR ORDER HISTORY</b></p>
//       ) : (
//         <><button><b>ORDER HISTORY</b></button><button style={{ width: "290px" }}><b style={{ paddingRight: "90px" }}>USER NAME: <b style={{color:"violet"}}> {appleId}</b>  </b>  </button></>
//       )}
            
//             <ul style={{listStyleType:"decimal"}}>
//                 {orders.map((order, index) => (
//                     <li key={index}>
//                         <button><b>Order-{index + 1}</b></button>
//                         <p><b>Date:</b> {new Date(order.date).toLocaleString()}</p>
//                         <p><b>Total Price:</b> ${order.totalPrice.toFixed(2)}</p>
//                         <button><b>Apple ID:</b> {appleId}</button>
//                         <ul style={{listStyleType:"none"}}>
//                             {order.items.map((item, idx) => (
//                                 <li key={idx}>
//                                     <p><b>Item:</b> {item.model} - ${item.price}</p>
//                                     <p><b>Quantity: </b>{item.quantity}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
        
//         </div>
//         <div className='footer'>
//         <Footer/>
//         </div>
        
//         </div>
        
//     );
// };

// export default OrderHistory;