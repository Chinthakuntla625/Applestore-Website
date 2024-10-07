import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './CSS_Files/Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';

interface SignupValues {
    FirstName: string;
    AppleID: string;
    EmailID: string;
    Password: string;
    ConfirmPassword: string;
}

const initialValues: SignupValues = {
    FirstName: "",
    AppleID: "",
    EmailID: "",
    Password: "",
    ConfirmPassword: "",
};

const validationSchema = Yup.object({
    FirstName: Yup.string().required("First name is required"),
    AppleID: Yup.string().required("Create Apple ID"),
    EmailID: Yup.string().email("Invalid email format").required("Email ID is required"),
    Password: Yup.string().required("Password is required").min(4, "Password is too short").max(9, "Password is too long"),
    ConfirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('Password')," "], "Passwords must match")
});

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [save, setSave] = useState<boolean>(false);

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

    const handleSignup = async (values: SignupValues, actions: FormikHelpers<SignupValues>) => {
        try {
            const response = await axios.post("http://localhost:5000/posts", values);
            console.log("Success:", response.data);
            setShowToast(true);
            setSave(false);
            alert('Registered successfully.');
            navigate('/Forms');
        } catch (error) {
            console.error("Error:", error);
            alert('Registration Failed');
        } finally {
            actions.setSubmitting(false); 
        }
    };

    return (
        <div className='Signup-container'>
            {/* <img src='https://p-ph.ipricegroup.com/media/apple_ph.jpg' alt='signup' /> */}
            {/* <img src='https://estore.ua/ua/media/post/image/a/p/apple-id-big-banner-2.png' alt='signup' /> */}
            
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignup}
                validate={() => setSave(true)}
            >
                {({ handleChange }) => (
                    <Form className='Signup'>
                        <h5><b>Create your Apple ID</b></h5>
                        <hr />
                        <div>
                            <label htmlFor="FirstName">Name: </label>
                            <Field type="text" id="FirstName" name="FirstName" onChange={handleChange} />
                            <ErrorMessage name="FirstName" component="div" className='Error-Message' />
                        </div>
                        
                        <div>
                            <label htmlFor="AppleID">Apple ID: </label>
                            <Field type="text" id="AppleID" name="AppleID" onChange={handleChange} />
                            <ErrorMessage name="AppleID" component="div" className='Error-Message' />
                        </div>
                        <div>
                            <label htmlFor="EmailID">Email-ID: </label>
                            <Field type="text" id="EmailID" name="EmailID" onChange={handleChange} />
                            <ErrorMessage name="EmailID" component="div" className='Error-Message' />
                        </div>
                        <div>
                            <label htmlFor="Password">Password: </label>
                            <Field type="password" id="Password" name="Password" onChange={handleChange} />
                            <ErrorMessage name="Password" component="div" className='Error-Message' />
                        </div>
                        <div>
                            <label htmlFor="ConfirmPassword">Confirm Password: </label>
                            <Field type="password" id="ConfirmPassword" name="ConfirmPassword" onChange={handleChange} />
                            <ErrorMessage name="ConfirmPassword" component="div" className='Error-Message' />
                        </div>
                        <div>
                            <button type="submit">Signup</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer position="top-end" className='custom-toast-container'>
                <Toast 
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                    className='custom-toast'>
                    <Toast.Body>Item added to cart!</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Signup;















// import React, { useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import './CSS_Files/Signup.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Toast, ToastContainer } from 'react-bootstrap';

// const initialValues = {
//     FirstName: "",
 
//     AppleID: "",
//     EmailID: "",
//     Password: "",
//     ConfirmPassword: "",
// };

// const validationSchema = Yup.object({
//     FirstName: Yup.string().required("First name is required"),
    
//     AppleID: Yup.string().required("Create Apple ID"),
//     EmailID: Yup.string().email("Invalid email format").required("Email ID is required"),
//     Password: Yup.string().required("Password is required").min(4, "Password is too short").max(9, "Password is too long"),
//     ConfirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('Password'), null], "Passwords must match")
// });

// const Signup = () => {
//     const navigate = useNavigate();
//     const [showToast, setShowToast] = useState(false);
//     const [save, setSave] = useState(false);

   
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
//             const response = await axios.post("http://localhost:5000/posts", values);
//             console.log("Success:", response.data);
//             setShowToast(true);
//             setSave(false); 
//             alert('Registered successfully.');
//             navigate('/Forms');
//         } catch (error) {
//             console.error("Error:", error);
//             alert('Registration Failed');
//         }
//     };

//     return (
//         <div className='Signup-container'>
//             {/* <img src='https://p-ph.ipricegroup.com/media/apple_ph.jpg' alt='signup' /> */}
//             {/* <img src='https://estore.ua/ua/media/post/image/a/p/apple-id-big-banner-2.png' alt='signup' /> */}
            
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSignup}
//                 validate={() => setSave(true)} 
//             >
//                 {({ handleChange }) => (
//                     <Form className='Signup'>
//                         <h5><b>Create your Apple ID</b></h5>
//                         <hr></hr>
//                         <div>
//                             <label htmlFor="FirstName">Name: </label>
//                             <Field type="text" id="FirstName" name="FirstName" onChange={handleChange} />
//                             <ErrorMessage name="FirstName" component="div" className='Error-Message' />
//                         </div>
                        
//                         <div>
//                             <label htmlFor="AppleID">Apple ID: </label>
//                             <Field type="text" id="AppleID" name="AppleID" onChange={handleChange} />
//                             <ErrorMessage name="AppleID" component="div" className='Error-Message' />
//                         </div>
//                         <div>
//                             <label htmlFor="EmailID">Email-ID: </label>
//                             <Field type="text" id="EmailID" name="EmailID" onChange={handleChange} />
//                             <ErrorMessage name="EmailID" component="div" className='Error-Message' />
//                         </div>
//                         <div>
//                             <label htmlFor="Password">Password: </label>
//                             <Field type="password" id="Password" name="Password" onChange={handleChange} />
//                             <ErrorMessage name="Password" component="div" className='Error-Message' />
//                         </div>
//                         <div>
//                             <label htmlFor="ConfirmPassword">Confirm Password: </label>
//                             <Field type="password" id="ConfirmPassword" name="ConfirmPassword" onChange={handleChange} />
//                             <ErrorMessage name="ConfirmPassword" component="div" className='Error-Message' />
//                         </div>
//                         <div>
//                             <button type="submit">Signup</button>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>
//             <ToastContainer position="top-end" className='custom-toast-container'>
//                 <Toast 
//                     onClose={() => setShowToast(false)}
//                     show={showToast}
//                     delay={3000}
//                     autohide
//                     className='custom-toast'>
//                     <Toast.Body>Item added to cart!</Toast.Body>
//                 </Toast>
//             </ToastContainer>
//         </div>
//     );
// }

// export default Signup;

