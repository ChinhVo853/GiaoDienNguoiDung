// YeuThich.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../TRANGCHU/Footer';
import Head from '../TRANGCHU/Head';
import Menu from '../TRANGCHU/Menu';

function YeuThich() {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteItems(storedFavorites);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favoriteItems.filter(item => item.id !== id);
    setFavoriteItems(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  console.log(favoriteItems)
  return (
    <>
      <Head />
      <Menu />

      <div className="favorite-items section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Danh sách sản phẩm yêu thích</h2>
              <div className="row">
                {favoriteItems.length === 0 ? (
                  <p>Không có sản phẩm nào trong danh sách yêu thích.</p>
                ) : (
                  favoriteItems.map((item) => (
                   
                    <div key={item.id} className="col-xl-3 col-lg-4 col-md-4 col-12">
                      <div className="single-product">
                        <div className="product-img">
                        <NavLink to={`/ChiTiet/${item.id}`} className="Nav-Link active">
                          <img src={`http://localhost:8000/` + item.hinh} alt={item.ten} />
                          </NavLink>
                        </div>
                        <div className="product-content">
                          <p>{item.ten}</p>
                          <p>{item.gia} VNĐ</p>
                          <button className="btn" onClick={() => handleRemoveFavorite(item.id)}>Xóa</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="button-container">
                <NavLink to="/" className="btn">
                  Tiếp tục mua hàng
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default YeuThich;
