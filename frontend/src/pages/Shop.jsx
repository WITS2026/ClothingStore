export default function Shop() {
  const products = [
    {
      id: 1,
      name: "Classic Hoodie",
      price: "$39.99",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: "$59.99",
    },
    {
      id: 3,
      name: "Graphic Tee",
      price: "$24.99",
    },
  ];

  return (
    <div className="container my-5">
      <div className="page-section">
        <h1 className="mb-4 text-primary text-center">Shop</h1>

        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card color-card h-100 shadow-sm text-center">
                <div className="color-card-top"></div>

                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p className="text-muted mb-4">{product.price}</p>

                  <button className="btn btn-wave">Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}