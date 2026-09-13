import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllProducts, toggleProductStatus, adjustStock } from "../api/adminProducts";

export default function ProductList() {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts(token);
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleToggleStatus = async (product) => {
        try {
            const res = await toggleProductStatus(product.id, !product.is_active, token);
            console.log("API trả về:", res); // <-- thêm dòng này, xóa sau khi xong
            setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? res.product : p))
            );
        } catch (err) {
            alert(err.message);
        }
    };

    const handleQuickStockAdjust = async (product, type) => {
        const quantity = prompt(
            `Nhập số lượng muốn ${type === "add" ? "cộng thêm" : "trừ bớt"} cho "${product.name}":`
        );
        if (!quantity || isNaN(quantity)) return;

        try {
            const updated = await adjustStock(product.id, type, Number(quantity), token);
            setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? updated : p))
            );
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2>Quản lý sản phẩm</h2>
                <Link to="/admin/products/new">
                    <button>+ Thêm sản phẩm</button>
                </Link>
            </div>

            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p.id} style={{ opacity: p.is_active ? 1 : 0.5 }}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{Number(p.price).toLocaleString()}đ</td>
                        <td>
                            {p.stock}
                            <button onClick={() => handleQuickStockAdjust(p, "add")} style={{ marginLeft: 8 }}>+</button>
                            <button onClick={() => handleQuickStockAdjust(p, "subtract")} style={{ marginLeft: 4 }}>-</button>
                        </td>
                        <td>{p.is_active ? "Đang bán" : "Đã ẩn"}</td>
                        <td>
                            <Link to={`/admin/products/${p.id}/edit`}>
                                <button>Sửa</button>
                            </Link>
                            <button onClick={() => handleToggleStatus(p)} style={{ marginLeft: 8 }}>
                                {p.is_active ? "Ẩn" : "Hiện"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}