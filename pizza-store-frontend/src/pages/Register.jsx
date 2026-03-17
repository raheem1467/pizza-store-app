import { useNavigate, Link } from "react-router-dom";
import { registerUser, sendOTP } from "../services/authService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function Register(){

const navigate = useNavigate();
const [isOtpSent, setIsOtpSent] = useState(false);
const [timer, setTimer] = useState(0);

useEffect(() => {
  let interval;
  if (timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  } else {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [timer]);

/* Validation Schema */

const validationSchema = Yup.object({

name: Yup.string()
.min(3,"Name must be at least 3 characters")
.required("Name is required"),

email: Yup.string()
.email("Enter a valid email")
.required("Email is required"),

password: Yup.string()
.min(6,"Password must be at least 6 characters")
.required("Password is required"),

address: Yup.string()
.min(10, "Address must be at least 10 characters")
.required("Address is required"),

phone: Yup.string()
.matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
.required("Phone number is required"),

otp: Yup.string()
.matches(/^[0-9]{6}$/, "OTP must be 6 digits")
.required("OTP is required")

});

const handleSendOtp = async (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast.error("Please enter a valid email first");
    return;
  }

  try {
    const res = await sendOTP({ email });
    toast.success(res.data.message || "OTP sent to your email!");
    setIsOtpSent(true);
    setTimer(60);
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to send OTP");
  }
};

const handleSubmit = async(values)=>{

try{

await registerUser({
...values,
role:"customer"
});

toast.success("Registration successful 🎉");

navigate("/login");

}catch(err){
toast.error(err.response?.data?.message || "Registration failed");

}

};

return(

<div className="auth-container">

<div className="auth-card" style={{ width: "400px" }}>

<h2 className="auth-title">
🍕 Create Account
</h2>
<p className="auth-subtitle mb-4">
  Join the pizzeria family! We'll send an OTP to verify your email.
</p>

<Formik

initialValues={{
name:"",
email:"",
password:"",
address:"",
phone:"",
otp:""
}}

validationSchema={validationSchema}

onSubmit={handleSubmit}

>

{({ values, errors, touched }) => (
<Form>

<div className="field-group mb-2">
  <Field
  name="name"
  placeholder="Full Name"
  className="auth-input"
  />
  <ErrorMessage name="name" component="td" className="error-text"/>
</div>

<div className="field-group mb-2">
  <div className="d-flex gap-2 align-items-end">
    <div style={{ flex: 1 }}>
      <Field
      name="email"
      type="email"
      placeholder="Email Address"
      className="auth-input"
      />
    </div>
    <button
      type="button"
      className="btn btn-danger btn-sm rounded-pill px-3"
      style={{ height: "46px", marginBottom: "5px", fontSize: "0.8rem", fontWeight: "700" }}
      disabled={timer > 0}
      onClick={() => handleSendOtp(values.email)}
    >
      {timer > 0 ? `${timer}s` : isOtpSent ? "Resend" : "Get OTP"}
    </button>
  </div>
  <ErrorMessage name="email" component="div" className="error-text"/>
</div>

<div className="field-group mb-1">
  <Field
  name="password"
  type="password"
  placeholder="Password"
  className="auth-input"
  />
  <ErrorMessage name="password" component="div" className="error-text"/>
</div>

<div className="d-flex gap-2">
  <div className="field-group" style={{ flex: 1 }}>
    <Field
    name="phone"
    placeholder="Phone Number"
    className="auth-input"
    />
    <ErrorMessage name="phone" component="div" className="error-text"/>
  </div>
  <div className="field-group" style={{ flex: 1 }}>
    <Field
    name="otp"
    placeholder="6-Digit OTP"
    className="auth-input"
    maxLength="6"
    />
    <ErrorMessage name="otp" component="div" className="error-text"/>
  </div>
</div>

<div className="field-group mb-1">
  <Field
  name="address"
  as="textarea"
  placeholder="Delivery Address"
  className="auth-input"
  rows="2"
  />
  <ErrorMessage name="address" component="div" className="error-text"/>
</div>

<button className="auth-btn" type="submit">

Register

</button>

</Form>
)}

</Formik>

<p className="auth-footer">

Already have an account? <Link to="/login">Login here</Link>

</p>

</div>

</div>

)

}

export default Register;