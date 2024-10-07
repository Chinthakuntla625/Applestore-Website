import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './CSS_Files/Address.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShippingFast } from "react-icons/fa";
import { toast } from 'react-toastify';


interface FormValues {
  FirstName: string;
  Mobile: string;
  AppleID: string;
  Address: string;
  State: string;
}

const initialValues: FormValues = {
  FirstName: "",
  Mobile: "",
  AppleID: "",
  Address: "",
  State: "",
};

const validationSchema = Yup.object({
  FirstName: Yup.string().required("Name is required"),
  Mobile: Yup.string().required("Mobile Number is required").matches(/^\d+$/, "Mobile must be a number"),
  AppleID: Yup.string().required("Enter Apple ID"),
  Address: Yup.string().required("Address is required"),
  State: Yup.string().required("Enter state"),
});

const Address: React.FC = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const appleId = sessionStorage.getItem("AppleID") || '';

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

  const handleSignup = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      await axios.post("http://localhost:5000/address", values);
      const response = await axios.get("http://localhost:5000/address");
      
      const userdata = response.data.find((i: any) => i.AppleID === appleId);
      if (userdata) {
        console.log("Success:", response.data);
        setShowToast(true);
        setSave(false); 
        toast.success("Address added successfully");
        navigate('/Payment');
      } else {
        alert("Apple ID is not matching");
      }
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
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
          {({ handleChange, handleBlur, values }) => (
            <Form className='col-12'>
              <h5><FaShippingFast style={{ paddingRight: "7px", fontSize: "55px" }} />
                <b className="h8 py-3">SHIPPING DETAILS</b></h5><hr />
              <div className='col-12'>
                <label htmlFor="FirstName">Name </label>
                <Field
                  className='form-control'
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.FirstName}
                />
                <ErrorMessage name="FirstName" component="div" className='Error-Message' />
              </div>
              <div className='col-12'>
                <label htmlFor="Mobile">Mobile Number </label>
                <Field
                  className='form-control'
                  type="text" 
                  id="Mobile"
                  name="Mobile"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Mobile}
                />
                <ErrorMessage name="Mobile" component="div" className='Error-Message' />
              </div>
              <div className='col-12'>
                <label htmlFor="AppleID">Apple ID </label>
                <Field
                  className='form-control'
                  type="text"
                  id="AppleID"
                  name="AppleID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.AppleID}
                />
                <ErrorMessage name="AppleID" component="div" className='Error-Message' />
              </div>
              <div className='col-12'>
                <label htmlFor="Address">Address with Pincode </label>
                <Field
                  className='form-control'
                  type="text"
                  id="Address"
                  name="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Address}
                />
                <ErrorMessage name="Address" component="div" className='Error-Message' />
              </div>
              <div className='col-12'>
                <label htmlFor="State">Town & State </label>
                <Field
                  className='form-control'
                  type="text"
                  id="State"
                  name="State"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.State}
                />
                <ErrorMessage name="State" component="div" className='Error-Message' />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">Proceed to Payment</button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer position="top-end" className='custom-toast-container'>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={2400}
            autohide
            className='custom-toast'>
            <Toast.Body>Item added to cart!</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}

export default Address;











// import React, { useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import './CSS_Files/Address.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Toast, ToastContainer } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaShippingFast } from "react-icons/fa";
// import { toast } from 'react-toastify';



// const initialValues = {
//     FirstName: "",
//     Mobile: "",
//     AppleID: "",
//     Address: "",
//     State: "",
// };

// const validationSchema = Yup.object({
//     FirstName: Yup.string().required("Name is required"),
//     Mobile: Yup.string().required("MobileNumber is required").matches(/^\d+$/, "Mobile must be a number"),
//     AppleID: Yup.string().required("Enter Apple ID"),
//     Address: Yup.string().required("Address is required"),
//     // Pincode: Yup.string().required("Pincode is required").min(4, "Password is too short").max(6, "Password is too long"),
//     State: Yup.string().required("Enter state"),
// });

// const Address = () => {
//     const navigate = useNavigate();
//     const [showToast, setShowToast] = useState(false);
//     const [save, setSave] = useState(false);
//     const appleId=sessionStorage.getItem("AppleID");
    
    

   
//     useEffect(() => {
//         const handleBeforeUnload = (event) => {
//             if (setSave) {
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
//             await axios.post("http://localhost:5000/address", values);
//             const response = await axios.get("http://localhost:5000/address");
            
//             const userdata=response.data.find(i=>i.AppleID===appleId)
//             if (userdata){
//             console.log("Success:", response.data);
//             setShowToast(true);
//             setSave(false); 
//             // alert('Address added successfully.');
//             toast.success("Address added successfully");
//             navigate('/Payment');

//             }
//             else{
//                 // toast.error("Apple ID is not matching");
//                 alert("Apple ID is not matching");
                
//             }
            
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div className="container p-4">
//         <div className='card px-7'>
       
//             {/* <img src="https://image.freepik.com/vector-gratis/logotipo-envio_10250-2693.jpg" class="img-fluid" alt="signup"></img> */}
//             {/* <img src='https://image.freepik.com/vector-gratis/logotipo-envio_10250-2693.jpg' alt='signup' /> */}
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSignup}
//                 validate={() => setSave(true)} 
//             >
//                 {({ handleChange }) => (
//                     <Form className='col-12'>
//                         <h5><FaShippingFast style={{paddingRight:"7px",fontSize:"55px"}} />
//                         <b class="h8 py-3">SHIPPING DETAILS</b></h5><hr></hr>
//                         <div className='col-12'>
//                             <label htmlFor="FirstName">Name </label>
//                             <Field  className='form-control' type="text" id="FirstName" name="FirstName" onChange={handleChange} />
//                             <ErrorMessage name="FirstName" component="div" className='Error-Message' />
//                         </div>
//                         <div className='col-12'>
//                             <label htmlFor="Mobile">Mobile Number </label>
//                             <Field className='form-control' type="number" id="Mobile" name="Mobile" onChange={handleChange} />
//                             <ErrorMessage name="Mobile" component="div" className='Error-Message' />
//                         </div>
//                         <div className='col-12'>
//                             <label htmlFor="AppleID">Apple ID </label>
//                             <Field className='form-control' type="text" id="AppleID" name="AppleID" onChange={handleChange} />
//                             <ErrorMessage name="AppleID" component="div" className='Error-Message' />
//                         </div>
//                         <div className='col-12'>
//                             <label htmlFor="Address">Address with Pincode </label>
//                             <Field className='form-control' type="text" id="Address" name="Address" onChange={handleChange} />
//                             <ErrorMessage name="Address" component="div" className='Error-Message' />
//                         </div>
//                         <div className='col-12'>
//                             <label htmlFor="State">Town & State </label>
//                             <Field className='form-control' type="text" id="State" name="State" onChange={handleChange} />
//                             <ErrorMessage name="State" component="div" className='Error-Message' />
//                         </div>
//                         <div>
//                             <button type="submit" class="btn btn-primary">Proceed to Payment</button>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>
//             <ToastContainer position="top-end" className='custom-toast-container'>
//                 <Toast 
//                     onClose={() => setShowToast(false)}
//                     show={showToast}
//                     delay={2400}
//                     autohide
//                     className='custom-toast'>
//                     <Toast.Body>Item added to cart!</Toast.Body>
//                 </Toast>
//             </ToastContainer>
//         </div>
//         </div>
//     );
// }

// export default Address;
