import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


function BinhLuan() {
	//--------------các state---------------------

	const [loading, setLoading] = useState(true);


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


	const [fetchCount, setFetchCount] = useState(0);

	//-----------------------------------------------------------------

	//---------------------------------------------------------------


	//-----------------------API---------------------------


	
	//lấy thông tin khách hàng
	useEffect(() => {
		//được dùng để hạng chế số lần gọi lại API
		let chayLai = false;
       
        if (storedToken !== null && chayLai ==false) {
			chayLai = true;
            axios.post('http://127.0.0.1:8000/api/me',null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },
              
              }, {
				timeout: 1000,
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
	
			if (response.data.data[0]?.binh_luan_cap_hai && response.data.data[0].binh_luan_cap_hai.length > 0) {
			  setDanhSachBinhLuanCapHai(response.data.data[0].binh_luan_cap_hai[0].noi_dung);
			} else {
			  setDanhSachBinhLuanCapHai("Không có binh_luan_cap_hai");
			}
	
			await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
          	setLoading(false);
			
		  } catch (error) {
			console.error('Lỗi khi tải dữ liệu:', error);
			setLoading(false);
		  }
		};
	
		// Kiểm tra số lần fetchCount để kiểm soát số lần chạy lại
		if (fetchCount < 1) { // Đặt giới hạn số lần chạy lại (ở đây là 5 lần)
		  fetchData();
		}
	  }, [fetchCount, spID]); 

	
	 
	 
	  
	const luuBinhLuanCapHai = () => {
		axios.post('http://127.0.0.1:8000/api/luu-binh-luan-cap-hai',{
			binh_luan_cap_mot_id: traLoiBinhLuan,
			san_pham_id: spID,
			khach_hang_id: khachHang,
			noi_dung: noiDungBinhLuan,
		}, {
			timeout: 3000,
		  }).then(function(response){
			Swal.fire({
				title: "Thành công",
				text: 'bạn đã bính luận',
				icon: "success"
			  });
		}).catch(function (error) {
			if(error.response.status === 422)
			{
			  const {noi_dung, khach_hang_id} = error.response.data.errors;
			  if(noi_dung)
			  {
				Swal.fire({
				  title: "Thất bại",
				  text: Object.values(noi_dung).join('') ,
				  icon: "error"
				});
			  
			  }
			  if(khach_hang_id)
			  {
				Swal.fire({
				  title: "Thất bại",
				  text: Object.values(khach_hang_id).join('') ,
				  icon: "error"
				});
			  }
		  }
		  });
	}
	

	//-------------------------------
	

	//----------------------ham xu ly----------------

	const listBinhLuan = danhSachBinhLuan.map(function (item ,index) {
		const listBinhLuanCapHai = item.binh_luan_cap_hai ? (
			item.binh_luan_cap_hai.map((item2, index) => (
			  <div key={index} className="single-comment left">
				{item2.khach_hang && item2.khach_hang.avatar ? (
						<img src={`http://localhost:8000/avatar/` + item2.khach_hang.avatar} alt="#" />
					) : (
						<img src="https://via.placeholder.com/80x80" alt="#" />
					)}
				<div className="content">
				  <h4>{item2.khach_hang?.ho_ten}</h4>
				  <p>{item2.noi_dung}</p>
				</div>
			  </div>
			))
		  ) : null;


		//hàm update lại TraLoiBinhLuan
		const xuLyBinhLuan = (item) => {
			setTraLoiBinhLuan(item);
		};

		//hiện form trả lời bình luận
		const hienTraLoiBinhLuan = (id) => {
		
			return traLoiBinhLuan === id ? (<>
			 <form className="form" action="#" key={index}>
			<div className="row">

				<div className="col-12">
					<div className="form-group">
						<label>Viết câu trả lời của bạn<span>*</span></label>
						<textarea onChange={(e) => setNoiDungBinhLuan(e.target.value)} name="message" placeholder=""></textarea>
					</div>
				</div>
				<div className="col-12">
					<button onClick={luuBinhLuanCapHai}type="button" className="btn">Trả lời</button>
				</div>
			</div>
		</form>

				</>
			) : null;
		  };
		

		  return (
			<>
				<div className="single-comment">
					{item.khach_hang && item.khach_hang.avatar ? (
						<img src={`http://localhost:8000/avatar/` + item.khach_hang.avatar} alt="#" />
					) : (
						<img src="https://via.placeholder.com/80x80" alt="#" />
					)}
					<div className="content">
						<h4>{item.khach_hang?.ho_ten} </h4>
						<p>{item.noi_dung}</p>
						<div className="button">
							<a onClick={() => xuLyBinhLuan(item.id)} className="btn">
								<i className="fa fa-reply" aria-hidden="true"></i>Trả lời
							</a>
						</div>
						{hienTraLoiBinhLuan(item.id)}
					</div>
				</div>
				<div className="traloibinhluan"></div>
				{listBinhLuanCapHai}
			</>
		);
		
	});



	
	return (
		<>
		 {loading ? (
      // Nếu đang tải dữ liệu, hiển thị thanh chờ ở đây
        <div className="loader">
        <div className="wrapper">
          <div className="catContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 733 673"
              className="catbody"
            >
              <path
                fill="#212121"
                d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
              ></path>
              <path fill="#212121" d="M184 9L270.603 159H97.3975L184 9Z"></path>
              <path fill="#212121" d="M541 0L627.603 150H454.397L541 0Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 158 564"
              className="tail"
            >
              <path
                fill="#191919"
                d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
              ></path>
            </svg>
            <div className="textcat">
              <span className="bigzzz">Z</span>
              <span className="zzz">Z</span>
            </div>
          </div>
          <div className="wallContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 500 126"
              className="wall"
            >
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="3"
                x2="450"
                y1="3"
                x1="50"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="85"
                x2="400"
                y1="85"
                x1="100"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="122"
                x2="375"
                y1="122"
                x1="125"
              ></line>
              <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="500" y1="43"></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="1.99391"
                x2="115.5"
                y1="43.0061"
                x1="115.5"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="2.00002"
                x2="189"
                y1="43.0122"
                x1="189"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="2.00612"
                x2="262.5"
                y1="43.0183"
                x1="262.5"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="2.01222"
                x2="336"
                y1="43.0244"
                x1="336"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="2.01833"
                x2="409.5"
                y1="43.0305"
                x1="409.5"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="43"
                x2="153"
                y1="84.0122"
                x1="153"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="43"
                x2="228"
                y1="84.0122"
                x1="228"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="43"
                x2="303"
                y1="84.0122"
                x1="303"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="43"
                x2="378"
                y1="84.0122"
                x1="378"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="84"
                x2="192"
                y1="125.012"
                x1="192"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="84"
                x2="267"
                y1="125.012"
                x1="267"
              ></line>
              <line
                strokeWidth="6"
                stroke="#7C7C7C"
                y2="84"
                x2="342"
                y1="125.012"
                x1="342"
              ></line>
            </svg>
          </div>
        </div>
      </div>
    
      ) : (
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
													<h3 className="comment-title">Bình luận	</h3>
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
	  )}
		</>
	
	);
}
export default BinhLuan;