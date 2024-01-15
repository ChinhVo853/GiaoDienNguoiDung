import React, { useEffect, useState } from 'react';
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
    
  
    // Biến đếm để kiểm soát số lần gửi yêu cầu
    let requestCount = 0;
  
    // Hàm để thực hiện yêu cầu dữ liệu
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chi-tiet-san-pham/${spID}`, {
          timeout: 3000,
        });
  
        setSanPham(response.data.data);
        setSizeMauSP(response.data.data2);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };
  
    // Hàm để thực hiện yêu cầu danh sách đánh giá
    const danhSachDanhGia = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-danh-gia/${spID}`, {
          timeout: 5000,
        });
  
        setDanhGia(response.data.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu danh sách đánh giá:', error);
      }
    };
  
    // Kiểm tra số lần gửi yêu cầu trước khi thực hiện
    if (requestCount < 1) {
      fetchData(); // Thực hiện yêu cầu dữ liệu
      danhSachDanhGia(); // Thực hiện yêu cầu danh sách đánh giá
      requestCount++; // Tăng số lần gửi yêu cầu
    }
  
  }, [spID]); // Chỉ gửi lại yêu cầu khi giá trị của spID thay đổi
  


  useEffect(() => {
    // Biến cờ để kiểm tra xem đã thực hiện yêu cầu hay chưa
    let isDataFetched = false;
  
    // Hàm để thực hiện yêu cầu danh sách bình luận cấp 1
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-binh-luan-cap-mot/${spID}`, {
          timeout: 5000,
        });
        setDanhSachBinhLuan(response.data.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu danh sách bình luận:', error);
      }
    };
  
    // Hàm để thực hiện yêu cầu thông tin người dùng
    const fetchUserInfo = async () => {
      const storedToken = localStorage.getItem('token');
  
      if (storedToken !== null) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/me', null, {
            headers: {
              Authorization: 'bearer ' + storedToken,
            },
          }, {
            timeout: 5000,
          });
          setKhachHang(response.data.id);
        } catch (error) {
          console.error('Lỗi khi tải thông tin người dùng:', error);
        }
      } else {
        console.log('Token không tồn tại');
      }
    };
  
    // Kiểm tra xem đã thực hiện yêu cầu hay chưa
    if (isDataFetched == false) {
      fetchData(); // Thực hiện yêu cầu danh sách bình luận
      fetchUserInfo(); // Thực hiện yêu cầu thông tin người dùng
      isDataFetched = true; // Đặt cờ là đã thực hiện yêu cầu
    }
  
  }, [spID]);
  

  

    //hàm có tác dụng lưu bình luận cấp 1 
    //còn bình luận cấp 2 thì được viết ở file khác
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

    //có tác dụng lưu màu mà khách hàng chọn vào trong selectedColor
    const handleColorChange = (color) => {
      setSelectedColor(color);
    };


    //có tác dụng lưu size mà khách hàng chọn vào trong selectedSize
    const handleSizeChange = (size) => {
      setSelectedSize(size);
    };

  
    //đây là hàm lưu sản phẩm vào trong giỏ hàng
    const ChonMua = () => {
      if(storedToken===null)
      {
        Swal.fire({
        title: "Thất bại",
        text: 'Vui lòng đăng nhập.' ,
        icon: "error"
      });
      return;

      }
      if (!selectedSize || !selectedColor) {
        Swal.fire({
          title: "Thất bại",
          text: 'Vui lòng chọn size và màu trước khi thêm vào giỏ hàng.' ,
          icon: "error"
        });
      
        return;
      }

      //có tác dụng tạo 1 biến là mảng lấy thông tin là mảng rổng hoặc localStorege có tên là cartItems nếu đã tồn tại
      let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      //kiểm tra xem trong giở hàng đã có sản phẩm mà khách hàng đã chọn chưa kiểm tra bao gồm:
      //id, màu, size
      let existingItem = existingCartItems.find((item) => item.id === sanPham.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
      //biến được gán mặc định
      let hinhAnhUrl = 'https://via.placeholder.com/550x750';
      //kiểm tra xem trong sản phẩm mà mình lấy được từ server có tồn tại chưa
      //nếu có thì hinhAnhUrl sẽ được gán lại
      if(sanPham.hinh_anh[0])
      {
        hinhAnhUrl = sanPham.hinh_anh[0].url;
      }

      //kiểm tra xem existingItem mà mình đã kiểm tra trước đó nếu có tồn tịa thì số lượng sản phẩm trong đó tăng 1
      //nếu ko tồn tại thì sẽ tạo ra thêm 1 sản phẩm đucowj lưu trong localStore
      if (existingItem) {
        existingItem.so_luong += 1;
      } else {
        //biến này là sản phẩm mới
        const newCartItem = {
          id: sanPham.id,
          ten: sanPham.ten,
          gia: sanPham.gia_ban,
          hinh: hinhAnhUrl,
          so_luong: 1,
          selectedSize,
          selectedColor,
        };
        //thêm sản phẩm mới vào mảng existingCartItems
        existingCartItems.push(newCartItem);
      }
      // lưu existingCartItems vào trong localStore
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      Swal.fire({

        text:'Thêm sản phẩm vào giỏ hàng thành công',
        icon: "success"
      });
    
    
    };

    //đây là nơi hiển thị các size trên trang để người dùng có thể chọn
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

        //đây là nơi hiển thị các màu trên trang để người dùng có thể chọn

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

    //----------------------------------------------------------------------------------

    
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
    //hiển thị danh sách đánh giá cho người dúng xem
    const danhSachDanhGia = danhGia && Array.isArray(danhGia) && danhGia.length > 0? (
      <div>
        {danhGia.map(function (item) {
          console.log(item);
          return (
            <div key={item.id} className="single-comment left">
              {item.khach_hang && item.khach_hang.avatar ? (
						<img src={`http://localhost:8000/avatar/` + item.khach_hang.avatar} alt="#" />
					) : (
						<img src="https://via.placeholder.com/80x80" alt="#" />
					)}
              <div className="content">
                <h4>{item.khach_hang.ho_ten}</h4>
                <p>{item.so_sao}  <i className="fa fa-star text-warning"></i></p>
                <p>{item.nhan_xet}</p>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <h3>Không có đánh giá</h3>
    );



    //đây là noi hiển thị số sao cảu sản phẩm
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
