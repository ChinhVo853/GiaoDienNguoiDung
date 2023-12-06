

function Menu()
{
    return(
        <>
       <header className="header shop">
			
			
			<div className="header-inner">
				<div className="container">
					<div className="cat-nav-head">
						<div className="row">
							<div className="col-12">
								<div className="menu-area">
									<nav className="navbar navbar-expand-lg">
										<div className="navbar-collapse">	
											<div className="nav-inner">	
												<ul className="nav main-menu menu navbar-nav">

													<li className="active"><a>Home</a></li>
													<li><a >Product</a></li>												
													<li><a >Service</a></li>
													<li><a >Shop<i className="ti-angle-down"></i><span className="new">New</span></a>
														<ul className="dropdown">
															<li><a >Shop Grid</a></li>
															<li><a >Cart</a></li>
															<li><a >Checkout</a></li>
														</ul>
													</li>
													<li><a >Pages</a></li>									
													<li><a>Blog<i className="ti-angle-down"></i></a>
														<ul className="dropdown">
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

}

export default Menu;
