import React, { useState, useEffect } from 'react';
import './CSS_Files/Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface Address {
  AppleID: string;
  FirstName: string;
  Mobile: string;
  Address: string;
  State: string;
}

const Addresspack: React.FC = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const appleId = sessionStorage.getItem("AppleID");
  const navigate = useNavigate(); 

  const handleAddress = () => {
    navigate('/Address'); 
  };

  const handleThisAddress = () => {
    navigate('/Payment'); 
  };

  const filteredProducts = address.filter((i) => i.AppleID === appleId);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get<Address[]>("http://localhost:5000/address");
        setAddress(response.data);
      } catch (error) {
        console.error("Error fetching addresses", error);
      }
    };

    fetchAddresses();
  }, [appleId]);

  return (
    <div className='order-history'>
      {appleId === null ? (
        <p><b style={{ color: "coral" }}>PLEASE LOGIN TO VIEW YOUR SAVED ADDRESSES</b></p>
      ) : (
        <>
          <button><b>SAVED ADDRESSES</b></button>
          <button style={{ width: "190px" }} onClick={handleAddress}>
            <b style={{ paddingRight: "20px" }}>
              Add Address (+) <b style={{ color: "violet" }}> </b>
            </b>
          </button>
        </>
      )}
      <div>
        <ul style={{ listStyleType: "decimal" }}>
          {filteredProducts.length === 0 ? (
            <p>No addresses found.</p>
          ) : (
            filteredProducts.map((x, index) => (
              <li key={index}>
                <div>
                  <button><b>Address-{index + 1}</b></button>
                </div>
                <div>
                  <p><b>Apple ID:</b> {appleId}</p>
                </div>
                <div>
                  <p><b>Name:</b> {x.FirstName}</p>
                </div>
                <div>
                  <p><b>Mobile Number:</b> {x.Mobile}</p>
                </div>
                <div>
                  <p><b>Address:</b> {x.Address}</p>
                </div>
                <div>
                  <p><b>State:</b> {x.State}</p>
                </div>
                <button style={{ width: "190px" }} onClick={handleThisAddress}>
                  <b style={{ paddingRight: "20px" }}>
                    Continue with this Address <b style={{ color: "violet" }}> </b>
                  </b>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Addresspack;









// import React, { useState, useEffect } from 'react';
// import './CSS_Files/Profile.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Addresspack = () => {
//     const [address, setAddress] = useState([]);
//     const appleId = sessionStorage.getItem("AppleID");
//     const navigate = useNavigate(); 

//     const handleAddress = () => {
//         navigate('/Address'); 
//     };
//     const handleThisAddress =()=>{
//         navigate('/Payment'); 
//     }

//     const filteredProducts = address.filter(i => i.AppleID === appleId);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/address");
//                 setAddress(response.data);
//             } catch (error) {
//                 console.error("Error fetching addresses", error);
//             }
//         };
//         fetchProducts();
//     }, [appleId]);

//     return (
//         <div className='order-history'>
//             {appleId === null ? (
//                 <p><b style={{ color: "coral" }}>PLEASE LOGIN TO VIEW YOUR SAVED ADDRESSES</b></p>
//             ) : (
//                 <>
//                     <button><b>SAVED ADDRESSES</b></button>
//                     <button style={{ width: "190px" }} onClick={handleAddress}>
//                         <b style={{ paddingRight: "20px" }}>
//                             Add Address (+) <b style={{ color: "violet" }}> </b>
//                         </b>
//                     </button>
//                 </>
//             )}
//             <div>
//                 <ul style={{ listStyleType: "decimal" }}>
//                     {filteredProducts.length === 0 ? (
//                         <p>No addresses found.</p>
//                     ) : (
//                         filteredProducts.map((x, index) => (
//                             <li key={index}>
//                                 <div>
//                                     <button><b>Address-{index + 1}</b></button>
//                                 </div>
//                                 <div>
//                                     <p><b>Apple ID:</b> {appleId}</p>
//                                 </div>
//                                 <div>
//                                     <p><b>Name:</b> {x.FirstName}</p>
//                                 </div>
//                                 <div>
//                                     <p><b>Mobile Number:</b> {x.Mobile}</p>
//                                 </div>
//                                 <div>
//                                     <p><b>Address:</b> {x.Address}</p>
//                                 </div>
//                                 <div>
//                                     <p><b>State:</b> {x.State}</p>
//                                 </div>
//                                 <button style={{ width: "190px" }} onClick={handleThisAddress}>
//                         <b style={{ paddingRight: "20px" }}>
//                             Continue with this Address <b style={{ color: "violet" }}> </b>
//                         </b>
//                     </button>
//                             </li>
//                         ))
//                     )}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Addresspack;
