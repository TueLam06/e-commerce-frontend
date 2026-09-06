import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import ChatPage from "./pages/Chatpage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Header title="My website" />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<Checkout />}/>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}
export default App;