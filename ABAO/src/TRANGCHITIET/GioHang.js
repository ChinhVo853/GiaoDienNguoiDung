import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
function GioHang() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const updateCart = (itemId, selectedSize, selectedColor, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
        ? { ...item, so_luong: newQuantity >= 0 ? newQuantity : 0 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (itemId, selectedSize, selectedColor) => {
    const updatedCart = cartItems.filter((item) => !(item.id === itemId && item.selectedSize === selectedSize && item.selectedColor === selectedColor));
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.gia * Number(item.so_luong);
    }, 0);

    return total;
  };

  return (
    <>
      <Head />
      <Menu />

      <div className="shopping-cart section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {cartItems.length === 0 ? (
                <p>Bạn chưa có sản phẩm trong giỏ hàng.</p>
              ) : (
                <Table className="table shopping-summery">
                  <thead>
                    <tr className="main-hading">
                      <th>Sản phẩm</th>
                      <th>Tên</th>
                      <th className="text-center">Màu</th>
                      <th className="text-center">Size</th>
                      <th className="text-center">Giá</th>
                      <th className="text-center">Số lượng</th>
                      <th className="text-center">Tổng</th>
                      <th className="text-center">
                        <i className="ti-trash remove-icon"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                        <td className="image" data-title="No">

                         <img src={`http://localhost:8000/` + item.hinh} alt={item.ten} />
                        </td>
                        <td className="product-des" data-title="Description">
                          <p className="product-name">
                            <a>{item.ten}</a>
                          </p>
                        </td>
                        <td>
                          <p className="product-name">
                            <span>{item.selectedColor}</span>
                          </p>
                        </td>
                        <td>
                          <p className="product-name">
                            <span>{item.selectedSize}</span>
                          </p>
                        </td>
                        <td className="price" data-title="Price">
                          <span>{item.gia} </span>
                        </td>
                        <td className="qty" data-title="Qty" style={{textAlign: 'center'}}>
                          <div className="input-group">
                            <button onClick={() => updateCart(item.id, item.selectedSize, item.selectedColor, item.so_luong - 1)}>-</button>
                            <a style={{margin: '0 10px'}}>{item.so_luong}</a>
                            <button onClick={() => updateCart(item.id, item.selectedSize, item.selectedColor, item.so_luong + 1)}>+</button>
                          </div>
                        </td>
                        <td className="total-amount" data-title="Total">
                          <span>{item.gia * item.so_luong}</span>
                        </td>
                        <td className="action" data-title="Remove">
                          <button onClick={() => removeItemFromCart(item.id, item.selectedSize, item.selectedColor)}>
                            <i className="ti-trash remove-icon"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className="row">
              <div className="col-12">
                <div className="total-amount">
                  <div className="row">
                    <div className="col-lg-8 col-md-5 col-12">
                      <div className="left"></div>
                    </div>
                    <div className="col-lg-4 col-md-7 col-12">
                      <div className="right">
                        <ul>
                          <li>
                            Thành tiền<span>{calculateTotal()} VNĐ</span>
                          </li>
                        </ul>
                        <div className="button5">
                          <NavLink to={{ pathname: "/ThanhToan", state: { cartItems, total: calculateTotal() } }} className="btn">
                            Đặt hàng
                          </NavLink>
                          <NavLink to="/" className="btn">
                            Tiếp tục mua hàng
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default GioHang;
