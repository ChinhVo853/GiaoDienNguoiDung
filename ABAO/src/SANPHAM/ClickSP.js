
import { NavLink } from "react-router-dom";





function ClickSP() {
  return (
    <>
      <div className="button-head">
        <div className="product-action">
          <a href="#" title="Quick View"><i className="ti-eye"></i><span>Quick Shop</span></a>
          <a href="#" title="Wishlist"><i className="ti-heart"></i><span>Add to Wishlist</span></a>
          <a href="#" title="Compare"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
        </div>
        <div className="product-action-2">
          <a href="#" title="Add to cart">Add to cart</a>
        </div>
      </div>
    </>
  );

}

export default ClickSP;
