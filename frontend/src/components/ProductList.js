import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";
import { Link } from "react-router-dom";
import { MEDIA_BASE_URL } from "../api/config";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllProducts()
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
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border rounded p-4"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white border rounded p-4 hover:shadow-sm transition"
                    >
            <div className="h-40 mb-3 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
              {(() => {
                const imgPath = p.thumbnail_url || p.image_url || p.image || p.thumbnail || "";
                                const src = imgPath ? `${MEDIA_BASE_URL}${imgPath}` : null;
                return src ? (
                  <img src={src} alt={p.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-sm text-gray-500">No image</div>
                );
              })()}
            </div>

            <h3 className="text-sm font-medium text-gray-900 mb-1">
              {p.name}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              ₹{p.price}
            </p>

            <Link
              to={`/products/${p.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              View details
            </Link>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default ProductList;
