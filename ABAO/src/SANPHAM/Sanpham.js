import ClickSP from "./ClickSP";
import GiaSP from "./GiaSP";
import HinhSP from "./HinhSP";
import TenSP from "./TenSP";
import { NavLink } from "react-router-dom";

function Sanpham(item) {
     
    //Dấu ? được sử dụng để kiểm tra nếu giá trị ở bên phải của nó là undefined hoặc null
    //giúp tránh lỗi TypeError khi bạn cố gắng truy cập một thuộc tính của một đối tượng không xác định.

    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                <div className="single-product">
                    <div className="product-img">
                    <NavLink to={`/ChiTiet/${item.data.id}`} className="Nav-Link active">
                        <HinhSP anh = {item.data?.hinh_anh[0]?.url}/>
                    </NavLink>
                    <ClickSP />
                    </div>
                    <div className="product-content">
                        <TenSP ten = { item.data.ten}/>
                        <GiaSP gia = { item.data.gia_ban }/>

                    </div>
                </div>
            </div>
        </>
    );
}
export default Sanpham;
