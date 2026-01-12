import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productDetails";
import { addToCart } from "../api/cart";
import ModelViewer from "../three/ModelViewer";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState("image"); 
    const [message, setMessage] = useState("");

    useEffect(() => {
        getProductById(id)
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = async () => {
        const res = await addToCart(product.id, 1);
        setMessage(res.message || "Added to cart");
    };

    /* -------- Loading Skeleton -------- */
    if (loading) {
        return (
            <div className="bg-white border rounded p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="h-[360px] bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) return <p className="text-sm text-red-600">{error}</p>;

    return (
        <div className="bg-white border rounded p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* LEFT: Media */}
                <div>
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={() => setViewMode("image")}
                            className={`text-sm px-3 py-1 rounded border ${viewMode === "image"
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-700"
                                }`}
                        >
                            Image
                        </button>

                        <button
                            onClick={() => setViewMode("model")}
                            className={`text-sm px-3 py-1 rounded border ${viewMode === "model"
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-700"
                                }`}
                        >
                            3D View
                        </button>
                    </div>

                    <div className="border rounded bg-gray-50 h-[360px] flex items-center justify-center overflow-hidden">
                        {viewMode === "image" ? (
                            (() => {
                                // prefer thumbnail_url (backend returns thumbnail_url); fall back to other common names
                                const imgPath = product.thumbnail_url || product.image_url || product.image || product.thumbnail || "";
                                const imgSrc = imgPath ? `http://localhost:3001${imgPath}` : null;

                                return imgSrc ? (
                                    <img
                                        src={imgSrc}
                                        alt={product.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <div className="text-sm text-gray-500">No image available</div>
                                );
                            })()
                        ) : (
                            <ModelViewer
                                modelUrl={product.model_url ? `http://localhost:3001${product.model_url}` : null}
                            />
                        )}
                    </div>

                </div>

                {/* RIGHT: Product Info */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                    </h2>

                    <p className="text-sm text-gray-600 mb-4">
                        {product.description}
                    </p>

                    <p className="text-base font-medium text-gray-800 mb-4">
                        ₹{product.price}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>

                    {message && (
                        <p className="text-sm text-green-600 mt-3">{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
