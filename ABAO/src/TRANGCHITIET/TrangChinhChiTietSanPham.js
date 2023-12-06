import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Hinhnhotrangchitiet from "./Hinhnhotrangchitiet";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

function TrangChinhChiTietSanPham(){
    const [sanPham, setSanPham] = useState([]);
    let { spID } = useParams();
  
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
  
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      alert('Thêm sản phẩm vào giỏ hàng thành công');
    };

     

      //------------------------------------------------
    return(
    <>
    <Head/>
    <Menu/>
    <section className="bg-light">
        <div className="container pb-5">
            <div className="row">

            <div className="col-lg-5 mt-5">
            <div className="row">
                <Hinhnhotrangchitiet hinh={sanPham}/>
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

                            <h6>Specification:</h6>
                            <ul className="list-unstyled pb-3">
                                <li>Lorem ipsum dolor sit</li>
                                <li>Amet, consectetur</li>
                                <li>Adipiscing elit,set</li>
                                <li>Duis aute irure</li>
                                <li>Ut enim ad minim</li>
                                <li>Dolore magna aliqua</li>
                                <li>Excepteur sint</li>
                            </ul>

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
            </div>
        </div>
    </section>
    <Footer/>
    </>
    );
}
export default TrangChinhChiTietSanPham;