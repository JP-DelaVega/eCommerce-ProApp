import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import "./CartScreen.css"; // Make sure this matches your CSS file location
import { addToCart, removeFromCart, clearCart } from "../slices/cartSlice";

export default function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Handler to add items to the cart
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  // Handler to remove a single item from the cart
  const removeToCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handler to remove all items from the cart with validation
  const removeAllHandler = () => {
    const confirmed = window.confirm("Are you sure you want to remove all items from your cart?");
    if (confirmed) {
      dispatch(clearCart());
    }
  };

  // Navigate to the checkout page
  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row className="my-4 pt-3 pt-md-0">
      <Col md={8}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">🛒 Shopping Cart</h2>
          {cartItems.length > 0 && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={removeAllHandler}
              className="shadow-sm"
            >
              Remove All
            </Button>
          )}
        </div>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{" "}
            <Link to="/" className="text-primary fw-semibold">
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className="py-3">
                <Row className="align-items-center">
                  <Col xs={4} md={2}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fluid
                      rounded
                      className="shadow-sm"
                    />
                  </Col>
                  <Col xs={8} md={3}>
                    <Link to={`/product/${item._id}`} className="product-link">
                      {item.name}
                    </Link>
                  </Col>
                  <Col xs={6} md={2}>
                    <span className="text-muted">${item.price.toFixed(2)}</span>
                  </Col>
                  <Col xs={6} md={2}>
                    <Form.Select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="rounded shadow-sm"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={2} className="mt-2 mt-md-0">
                    <Button
                      type="button"
                      variant="outline-danger"
                      className="w-100 shadow-sm rounded d-flex align-items-center justify-content-center gap-2"
                      onClick={() => removeToCartHandler(item._id)}
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      <FaTrash className="d-none d-md-inline" />
                      <span className="d-md-none">Remove</span>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4} className="pt-4 pt-md-0">
        <Card className="shadow-sm p-3 rounded">
          <ListGroup variant="flush">
            <ListGroup.Item className="text-center">
              <h4 className="fw-bold mb-3">Subtotal</h4>
              <p className="mb-1">
                ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </p>
              <h5 className="text-success fw-semibold">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.qty, 0)
                  .toFixed(2)}
              </h5>
            </ListGroup.Item>
            <ListGroup.Item className="d-grid">
              <Button
                type="button"
                className="btn-success rounded-pill shadow"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
