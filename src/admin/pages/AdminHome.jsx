import { Link } from "react-router-dom";

export default function AdminHome() {
    return (
        <div>
            <h2>Trang quản trị</h2>
            <p>Chọn một mục ở menu bên trái để bắt đầu.</p>
            <ul>
                <li>
                    <Link to="/admin/products">Quản lý sản phẩm</Link>
                </li>
                <li>
                    <Link to="/admin/orders">Quản lý đơn hàng</Link>
                </li>
            </ul>
        </div>
    );
}