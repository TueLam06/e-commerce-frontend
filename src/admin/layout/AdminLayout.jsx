import { Outlet, NavLink } from "react-router-dom";

const navItemClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
            ? "bg-[#2F5233] text-[#F5F3EE]"
            : "text-[#6B6B65] hover:bg-[#EFEDE6] hover:text-[#1A1A18]"
    }`;

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-[#FAFAF8]">
            <aside className="w-56 shrink-0 border-r border-[#E5E3DC] bg-white px-4 py-6">
                <h1
                    className="text-lg mb-6 px-3 text-[#1A1A18]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Admin
                </h1>
                <nav className="space-y-1">
                    <NavLink to="/admin" end className={navItemClass}>
                        Trang chủ
                    </NavLink>
                    <NavLink to="/admin/products" className={navItemClass}>
                        Sản phẩm
                    </NavLink>
                    <NavLink to="/admin/orders" className={navItemClass}>
                        Đơn hàng
                    </NavLink>
                </nav>
            </aside>
            <main className="flex-1 px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}