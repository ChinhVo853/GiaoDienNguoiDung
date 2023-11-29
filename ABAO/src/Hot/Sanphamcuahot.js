import GiaSP from "../SANPHAM/GiaSP";
import HinhSP from "../SANPHAM/HinhSP";
import TenSP from "../SANPHAM/TenSP";

function Cacsanphambanchay() {
    return (
        <>

            <div class="single-list">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-12">
                        <div class="list-image overlay">
                            {/* <img src="https://via.placeholder.com/115x140" alt="#"/> */}
                            <HinhSP />
                            <a href="#" class="buy"><i class="fa fa-shopping-bag"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12 no-padding">
                        <div class="content">
                            <h4 class="title"><a href="#"><TenSP /></a></h4>
                            <p class="price with-discount"><GiaSP /></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cacsanphambanchay;