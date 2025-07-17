import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listenToProducts } from "../redux/actions/productActions";
export default function CategoryProducts() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(listenToProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 capitalize">
        {categoryName.replace("-", " ")} Products
      </h2>

      {loading && <p className="text-gray-700">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {filteredProducts.length === 0 && !loading ? (
        <p className="text-gray-500">No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-500">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
