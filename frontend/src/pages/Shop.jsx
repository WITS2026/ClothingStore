import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          "https://zw5njqds12.execute-api.us-east-1.amazonaws.com/products"
        );

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error getting products:", error);
      }
    };

    getProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      await fetch(
        "https://zw5njqds12.execute-api.us-east-1.amazonaws.com/updateUserCart/123",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.productId,
            name: product.name,
            price: product.price,
            color: product.color,
            quantity: 1,
          }),
        }
      );

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("There was a problem adding this item.");
    }
  };

  return (
    <div className="container my-5">
      <div className="page-section">
        <h1 className="mb-4 text-primary text-center">Shop</h1>

        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.productId}>
              <div className="card color-card h-100 shadow-sm text-center">
                <div className="color-card-top"></div>

                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p className="text-muted mb-2">{product.color}</p>
                  <p className="text-muted mb-4">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    className="btn btn-wave"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}