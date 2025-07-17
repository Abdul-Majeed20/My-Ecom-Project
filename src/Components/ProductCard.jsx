import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, listenToCart } from "../redux/actions/cartActions";
import { useEffect } from "react";

export default function ProductCard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>DATA NOT FOUND</p>;
  }
  useEffect(() => {
    dispatch(listenToCart());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side: image gallery */}
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg shadow"
        />
        <div className="mt-4 grid grid-cols-4 gap-2">
          {product.images?.slice(0, 4).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              className="h-20 w-full object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* Right side: product details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-semibold text-green-600">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${product.price + 50}
          </span>
          <span className="text-sm text-red-500">
            {product.discountPercentage}% off
          </span>
        </div>

        <p className="text-sm text-yellow-600 font-medium mb-2">
          Rating: ⭐ {product.rating} / 5
        </p>

        <div className="mb-4">
          <span className="font-semibold">Brand:</span>{" "}
          <span className="text-gray-700">{product.brand}</span>
        </div>

        <div className="mb-4">
          <span className="font-semibold">Category:</span>{" "}
          <span className="text-gray-700">{product.category}</span>
        </div>

        {/* Sizes (Dummy as DummyJSON does not provide sizes directly) */}
        <div className="mb-4">
          <span className="font-semibold">Sizes:</span>
          <div className="flex gap-2 mt-1">
            {["S", "M", "L", "XL"].map((size) => (
              <span
                key={size}
                className="px-3 py-1 border rounded text-sm cursor-pointer hover:bg-gray-100"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Colors (Dummy as DummyJSON does not provide colors directly) */}
        <div className="mb-4">
          <span className="font-semibold">Colors:</span>
          <div className="flex gap-2 mt-1">
            {["#000", "#FF0000", "#008000", "#0000FF"].map((color, idx) => (
              <span
                key={idx}
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        </div>

        {/* Tags (based on DummyJSON category/brand info) */}
        <div className="mb-4">
          <span className="font-semibold">Tags:</span>
          <div className="flex gap-2 flex-wrap mt-1">
            {[product.category, product.brand].map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
