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
  const [danhGia, setDanhGia] = useState();

  
  //tao bien luu du lieu vao axios

  const storedToken = localStorage.getItem('token');

  //-------------------------------



  //-----------------------API-----------------------------------
  



  //---------------------hàm hiện thông tin------------------

 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/chi-tiet-san-pham/${spID}`,{
            timeout: 5000, // Thiết lập thời gian timeout là 5 giây
          });
          
          setSanPham(response.data.data);
          setSizeMauSP(response.data.data2);
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
        }
      };

      fetchData();


      const DanhSachDanhGia = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-danh-gia/${spID}`,{
            timeout: 5000, // Thiết lập thời gian timeout là 5 giây
          });
          setDanhGia(response.data.data);
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
        }
      };
      DanhSachDanhGia();
    }, [spID]);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-binh-luan-cap-mot/${spID}`,{
            timeout: 5000,
          });
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
            <div
            key={index}
            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
            onClick={() => handleSizeChange(size)}
          >
            {size}
          </div>
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
            <div
            key={index}
            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
            onClick={() => handleColorChange(color)}
          >
            {color}
          </div>
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
        timeout: 5000,
        san_pham_id: sanPhamb.id,
        khach_hang_id: khachHang,
        noi_dung: binhLuan,
      })
        .then(function (response) {
          const token = response.data.access_token;
          localStorage.setItem('token', token);
          window.location.href = '/';
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

    const YeuThich = () => {
      const yeuThichItem = {
        id: sanPham.id,
        ten: sanPham.ten,
        gia: sanPham.gia_ban,
        hinh: sanPham.hinh, 
      };
    
      const yeuThich = JSON.parse(localStorage.getItem('favorites')) || [];
    
      const daThemYeuThich = yeuThich.some(item => item.id === yeuThichItem.id);
    
      if (!daThemYeuThich) {
        yeuThich.push(yeuThichItem);
        localStorage.setItem('favorites', JSON.stringify(yeuThich));
        alert('Đã thêm vào danh sách yêu thích');
      } else {
        alert('Sản phẩm đã có trong danh sách yêu thích');
      }
    };
    //-------------------------------

    
    const danhSachDanhGia =  danhGia && Array.isArray(danhGia) ? danhGia.map(function(item){
      return (<>
      <div className="single-comment left">
			  <img src="https://via.placeholder.com/80x80" alt="#" />
			  <div className="content">
				<h4>{item.khach_hang.ho_ten}</h4>
				<p>{item.nhan_xet}</p>
			  </div>
			</div>
      </>)
    }): () =>{
      return (<></>)
    }
    
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
                      
    
                      <form>
                      
                        <div className="row">
                          <div className="col-auto">

                            <ul className="list-inline pb-3">
                              <li className="list-inline-item">Size:</li>
                              <div className="text-muted">
                                {listSize()}
                              </div>
                            </ul>

                          </div>
                          <div className="col-auto">
                            <ul className="list-inline pb-3">
                              <li className="list-inline-item">Màu :</li>
                              <div className="text-muted">
                                {listMau()}
                              </div>
                            </ul>

                           </div>
                    </div>
                    <div className="col-12">
                        <div className="row pb-3">
                        <div className="col d-grid">
        <button type="button" className="btn" onClick={YeuThich}>Yêu Thích</button>
      </div>
                        <div className="col d-grid">
                          <button type="button" onClick={ChonMua} className="btn">Thêm vào giỏ hàng</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <section className="blog-single section">
        <div className="header-inner">
					<div className="container">
          <div className="comments">
            <h3 className="comment-title">Đánh giá </h3>
            {danhSachDanhGia}
          </div>
            </div>
            </div>
           
        </section>
       
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
