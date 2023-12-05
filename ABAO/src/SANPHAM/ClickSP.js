import { NavLink } from "react-router-dom";

function ClickSP() {
    return (
        <>
            <div class="button-head">
                <div class="product-action">
                    <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i class=" ti-eye"></i><span>Quick Shop</span></a>
                    <a title="Wishlist" href="$"><i class=" ti-heart "></i><span>Add to Wishlist</span></a>
                    <a title="Compare" href="$"><i class="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                </div>
                <div class="product-action-2">
                <NavLink to="GioHang" className="Nav-Link active"><a>Add to cart</a></NavLink>
                </div>
            </div>
        </>
    );
}
export default ClickSP;