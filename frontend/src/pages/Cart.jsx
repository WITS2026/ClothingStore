import { useEffect, useState } from "react";

const USER_ID = "123";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await fetch(
          `https://jrpj1yvv3a.execute-api.us-east-1.amazonaws.com/getCart/${USER_ID}`
        );

        const data = await response.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error("Error getting cart:", error);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      const response = await fetch(
        `https://jrpj1yvv3a.execute-api.us-east-1.amazonaws.com/cartItem/${productId}/user/${USER_ID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setCartItems((current) =>
        current.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("There was a problem removing this item.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="container my-5">
        <h3>Loading cart...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="page-section">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4 mb-4">
          <div>
            <h1 className="mb-2 text-primary">Your Cart</h1>
            <p className="text-muted mb-0">
              Review your selected items, update quantities, or remove anything you don't want.
            </p>
          </div>

          <div className="text-end">
            <span className="badge rounded-pill bg-warning text-dark py-2 px-3">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="mb-3">Your cart is feeling light!</h3>
            <p className="text-muted">
              Add a few pieces from the shop to make it glow.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="list-group">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="list-group-item list-group-item-action d-flex flex-column flex-sm-row gap-3 align-items-start align-items-sm-center p-4 rounded-4 shadow-sm"
                  >
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="mb-1 text-muted">Color: {item.color}</p>
                      <p className="mb-0 fw-semibold">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>

                    <div className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card color-card h-100 shadow-sm p-4">
                <h4 className="mb-3">Order summary</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>

                <div className="d-flex justify-content-between mb-4 text-muted">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <button className="btn btn-wave w-100 btn-lg">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}