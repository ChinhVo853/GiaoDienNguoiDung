import React, { useState, useEffect } from 'react';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
function ThanhToan() {
    const [cartItems, setCartItems] = useState([]);
  
    const [tenSanPhamArr, setTenSanPhamArr] = useState([]);

    const [mauArr, setMauArr] = useState([]);


    const [sizeArr, setSizeArr] = useState([]);

    const [soLuong, setSoLuong] = useState([]);

    const [gia, setGia] = useState([]);

    const [khachHang, setKhachHang] = useState({});

    const storedToken = localStorage.getItem('token');


    //-----------------API------------------------------
console.log(mauArr);

    //hàm thanh toán
    const HamThanhToan = () => {
        axios.post('http://127.0.0.1:8000/api/thanh-toan',{
            khach_hang: khachHang.id,
            tong_tien: calculateTotal(),
            mau: mauArr,
            size: sizeArr,
            so_luong: soLuong,
            gia: gia,
            ten: tenSanPhamArr,
        }).then(function(response){

            alert('đã đặt hàng thành công');
            
            window.location.href = `/KTDonHang/${response.data.data}`;
            console.log(response);
        })
    }



    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        
       
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me',null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },
              
              })
              .then(function (response) {
             setKhachHang(response.data);
              
              })
              .catch(function (error) {
                console.error('Error during login request:', error);
               
              });
        
        } 
        else {
          // Token không tồn tại, có thể chuyển hướng hoặc thực hiện hành động khác
          console.log('Token không tồn tại');
          // Ví dụ: Chuyển hướng về trang đăng nhập
          // window.location.href = '/dang-nhap';
        }
      }, []); 



    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(items);

      //lấy tên
      const tenArr = items.map((item) => item.ten);
        setTenSanPhamArr(tenArr);

    //lấu màu
    const MauArr = items.map((item) => item.selectedColor);
        setMauArr(MauArr);
        
    //lấy Size
    const SizeArr = items.map((item) => item.selectedSize);
        setSizeArr(SizeArr);
        
        const SoLuongArr = items.map((item) => item.so_luong);
        setSoLuong(SoLuongArr); 

        const GiaArr = items.map((item) => item.gia);
        setGia(GiaArr); 
        
    }, []);
    const calculateTotal = () => {
        const total = cartItems.reduce((acc, item) => {
          return acc + item.gia * Number(item.so_luong);
        }, 0);

    return total;
};







  return (
    <>
      <Head />
      <Menu />
      <div class="container">
        <div class="row">
            <div class="col-12 mt-4">
                <div class="card p-3" style={{backgroundColor: '#0193f5' , color :'white'}}>
                    <p class="mb-0 fw-bold h4">Điền thông tin</p>
                </div>
            </div>
            <div class="col-12">
                <div class="card p-3">
                   
                    <div class="card-body border p-0">
                        
                        <div class="collapse show p-3 pt-0" id="collapseExample">
                            <div class="row">
                                <div class="col-lg-5 mb-lg-0 mb-3">
                                    
                                     {cartItems.map((item) => (
                    <tr key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                      
                        
                
                   
                  
                                    <p class="mb-0">
                                        <span class="fw-bold">Sản phẩm:</span>
                                        <span class="c-green">{item.ten} </span>
                                        <span class="fw-bold">Màu:</span>
                                        <span class="c-green">{item.selectedColor} </span>
                                        <span class="fw-bold">Size:</span>
                                        <span class="c-green">{item.selectedSize} </span>
                                    </p>
                                    <p class="mb-0">
                                        <span class="fw-bold">Giá: </span>
                                        <span class="c-green">{item.gia}VND</span>
                                        <span class="fw-bold"> Số lượng: </span>
                                        <span class="c-green">{item.so_luong}</span>
                                    </p>
                                   
                                     </tr>
                                    ))}
                                     <p class="mb-0">
                                        <h3 class="fw-bold">Thành tiền:
                                        <span class="c-green">{calculateTotal()} VNĐ</span> </h3>
                                    </p>
                                </div>
                                <div class="col-lg-7">
                                    <form action="" class="form">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" class="form-control" placeholder=" " value={khachHang?.ho_ten}/>
                                                    <label for="" class="form__label">Tên khách hàng</label>
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" class="form-control" placeholder=" " value={khachHang?.dia_chi}/>
                                                    <label for="" class="form__label">Địa chỉ</label>
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" class="form-control" placeholder=" " value={khachHang?.so_dien_thoai}/>
                                                    <label for="" class="form__label">Số điện thoại</label>
                                                </div>
                                            </div>
                                            
                                            <div class="col-6">
                                                <div class="btn btn-primary w-100" onClick={HamThanhToan}>Đặt hàng</div>
                                                
                                            </div>
                                            <div class="col-6">
                                                <div class="btn btn-primary w-100" >
                                                    <NavLink to='/KTDonHang' >Kiểm tra đơn hàng</NavLink>
                                                    

                                                    </div>
                                                
                                            </div>
                                           
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div class="col-12">
                <div class="btn btn-primary payment">
                    Make Payment
                </div>
            </div> */}
        </div>
    </div>
      <Footer />
    </>
  );
}

export default ThanhToan;
