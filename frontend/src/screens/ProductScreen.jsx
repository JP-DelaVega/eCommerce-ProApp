import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";  
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
function ProductScreen() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
 const addtoCartHandler = () => {  
    dispatch(addToCart({ ...product, qty }));
    console.log(qty)
  }
  return (
    <>
      <Link
        className="btn btn-light my-3"
        to="/"
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "0.3s ease",
          fontSize: "1.1rem",
          padding: "10px 20px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
      >
        <i className="fas fa-arrow-left"></i> Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row className="my-4">
            {/* Image Section */}
            <Col md={6} lg={5} className="mb-4 mb-md-0">
              <Image
                src={product.image}
                alt={product.name}
                fluid
                rounded
                className="shadow-lg"
              />
            </Col>

            {/* Product Details Section */}
            <Col md={6} lg={4}>
              <ListGroup variant="flush" className="text-muted">
                <ListGroup.Item>
                  <h3 className="font-weight-bold">{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Price and Add to Cart Section */}
            <Col md={6} lg={3}>
              <Card className="shadow-lg border-0 rounded">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong
                            className={
                              product.countInStock
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {product.countInStock ? "In Stock" : "Out of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty:</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                              style={{
                                borderRadius: "0.25rem",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              }}
                              className="form-select"
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}

                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        variant="primary"
                        className="w-100"
                        type="button"
                        disabled={!product.countInStock}
                        style={{
                          transition: "0.3s",
                          backgroundColor: "#007bff",
                          borderColor: "#007bff",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#0056b3")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#007bff")
                        }
                        onClick={addtoCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
