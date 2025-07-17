import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listenToProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/actions/productActions";

const ProductList = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    thumbnail: "",
  });

  useEffect(() => {
    const unsubscribe = dispatch(listenToProducts());

    return () => {
      if (unsubscribe) unsubscribe(); // 🧹 Clean up listener on unmount
    };
  }, [dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ title: "", price: "", category: "", stock: "", thumbnail: "" });
    setEditId(null);
    setFormVisible(false);
  };

  const handleAdd = () => {
    if (!form.title || !form.price) return;

    const newProduct = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    dispatch(addProduct(newProduct));
    resetForm();
  };

  const handleUpdate = () => {
    if (!editId) return;

    const updatedProduct = {
      title: form.title,
      price: parseFloat(form.price),
      category: form.category,
      stock: parseInt(form.stock),
      thumbnail: form.thumbnail,
    };
    console.log(editId);

    dispatch(updateProduct(editId, updatedProduct));
    resetForm();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      title: product.title || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      stock: product.stock?.toString() || "",
      thumbnail: product.thumbnail || "",
    });
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    console.log("product id:", id);

    dispatch(deleteProduct(id));
  };

  const uniqueProducts = products.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <button
        onClick={() => {
          if (editId) return; // Prevent hiding while editing
          setFormVisible(!formVisible);
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {formVisible ? "Close Form" : "Add New Product"}
      </button>

      {formVisible && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="border p-2 rounded"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded"
          />
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            type="number"
            className="border p-2 rounded"
          />
          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="Image URL"
            type="url"
            className="border p-2 rounded"
          />

          <div className="col-span-2 flex gap-2">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Update Product
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel Edit
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uniqueProducts.map(
              (product) =>
                product.id && (
                  <tr key={product.id} className="border-t">
                    <td className="p-2 border">{product.title}</td>
                    <td className="p-2 border">${product.price}</td>
                    <td className="p-2 border">{product.category}</td>
                    <td className="p-2 border">{product.stock}</td>
                    <td className="p-2 border text-xs break-words">
                      {product.thumbnail}
                    </td>
                    <td className="p-2 border flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
