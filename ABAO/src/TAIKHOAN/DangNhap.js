import '../vendor/css/dangnhap.css';
import axios from 'axios';
import { useState } from 'react';

function DangNhap() {
  //---------các state ---------------------

  //lưu value nhập vào của email ở input
  const [email, setEmail] = useState('');
  
  //lưu value nhập vào của password ở input
  const [password, setPassword] = useState('');


  //------------ gọi API--------------------


  const postLogin = (event) => {
    // Ngăn chặn hành vi mặc định của sự kiện, trong trường hợp này là gửi biểu mẫu
    event.preventDefault();


    //ở đây kiểm tra thông tin đăng nhập
    //nếu thông tin đăng nhập là hợp lệ thì sẽ tạo ra 1 localStorage sẽ thay đổi đường dẫn thành /
    axios.post('http://127.0.0.1:8000/api/login', {
      email: email,
      password: password,
    })
    .then(function (response) {
      
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    })
    .catch(function (error) {
      console.error('Error during login request:', error);
     
    });
  }



  return (
    <>
     
        <div className="container1">
          <div className="heading">ĐĂNG NHẬP</div>
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
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <input className="login-button" type="submit" value="Sign In" />
          </form>
        </div>
     
    </>
  );
}

export default DangNhap;
