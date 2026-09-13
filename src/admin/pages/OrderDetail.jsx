import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getOrderById, updateOrderStatus } from "../api/adminOrders";

const STATUS_LABELS = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    completed: "Đã giao thành công",
    cancelled: "Đã hủy",
};

const STATUS_OPTIONS = Object.keys(STATUS_LABELS);

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await getOrderById(id, token);
                setOrder(data);
            } catch (err) {
                setError(err.message || "Lỗi tải chi tiết đơn hàng");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, token]);

    const handleStatusChange = async (newStatus) => {
        setSaving(true);
        try {
            await updateOrderStatus(id, newStatus, token);
            setOrder((prev) => ({ ...prev, status: newStatus }));
        } catch (err) {
            alert(err.message || "Lỗi cập nhật trạng thái");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!order) return null;

    return (
        <div>
            <button onClick={() => navigate(-1)}>← Quay lại</button>
            <h2>Đơn hàng #{order.id}</h2>

            <div style={{ marginBottom: 16 }}>
                <p><strong>Khách hàng:</strong> {order.customer_name}</p>
                <p><strong>SĐT:</strong> {order.phone}</p>
                <p><strong>Địa chỉ:</strong> {order.address}</p>
                <p><strong>Tổng tiền:</strong> {Number(order.total).toLocaleString("vi-VN")}đ</p>
                <p>
                    <strong>Ngày đặt:</strong>{" "}
                    {order.created_at ? new Date(order.created_at).toLocaleString("vi-VN") : ""}
                </p>
                <p>
                    <strong>Trạng thái:</strong>{" "}
                    <select
                        value={order.status}
                        disabled={saving}
                        onChange={(e) => handleStatusChange(e.target.value)}
                    >
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                                {STATUS_LABELS[s]}
                            </option>
                        ))}
                    </select>
                </p>
            </div>

            <h3>Sản phẩm trong đơn</h3>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá lúc mua</th>
                    <th>Thành tiền</th>
                </tr>
                </thead>
                <tbody>
                {order.items.map((item) => (
                    <tr key={item.id}>
                        <td>
                            {item.image ? (
                                <img src={item.image} alt={item.product_name} width="50" />
                            ) : (
                                "—"
                            )}
                        </td>
                        <td>
                            {item.product_name}
                            {item.product_id === null && (
                                <em style={{ color: "gray" }}> (sản phẩm đã bị xóa)</em>
                            )}
                        </td>
                        <td>{item.quantity}</td>
                        <td>{Number(item.price_at_purchase).toLocaleString("vi-VN")}đ</td>
                        <td>
                            {(item.quantity * item.price_at_purchase).toLocaleString("vi-VN")}đ
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}