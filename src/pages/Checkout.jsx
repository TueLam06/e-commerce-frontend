import { useState } from "react";
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom";

function Checkout() {
    const {cart, total, clearCart} = useCart()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone:"",
        address:"",
    })
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e){
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, cart, total }),
            });

            if (!res.ok) {
                throw new Error("Đặt hàng thất bại");
            }

            const data = await res.json();
            alert(`Đặt hàng thành công! Mã đơn: ${data.orderId}`);
            clearCart();
            navigate("/products");
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" /></p>
            <p>Phone Number: <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" /></p>
            <p>Address: <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" /></p>

            <button type="submit">
                {submitting ? "Đang xử lý..." : "Submit"}
            </button>
        </form>
    );
}
export default Checkout;