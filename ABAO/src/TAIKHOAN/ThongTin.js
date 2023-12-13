import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        id: 1,
        ho_ten: 'Your Full Name',
        email: 'your.email@example.com',
        password: '******',
        so_dien_thoai: '123-456-7890',
        dia_chi: 'Your Address',
    });

    useEffect(() => {
        // Fetch user data from an API or any other source
        // and update the state using setUserInfo
    }, []);
    return (
        <body>
            <div className="container-xxl position-relative bg-white d-flex p-0">
                <div className="col-sm-12 col-xl-6">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">THÔNG TIN TÀI KHOẢN</h6>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput"
                                placeholder="name@example.com" />
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
                        <a href='#'>Đổi mật khẩu    </a>
                    </div>
                </div>
            </div>


        </body>
    );
};

export default Profile;