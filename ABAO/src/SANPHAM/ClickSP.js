
import { NavLink } from "react-router-dom";





function ClickSP() {
  return (
    <>
      <div className="button-head">
        <div className="product-action">
          <NavLink to="" title="Wishlist"><i className="ti-heart"></i><span>Add to Wishlist</span></NavLink>
        </div>
        <div className="product-action-2">
          <NavLink to="/GioHang" title="Add to cart">Add to cart</NavLink>
        </div>
      </div>
    </>
  );

}

export default ClickSP;
