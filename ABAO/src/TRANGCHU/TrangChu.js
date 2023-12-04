import Head from './Head';
import Menu from './Menu';
import Example from './Example';
import SmallBanner from './SmallBanner';
import Danhmuc from '../SANPHAM/Danhmuc';
import Footer from './Footer';
import Dichvu from './DichVu';
import Cacsanphambanchay from '../Hot/Cacsanphambanchay';
import axios from 'axios';
import { useEffect,useState } from 'react';
function TrangChu() {
    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        const storedToken = localStorage.getItem('token');
       
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me', {
                Authorization: 'bearer ' + storedToken,
                
              })
              .then(function (response) {
                
              
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
    return (
        <>
            <Head />
            <Menu />
            <div className='Hbanner'>
                <Example />
            </div>
            <div className='SmallBanner'>
                <SmallBanner />
            </div>

            <Danhmuc />
            <div className='Cacsanphambanchay'>
                <Cacsanphambanchay />

            </div>
            <Dichvu />
            <Footer />
        </>
    );
}
export default TrangChu;
