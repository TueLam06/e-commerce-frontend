import { Link } from "react-router-dom";

export default function AdminHome() {
    return (
        <div>
            <h2
                className="text-2xl text-[#1A1A18] mb-1"
                style={{ fontFamily: "'Fraunces', serif" }}
            >
                Tổng quan
            </h2>
            <p className="text-[#6B6B65] mb-8">Chọn một mục để bắt đầu quản lý.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <Link
                    to="/admin/products"
                    className="rounded-md border border-[#D9D6CC] bg-white p-5 hover:border-[#2F5233] transition-colors"
                >
                    <h3 className="text-[#1A1A18] font-medium mb-1">Sản phẩm</h3>
                    <p className="text-sm text-[#6B6B65]">
                        Thêm, sửa, ẩn/hiện, điều chỉnh tồn kho
                    </p>
                </Link>
                <Link
                    to="/admin/orders"
                    className="rounded-md border border-[#D9D6CC] bg-white p-5 hover:border-[#2F5233] transition-colors"
                >
                    <h3 className="text-[#1A1A18] font-medium mb-1">Đơn hàng</h3>
                    <p className="text-sm text-[#6B6B65]">
                        Xem danh sách, cập nhật trạng thái, doanh thu
                    </p>
                </Link>
            </div>
        </div>
    );
}