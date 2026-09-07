import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"

function ProductCard({ product}) {
    const {addToCart} = useCart()
    return (
        <div className="product-card">

            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                />
            )}

            <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
            </Link>

            <p>
                {Number(product.price).toLocaleString("vi-VN")}₫
            </p>

            <button onClick={() => addToCart(product)}>
                Add to cart
            </button>

        </div>
    );
}

export default ProductCard;