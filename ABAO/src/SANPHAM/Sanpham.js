import ClickSP from "./ClickSP";
import GiaSP from "./GiaSP";
import HinhSP from "./HinhSP";
import TenSP from "./TenSP";

function Sanpham() {
    return (

        <>
            <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                <div class="single-product">
                    <div class="product-img">
                    <a href="#">
                        <HinhSP />
                        </a>
                        <ClickSP />
                    </div>
                    <div class="product-content">
                        <TenSP/>
                        <GiaSP/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Sanpham;