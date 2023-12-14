import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Hinhnhotrangchitiet from "./Hinhnhotrangchitiet";
import BinhLuan from "./BinhLuan";


function TrangChinhChiTietSanPham() {

  //---------các state ---------------------

  //đây là giá trị lấy được trên thanh url
  let { spID } = useParams();

  //sản phẩm trong trang chi tiết này
  const [sanPham, setSanPham] = useState([]);

  //màu và size của sản phẩm
  const [sizeMauSP, setSizeMauSP] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sanPhamb, setSanPhamb] = useState([]);
  const [khachHang, setKhachHang] = useState('');
  const [danhSachBinhLuan, setDanhSachBinhLuan] = useState([]);
  const [binhLuan, setBinhLuan] = useState('');
  //tao bien luu du lieu vao axios

  const storedToken = localStorage.getItem('token');

  //-------------------------------



  //-----------------------API-----------------------------------
  



  //---------------------hàm hiện thông tin------------------

 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/chi-tiet-san-pham/${spID}`);
          setSanPham(response.data.data);
          setSizeMauSP(response.data.data2);
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
        }
      };

      fetchData();
    }, [spID]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-binh-luan-cap-mot/${spID}`);
          setDanhSachBinhLuan(response.data.data);
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
        }
      };

      fetchData();
    }, [spID]);

    useEffect(() => {
      const storedToken = localStorage.getItem('token');

      if (storedToken !== null) {
        axios.post('http://127.0.0.1:8000/api/me', null, {
          headers: {
            Authorization: 'bearer ' + storedToken,
          },
        })
          .then(function (response) {
            setKhachHang(response.data.id);
          })
          .catch(function (error) {
            console.error('Error during login request:', error);
          });
      } else {
        console.log('Token không tồn tại');
      }
    }, []);

    const handleColorChange = (color) => {
      setSelectedColor(color);
    };

    const handleSizeChange = (size) => {
      setSelectedSize(size);
    };

    const ChonMua = () => {
      if (!selectedSize || !selectedColor) {
        alert('Vui lòng chọn size và màu trước khi thêm vào giỏ hàng.');
        return;
      }

      const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = existingCartItems.find((item) => item.id === sanPham.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);

      if (existingItem) {
        existingItem.so_luong += 1;
      } else {
        const newCartItem = {
          id: sanPham.id,
          ten: sanPham.ten,
          gia: sanPham.gia_ban,
          so_luong: 1,
          selectedSize,
          selectedColor,
        };
        existingCartItems.push(newCartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      alert('Thêm sản phẩm vào giỏ hàng thành công');
    };

    const listSize = () => {
      const uniqueSizes = new Set();

      return sizeMauSP.map((item, index) => {
        const size = item.size.ten;

        if (!uniqueSizes.has(size)) {
          uniqueSizes.add(size);

          return (
            <li key={index} className="list-inline-item">
              <label>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            </li>
          );
        }

        return null;
      });
    };

    const listMau = () => {
      const uniqueColors = new Set();
      return sizeMauSP.map((item, index) => {
        const color = item.mau.ten;

        if (!uniqueColors.has(color)) {
          uniqueColors.add(color);

          return (
            <li key={index} className="list-inline-item">
              <label>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => handleColorChange(color)}
                />
                {color}
              </label>
            </li>
          );
        }

        return null;
      });
    };

    /* const dsBinhLuan = danhSachBinhLuan.map((item, index) => (
       <React.Fragment key={index}>
         {item.noi_dung}
       </React.Fragment>
     ));
   */
    const luuBinhLuan = (event) => {
      event.preventDefault();

      axios.post('http://127.0.0.1:8000/api/luu-binh-luan', {
        san_pham_id: sanPham.id,
        khach_hang_id: khachHang,
        noi_dung: binhLuan,
      })
        .then(function (response) {
          const token = response.data.access_token;
          localStorage.setItem('token', token);
        })
        .catch(function (error) {
          console.error('Error during login request:', error);
        });
    };



    useEffect(() => {
      // Kiểm tra xem token có tồn tại hay không


      if (storedToken !== null) {
        axios.post('http://127.0.0.1:8000/api/me', null, {
          headers: {
            Authorization: 'bearer ' + storedToken,
          },

        })
          .then(function (response) {
            setKhachHang(response.data.id);

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


    //------------------------------------------------
    const dsBinhLuan = danhSachBinhLuan.map(function (item, index) {
      return (
        <>
          {item.noi_dung}

        </>
      );
    });


    return (
      <>
        <Head />
        <Menu />
        <section className="bg-light">
            <div className="container pb-5">
              <div className="row">
                <div className="col-lg-5 mt-5">
                  <div className="row">
                    <Hinhnhotrangchitiet hinh={sanPham} />
                  </div>
                </div>
    
                <div className="col-lg-7 mt-5">
                  <div className="card">
                    <div className="card-body">
                      <h1 className="h2">{sanPham.ten}</h1>
                      <p className="h3 py-2">{sanPham.gia_ban} VNĐ</p>
                      <p className="py-2">
                        <i className="fa fa-star text-warning"></i>
                        <i className="fa fa-star text-warning"></i>
                        <i className="fa fa-star text-warning"></i>
                        <i className="fa fa-star text-warning"></i>
                        <i className="fa fa-star text-secondary"></i>
                        <span className="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
                      </p>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <h6>Brand:</h6>
                        </li>
                        <li className="list-inline-item">
                          <p className="text-muted"><strong>{sanPham.nha_cung_cap?.ten}</strong></p>
                        </li>
                      </ul>
    
                      <h6>Description:</h6>
                      <p>{sanPham.thong_tin}</p>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <h6>Avaliable Color :</h6>
                        </li>
                        <li className="list-inline-item">
                          <p className="text-muted"><strong>White / Black</strong></p>
                        </li>
                      </ul>
    
                      <form>
                        <div className="row">
                          <div className="col-auto">
                            <ul className="list-inline pb-3">
                              <li className="list-inline-item">Size :</li>
                              <p className="text-muted">{listSize()}</p>
                            </ul>
                          </div>
                          <div className="col-auto">
                          <div className="product-color">
                          <div className="color-choose">
                            <ul className="list-inline pb-3">
                              <li className="list-inline-item">Mau :</li>
                              <p className="text-muted">{listMau()}</p>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
<div className="row pb-3">
                        <div className="col d-grid">
                          <button type="button" className="btn" name="submit">Buy</button>
                        </div>
                        <div className="col d-grid">
                          <button type="button" onClick={ChonMua} className="btn">Add To Cart</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BinhLuan/>
      </section>

        {dsBinhLuan}

        <form onSubmit={luuBinhLuan} className="form">
          <input
            onChange={(e) => setBinhLuan(e.target.value)}
            required
            className="input"
            type="text"
            name="noi_dung"
            id="noi_dung"
            placeholder="Bình luận..."
          />
          <input className="login-button" type="submit" value="GỬI" />
        </form>
        <Footer />
      </>
    );
  }

export default TrangChinhChiTietSanPham;
