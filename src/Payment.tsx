import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CSS_Files/Payment.css';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearCart } from './Cartslice';
import { FaApplePay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePayment } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';


interface PaymentValues {
  Name: string;
  cardnumber: string;
  expiry: string;
  cvv: string;
}


const initialValues: PaymentValues = {
  Name: "",
  cardnumber: "",
  expiry: "",
  cvv: "",
};

const validationSchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  cardnumber: Yup.string().required("Card Number is required")
    .matches(/^\d+$/, "Card Number must be a number")
    .min(13, "Card Number is too short")
    .max(19, "Card Number is too long"),
  expiry: Yup.string().required("Expiry date is required"),
  cvv: Yup.string().required("CVV is required")
    .matches(/^\d+$/, "CVV must be a number")
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits"),
});

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [save, setSave] = useState(false);
  const totalPrice = useSelector((state: any) => state.cart.totalPrice); 
  const dispatch = useDispatch();

  const handlePrice = () => {
    if (totalPrice !== 0) {
      navigate('/Placeorder');
      dispatch(clearCart());
    } else {
      toast.error("Add items to place order");
      navigate('/Products');
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (save) {
        const message = "Changes may not be saved on reload";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [save]);

  const handleSignup = async (values: PaymentValues) => {
    try {
    //   const response = await axios.post("http://localhost:5000/payments", values);
      console.log("Success:", values);
      toast.success("Payment successful!");
      setSave(false);
      handlePrice();
    } catch (error) {
      console.log("Error:", error);
      console.log("Payment Values:", values);
      toast.error('Payment Failed');
    }
  };

  return (
    <div className="container p-4">
      <div className='card px-7'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
          validate={() => setSave(true)}
        >
          {({ handleChange }) => (
            <Form className='col-12'>
              <h5 className="h8 py-3">
                <MdOutlinePayment style={{ paddingRight: "7px", fontSize: "40px" }} />
                <b>PAYMENT DETAILS</b>
              </h5>
              <hr />
              <div className='col-12'>
                <div className="d-flex flex-column">
                  <label htmlFor="Name">Name </label>
                  <Field className='form-control' type="text" id="Name" name="Name" onChange={handleChange} />
                  <ErrorMessage name="Name" component="div" className='Error-Message' />
                </div>
              </div>
              <div className='col-12'>
                <div className="d-flex flex-column">
                  <label htmlFor="cardnumber">Card Number </label>
                  <Field className='form-control' type="text" id="cardnumber" name="cardnumber" placeholder="1234 5678 9012 3456" onChange={handleChange} />
                  <ErrorMessage name="cardnumber" component="div" className='Error-Message' />
                </div>
              </div>
              <div className='col-6'>
                <div className="d-flex flex-column">
                  <label htmlFor="expiry">Expiry Date </label>
                  <Field className='form-control' type="text" id="expiry" name="expiry" placeholder="MM/YY" onChange={handleChange} />
                  <ErrorMessage name="expiry" component="div" className='Error-Message' />
                </div>
              </div>
              <div className='col-6'>
                <div className="d-flex flex-column">
                  <label htmlFor="cvv">CVV/CVC </label>
                  <Field className='form-control' type="password" id="cvv" name="cvv" placeholder="123" onChange={handleChange} />
                  <ErrorMessage name="cvv" component="div" className='Error-Message' />
                </div>
              </div>
              <div className="col-12">
                <button type='submit' className='btn btn-primary'>
                  <FaApplePay style={{ fontSize: "60px" }} />
                  <b>${totalPrice}</b>
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Payment;










// import React, { useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import './CSS_Files/Payment.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { clearCart } from './Cartslice';
// import { FaApplePay } from "react-icons/fa";
// import { useDispatch, useSelector } from 'react-redux';
// import { MdOutlinePayment } from "react-icons/md";
// import { toast, ToastContainer } from 'react-toastify';

// const initialValues = {
//     Name: "",
//     cardnumber: "",
//     expiry: "",
//     cvv: "",
// };

// const validationSchema = Yup.object({
//     Name: Yup.string().required("Name is required"),
//     cardnumber: Yup.string().required("Card Number is required").matches(/^\d+$/, "Card Number must be a number").min(13, "Card Number is too short")
//     .max(19, "Card Number is too long"),
//     expiry: Yup.string().required("Expiry date is required"),
//     cvv: Yup.string().required("CVV is required").matches(/^\d+$/, "CVV must be a number").min(3, "CVV must be 3 or 4 digits")
//     .max(4, "CVV must be 3 or 4 digits"),
// });

// const Payment = () => {
//     const navigate = useNavigate();
//     const [save, setSave] = useState(false);
//     const totalPrice = useSelector((state) => state.cart.totalPrice);
//     const dispatch = useDispatch();

//     const handlePrice = () => {
//         if (totalPrice !== 0) {
//             navigate('/Placeorder');
//             dispatch(clearCart());
//         } else {
//             toast.error("Add items to place order");
//             navigate('/Products');
//         }
//     };

//     useEffect(() => {
//         const handleBeforeUnload = (event) => {
//             if (save) {
//                 const message = "Changes may not be saved on reload";
//                 event.returnValue = message;
//                 return message;
//             }
//         };

//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, [save]);

//     const handleSignup = async (values) => {
//         try {
//             const response = await axios.post("http://localhost:5000/payment", values);
//             console.log("Success:", response.data);
//             toast.success("Payment successful!");
//             setSave(false);
//             handlePrice(); 
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error('Payment Failed');
//         }
//     };

//     return (
//         <div className="container p-4">
//             <div className='card px-7'>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSignup}
//                     validate={() => setSave(true)}
//                 >
//                     {({ handleChange }) => (
//                         <Form className='col-12'>
//                             <h5 className="h8 py-3">
//                                 <MdOutlinePayment style={{ paddingRight: "7px", fontSize: "40px" }} />
//                                 <b>PAYMENT DETAILS</b>
//                             </h5>
//                             <hr />
//                             <div className='col-12'>
//                                 <div className="d-flex flex-column">
//                                     <label htmlFor="Name">Name </label>
//                                     <Field className='form-control' type="text" id="Name" name="Name" onChange={handleChange} />
//                                     <ErrorMessage name="Name" component="div" className='Error-Message' />
//                                 </div>
//                             </div>
//                             <div className='col-12'>
//                                 <div className="d-flex flex-column">
//                                     <label htmlFor="cardnumber">Card Number </label>
//                                     <Field className='form-control' type="text" id="cardnumber" name="cardnumber" placeholder="1234 5678 9012 3456" onChange={handleChange} />
//                                     <ErrorMessage name="cardnumber" component="div" className='Error-Message' />
//                                 </div>
//                             </div>
//                             <div className='col-6'>
//                                 <div className="d-flex flex-column">
//                                     <label htmlFor="expiry">Expiry Date </label>
//                                     <Field className='form-control' type="text" id="expiry" name="expiry" placeholder="MM/YY" onChange={handleChange} />
//                                     <ErrorMessage name="expiry" component="div" className='Error-Message' />
//                                 </div>
//                             </div>
//                             <div className='col-6'>
//                                 <div className="d-flex flex-column">
//                                     <label htmlFor="cvv">CVV/CVC </label>
//                                     <Field className='form-control' type="password" id="cvv" name="cvv" placeholder="123" onChange={handleChange} />
//                                     <ErrorMessage name="cvv" component="div" className='Error-Message' />
//                                 </div>
//                             </div>
//                             <div className="col-12">
//                                 <button type='submit' className='btn btn-primary'>
//                                     <FaApplePay style={{ fontSize: "60px" }} />
//                                     <b>${totalPrice}</b>
//                                 </button>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// }

// export default Payment;
