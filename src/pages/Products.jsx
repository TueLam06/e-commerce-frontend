import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Không lấy được dữ liệu sản phẩm");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (error) return <p>Lỗi: {error}</p>;
    return (
        <div>
            <h2>Products Page</h2>
            <div className="products">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p} />
                ))}
            </div>
        </div>
    );
}
export default Products;