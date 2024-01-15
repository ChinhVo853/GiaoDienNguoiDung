// Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
		<div className="footer-top section">
			<div className="container">
				<div className="row">
					<div className="col-lg-5 col-md-6 col-12">
						<div className="single-footer about">
							<div className="logo">
								<h3 style={{color: "#fe980f",fontFamily: "monospace" }}>HACHIBA.</h3>
							</div>
							<p className="text">Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue,  magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
							<span className="call"><p>Có câu hỏi? Hãy gọi cho chúng tôi 24/7</p><a href="tel:114">+0123 456 789</a></span>
						</div>
					</div>
					<div className="col-lg-2 col-md-6 col-12">
						<div className="single-footer links">
							<h4 style={{color: "#fe980f",fontFamily: "sans-serif" }}>Thông Tin</h4>
							<ul>
								<li><a >Về chúng tôi</a></li>
								<li><a >Câu hỏi thường gặp</a></li>
								<li><a >Điều khoản &amp; điều kiện</a></li>
								<li><a >Liên hệ chúng tôi</a></li>
								<li><a >Giúp đỡ</a></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2 col-md-6 col-12">
						<div className="single-footer links">
							<h4 style={{color: "#fe980f",fontFamily: "sans-serif" }}>Dịch Vụ Khách Hàng</h4>
							<ul>
								<li><a >Phương thức thanh toán</a></li>
								<li><a >Hoàn tiền</a></li>
								<li><a >Trả lại</a></li>
								<li><a >Đang chuyển hàng</a></li>
								<li><a >Chính sách bảo mật</a></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-12">
						<div className="single-footer social">
							<h4 style={{color: "#fe980f",fontFamily: "sans-serif" }}>Nhận Trong Tuch</h4>
							<div className="contact">
								<ul>
									<li>NO. 342 - London Oxford Street.</li>
									<li>012 United Kingdom.</li>
									<li>info@eshop.com</li>
									<li>+032 3456 7890</li>
								</ul>
							</div>
							<ul>
								<li><a ><i className="ti-facebook"></i></a></li>
								<li><a ><i className="ti-twitter"></i></a></li>
								<li><a ><i className="ti-flickr"></i></a></li>
								<li><a ><i className="ti-instagram"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="copyright">
			<div className="container">
				<div className="inner">
					<div className="row">
						<div className="col-lg-6 col-12">
							<div className="left">
								<span>Copyright © 2020 <a href="http://www.wpthemesgrid.com" target="_blank">Wpthemesgrid</a>  -  All Rights Reserved.</span>
							</div>
						</div>
						<div className="col-lg-6 col-12">
							<div className="right">
								<img src="images/payments.png" alt="#"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
  );
};

export default Footer;
