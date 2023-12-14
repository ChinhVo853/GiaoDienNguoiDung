import React, { useState,useEffect } from 'react';
import axios from 'axios';

function DoiMatKhau() {
    // //---------các state ---------------------

  //lưu value nhập vào của email ở input
  const [email, setEmail] = useState('');
  //lưu value nhập vào của email ở input
  const [newPassWord, setNewPassWord] = useState('');
  const [ConfirmNewPassword, setConfirmNewPassword] = useState('');
  //được dùng để lưu localsotege
	const storedToken = localStorage.getItem('token');
  //lưu value nhập vào của password ở input
  const [password, setPassword] = useState('');
  //-------------------------API----------------------------

  //Hàm lấy EMAIL
    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me',null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },
              
              })
              .then(function (response) {
                setEmail(response.data.email);
                
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
 
    const doiMatKhau = (event) => {
        event.preventDefault();
        if (newPassWord === ConfirmNewPassword) {
            if (password.trim() === "") {
                alert('Vui lòng nhập mật khẩu hiện tại');
                return;
            }
    
            axios.post('http://127.0.0.1:8000/api/doi-mat-khau', {
                email: email,
                password: password,
                newPassWord: newPassWord,
            })
            .then(function (response) {
                alert('Thành công');
                window.location.href="/THONGTINTAIKHOAN";
            })
            .catch(function (error) {
                console.error('Lỗi trong quá trình yêu cầu đổi mật khẩu:', error);
            });
        } else {
            alert('Xác nhận mật khẩu không đúng');
        }
    };
  return (
    <>
      <div className="container">
        <div className="heading">ĐỔI MẬT KHẨU</div>
        <form onSubmit={doiMatKhau} className="form">
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
            type="password"
            name="current_password"
            placeholder="Mật khẩu hiện tại"
          />
          <input
            onChange={(e) => setNewPassWord(e.target.value)}
            required
            className="input"
            type="password"
            name="new_password"
            placeholder="Mật khẩu mới"
          />
          <input
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="input"
            type="password"
            name="confirm_new_password"
            placeholder="Xác nhận mật khẩu mới"
          />
          <input className="login-button" type="submit" value="Đổi mật khẩu" />
        </form>
      </div>
    </>
  );
}

export default DoiMatKhau;
