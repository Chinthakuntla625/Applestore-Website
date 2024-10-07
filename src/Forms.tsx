import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import './CSS_Files/Forms.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FormValues {
    AppleID: string;
    Password: string;
}


const initialValues: FormValues = {
    AppleID: "",
    Password: "",
};


const validationSchema = Yup.object({
    AppleID: Yup.string().required("Apple ID is required"),
    Password: Yup.string().required("Password is required").min(4, "Password is too short").max(8, "Password is too long"),
});

const Forms: React.FC = () => {
    const navigate = useNavigate(); 

    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await axios.get("http://localhost:5000/posts");

            const users = response.data;
            const user = users.find((user: { AppleID: string; Password: string }) => 
                user.AppleID === values.AppleID && user.Password === values.Password
            );

            if (user) {
                sessionStorage.setItem("AppleID", user.AppleID); 
                console.log("Login values: ", values);
                toast.success('Successfully Logged In!');
                navigate("/Products");
            } else {
                toast.error("Invalid Details"); 
            }
        } catch (error) {
            console.log("error: ", error);
            toast.error("Login failed"); 
        }
    };

    return (
        <div className="form-container">
           
            <img src="https://upraisal.io/img/button-apple.5de1934a.png" alt="Welcome to APPLE" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="form">
                        <div>
                            <label htmlFor="AppleID">Apple ID: </label>
                            <Field type="text" id="AppleID" name="AppleID" />
                            <ErrorMessage name="AppleID" component="div" className="Error-Message" />
                        </div>
                        <div>
                            <label htmlFor="Password">Password: </label>
                            <Field type="password" id="Password" name="Password" />
                            <ErrorMessage name="Password" component="div" className="Error-Message" />
                        </div>
                        <div className="submit">
                            <button type="submit">Login</button>
                        </div>
                        <div>
                            <p>Signup If you don't have an <del>AppleID</del></p>
                            <button>
                                <Link to="/Signup" style={{ color: "white", textDecoration: "none" }}>Signup</Link>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Forms;




















// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from "react-router-dom";
// import './CSS_Files/Forms.css';
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const initialValues = {
//     AppleID: "",
//     Password: "",
// };


// const validationSchema = Yup.object({
//     AppleID: Yup.string().required("Apple ID is required"),
//     Password: Yup.string().required("Password is required").min(4, "Password is too short").max(8, "Password is too long"),
// });

// const Forms = () => {
//     const navigate = useNavigate(); 

    
//     const handleSubmit = async (values) => {
//         try {
//             const response = await axios.get("http://localhost:5000/posts");

//             const users = response.data;
//             const user = users.find(user => user.AppleID === values.AppleID && user.Password === values.Password);

//             if (user) {
//                 sessionStorage.setItem("AppleID", user.AppleID); 
//                 console.log("Login values: ", values);
//                 toast.success('Successfully Logged In!')
//                 navigate("/Products");
//             } else {
//                 toast.error("Invalid Details"); 
//             }
//         } catch (error) {
//             console.log("error: ", error);
//             toast.error("Login failed"); 
//         }
//     };

//     return (
//         <div className="form-container">
            
            
//             {/* <img src="https://th.bing.com/th/id/OIP.QuoO7T43jPxx3gbJlIkqyAHaEK?w=321&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Welcome to APPLE" /> */}
//             {/* <img src="https://th.bing.com/th/id/OIP.Oa61etg-kJ-fGN24F7RgGwHaBw?rs=1&pid=ImgDetMain
//             " alt="Welcome to APPLE" /> */}
//             <img src="https://upraisal.io/img/button-apple.5de1934a.png

//             " alt="Welcome to APPLE" />
//             <Formik
            
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {() => (
//                     <Form className="form">
//                         <div>
//                             <label htmlFor="AppleID">Apple ID: </label>
//                             <Field type="text" id="AppleID" name="AppleID" />
//                             <ErrorMessage name="AppleID" component="div" className="Error-Message" />
//                         </div>
//                         <div>
//                             <label htmlFor="Password">Password: </label>
//                             <Field type="password" id="Password" name="Password" />
//                             <ErrorMessage name="Password" component="div" className="Error-Message" />
//                         </div>
//                         <div className="submit">
//                             <button type="submit">Login</button>
//                         </div>
//                         <div>
//                             <p>Signup If you don't have an <del>AppleID</del></p>
//                             <button>
//                                 <Link to="/Signup" style={{ color: "white", textDecoration: "none" }}>Signup</Link>
//                             </button>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>

//             <ToastContainer
//             position="top-right"
//             autoClose={2000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//             />
//         </div>
//     );
// };

// export default Forms;


