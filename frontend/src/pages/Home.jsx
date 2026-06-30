import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home-hero py-5 mb-5">
        <div className="container text-center">
          <span className="feature-badge mb-3 d-inline-block">Sunny Style</span>
          <h1 className="display-3 fw-bold">StyleHub</h1>
          <p className="lead text-dark">
            Fashion that combines comfort, quality, and joyful color.
          </p>

          <Link to="/shop" className="btn btn-wave btn-lg mt-3">
            Shop Collection
          </Link>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Why Shop With Us?</h2>

        <div className="row text-center">
          <div className="col-md-4">
            <h3>👕 Quality</h3>
            <p>
              Carefully selected materials designed for everyday comfort.
            </p>
          </div>

          <div className="col-md-4">
            <h3>🚚 Fast Shipping</h3>
            <p>
              Quick and reliable delivery to get your order to you fast.
            </p>
          </div>

          <div className="col-md-4">
            <h3>⭐ Customer First</h3>
            <p>
              We are committed to providing an excellent shopping experience.
            </p>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Categories</h2>

        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card shadow">
              <img
                src="https://picsum.photos/400/250?random=1"
                className="card-img-top"
                alt="Men"
              />
              <div className="card-body">
                <h5 className="card-title">Men's Collection</h5>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow">
              <img
                src="https://picsum.photos/400/250?random=2"
                className="card-img-top"
                alt="Women"
              />
              <div className="card-body">
                <h5 className="card-title">Women's Collection</h5>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow">
              <img
                src="https://picsum.photos/400/250?random=3"
                className="card-img-top"
                alt="Accessories"
              />
              <div className="card-body">
                <h5 className="card-title">Accessories</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}