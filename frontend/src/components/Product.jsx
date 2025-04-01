import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title as="div" className="product-title">
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        ></Rating>
      </Card.Footer>
    </Card>
  );
};

export default Product;
