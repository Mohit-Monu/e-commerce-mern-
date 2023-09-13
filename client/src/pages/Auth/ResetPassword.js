import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
const ResetPassword = () => {
  const [loginError, setLoginError] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const refNewPassword = useRef();
  const refNewPassword2 = useRef();
  const navigate = useNavigate();
  const uuid = useParams().id;
  useEffect(() => {
    async function getData() {
      try {
        await axios.get(
          "http://localhost:5000/password/resetpassword/" + uuid
        );
      } catch (err) {
        navigate("../pagenotfound");
        console.log(err);
      }
    }
    getData();
  }, []);
  async function ChangePassHandler(e) {
    setLoginError("");
    e.preventDefault();
    if (refNewPassword.current.value !== refNewPassword2.current.value) {
      setLoginError("Password does not match");
      return;
    }
    setIsLoaded(false);
    try {
      const config = {
        method: "POST",
        url: "http://localhost:5000/password/createpass",
        data: {
          uuid: uuid,
          newpass: refNewPassword.current.value,
        },
      };
      const data=await axios(config);
      setIsLoaded(true);
      console.log(data)
      setLoginError(data.data.message);
      setTimeout(()=>{
        navigate("../login")
      },3000)
    } catch (err) {
      setIsLoaded(true);
      setLoginError(err.response.data.message);
    }
  }
  return isLoaded ? (
    <Container
      className="mt-5 pb-4 pt-4 text-center border border-warning"
      style={{ maxWidth: "500px" }}
    >
      <h1 className="mb-4" style={{ fontSize: "30px", color: "red" }}>
        Create Password
      </h1>
      <hr />
      <form onSubmit={ChangePassHandler}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="password"
            ref={refNewPassword}
            required
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInputCustom">Create Password</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingPasswordConfCustom"
            type="password"
            ref={refNewPassword2}
            required
            placeholder="Confirm Password"
          />
          <label htmlFor="floatingPasswordConfCustom">Confirm Password</label>
        </Form.Floating>
        <span className="text-danger">{loginError}</span>
        <div className="d-grid gap-2">
          <button type="submit" className={`btn btn-dark mb-3 ${""}`}>
            Change Password
          </button>
        </div>
        <br />
      </form>
    </Container>
  ) : (
    <Spinner />
  );
};

export default ResetPassword;
