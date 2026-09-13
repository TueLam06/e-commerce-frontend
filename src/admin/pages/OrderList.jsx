import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../api/adminOrders";

const STATUS_LABELS = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    completed: "Đã giao thành công",
    cancelled: "Đã hủy",
};

const STATUS_OPTIONS = Object.keys(STATUS_LABELS);

export default function OrderList() {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadOrders = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getAllOrders(token, filterStatus || undefined);
            setOrders(data);
        } catch (err) {
            setError(err.message || "Lỗi tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterStatus]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateOrderStatus(id, newStatus, token);
            setOrders((prev) =>
                prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
            );
        } catch (err) {
            alert(err.message || "Lỗi cập nhật trạng thái");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Xóa đơn hàng #${id}? Hành động này không thể hoàn tác.`)) {
            return;
        }
        try {
            await deleteOrder(id, token);
            setOrders((prev) => prev.filter((o) => o.id !== id));
        } catch (err) {
            alert(err.message || "Lỗi xóa đơn hàng");
        }
    };

    return (
        <div>
            <h2>Quản lý đơn hàng</h2>

            <div style={{ marginBottom: 16 }}>
                <label>
                    Lọc theo trạng thái:{" "}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                                {STATUS_LABELS[s]}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {loading && <p>Đang tải...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>SĐT</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Ngày đặt</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.phone}</td>
                            <td>{Number(order.total).toLocaleString("vi-VN")}đ</td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {STATUS_LABELS[s]}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                {order.created_at
                                    ? new Date(order.created_at).toLocaleString("vi-VN")
                                    : ""}
                            </td>
                            <td>
                                <Link to={`/admin/orders/${order.id}`}>Xem chi tiết</Link>{" "}
                                |{" "}
                                <button onClick={() => handleDelete(order.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                Không có đơn hàng nào
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}