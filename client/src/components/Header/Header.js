import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import searchicon from "./search_icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/Authctions";
import { useRef } from "react";
function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData.user);
  const cart = useSelector((state) => state.userReducer.cartLength);
  const searchref=useRef()
  const navigate=useNavigate()
  function searchHeandler(e){
    e.preventDefault()
    const value=searchref.current.value
    navigate(`../search/${value}`)
  }
  return (
    <>
      <Navbar sticky="top" expand={"sm"} className="bg-light mb-3 ">
        <Container fluid>
          <Navbar.Brand href="./" style={{ marginLeft: "20px" }}>
            Shop Here
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"sm"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                {user ? user.name : ""}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ height: "37px" }}>
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "grey",
                    marginRight: "10px",
                  }}
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  style={{ textDecoration: "none", color: "grey" }}
                  to="/store"
                >
                  Store
                </NavLink>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${"sm"}`}
                >
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "grey",
                      marginLeft: "15px",
                    }}
                    to="/account"
                  >
                    My Account
                  </NavLink>
                  <br/>
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "grey",
                      marginLeft: "15px",
                    }}
                    to="/myorder"
                  >
                    My Orders
                  </NavLink>
                  <br/>

                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "grey",
                      marginLeft: "15px",
                    }}
                    to="/cart"
                  >
                    My Cart
                  </NavLink>
                  <br/>

                  <NavDropdown.Divider />
                  <NavDropdown.Item>{user.name}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex" onSubmit={searchHeandler}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  ref={searchref}
                  required
                />
                <Button variant="outline-warning" type="submit">
                  <img
                    style={{ height: "25px" }}
                    alt="search-icon"
                    src={searchicon}
                  />
                </Button>
              </Form>
              {!user ? (
                <NavLink to="/login">
                  <Button
                    variant="outline-info"
                    style={{
                      marginLeft: "5px",
                      overflow: "hidden",
                    }}
                  >
                    Login / SignUp
                  </Button>
                </NavLink>
              ) : (
                <Button
                  onClick={() => {
                    dispatch(logout());
                  }}
                  variant="outline-info"
                  style={{
                    marginLeft: "5px",
                    overflow: "hidden",
                  }}
                >
                  LogOut
                </Button>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {user && (
            <NavLink to="/cart">
              <Button
              variant="outline-info"
              style={{
                position: "relative",
                marginLeft: "20px",
                width: "80px",
              }}
            >
              Cart
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  paddingLeft: "5px",
                  color: "black",
                  fontSize: "22px",
                }}
              >
                {cart}
              </span>
            </Button>
            </NavLink>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
