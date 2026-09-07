import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Không tìm thấy sản phẩm");
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div>
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                />
            )}
            <h1>{product.name}</h1>
            <p>Price: {product.price}$ </p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>

            <button onClick={() => {addToCart(product)}}>
                Add to cart
            </button>
        </div>
    );
}

export default ProductDetail;