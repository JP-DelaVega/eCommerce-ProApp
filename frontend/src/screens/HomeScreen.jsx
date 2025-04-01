import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useEffect, useState } from 'react'
const HomeScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()
      setProducts(data)
      console.log(data)
    }
    fetchProducts()
  }, [])
  return (
    <div>
        <h1>Latest Products</h1>
        <Row>
            {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen