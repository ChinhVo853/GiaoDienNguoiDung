import '../vendor/css/dangnhap.css';
import axios from 'axios';
import { useState } from 'react';

function QuenMatKhau() {
  //---------các state ---------------------

  //lưu value nhập vào của email ở input
  const [email, setEmail] = useState('');
  
 


  //------------ gọi API--------------------


  const postLogin = (event) => {
    // Ngăn chặn hành vi mặc định của sự kiện, trong trường hợp này là gửi biểu mẫu
    event.preventDefault();


    //ở đây kiểm tra thông tin đăng nhập
    //nếu thông tin đăng nhập là hợp lệ thì sẽ tạo ra 1 localStorage sẽ thay đổi đường dẫn thành /
    axios.post('http://localhost:8000/api/lay-lai-mat-khau', {
      email: email,
    
    })
    .then(function (response) {
      alert('mật khẩu đã được gửi, vui long kiểm tra lại email');
      window.location.href = '/DANGNHAP';
    })
    .catch(function (error) {
      console.error('Error during login request:', error);
     
    });
  }



  return (
    <>
     
        <div className="container1">
          <div className="heading">QUÊN MẬT KHẨU</div>
          <form onSubmit={postLogin} className="form">
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              type="email"
              name="ten_dang_nhap"
              id="ten_dang_nhap"
              placeholder="Email"
            />
            <input className="login-button" type="submit" value="Gửi" />
          </form>
        </div>
     
    </>
  );
}

export default QuenMatKhau;
