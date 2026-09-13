import { Outlet, Link, useLocation } from "react-router-dom";

export default function AdminLayout() {
    const location = useLocation();

    const linkStyle = (path) => ({
        display: "block",
        marginBottom: 8,
        padding: "6px 8px",
        borderRadius: 4,
        textDecoration: "none",
        color: location.pathname.startsWith(path) ? "#fff" : "#333",
        background: location.pathname.startsWith(path) ? "#333" : "transparent",
    });

    return (
        <div style={{ display: "flex" }}>
            <aside style={{ width: 200, padding: 16, background: "#f5f5f5" }}>
                <h3>Admin</h3>
                <nav>
                    <Link to="/admin" style={linkStyle("/admin/dashboard-never-match")}>
                        Trang chủ
                    </Link>
                    <Link to="/admin/products" style={linkStyle("/admin/products")}>
                        Sản phẩm
                    </Link>
                    <Link to="/admin/orders" style={linkStyle("/admin/orders")}>
                        Đơn hàng
                    </Link>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: 16 }}>
                <Outlet />
            </main>
        </div>
    );
}