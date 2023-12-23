import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


function BinhLuan() {
	//--------------các state---------------------

	//được dùng để lưu khách hàng bình luận
	const [khachHang, setKhachHang] = useState('');

	//được dùng để lúu danh sách các bình luận của bình luận cấp 1 
	const [danhSachBinhLuan, setDanhSachBinhLuan] = useState([]);

	//đucowj dùng để lưu nội dung khách hàng bình luận
	const [noiDungBinhLuan,setNoiDungBinhLuan] =useState('');

	//được dùng để lúu danh sách các bình luận của bình luận cấp 2
	const [danhSachBinhLuanCapHai, setDanhSachBinhLuanCapHai] = useState([]);

	//được dùng để lưu id của bình luận cấp 1
	const [traLoiBinhLuan, setTraLoiBinhLuan] = useState('');

	//được dùng để lưu id nằm trên url
	let { spID } = useParams();

	//được dùng để lưu localsotege
	const storedToken = localStorage.getItem('token');



	//-----------------------------------------------------------------

	//---------------------------------------------------------------


	//-----------------------API---------------------------


	//lấy thông tin khách hàng
	useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        
       
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me',null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },
              
              })
              .then(function (response) {
              setKhachHang(response.data.id);
              
              })
              .catch(function (error) {
                console.error('Error during login request:', error);
               
              });
        
        } 
        else {
          // Token không tồn tại, có thể chuyển hướng hoặc thực hiện hành động khác
          console.log('Token không tồn tại');
          // Ví dụ: Chuyển hướng về trang đăng nhập
          // window.location.href = '/dang-nhap';
        }
      }, []); 




	//---------------------hàm hiện thông tin blc1------------------

	useEffect(() => {

		const fetchData = async () => {
			try {
				const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-binh-luan-cap-mot/${spID}`);
				setDanhSachBinhLuan(response.data.data);
				setDanhSachBinhLuanCapHai(response.data.data[0].binh_luan_cap_hai[0].noi_dung);

			} catch (error) {
				console.error('Lỗi khi tải dữ liệu:', error);
			}
		};

		fetchData();
	}, []);


	const luuBinhLuanCapHai = () => {
		axios.post('http://127.0.0.1:8000/api/luu-binh-luan-cap-hai',{
			binh_luan_cap_mot_id: traLoiBinhLuan,
			san_pham_id: spID,
			khach_hang_id: khachHang,
			noi_dung: noiDungBinhLuan,
		}).then(function(response){
			alert('bạn đã gửi bình luận')
		})
	}
	

	//-------------------------------
	

	//----------------------ham xu ly----------------

	const listBinhLuan = danhSachBinhLuan.map(function (item) {
		

		const listBinhLuanCapHai = item.binh_luan_cap_hai.map((item2, index) => (
			<div key={index} className="single-comment left">
			  <img src="https://via.placeholder.com/80x80" alt="#" />
			  <div className="content">
				<h4>{item2.khach_hang?.ho_ten}</h4>
				<p>{item2.noi_dung}</p>
			  </div>
			</div>
		  ));
		  


		//hàm update lại TraLoiBinhLuan
		const xuLyBinhLuan = (item) => {
			
			setTraLoiBinhLuan(item);
			
		
		};

		//hiện form trả lời bình luận
		const hienTraLoiBinhLuan = (id) => {
		
			return traLoiBinhLuan === id ? (<>
			 <form className="form" action="#">
			<div className="row">

				<div className="col-12">
					<div className="form-group">
						<label>Viết câu trả lời của bạn<span>*</span></label>
						<textarea onChange={(e) => setNoiDungBinhLuan(e.target.value)} name="message" placeholder=""></textarea>
					</div>
				</div>
				<div className="col-12">
					<button onClick={luuBinhLuanCapHai}type="butotn" className="btn">Trả lời</button>
				</div>
			</div>
		</form>

				</>
			) : null;
		  };
		  
		return (
			<>
				<div className="single-comment">
					<img src="https://via.placeholder.com/80x80" alt="#" />
					<div className="content">
						<h4>{item.khach_hang.ho_ten} </h4>
						<p>{item.noi_dung}</p>
						<div className="button">
							<a onClick={() => xuLyBinhLuan(item.id)} className="btn"><i className="fa fa-reply" aria-hidden="true"></i>Trả lời</a>
						</div>
						{hienTraLoiBinhLuan(item.id)}
					</div>
				</div>
				<div className="traloibinhluan">
				</div>
				{listBinhLuanCapHai}
			</>
		);
	});
	return (
		<>
			<section className="blog-single section">
				<div className="header-inner">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-12">
								<div className="blog-single-main">
									<div className="row">
										<div className="col-12">
											<div className="comments">
												<h3 className="comment-title">Comments (3)</h3>
												{/* ------------------------------- */}
												
												{listBinhLuan}
												{/* ------------------------------- */}
												{/* <div className="single-comment">
													<img src="https://via.placeholder.com/80x80" alt="#" />
													<div className="content">
														<h4>megan mart <span>Feb 28, 2018 at 8:59 pm</span></h4>
														<p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
														<div className="button">
															<a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true"></i>Reply</a>
														</div>
													</div>
												</div> */}
											</div>
										</div>
										<div className="col-12">
											{/* <div className="reply">
												<div className="reply-head">
													<h2 className="reply-title">Leave a Comment</h2> 
													<form className="form" action="#">
														<div className="row">

															<div className="col-12">
																<div className="form-group">
																	<label>Your Message<span>*</span></label>
																	<textarea name="message" placeholder=""></textarea>
																</div>
															</div>
															<div className="col-12">
																<button type="submit" className="btn">Post comment</button>
															</div>
														</div>
													</form>
												</div>
											</div> */}
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				
			</section>
			
		</>
	);
}
export default BinhLuan;