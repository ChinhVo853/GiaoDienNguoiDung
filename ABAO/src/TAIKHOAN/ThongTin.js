import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Head from '../TRANGCHU/Head';
import Menu from '../TRANGCHU/Menu';
import Footer from '../TRANGCHU/Footer';
import Avatar from "./Avatar";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2';

function ThongTin() {
    const [khachHang, setKhachHang] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [hoaDon, setHoaDon] = useState([]);
    //được dùng để lưu localsotege
    const storedToken = localStorage.getItem('token');
    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me', null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },

            },{
                timeout: 3000,
              }).then(function (response) {
                console.log('a')
                    setKhachHang(response.data);
                    setHoTen(response.data.ho_ten);
                    setSoDienThoai(response.data.so_dien_thoai);
                    setDiaChi(response.data.dia_chi);
                     // Gọi yêu cầu lấy hoá đơn ở đây
                    return axios.post('http://localhost:8000/api/lay-hoa-don-khach-hang', {
                        KhachHang: response.data.id
                    });

                }).then(function (response) {
                    setHoaDon(response.data.data);                
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
     
            axios.post('http://localhost:8000/api/lay-hoa-don-khach-hang', {
                KhachHang: khachHang.id
            },{
                timeout: 4000,
              }).then(function(response) {
                console.log(response.data);
            });
        
    }, []);
    const capNhatThongTin = (event) => {
        event.preventDefault();
        if(hoTen==""||soDienThoai==""||diaChi=="")
        {
            Swal.fire({
                title: "Thất bại",
                text:"Hãy điền đầy đủ thông tin" ,
                icon: "error"
              });
            
        }
        else{
        axios.post('http://127.0.0.1:8000/api/cap_nhat_thong_tin', {
            email:khachHang.email,
            ho_ten:hoTen,
            so_dien_thoai:soDienThoai,
            dia_chi:diaChi,
        })
            .then(function (response) {
                window.location.href = "/THONGTINTAIKHOAN";
            })
            .catch(function (error) {
                 if(error.response.status === 422)
                    {
                        
                    
                        const {so_dien_thoai} = error.response.data.errors;
                        if(so_dien_thoai)
                        {
                            Swal.fire({
                                title: "Thất bại",
                                text:  Object.values(so_dien_thoai).join('') ,
                                icon: "error"
                            });
                        
                        }
                    }
                console.error('Lỗi trong quá trình yêu cầu đổi mật khẩu:', error);
            });
        }

    };
   
 
    const DanhSachHoaDon = hoaDon && Array.isArray(hoaDon) ? hoaDon.map(item => (<>
        <div  className="container-xxl position-relative bg-white d-flex p-0">
            <div key={item.id}className="col-sm-12 col-xl-10">
                <div className="bg-light rounded h-100 p-4">
                    <div className="row">
                        <div className="col-sm-3">mã: {item.id}</div>
                        <div className="col-sm-3">Tổng tiền: {item.tong_tien} VNĐ</div>
                        <div className="col-sm-3">Ngày lập: {new Date(item.created_at).toLocaleDateString('en-VN')}</div>
                        <div className="col-sm-3"><NavLink to={`/KTDonHang/${item.id}`}  style={{color:'#25c9e6', textDecoration: 'none'}}>xem chi tiết</NavLink></div>
                   </div>
                </div>
            </div>
        </div>
        <br></br>
        </>
    )): () =>{
        return (<></>)
    }
    
    

    return (
        <>
            <Head />
            <Menu />
            <div className='trangthongtintaikhoan'>
                
                    <div className="container-xxl position-relative bg-white d-flex p-0">
                        <div className="col-sm-12 col-xl-6">
                            <div className="bg-light rounded h-100 p-4">
                                <h6 className="mb-4">THÔNG TIN TÀI KHOẢN</h6>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="ho_ten"
                                        value={hoTen}
                                        onChange={(e) => setHoTen(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Họ Tên</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput"
                                        placeholder="name@example.com" value={khachHang?.email || ''}
                                        readOnly />
                                    <label htmlFor="floatingInput">Email </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword"
                                        placeholder="Password" value={khachHang?.password || ''}
                                        readOnly />
                                    <label htmlFor="floatingPassword">Mật khẩu</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="so_dien_thoai"
                                        value={soDienThoai}
                                        onChange={(e) => setSoDienThoai(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Số điện thoại</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="dia_chi"
                                        value={diaChi}
                                        onChange={(e) => setDiaChi(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Địa chỉ</label>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-3'>

                                        <NavLink to="/DoiMatKhau" className="single-icon" >Đổi mật khẩu</NavLink>

                                    </div>
                                    <div className='col-sm-6'>

                                    </div>

                                    <div className='col-sm-3'>
                                        <a className="btn btn-outline-danger" onClick={capNhatThongTin}>Cập nhật</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-6">
                            <Avatar khachHang = {khachHang}/>
                        </div>
                    </div>


                
            </div>

            
           <h2  className="container-xxl position-relative bg-white d-flex p-0">HOÁ ĐƠN</h2>
            {DanhSachHoaDon}
            <Footer />

        </>
    );
};

export default ThongTin;