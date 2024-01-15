import React, { useState, useEffect } from 'react';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Slice } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function ThanhToan() {
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    // Truy cập các tham số query cụ thể
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');

    
    const [cartItems, setCartItems] = useState([]);
  
    const [tenSanPhamArr, setTenSanPhamArr] = useState([]);

    const [mauArr, setMauArr] = useState([]);

    const [tienShip , setTienShip] = useState(0);

    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState(1);

    const [sizeArr, setSizeArr] = useState([]);

    const [soLuong, setSoLuong] = useState([]);

    const [gia, setGia] = useState([]);

    const [khachHang, setKhachHang] = useState({});

    const storedToken = localStorage.getItem('token');


    //-----------------API------------------------------

    //hàm thanh toán

    useEffect(() => {
        
        if(vnp_BankCode=="NCB")
        {
            if (vnp_Amount != null && khachHang.id && calculateTotal() && mauArr && tienShip && sizeArr && soLuong && gia && tenSanPhamArr) {
                setLoading(true);
                axios.post('http://127.0.0.1:8000/api/trang-thai-thanh-toan',{
    
                }).then(function(response){

                    new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
                    setLoading(false);
                    window.location.href = `KTDONHANG/${response.data.data}`;
                }).catch(function(error){
                    if(error.response.status===422)
                    {
                        Swal.fire({
                            title: "Thất bại",
                            text: error.response.data.errors ,
                            icon: "error"
                        });
                    }
                
                })
            }
        }
      }, [ tienShip]);





    const HamThanhToan = () => { 
        
            axios.post('http://127.0.0.1:8000/api/thanh-toan',{
                khach_hang: khachHang.id,
                tong_tien: calculateTotal(),
                mau: mauArr,
                tien_ship: tienShip,
                size: sizeArr,
                so_luong: soLuong,
                gia: gia,
                ten: tenSanPhamArr,
                PhuongThucThanhToan: phuongThucThanhToan,
            }).then(function(response){
                console.log(response);
                if(response.data.url)
                {
                    window.location.href = response.data.url;
                }
               else{
                
                 window.location.href = `KTDONHANG/${response.data.data}`;
               }
               
            }).catch(function(error){
                if(error.response.status===422)
                {
                    Swal.fire({
                        title: "Thất bại",
                        text: error.response.data.errors ,
                        icon: "error"
                    });
                }
            
            })
        }
       

    

    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        
        let KyTuHoChiMinh = '';
        
        if (khachHang.dia_chi) {
            const diaChi = khachHang.dia_chi;
            KyTuHoChiMinh = diaChi.slice(-11).toLowerCase();
        }
        
        if (KyTuHoChiMinh) 
        {
            if((KyTuHoChiMinh == 'ho chi minh' || KyTuHoChiMinh == 'hồ chí minh'))
            {
                setTienShip(30000);
            } 
            else
            {
                setTienShip(60000);
            }
        }
       
        
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me',null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },
              
              },{
                timeout: 5000,
              })
              .then(function (response) {
                setKhachHang(response.data);
                new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
                setLoading(false);
              })
              .catch(function (error) {
                setLoading(false);
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
      
        let KyTuHoChiMinh = '';
        if (khachHang.dia_chi) {
          const diaChi = khachHang.dia_chi;
          KyTuHoChiMinh = diaChi.slice(-11).toLowerCase();
        }
      
        if (KyTuHoChiMinh) {
          if (KyTuHoChiMinh === 'ho chi minh' || KyTuHoChiMinh === 'hồ chí minh') {
            setTienShip(30000);
          } else {
            setTienShip(60000);
          }
        }
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
        
    }, [khachHang]);

    //hàm tính tổng tiền
    const calculateTotal = () => {
    let total = cartItems.reduce((acc, item) => {
        return (acc + item.gia * Number(item.so_luong));
    }, 0);

    return total;
};





