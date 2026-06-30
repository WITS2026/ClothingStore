export default function About() {
  return (
    <div className="container my-5">
      <div className="page-section">
        <h1 className="mb-4 text-primary">About StyleHub</h1>

        <p className="lead text-dark mb-4">
          StyleHub was founded with a simple goal: provide fashionable,
          high-quality clothing at affordable prices.
        </p>

        <p className="mb-4">
          We believe clothing should help people feel confident and comfortable.
          Our collections are designed to fit a variety of styles and occasions,
          from casual everyday wear to special events.
        </p>

        <p className="mb-4">
          Every item is selected with quality, comfort, and value in mind. We are
          committed to creating a shopping experience that is simple, enjoyable,
          and customer-focused.
        </p>

        <hr />

        <div className="row mt-4 about-grid">
          <div className="col-md-4 mb-4">
            <div className="card color-card h-100 shadow-sm p-4">
              <h3>Our Mission</h3>
              <p>
                To provide stylish and affordable fashion that helps people express
                themselves with confidence.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card color-card h-100 shadow-sm p-4">
              <h3>Our Values</h3>
              <p>
                Quality, customer satisfaction, integrity, and continuous
                improvement.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card color-card h-100 shadow-sm p-4">
              <h3>Our Promise</h3>
              <p>
                We strive to deliver great products, excellent service, and a
                seamless shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}