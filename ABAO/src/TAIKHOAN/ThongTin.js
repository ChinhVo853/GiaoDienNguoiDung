import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Head from '../TRANGCHU/Head';
import Menu from '../TRANGCHU/Menu';
import Footer from '../TRANGCHU/Footer';
function ThongTin() {
    const [khachHang, setKhachHang] = useState('');

	//được dùng để lưu localsotege
	const storedToken = localStorage.getItem('token');
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

    // const listKhachHang = khachHang.map(function (item2) {
    //     return (
    //         <>
    //             <div class="single-comment left">
    //                 <img src="https://via.placeholder.com/80x80" alt="#" />
    //                 <div class="content">
    //                     <h4>{item2.ho_ten}</h4>

    //                 </div>
    //             </div>
    //         </>
    //     );

    // })
    return (
        <>
            <Head />
            <Menu />
            <div className='trangthongtintaikhoan'>
            <body >
                <div className="container-xxl position-relative bg-white d-flex p-0">
                    <div className="col-sm-12 col-xl-6">
                        <div className="bg-light rounded h-100 p-4">
                            <h6 className="mb-4">THÔNG TIN TÀI KHOẢN</h6>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="ho_ten" />
                                <label for="floatingInput">Họ Tên</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput"
                                    placeholder="name@example.com" />
                                <label for="floatingInput">Email </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword"
                                    placeholder="Password" />
                                <label for="floatingPassword">Mật khẩu</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="so_dien_thoai" />
                                <label for="floatingInput">Số điện thoại</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder="dia_chi" />
                                <label for="floatingInput">Địa chỉ</label>
                            </div>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <a href='#'>Đổi mật khẩu</a>
                                </div>
                                <div className='col-sm-6'>
                                    
                                </div>

                                <div className='col-sm-3'> 
                                <a class="btn btn-outline-danger" href="#">Cập nhật</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </body>
            </div>
            
            <Footer />

        </>
    );
};

export default ThongTin;