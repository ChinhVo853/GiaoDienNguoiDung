import { NavLink } from "react-router-dom";
import { useState } from "react";
import Timkiemsanpham from "../REDUCER/Timkiemsanpham";

function Head(){
	const [thanhTimKiem,setThanhTimKiem] = useState(''); 


	// Kiểm tra xem token có tồn tại hay không
	const storedToken = localStorage.getItem('token');
	
	const logoutHandler = () => {
		localStorage.removeItem('token'); //lệnh để xoá localStorage
		window.location.href = '/';
	}


	const dangNhap =  () => {
	if(storedToken==null)
	{
			return (
				<>
				<i className="ti-power-off"></i><NavLink to="DANGNHAP" className="Nav-Link active">ĐĂNG NHẬP</NavLink>/
				<NavLink to="DANGKY" className="Nav-Link active">ĐĂNG KÝ</NavLink>
				</>
			);
		
	}
	return (<>
	<i className="ti-power-off"><NavLink onClick={logoutHandler} className="Nav-Link active">ĐĂNG XUẤT</NavLink></i>
	</>);
}







    return(
        <>

	<header className="header shop">

		<div className="topbar">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-12 col-12">
				
						<div className="top-left">
							<ul className="list-main">
								<li><i className="ti-headphone-alt"></i> +060 (800) 801-582</li>
								<li><i className="ti-email"></i> support@shophub.com</li>
							</ul>
						</div>
					
					</div>
					<div className="col-lg-8 col-md-12 col-12">
			
						<div className="right-content">
							<ul className="list-main">
								<li><i className="ti-location-pin"></i> Store location</li>

		
								<li><i className="ti-alarm-clock"></i> Daily deal</li>
								<li><i className="ti-user"></i>My account</li>
								<li><i className="ti-power-off"></i><NavLink to="/DANGNHAP" className="Nav-Link active">ĐĂNG NHẬP</NavLink>/
								<NavLink to="/DANGKY" className="Nav-Link active">ĐĂNG KÝ</NavLink></li>

								<li>{dangNhap()}</li>

							</ul>
						</div>
		
					</div>
				</div>
			</div>
		</div>

		<div className="middle-inner">
			<div className="container">
				<div className="row">
					<div className="col-lg-2 col-md-2 col-12">
					
						<div className="logo">
							<NavLink to="/"><img src="LOGOHACHIBA03.png" alt="logo"/></NavLink>
						</div>
					
						<div className="search-top">
							<div className="top-search"><i className="ti-search"></i></div>
						
							<div className="search-top">
								<form className="search-form">
									<input type="text" placeholder="Search here..." name="search"/>
									<button value="search" type="submit"><i className="ti-search"></i></button>
								</form>
							</div>
						
						</div>
			
						<div className="mobile-nav"></div>
					</div>
					<div className="col-lg-8 col-md-7 col-12">
						<div className="search-bar-top">
							<div className="search-bar">
								<form>
									<input onChange={(e) => setThanhTimKiem(e.target.value)} name="search" placeholder="Search Products Here....." type="search"/>

									<NavLink to={`/TimKiem/${thanhTimKiem}`}><button className="btnn"><i className="ti-search"></i></button></NavLink>
									
								</form>
							</div>
						</div>
					</div>
					<div className="col-lg-2 col-md-3 col-12">
						<div className="right-bar">
				
							<div className="sinlge-bar">

								<div  className="single-icon"><i className="fa fa-heart-o" aria-hidden="true"></i></div>
							</div>
							<div className="sinlge-bar">
								<div  className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
							</div>
							<div className="sinlge-bar shopping">
								<NavLink  to="/GioHang"  className="single-icon" ><i className="ti-bag"></i> </NavLink>
					
								

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