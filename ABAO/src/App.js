import logo from './logo.svg';
import './App.css';
import './bootstrap-5.2.3-dist/css/bootstrap-grid.min.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Route, Routes } from 'react-router-dom';
import './vendor/css/bootstrap.css';
import './vendor/css/magnific-popup.min.css';
import './vendor/css/font-awesome.css';
import './vendor/css/jquery.fancybox.min.css'
import './vendor/css/themify-icons.css';
import './vendor/css/niceselect.css';
import './vendor/css/animate.css';
import './vendor/css/flex-slider.min.css';
import './vendor/css/owl-carousel.css';
import './vendor/css/slicknav.min.css';
import './vendor/css/reset.css';
import './vendor/css/responsive.css';
//----------------------WEB2-----------------------
import './vendor/css/font-awesome.min.css';


//------------------------DANGNHAPDANGKY-------------------------


//--------------------------------------------------------

import DangNhap from './TAIKHOAN/DangNhap';
import TrangChu from './TRANGCHU/TrangChu';
import DangKy from './TAIKHOAN/DangKy';
import Trangchinhcacloaisanpham from './LOAISANPHAM/Trangchinhcacloaisanpham';


//--------------------CHITIET-----------------------
import TrangChinhChiTietSanPham from './TRANGCHITIET/TrangChinhChiTietSanPham';

import GioHang from './TRANGCHITIET/GioHang';

import ThanhToan from './THANHTOAN/ThanhToan';

function App() {

  return (

    <>
      
      <Routes>
        <Route path='/' element={<TrangChu/>}/>;
        <Route path='/DANGNHAP' element={<DangNhap/>}/>;
        <Route path='/DANGKY' element={<DangKy/>}/>;
        <Route path='/Trang-chinh-cac-loai-san-pham' element={<TrangChinhChiTietSanPham/>}/>;
        <Route path='/ChiTiet/:spID' element={<TrangChinhChiTietSanPham/>}/>
        <Route path='/GioHang' element={<GioHang/>}/>;
        <Route path='/ThanhToan' element={<ThanhToan/>}/>;

      </Routes>
    </>
  );
}
export default App;