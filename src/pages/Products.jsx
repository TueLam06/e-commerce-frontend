import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
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

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FAFAF8]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-center min-h-[300px]">
                        <p className="text-[#6B6B65]">
                            Đang tải sản phẩm...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#FAFAF8]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="rounded-md border border-[#E3C6C3] bg-[#FBF1F0] px-5 py-4">
                        <p className="font-medium text-[#B3413B]">
                            Lỗi: {error}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAFAF8]">
            {/* Page Header */}
            <section className="bg-[#2F5233]">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#D8E2D2]">
                        Our collection
                    </p>

                    <h1
                        className="text-4xl md:text-5xl font-normal text-[#F5F3EE]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        All Products
                    </h1>

                    <p className="mt-4 max-w-xl text-[#D8E2D2] leading-relaxed">
                        Khám phá các sản phẩm được lựa chọn dành cho không gian
                        làm việc và cuộc sống hiện đại.
                    </p>
                </div>
            </section>

            {/* Products */}
            <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2
                            className="text-2xl md:text-3xl text-[#1A1A18]"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Products
                        </h2>

                        <p className="mt-2 text-sm text-[#6B6B65]">
                            {products.length} sản phẩm
                        </p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="rounded-md border border-[#D9D6CC] bg-white py-16 text-center">
                        <p className="text-[#6B6B65]">
                            Chưa có sản phẩm nào.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Products;
