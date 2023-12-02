import { NavLink } from "react-router-dom";
function Head(){
    return(
        <>

	<header class="header shop">

		<div class="topbar">
			<div class="container">
				<div class="row">
					<div class="col-lg-4 col-md-12 col-12">
				
						<div class="top-left">
							<ul class="list-main">
								<li><i class="ti-headphone-alt"></i> +060 (800) 801-582</li>
								<li><i class="ti-email"></i> support@shophub.com</li>
							</ul>
						</div>
					
					</div>
					<div class="col-lg-8 col-md-12 col-12">
			
						<div class="right-content">
							<ul class="list-main">
								<li><i class="ti-location-pin"></i> Store location</li>
								<li><i class="ti-alarm-clock"></i> <a href="#">Daily deal</a></li>
								<li><i class="ti-user"></i> <a href="#">My account</a></li>
								<li><i class="ti-power-off"></i><NavLink to="DANGNHAP" className="Nav-Link active"><a>ĐĂNG NHẬP</a></NavLink>/
								<NavLink to="DANGKY" className="Nav-Link active"><a>ĐĂNG KÝ</a></NavLink></li>
							</ul>
						</div>
		
					</div>
				</div>
			</div>
		</div>

		<div class="middle-inner">
			<div class="container">
				<div class="row">
					<div class="col-lg-2 col-md-2 col-12">
					
						<div class="logo">
							<a href="#"><img src="LOGOHACHIBA03.png" alt="logo"/></a>
						</div>
					
						<div class="search-top">
							<div class="top-search"><a href="#0"><i class="ti-search"></i></a></div>
						
							<div class="search-top">
								<form class="search-form">
									<input type="text" placeholder="Search here..." name="search"/>
									<button value="search" type="submit"><i class="ti-search"></i></button>
								</form>
							</div>
						
						</div>
			
						<div class="mobile-nav"></div>
					</div>
					<div class="col-lg-8 col-md-7 col-12">
						<div class="search-bar-top">
							<div class="search-bar">
								<form>
									<input name="search" placeholder="Search Products Here....." type="search"/>
									<button class="btnn"><i class="ti-search"></i></button>
								</form>
							</div>
						</div>
					</div>
					<div class="col-lg-2 col-md-3 col-12">
						<div class="right-bar">
				
							<div class="sinlge-bar">
								<a href="#" class="single-icon"><i class="fa fa-heart-o" aria-hidden="true"></i></a>
							</div>
							<div class="sinlge-bar">
								<a href="#" class="single-icon"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
							</div>
							<div class="sinlge-bar shopping">
								<a href="#" class="single-icon"><i class="ti-bag"></i> <span class="total-count">2</span></a>
					
								<div class="shopping-item">
									<div class="dropdown-cart-header">
										<span>2 Items</span>
										<a href="#">View Cart</a>
									</div>
									<ul class="shopping-list">
										<li>
											<a href="#" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
											<a class="cart-img" href="#"><img src="https://via.placeholder.com/70x70" alt="#"/></a>
											<h4><a href="#">Woman Ring</a></h4>
											<p class="quantity">1x - <span class="amount">$99.00</span></p>
										</li>
										<li>
											<a href="#" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
											<a class="cart-img" href="#"><img src="https://via.placeholder.com/70x70" alt="#"/></a>
											<h4><a href="#">Woman Necklace</a></h4>
											<p class="quantity">1x - <span class="amount">$35.00</span></p>
										</li>
									</ul>
									<div class="bottom">
										<div class="total">
											<span>Total</span>
											<span class="total-amount">$134.00</span>
										</div>
										<a href="checkout.html" class="btn animate">Checkout</a>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		

	</header>

	
        </>
    );
}
export default Head;