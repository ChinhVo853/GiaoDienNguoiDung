import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function Menu() {
  //--------các State-------------------

  //được dùng để lưu danh sách loại
  const [dsLoai, setDSLoai] = useState([]);

  //----------API-----------------------
  useEffect(  () =>  {
    const fetchData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/danh-sach-loai');
    setDSLoai(response.data.data);
    }
    fetchData();
  },[]);

  //---------hàm xử lý-----------------

  //được dùng để hiển thị tất cả loại lênt rang web

  const danhSachLoai = dsLoai.map((item) => {
    return(
      <li key={item.id}>
        <NavLink to={`/loai/${item.id}`}>{item.ten}</NavLink>
      </li>
    )
  })



  return (
    <>
      <header className="header shop">
        <div className="header-inner">
          <div className="container">
            <div className="cat-nav-head">
              <div className="row">
                <div className="col-12">
                  <div className="menu-area">
                    <nav className="navbar navbar-expand-lg">
                      <div className="navbar-collapse">
                        <div className="nav-inner">
                          <ul className="nav main-menu menu navbar-nav">
                            <li className="active">
                              <NavLink to="/">TRANG CHỦ</NavLink>
                            </li>
                            <li>
                              <a>
                                SẢN PHẨM
                                <i className="ti-angle-down"></i>
                              </a>

                              <ul className="dropdown">
                               {danhSachLoai}
                              </ul>
                            </li>
                            
                            {/* <li>
                              <a>
                                Blog<i className="ti-angle-down"></i>
                              </a>
                              <ul className="dropdown">
                                <li>
                                  <a>Blog Single Sidebar</a>
                                </li>
                              </ul>
                            </li> */}
                            
                            <li>
                              <a>GIỚI THIỆU</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Menu;
