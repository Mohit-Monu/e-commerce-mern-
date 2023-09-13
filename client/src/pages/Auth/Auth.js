import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logIn as loginactrion,
  signUp as Signupaction,
} from "../../actions/Authctions";
import Spinner from "../../components/Spinner/Spinner";
import ActivateConfirmEmail from "./ActivateConfirmEmail"
function LogIn() {
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.authReducer.loading);

  const [loginError, setLoginError] = useState("");
  const [signupError, setSignUpError] = useState("");
  const [signUpSuccess,SetSignUpSuccess]=useState(false)
  const refloginemail = useRef();
  const refloginpass = useRef();

  const refsignupname = useRef();
  const refsignupemail = useRef();
  const refsignuppass = useRef();
  const refsignuppass2 = useRef();

  async function LoginHandler(e) {
    e.preventDefault();
    setLoginError("");
    setSignUpError("");
    try {
      const data = {
        email: refloginemail.current.value,
        password: refloginpass.current.value,
      };
      await dispatch(loginactrion(data, navigate));
    } catch (err) {
      const error = err.message;
      setLoginError(error);
    }
  }
  async function SignupHandler(e) {
    e.preventDefault();
    setSignUpError("");
    setLoginError("");
    if (refsignuppass.current.value !== refsignuppass2.current.value) {
      setSignUpError("Password does not match");
      return;
    } else {
      try {
        const data = {
          name: refsignupname.current.value,
          email: refsignupemail.current.value,
          password: refsignuppass.current.value,
        };
        const data2=await dispatch(Signupaction(data));
        console.log(data2)
        SetSignUpSuccess(true)
      } catch (err) {
        const error = err.message;
        setSignUpError(error);
      }
    }
  }
  return signUpSuccess?(<ActivateConfirmEmail/>):loading ? (
    <Spinner />
  ) : login ? (
    <Container
      className="mt-5 pb-4 pt-4 text-center border border-warning"
      style={{ maxWidth: "500px" }}
    >
      <h1 className="mb-4" style={{ fontSize: "30px", color: "red" }}>
        Log-In
      </h1>
      <hr />
      <form onSubmit={LoginHandler}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="email"
            ref={refloginemail}
            required
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingPasswordCustom"
            ref={refloginpass}
            type="password"
            required
            placeholder="Password"
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        <span className="text-danger">{loginError}</span>
        <div className="d-grid gap-2">
          <button
            type="submit"
            className={`btn btn-dark mb-3 ${loading && "disabled"}`}
          >
            Log-In
          </button>
        </div>
        <NavLink style={{ color: "black" }} onClick={() => setLogin(false)}>
          Don't have an account? Sign up
        </NavLink>
        <br />
        <NavLink to="/forgetpass" style={{ color: "red" }}>
          Forget password?
        </NavLink>
      </form>
    </Container>
  ) : (
    <Container
      className="mt-5 pb-4 pt-4 text-center border border-warning "
      style={{ maxWidth: "500px" }}
    >
      <h1 className="mb-4" style={{ fontSize: "30px", color: "red" }}>
        Sign-Up
      </h1>
      <hr />
      <form onSubmit={SignupHandler}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputName"
            type="text"
            ref={refsignupname}
            required
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInputName">Name</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            ref={refsignupemail}
            type="email"
            required
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingPasswordCustom"
            ref={refsignuppass}
            type="password"
            required
            placeholder="Password"
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingPasswordConfCustom"
            type="password"
            ref={refsignuppass2}
            required
            placeholder="Confirm Password"
          />
          <label htmlFor="floatingPasswordConfCustom">Confirm Password</label>
        </Form.Floating>
        <span className="text-danger">{signupError}</span>

        <div className="d-grid gap-2">
          <button
            type="submit"
            className={`btn btn-dark mb-3 ${loading && "disabled"}`}
          >
            Sign-Up
          </button>
        </div>
        <NavLink style={{ color: "black" }} onClick={() => setLogin(true)}>
          Have an account? Login
        </NavLink>
      </form>
    </Container>)
}
export default LogIn;
