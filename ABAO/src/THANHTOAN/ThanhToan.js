import React, { useState, useEffect } from 'react';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import { NavLink } from 'react-router-dom';

function ThanhToan() {
    const [cartItems, setCartItems] = useState([]);
  

    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(items);
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
                                                    <input type="text" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">Tên khách hàng</label>
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">Địa chỉ</label>
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="password" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">Số điện thoại</label>
                                                </div>
                                            </div>
                                            
                                            <div class="col-6">
                                                <div class="btn btn-primary w-100" >Đặt hàng</div>
                                                
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
