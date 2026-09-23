import React from "react";

const Categories = () => {
  return (
    <section className="category-section">
      <div className="section-heading">
        <h2>SHOP BY CATEGORY</h2>
        <p>Everything you need for your nail routine</p>
      </div>

      <div className="category-container">
        <div className="category-card">
          <img src="/Images/PressOn.jpg" alt="Press-On Nails" />
          <h3>Press-On Nails</h3>
        </div>

        <div className="category-card">
          <img src="/Images/NailPolish.jpg" alt="Nail Polish" />
          <h3>Nail Polish</h3>
        </div>

        <div className="category-card">
          <img src="/Images/FalseNails.jpg" alt="False Nails" />
          <h3>False Nails</h3>
        </div>

        <div className="category-card">
          <img src="/Images/Nailtool.jpg" alt="Nail Tools" />
          <h3>Nail Tools</h3>
        </div>

        <div className="category-card">
          <img src="/Images/nailcharm.jpg" alt="Accessories" />
          <h3>Accessories</h3>
        </div>

        <div className="category-card">
          <img src="/Images/NailCare.jpg" alt="Nail Care" />
          <h3>Nail Care</h3>
        </div>

        <div className="category-card">
          <img src="/Images/UVlamp.jpg" alt="Nail lamp" />
          <h3>UV Lamp</h3>
        </div>
      </div>
    </section>
  );
};

export default Categories;
