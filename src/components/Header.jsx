import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext";
import "./Header.css"

function Header({title}) {
    const  { cartCount } = useCart();
    return (
        <nav>
            <h1>{title}</h1>

            <div>
                <Link to="/">Home</Link>
                <Link to="/products"> Products </Link>
                <Link to="/chat"> Chatbot </Link>
                <Link to="/cart"> Cart {cartCount > 0 ? `(${cartCount})` : ""}</Link>
            </div>
        </nav>
    )
}

export default Header