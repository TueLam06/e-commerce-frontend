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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px] bg-[#FAFAF8]">
                <div className="w-8 h-8 rounded-full border-2 border-[#D9D6CC] border-t-[#2F5233] animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center p-10 bg-[#FAFAF8] min-h-[400px]">
                <div className="max-w-lg w-full rounded-md border border-[#E3C6C3] bg-[#FBF1F0] px-5 py-4 text-[#B3413B] text-sm">
                    Lỗi: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8]">

            {/* HERO */}
            <section className="bg-[#2F5233] text-[#F5F3EE]">
                <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-2xl">

                        <p className="text-sm tracking-wide text-[#B7C9AF] mb-4">
                            Bộ sưu tập mới
                        </p>

                        <h1
                            className="text-4xl md:text-6xl leading-tight mb-6"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Nâng cấp không gian sống của bạn.
                        </h1>

                        <p className="text-[#D8E2D2] text-base md:text-lg max-w-xl leading-relaxed mb-10">
                            Sản phẩm công nghệ chất lượng, chọn lọc kỹ càng cho công việc,
                            giải trí và cuộc sống hằng ngày.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="rounded-md bg-[#F5F3EE] text-[#2F5233] px-6 py-3 font-medium hover:bg-white transition-colors">
                                Mua ngay
                            </button>
                            <button className="rounded-md border border-[#7C9473] text-[#F5F3EE] px-6 py-3 font-medium hover:bg-white/5 transition-colors">
                                Xem sản phẩm
                            </button>
                        </div>

                    </div>
                </div>
            </section>


            {/* FEATURED PRODUCTS */}
            <section className="max-w-6xl mx-auto px-6 py-20">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                    <div>
                        <p className="text-sm tracking-wide text-[#6B6B65] mb-2">
                            Nổi bật
                        </p>
                        <h2
                            className="text-3xl md:text-4xl text-[#1A1A18]"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Sản phẩm được yêu thích
                        </h2>
                        <p className="mt-2 text-[#6B6B65]">
                            Lựa chọn kỹ càng dành riêng cho bạn.
                        </p>
                    </div>

                    <button className="text-[#2F5233] font-medium underline underline-offset-2 self-start md:self-auto">
                        Xem tất cả
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredProducts.map((p) => (
                        <div
                            key={p.id}
                            className="transition duration-300 hover:-translate-y-1"
                        >
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>

            </section>


            {/* PROMO */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <div className="rounded-2xl bg-[#2F5233] text-[#F5F3EE] p-10 md:p-16">
                    <div className="max-w-xl">
                        <p className="text-sm tracking-wide text-[#B7C9AF] mb-4">
                            Ưu đãi có hạn
                        </p>

                        <h2
                            className="text-3xl md:text-5xl leading-tight"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Hoàn thiện góc làm việc của bạn.
                        </h2>

                        <p className="mt-4 text-[#D8E2D2] text-lg">
                            Tìm mọi thứ bạn cần, chỉ trong một nơi.
                        </p>

                        <button className="rounded-md bg-[#F5F3EE] text-[#2F5233] px-6 py-3 font-medium hover:bg-white transition-colors mt-8">
                            Mua sắm ngay
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
