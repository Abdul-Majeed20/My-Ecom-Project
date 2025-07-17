import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listenToProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const categoryMap = {};
  products.forEach((product) => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = product.thumbnail;
    }
  });

  useEffect(() => {
    if (products.length === 0) {
      dispatch(listenToProducts());
    }
  }, [dispatch, products.length]);

  const featured = products.slice(0, 4);
  const categories = Object.entries(categoryMap);

  const brandMap = {};
  products.forEach((product) => {
    if (product.brand && !brandMap[product.brand]) {
      brandMap[product.brand] = product.thumbnail;
    }
  });
  const brands = Object.entries(brandMap);
  const featureBrand = brands.slice(0, 4);

  return (
    <div className="p-4 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopEase</h1>
        <p className="text-lg">Find the best products at unbeatable prices</p>
        <Link
          to="/products"
          className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-sm text-gray-500">${product.price}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(([category, image], idx) => (
              <Link
                key={idx}
                to={`/category/${category}`}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={image}
                  alt={category}
                  className="h-40 w-full object-contain rounded-md mb-2"
                />
                <div className="p-2 text-center text-lg font-medium capitalize text-gray-800">
                  {category.replace("-", " ")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Brand</h2>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featureBrand.map(([brand, image], idx) => (
              <Link
                key={idx}
                to={`/brand/${brand}`}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={image}
                  alt={brand}
                  className="h-40 w-full object-contain rounded-md mb-2"
                />
                <div className="p-2 text-center text-lg font-medium capitalize text-gray-800">
                  {brand}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
