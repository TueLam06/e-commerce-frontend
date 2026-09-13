import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="product-card group overflow-hidden rounded-lg border border-[#D9D6CC] bg-white transition-shadow hover:shadow-md">

            {product.image && (
                <Link to={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-[#F5F3EE]">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </Link>
            )}

            <div className="p-5">
                <Link to={`/products/${product.id}`}>
                    <h3
                        className="mb-2 text-lg font-semibold text-[#1A1A18] transition-colors hover:text-[#2F5233]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        {product.name}
                    </h3>
                </Link>

                <p className="mb-4 text-base font-medium text-[#2F5233]">
                    {Number(product.price).toLocaleString("vi-VN")}₫
                </p>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full rounded-md bg-[#2F5233] px-4 py-2.5 font-medium text-[#F5F3EE] transition-colors hover:bg-[#244027]"
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
}

export default ProductCard;