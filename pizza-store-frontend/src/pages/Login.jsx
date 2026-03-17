import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { loginUser } from "../services/authService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* Validation Schema */

  const validationSchema = Yup.object({

    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    role: Yup.string()
      .required("Select login role")

  });

  const handleSubmit = async (values) => {

    try {

      const res = await loginUser(values);

      dispatch(loginSuccess({
        token: res.data.token,
        role: res.data.user.role,
        name: res.data.user.name,
      }));

      toast.success("Login Successful 🍕");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/menu");
      }

    } catch (err) {

      toast.error(err.response?.data?.message || "Invalid credentials");

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          🍕 Login to Pizzeria
        </h2>

        <Formik

          initialValues={{
            email: "",
            password: "",
            role: "customer"
          }}

          validationSchema={validationSchema}

          onSubmit={handleSubmit}

        >

          <Form>

            <Field
              name="email"
              type="email"
              placeholder="Email Address"
              className="auth-input"
            />

            <ErrorMessage name="email" component="div" className="error-text" />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="auth-input"
            />

            <ErrorMessage name="password" component="div" className="error-text" />

            <Field
              as="select"
              name="role"
              className="auth-input"
            >

              <option value="customer">Login as Customer</option>

              <option value="admin">Login as Admin</option>

            </Field>

            <ErrorMessage name="role" component="div" className="error-text" />

            <button className="auth-btn">

              Login

            </button>

          </Form>

        </Formik>

        <p className="auth-footer">

          New user? <Link to="/register">Register here</Link>

        </p>

      </div>

    </div>

  )

}

export default Login;