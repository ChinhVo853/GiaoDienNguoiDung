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
							<span className="call">Got Question? Call us 24/7<a href="tel:114">+0123 456 789</a></span>
						</div>
					</div>
					<div className="col-lg-2 col-md-6 col-12">
						<div className="single-footer links">
							<h4 style={{color: "#fe980f",fontFamily: "sans-serif" }}>Information</h4>
							<ul>
								<li><a >About Us</a></li>
								<li><a >Faq</a></li>
								<li><a >Terms &amp; Conditions</a></li>
								<li><a >Contact Us</a></li>
								<li><a >Help</a></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2 col-md-6 col-12">
						<div className="single-footer links">
							<h4 style={{color: "#fe980f",fontFamily: "sans-serif" }}>Customer Service</h4>
							<ul>
								<li><a >Payment Methods</a></li>
								<li><a >Money-back</a></li>
								<li><a >Returns</a></li>
								<li><a >Shipping</a></li>
								<li><a >Privacy Policy</a></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-12">
						<div className="single-footer social">
							<h4 style={{color: "#fe980f",fontFamily: "sans-serif" }}>Get In Tuch</h4>
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
