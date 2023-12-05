import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";


function GioHang(){

import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function GioHang() {
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const updateCart = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, so_luong: newQuantity >= 0 ? newQuantity : 0 } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.gia * item.so_luong;
    }, 0);

    return total;
  };

    return(
        <>
        <Head/>
        <Menu/>


        <div class="shopping-cart section">
		<div class="container">
			<div class="row">
				<div class="col-12">
					
					<table className="table shopping-summery">
						<thead>
							<tr class="main-hading">
								<th>PRODUCT</th>
								<th>NAME</th>
								<th class="text-center">UNIT PRICE</th>
								<th class="text-center">QUANTITY</th>
								<th class="text-center">TOTAL</th> 
								<th class="text-center"><i class="ti-trash remove-icon"></i></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="image" data-title="No"><img src="https://via.placeholder.com/100x100" alt="#"/></td>
								<td class="product-des" data-title="Description">
									<p class="product-name"><a href="#">Women Dress</a></p>
									<p class="product-des">Maboriosam in a tonto nesciung eget  distingy magndapibus.</p>
								</td>
								<td class="price" data-title="Price"><span>$110.00 </span></td>
								<td class="qty" data-title="Qty">
									<div class="input-group">
										<div class="button minus">
											<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
												<i class="ti-minus"></i>
											</button>
										</div>
										<input type="text" name="quant[1]" class="input-number" data-min="1" data-max="100" value="1"/>
										<div class="button plus">
											<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
												<i class="ti-plus"></i>
											</button>
										</div>
									</div>
									
								</td>
								<td class="total-amount" data-title="Total"><span>$220.88</span></td>
								<td class="action" data-title="Remove"><a href="#"><i class="ti-trash remove-icon"></i></a></td>
							</tr>
							<tr>
								<td class="image" data-title="No"><img src="https://via.placeholder.com/100x100" alt="#"/></td>
								<td class="product-des" data-title="Description">
									<p class="product-name"><a href="#">Women Dress</a></p>
									<p class="product-des">Maboriosam in a tonto nesciung eget  distingy magndapibus.</p>
								</td>
								<td class="price" data-title="Price"><span>$110.00 </span></td>
								<td class="qty" data-title="Qty">
									<div class="input-group">
										<div class="button minus">
											<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[2]">
												<i class="ti-minus"></i>
											</button>
										</div>
										<input type="text" name="quant[2]" class="input-number" data-min="1" data-max="100" value="2"/>
										<div class="button plus">
											<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[2]">
												<i class="ti-plus"></i>
											</button>
										</div>
									</div>
								</td>
								<td class="total-amount" data-title="Total"><span>$220.88</span></td>
								<td class="action" data-title="Remove"><a href="#"><i class="ti-trash remove-icon"></i></a></td>
							</tr>
							<tr>
								<td class="image" data-title="No"><img src="https://via.placeholder.com/100x100" alt="#"/></td>
								<td class="product-des" data-title="Description">
									<p class="product-name"><a href="#">Women Dress</a></p>
									<p class="product-des">Maboriosam in a tonto nesciung eget  distingy magndapibus.</p>
								</td>
								<td class="price" data-title="Price"><span>$110.00 </span></td>
								<td class="qty" data-title="Qty">
									<div class="input-group">
										<div class="button minus">
											<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[3]">
												<i class="ti-minus"></i>
											</button>
										</div>
										<input type="text" name="quant[3]" class="input-number" data-min="1" data-max="100" value="3"/>
										<div class="button plus">
											<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[3]">
												<i class="ti-plus"></i>
											</button>
										</div>
									</div>
								</td>
								<td class="total-amount" data-title="Total"><span>$220.88</span></td>
								<td class="action" data-title="Remove"><a href="#"><i class="ti-trash remove-icon"></i></a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="total-amount">
						<div class="row">
							<div class="col-lg-8 col-md-5 col-12">
								<div class="left">
									<div class="coupon">
										<form action="#" target="_blank">
											<input name="Coupon" placeholder="Enter Your Coupon"/>
											<button class="btn">Apply</button>
										</form>
									</div>
									<div class="checkbox">
										<label class="checkbox-inline" for="2"><input name="news" id="2" type="checkbox"/> Shipping (+10$)</label>
									</div>
								</div>
							</div>
							<div class="col-lg-4 col-md-7 col-12">
								<div class="right">
									<ul>
										<li>Cart Subtotal<span>$330.00</span></li>
										<li>Shipping<span>Free</span></li>
										<li>You Save<span>$20.00</span></li>
										<li class="last">You Pay<span>$310.00</span></li>
									</ul>
									<div class="button5">
										<a href="#" class="btn">Checkout</a>
										<a href="#" class="btn">Continue shopping</a>
      <div className="shopping-cart section">
		<div className="container">
			<div className="row">
				<div className="col-12">
					
					<Table className="table shopping-summery">
						<thead>
							<tr className="main-hading">
								
								<th>PRODUCT</th>
								<th>NAME</th>
								<th className="text-center">COLOR</th>
								<th className="text-center">SIZE</th>
								<th className="text-center">PRICE</th>

								<th className="text-center">QUANTITY</th>

								<th className="text-center">TOTAL</th> 
								<th className="text-center"><i className="ti-trash remove-icon"></i></th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
							<tr>
							 {/* {cartItems.map((item) => (
								<tr key={item.id}>
								<th scope="row">{item.id}</th>
								<td>{item.ten}</td>
								<td>{item.gia}</td>
								<td>
									<button onClick={() => updateCart(item.id, item.so_luong - 1)}>-</button>
									{item.so_luong}
									<button onClick={() => updateCart(item.id, item.so_luong + 1)}>+</button>
								</td>
								</tr>
							))}  */}
						
								
								<td className="image" data-title="No"><img src="https://via.placeholder.com/100x100" alt="#"/></td>

								<td className="product-des" data-title="Description">
									<p className="product-name"><a >{item.ten}</a></p>
								</td>
								<td>
									<p className="product-name"><a >BLACK</a></p>
								</td>
								<td>
									<p className="product-name"><a href="#">L</a></p>
								</td>
								<td className="price" data-title="Price"><span>{item.gia} </span></td>
								<td className="qty" data-title="Qty">
									<div className="input-group">
										
										<button onClick={() => updateCart(item.id, item.so_luong - 1)}>-</button>
										<a>{item.so_luong}</a>
										
										
										<button onClick={() => updateCart(item.id, item.so_luong + 1)}>+</button>

										
									</div>
									
								</td>
								<td className="total-amount" data-title="Total"><span>{item.gia * item.so_luong}</span>
</td>
								<td className="action" data-title="Remove">
                        <button onClick={() => removeItemFromCart(item.id)}>
                          <i className="ti-trash remove-icon"></i>
                        </button>
                      </td>
							</tr>
							
						))} 
						</tbody>
					</Table>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="total-amount">
						<div className="row">
							<div className="col-lg-8 col-md-5 col-12">
								<div className="left">
									<div className="coupon">
										<form action="#" target="_blank">
											<input name="Coupon" placeholder="Enter Your Coupon"/>
											<button className="btn">Apply</button>
										</form>
									</div>
									<div className="checkbox">
										<label className="checkbox-inline" for="2"><input name="news" id="2" type="checkbox"/> Shipping (+10$)</label>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-7 col-12">
								<div className="right">
									<ul>
									<li>Cart Subtotal<span>{calculateTotal()} VNĐ</span></li>
                <li>Shipping<span>Free</span></li>
									</ul>
									<div className="button5">
										<a href="#" className="btn">Checkout</a>
										<a href="#" className="btn">Continue shopping</a>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

        <Footer/>
        </>
    );
}
export default GioHang;