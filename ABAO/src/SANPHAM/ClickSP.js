
import { NavLink } from "react-router-dom";





function ClickSP() {
  return (
    <>
      <div className="button-head">
        <div className="product-action">
          <NavLink  title="Wishlist"><i className="ti-heart"></i><span>Thêm yêu thích</span></NavLink>
        </div>
        
      </div>
    </>
  );

}

export default ClickSP;
