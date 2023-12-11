import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Hinhnhotrangchitiet from "./Hinhnhotrangchitiet";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import BinhLuan from "./BinhLuan";

const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
};

function TrangChinhChiTietSanPham() {
  const [sanPham, setSanPham] = useState({});
  const [sizeMauSP, setSizeMauSP] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  let { spID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chi-tiet-san-pham/${spID}`);
        console.log(response.data);
        setSanPham(response.data.data);
        setSizeMauSP(response.data.data2);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);

function TrangChinhChiTietSanPham(){
    //tao bien luu du lieu vao axios
    const [sanPham, setSanPham] = useState([]);
    const [khachHang, setKhachHang]=useState('');
    const[danhSachBinhLuan, setDanhSachBinhLuan]=useState([]);
    //-------------------------------
    let { spID } = useParams();
    
    const [binhLuan,setBinhLuan]=useState('');
    const luuBinhLuan = (event) => {
        event.preventDefault();
        //-------------------goi ham luu bình luận-------------
        axios.post('http://127.0.0.1:8000/api/luu-binh-luan', {
            san_pham_id:sanPham.id,
            khach_hang_id:khachHang,
            noi_dung:binhLuan,
        })
        //------------------kết quả trả về từ api--------------
        .then(function (response) {
          
          const token = response.data.access_token;
          localStorage.setItem('token', token);
          window.location.href = '/';
        })
        .catch(function (error) {
          console.error('Error during login request:', error);
         
        });
      }
    
      //---------------------hàm hiện thông tin------------------
    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/chi-tiet-san-pham/${spID}`);
          setSanPham(response.data.data);
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
        }
      };
  
      fetchData();
    }, []);
    
      //---------------------hàm hiện thông tin------------------

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
      }, []);



    const ChonMua = () => {
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = existingCartItems.find((item) => item.id === sanPham.id);
  
      if (existingItem) {
        // Product is already in the cart, increase the quantity
        existingItem.so_luong += 1;
      } else {
        // Product is not in the cart, add it
        const newCartItem = { id: sanPham.id, ten: sanPham.ten, gia: sanPham.gia_ban, so_luong: 1 };
        existingCartItems.push(newCartItem);
      }
    };

    fetchData();
  }, [spID]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const groupedSizeMauSP = groupBy(sizeMauSP, 'id');

  const ChonMua = () => {
    if (!selectedSize || !selectedColor) {
      alert('Vui lòng chọn size và màu trước khi thêm vào giỏ hàng.');
      return;
    }

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = existingCartItems.find((item) => item.id === sanPham.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);

    if (existingItem) {
      // Product is already in the cart, increase the quantity
      existingItem.so_luong += 1;
    } else {
      // Product is not in the cart, add it with size and color
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

  return (


    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        const storedToken = localStorage.getItem('token');
       
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me',null, {
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
      const dsBinhLuan = danhSachBinhLuan.map(function(item, index) {
        return (
            <>
            {item.noi_dung}

            </>
        );
      });
      
    return(

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
                                <p className="text-muted"><strong>{sanPham.nha_cung_cap_id}</strong></p>

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

                            <form action="" method="GET">
                                <input type="hidden" name="product-title" value="Activewear"/>
                                <div className="row">
                                    <div className="col-auto">
                                        <ul className="list-inline pb-3">
                                            <li className="list-inline-item">Size :
                                                <input type="hidden" name="product-size" id="product-size" value="S"/>
                                            </li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">S</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">M</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">L</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">XL</span></li>
                                        </ul>
                                    </div>
                                        <div className="col-auto">
                                        <div className="product-color">
        
 
                                            <div className="color-choose">
                                                
                                            <div><a>Color :</a>
                                                <input data-image="red" type="radio" id="red" name="color" value="red" />
                                                <label htmlFor="red"><span></span></label>
                                            </div>
                                            <div>
                                                <input data-image="blue" type="radio" id="blue" name="color" value="blue"/>
                                                <label htmlFor="blue"><span></span></label>
                                            </div>
                                            <div>
                                                <input data-image="black" type="radio" id="black" name="color" value="black"/>
                                                <label htmlFor="black"><span></span></label>
                                            </div>
                                            </div>
                                    
                                        </div>
                                    </div>
                                    
                                        <ul className="list-inline pb-3">
                                            <li className="list-inline-item text-right">
                                                Quantity
                                                <input type="hidden" name="product-quanity" id="product-quanity" value="1"/>
                                            </li>
                                            <li className="list-inline-item"><span className="btn btn-success" id="btn-minus">-</span></li>
                                            <li className="list-inline-item"><span className="badge bg-secondary" id="var-value">1</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success" id="btn-plus">+</span></li>
                                        </ul>
                                    
                                </div>
                                <div className="col-12">
                                    <div className="row pb-3">
                                        <div className="col d-grid">
                                            <button type="submit" className="btn " name="submit" >Buy</button>
                                        </div>
                                        <div className="col d-grid">
                                            <button onClick={ChonMua}  className="btn " >Add To Cart</button>
                                        </div>

                                    </div>
                                </div>
                            </form>

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
      <Footer />

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
    </section>
    <Footer/>
    </>
  );
}

export default TrangChinhChiTietSanPham;
