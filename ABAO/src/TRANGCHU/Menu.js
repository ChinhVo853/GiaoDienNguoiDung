<<<<<<< Updated upstream
function Menu() {
  return (
    <>
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item"><a className="nav-link" href="/">TRANG CHỦ</a></li>
          <li className="nav-item">
            <a className="nav-link">SẢN PHẨM</a>
            <div className="dropdown-content">
              <a>ÁO THUN</a>
              <a>ÁO KHOÁC</a>
              <a>HOODIE</a>
              <a>QUẦN</a>
            </div>
          </li>
          <li className="nav-item"><a className="nav-link" href="/">GIỚI THIỆU</a></li>
        </ul>
      </nav>
    </>
  );
=======
function Menu()
{
    return(
        <>
       <header class="header shop">
			
			
			<div class="header-inner">
				<div class="container">
					<div class="cat-nav-head">
						<div class="row">
							<div class="col-12">
								<div class="menu-area">
									<nav class="navbar navbar-expand-lg">
										<div class="navbar-collapse">	
											<div class="nav-inner">	
												<ul class="nav main-menu menu navbar-nav">
													<li class="active"><a>Home</a></li>
													<li><a >Product</a></li>												
													<li><a >Service</a></li>
													<li><a >Shop<i class="ti-angle-down"></i><span class="new">New</span></a>
														<ul class="dropdown">
															<li><a >Shop Grid</a></li>
															<li><a >Cart</a></li>
															<li><a >Checkout</a></li>
														</ul>
													</li>
													<li><a >Pages</a></li>									
													<li><a>Blog<i class="ti-angle-down"></i></a>
														<ul class="dropdown">
															<li><a >Blog Single Sidebar</a></li>
														</ul>
													</li>
													<li><a >Contact Us</a></li>
												</ul>
											</div>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
        </>
    );
>>>>>>> Stashed changes
}

export default Menu;
