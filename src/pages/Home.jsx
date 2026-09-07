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
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center p-10">
                <div className="alert alert-error max-w-lg">
                    <span>Lỗi: {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">

            {/* HERO */}
            <section className="relative overflow-hidden bg-base-100">

                {/* Background decoration */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">

                    <div className="max-w-3xl">

                        <div className="badge badge-primary badge-lg mb-6">
                            ✦ New Collection
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Upgrade Your
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Digital Life.
                        </span>
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-base-content/60 max-w-2xl leading-relaxed">
                            Discover premium technology products designed
                            for work, gaming and everything in between.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">

                            <button className="btn btn-primary btn-lg shadow-lg shadow-primary/30">
                                Shop Now →
                            </button>

                            <button className="btn btn-outline btn-lg">
                                Explore Products
                            </button>

                        </div>

                    </div>

                </div>
            </section>


            {/* FEATURED PRODUCTS */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

                    <div>
                        <div className="badge badge-secondary mb-3">
                            Featured
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight">
                            Highlight Products
                        </h2>

                        <p className="mt-2 text-base-content/60">
                            Hand-picked products for your setup.
                        </p>
                    </div>

                    <button className="btn btn-ghost">
                        View all →
                    </button>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {featuredProducts.map((p) => (
                        <div
                            key={p.id}
                            className="transition duration-300 hover:-translate-y-2"
                        >
                            <ProductCard product={p} />
                        </div>
                    ))}

                </div>

            </section>


            {/* PROMO */}
            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content">

                    <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />

                    <div className="relative p-10 md:p-16">

                        <div className="max-w-xl">

                            <div className="badge bg-white/20 text-white border-none mb-4">
                                Limited Offer
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold">
                                Build your perfect setup.
                            </h2>

                            <p className="mt-4 opacity-80 text-lg">
                                Find everything you need in one place.
                            </p>

                            <button className="btn bg-white text-primary border-none hover:bg-white/90 mt-8">
                                Start Shopping
                            </button>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;