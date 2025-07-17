import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png"; // Adjust the path as necessary
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import { useSelector } from "react-redux"; // Import useSelector from react-redux
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart); // Use useSelector to access cart state
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            {/* Remove underline */}
            <Navbar.Brand>
              <img src={logo} alt="Logo" /> ProShop
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart" style={{ textDecoration: "none" }}>
                {" "}
                {/* Use `as={Link}` */}
                <FaShoppingCart /> Cart
                {
                  cartItems.length > 0 && (
                    <span className="badge bg-danger ms-1">{cartItems.length}</span>
                  )
                }
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                style={{ textDecoration: "none" }}
              >
                {" "}
                {/* Use `as={Link}` */}
                <FaUser /> Sign in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
