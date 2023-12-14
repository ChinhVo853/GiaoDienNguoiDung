import Danhsach from "./Danhsach";
import Nutxemthem from "./Nutxemthem";
import { useState,useEffect } from "react";
import axios from "axios";

function Danhmuc()
{
	//---------các state ---------------------

	//lưu danh sách các sản phẩm
	const [dsSanPham,setdsSanPham]= useState([]);


	//-------------------------đây là gọi API dsSanPham sẽ được thay đổi ở đây--------------------------

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/danh-sach-san-pham');
				setdsSanPham(response.data.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
	
		fetchData();
	}, []); // Thêm dispatch vào dependency array
	
	

    return(
        <>
        <div className="product-area section">
            <div className="container">
				<div className="row">
					<div className="col-12">
						<div className="section-title">
							<h2>Các Sản Phẩm Mới</h2>
						</div>
					</div>
				</div>
                <div className="row">
					<div className="col-12">
						<div className="product-info">
							<div className="nav-main">
								{/*
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#aothun" role="tab">ÁO THUN</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#aokhoac" role="tab">ÁO KHOÁC</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#hoodie" role="tab">HOODIE</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#quan" role="tab">QUẦN</a></li>
									 <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#accessories" role="tab">Accessories</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#essential" role="tab">Essential</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#prices" role="tab">Prices</a></li> 
								</ul>*/}
								<div className="tab-content" id="myTabContent">
								<Danhsach data={dsSanPham}/>
								</div>
								
							</div>
                        </div>
                    </div>
                </div>
            </div>
			
        </div>

        </>
    );
}
export default Danhmuc;