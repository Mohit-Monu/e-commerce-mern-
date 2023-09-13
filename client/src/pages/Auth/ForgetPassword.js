import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import EmailSentMessage from "./EmailSentMessage"
const ForgetPassword = () => {
  const [loginError, setLoginError] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [emailsent, setEmailSent] = useState(false);
  const refloginemail = useRef();
  async function ForgetPassHandler(e) {
    setLoginError("")
    e.preventDefault();
    setIsLoaded(false);
    const email = refloginemail.current.value;
    try {
      await axios.post(
        "http://localhost:5000/password/forgotpassword/" + email
      );
      setIsLoaded(true);
      setEmailSent(true);
    } catch (err) {
      setEmailSent(false);
      setIsLoaded(true);
      setLoginError(err.response.data.message);
    }
  }
  return isLoaded ? (emailsent ? (<EmailSentMessage/>):(<Container
    className="mt-5 pb-4 pt-4 text-center border border-warning"
    style={{ maxWidth: "500px" }}
  >
    <h1 className="mb-4" style={{ fontSize: "30px", color: "red" }}>
      Forget Password
    </h1>
    <hr />
    <form onSubmit={ForgetPassHandler}>
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
      <span className="text-danger">{loginError}</span>
      <div className="d-grid gap-2">
        <button type="submit" className={`btn btn-dark mb-3 ${""}`}>
          Send Mail
        </button>
      </div>
      <NavLink style={{ color: "black" }} to="../login">
        Click here to login
      </NavLink>
      <br />
    </form>
  </Container>)) : (
    <Spinner />
  );
};

export default ForgetPassword;
