import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const featuredProducts = products.filter((item) => item.feature);

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
            <h2>Highlight Products</h2>
            <div className={"products"}>
                {featuredProducts.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;