//------------ham xu ly------------------




  return (
    <>
    {loading ? (
                     <div className="loader">
                     <div className="wrapper">
                       <div className="catContainer">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 733 673"
                           className="catbody"
                         >
                           <path
                             fill="#212121"
                             d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
                           ></path>
                           <path fill="#212121" d="M184 9L270.603 159H97.3975L184 9Z"></path>
                           <path fill="#212121" d="M541 0L627.603 150H454.397L541 0Z"></path>
                         </svg>
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 158 564"
                           className="tail"
                         >
                           <path
                             fill="#191919"
                             d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
                           ></path>
                         </svg>
                         <div className="textcat">
                           <span className="bigzzz">Z</span>
                           <span className="zzz">Z</span>
                         </div>
                       </div>
                       <div className="wallContainer">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 500 126"
                           className="wall"
                         >
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="3"
                             x2="450"
                             y1="3"
                             x1="50"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="85"
                             x2="400"
                             y1="85"
                             x1="100"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="122"
                             x2="375"
                             y1="122"
                             x1="125"
                           ></line>
                           <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="500" y1="43"></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="1.99391"
                             x2="115.5"
                             y1="43.0061"
                             x1="115.5"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.00002"
                             x2="189"
                             y1="43.0122"
                             x1="189"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.00612"
                             x2="262.5"
                             y1="43.0183"
                             x1="262.5"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.01222"
                             x2="336"
                             y1="43.0244"
                             x1="336"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.01833"
                             x2="409.5"
                             y1="43.0305"
                             x1="409.5"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="153"
                             y1="84.0122"
                             x1="153"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="228"
                             y1="84.0122"
                             x1="228"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="303"
                             y1="84.0122"
                             x1="303"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="378"
                             y1="84.0122"
                             x1="378"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="84"
                             x2="192"
                             y1="125.012"
                             x1="192"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="84"
                             x2="267"
                             y1="125.012"
                             x1="267"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="84"
                             x2="342"
                             y1="125.012"
                             x1="342"
                           ></line>
                         </svg>
                       </div>
                     </div>
                   </div>
                ) : (
        <>
        <Head />
        <Menu />
        <div className="container">
            <div className="row">
                <div className="col-12 mt-4">
                    <div className="card p-3" style={{backgroundColor: '#0193f5' , color :'white'}}>
                        <p className="mb-0 fw-bold h4">Điền thông tin</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card p-3">
                    
                        <div className="card-body border p-0">
                            
                            <div className="collapse show p-3 pt-0" id="collapseExample">
                                <div className="row">
                                    <div className="col-lg-5 mb-lg-0 mb-3">
                                        
                                        {cartItems.map((item) => (
                                            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}   >
                                                <p className="mb-0" style={{margin: '20px 0 0 0'}}>
                                                    <span className="fw-bold">Sản phẩm:</span>
                                                    <span className="c-green">{item.ten} </span>
                                                    <span className="fw-bold">Màu:</span>
                                                    <span className="c-green">{item.selectedColor} </span>
                                                    <span className="fw-bold">Size:</span>
                                                    <span className="c-green">{item.selectedSize} </span>
                                                </p>
                                                <p className="mb-0">
                                                    <span className="fw-bold">Giá: </span>
                                                    <span className="c-green">{item.gia.toLocaleString()}VND</span>
                                                    <span className="fw-bold"> Số lượng: </span>
                                                    <span className="c-green">{item.so_luong}</span>
                                                </p>
                                                
                                            </div>
                                        ))}
                                    
                                        
                                            <div className="mb-0" style={{margin: '20px 0 0 0'}}>
                                                <h4>tiền ship: 
                                                <span className="c-green">{tienShip.toLocaleString()} VNĐ</span>
                                                </h4> 
                                            </div>
                                            
                                            <div className="mb-0" style={{margin: '20px 0 0 0'}}>
                                                <h3 className="fw-bold">Tổng tiền:
                                                <span className="c-green">{(calculateTotal()+tienShip).toLocaleString()} VNĐ</span> </h3>
                                            </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <form action="" className="form">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form__div">
                                                        <input type="text" className="form-control" placeholder=" " value={khachHang?.ho_ten}/>
                                                        <label htmlFor="" className="form__label">Tên khách hàng</label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form__div">
                                                        <input type="text" className="form-control" placeholder=" " value={khachHang?.dia_chi}/>
                                                        <label htmlFor="" className="form__label">Địa chỉ</label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form__div">
                                                        <input type="text" className="form-control" placeholder=" " value={khachHang?.so_dien_thoai}/>
                                                        <label htmlFor="" className="form__label">Số điện thoại</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form__div" placeholder=" " >
                                                    
                                                        <select onChange={(e) => setPhuongThucThanhToan(e.target.value)} className="form-control">
                                                            <option value="1">Thanh toán khi nhận hàng</option>
                                                            <option value="2">Thanh toán qua Ngân hàng NCB </option>
                                                        </select>
                                                        <label htmlFor="" className="form__label">Phương thức thanh toán</label>
                                                    </div>
                                                </div>
                                            
                                                    <div className="btn btn-primary w-100" onClick={HamThanhToan}>Đặt hàng</div>
                                                    
                                                
                                            
                                            
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12">
                    <div className="btn btn-primary payment">
                        Make Payment
                    </div>
                </div> */}
            </div>
        </div>
        <Footer />
        </>
        )}
    </>
  );
}

export default ThanhToan;
