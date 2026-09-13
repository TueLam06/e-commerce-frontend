import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../api/http";
import { createProduct, updateProduct } from "../api/adminProducts";

const emptyForm = {
    name: "",
    price: "",
    stock: "",
    description: "",
    image_url: "",
    category_id: "",
};

export default function ProductForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const { token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState(emptyForm);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Lấy danh sách categories cho dropdown
    useEffect(() => {
        authFetch("/api/admin/products/categories", { token })
            .then(setCategories)
            .catch((err) => setError(err.message));
    }, []);

    useEffect(() => {
        if (!isEdit) return;
        authFetch(`/api/admin/products/${id}`, { token })
            .then((data) => {
                setForm({
                    name: data.name ?? "",
                    price: data.price ?? "",
                    stock: data.stock ?? "",
                    description: data.description ?? "",
                    image_url: data.image_url ?? "",
                    category_id: data.category_id ?? "",
                });
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        const payload = {
            name: form.name,
            price: Number(form.price),
            description: form.description || null,
            image_url: form.image_url || null,
            category_id: form.category_id || null,
        };
        if (!isEdit) {
            payload.stock = Number(form.stock);
        }

        try {
            if (isEdit) {
                await updateProduct(id, payload, token);
            } else {
                await createProduct(payload, token);
            }
            navigate("/admin");
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div>
            <h2>{isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
            {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 12 }}>
                <label>
                    Tên sản phẩm
                    <input name="name" value={form.name} onChange={handleChange} required />
                </label>

                <label>
                    Giá
                    <input type="number" name="price" value={form.price} onChange={handleChange} required min="0" />
                </label>

                {!isEdit && (
                    <label>
                        Tồn kho ban đầu
                        <input type="number" name="stock" value={form.stock} onChange={handleChange} required min="0" />
                    </label>
                )}

                <label>
                    Mô tả
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
                </label>

                <label>
                    Link ảnh
                    <input name="image_url" value={form.image_url} onChange={handleChange} />
                </label>

                <label>
                    Danh mục
                    <select name="category_id" value={form.category_id} onChange={handleChange} required>
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" disabled={saving}>
                    {saving ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm sản phẩm"}
                </button>
            </form>
        </div>
    );
}