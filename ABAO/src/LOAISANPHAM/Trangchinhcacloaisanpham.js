import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Danhsach from "../SANPHAM/Danhsach";
import Nutxemthem from "../SANPHAM/Nutxemthem";
function Trangchinhcacloaisanpham() {
    return (
        <>
            <Head />
            <Menu />
            <div class="product-area section">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-title">
                                <h2>ÁO THUN</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="product-info">
                                <div class="nav-main">


                                    <div class="tab-content" id="myTabContent">
                                        <Danhsach />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <Nutxemthem/>
                </div>

            </div>
            <Footer />
        </>
    );
}
export default Trangchinhcacloaisanpham;