import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Hinhnhotrangchitiet from "./Hinhnhotrangchitiet";
import BinhLuan from "./BinhLuan";
import Swal from 'sweetalert2';



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
            timeout: 3000, // Thiết lập thời gian timeout là 3 giây
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

      const storedToken = localStorage.getItem('token');

      if (storedToken !== null) {
        axios.post('http://127.0.0.1:8000/api/me', null, {
          headers: {
            Authorization: 'bearer ' + storedToken,
          },
        }, {
          timeout: 5000,
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

    }, [spID]);

  

    const luuBinhLuan = (event) => {
      
      event.preventDefault();
      
      axios.post('http://127.0.0.1:8000/api/luu-binh-luan', {
        san_pham_id: spID,
        khach_hang_id: khachHang,
        noi_dung: binhLuan,
      }, {
        timeout: 5000,
      })
        .then(function (response) {
          Swal.fire({
            title: "Thành công",
            text: 'bạn đã bính luận',
            icon: "success"
          });
        })
        .catch(function (error) {
          if(error.response.status === 422)
          {
            const {noi_dung, khach_hang_id} = error.response.data.errors;
            if(noi_dung)
            {
              Swal.fire({
                title: "Thất bại",
                text: Object.values(noi_dung).join('') ,
                icon: "error"
              });
            
            }
            if(khach_hang_id)
            {
              Swal.fire({
                title: "Thất bại",
                text: Object.values(khach_hang_id).join('') ,
                icon: "error"
              });
            }
        }
        });
    };






    //-------------HÀM XỬ LÝ-------------------------

    const handleColorChange = (color) => {
      setSelectedColor(color);
    };

    const handleSizeChange = (size) => {
      setSelectedSize(size);
    };

   
    const ChonMua = () => {
      if (!selectedSize || !selectedColor) {
        Swal.fire({
          title: "Thất bại",
          text: 'Vui lòng chọn size và màu trước khi thêm vào giỏ hàng.' ,
          icon: "error"
        });
      
        return;
      }

      const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = existingCartItems.find((item) => item.id === sanPham.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
      const hinhAnhUrl = 'https://via.placeholder.com/550x750';
      if(sanPham.hinh_anh[0])
      {
        hinhAnhUrl = sanPham.hinh_anh[0].url;
      }
      if (existingItem) {
        existingItem.so_luong += 1;
      } else {
        const newCartItem = {
          id: sanPham.id,
          ten: sanPham.ten,
          gia: sanPham.gia_ban,
          hinh: hinhAnhUrl,
          so_luong: 1,
          selectedSize,
          selectedColor,
        };
        existingCartItems.push(newCartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      Swal.fire({

        text:'Thêm sản phẩm vào giỏ hàng thành công',
        icon: "success"
      });
    
    
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



    //------------------------------------------------
    
//------------------thêm vào yêu thích ----------------------------
    const YeuThich = () => {
      const yeuThichItem = {
        id: sanPham.id,
        ten: sanPham.ten,
        gia: sanPham.gia_ban,
        hinh: sanPham.hinh_anh[0].url, 
      };
    
      const yeuThich = JSON.parse(localStorage.getItem('favorites')) || [];
    
      const daThemYeuThich = yeuThich.some(item => item.id === yeuThichItem.id);
    
      if (!daThemYeuThich) {
        yeuThich.push(yeuThichItem);
        localStorage.setItem('favorites', JSON.stringify(yeuThich));
        Swal.fire({
          title: "Yêu thích",
          text:  'Đã thêm vào danh sách yêu thích',
          icon: "success"
        });
      
        
      } else {

        Swal.fire({
          title: "Thất bại",
          text:'Sản phẩm đã có trong danh sách yêu thích',
          icon: "warning"
        });
      
      
      }
    };
    //-------------------------------

    
    const danhSachDanhGia = danhGia && Array.isArray(danhGia) ? (
      <div>
        {danhGia.map(function (item) {
          return (
            <div key={item.id} className="single-comment left">
              <img src="https://via.placeholder.com/80x80" alt="#" />
              <div className="content">
                <h4>{item.khach_hang.ho_ten}</h4>
                <p>{item.nhan_xet}</p>
              </div>
            </div>
          );
        })}
      </div>
    ) : null;



    const HienSao = () =>{
      if(sanPham.so_sao)
      {
        if(sanPham.so_sao <=1)
        {
          return (<>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-secondary"></i>
              <i className="fa fa-star text-secondary"></i>
              <i className="fa fa-star text-secondary"></i>
              <i className="fa fa-star text-secondary"></i>
              <span className="list-inline-item text-dark">Rating {sanPham.so_sao}</span>
          </>)
        }

        if(sanPham.so_sao <= 2)
        {
          return (<>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-secondary"></i>
            <i className="fa fa-star text-secondary"></i>
            <i className="fa fa-star text-secondary"></i>
            <span className="list-inline-item text-dark">Rating {sanPham.so_sao}</span>
        </>)
        }

        if(sanPham.so_sao <= 3)
        {
          return (<>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-secondary"></i>
            <i className="fa fa-star text-secondary"></i>
            <span className="list-inline-item text-dark">Rating {sanPham.so_sao}</span>
        </>)
        }

        if(sanPham.so_sao <= 4)
        {
          
          return (<>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-secondary"></i>
            <span className="list-inline-item text-dark">Rating {sanPham.so_sao}</span>
        </>)
        }

        if(sanPham.so_sao <= 5)
        {
          return (<>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <span className="list-inline-item text-dark">Rating {sanPham.so_sao}</span>
        </>)
        }
      }
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
                       {HienSao()}
                      </p>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <h6>Hãng :</h6>
                        </li>
                        <li className="list-inline-item">
                          <p className="text-muted"><strong>{sanPham.nha_cung_cap?.ten}</strong></p>
                        </li>
                      </ul>
    
                      <h6>Mô tả:</h6>
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

        <form onSubmit={luuBinhLuan} className="form">
          <input
            onChange={(e) => setBinhLuan(e.target.value)}
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
