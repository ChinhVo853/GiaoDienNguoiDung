import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


function BinhLuan() {
	//tao bien luu du lieu vao axios
	const [sanPhamb, setSanPhamb] = useState([]);
	const [khachHang, setKhachHang] = useState('');
	const [danhSachBinhLuan, setDanhSachBinhLuan] = useState([]);
	const [danhSachBinhLuanCapHai, setDanhSachBinhLuanCapHai] = useState([]);
	const [traLoiBinhLuan, setTraLoiBinhLuan] = useState('');

	let { spID } = useParams();


	//-----------------------------------------------------------------

	//---------------------------------------------------------------


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

	//-------------------------------
	

	console.log(traLoiBinhLuan);
	//--------------------------------------
	const listBinhLuan = danhSachBinhLuan.map(function (item) {
		const listBinhLuanCapHai = item.binh_luan_cap_hai.map(function (item2) {
			return (
				<>
					<div class="single-comment left">
						<img src="https://via.placeholder.com/80x80" alt="#" />
						<div class="content">
							<h4>{item2.khach_hang.ho_ten}</h4>
							<p>{item2.noi_dung}</p>

						</div>
					</div>
				</>
			);

		})
		const xuLyBinhLuan = (item) => {
			setTraLoiBinhLuan(item);

			document.querySelector('.traloibinhluan').innerHTML=`<form class="form" action="#">
			<div class="row">

				<div class="col-12">
					<div class="form-group">
						<label>Viết câu trả lời của bạn<span>*</span></label>
						<textarea name="message" placeholder=""></textarea>
					</div>
				</div>
				<div class="col-12">
					<button type="submit" class="btn">Trả lời</button>
				</div>
			</div>
		</form>`;
		};
		return (
			<>
				<div class="single-comment">
					<img src="https://via.placeholder.com/80x80" alt="#" />
					<div class="content">
						<h4>{item.khach_hang.ho_ten} </h4>
						<p>{item.noi_dung}</p>
						<div class="button">
							<a onClick={() => xuLyBinhLuan(item.khach_hang.id)} class="btn"><i class="fa fa-reply" aria-hidden="true"></i>Trả lời</a>
							
						</div>
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
			<section class="blog-single section">
				<div class="header-inner">
					<div class="container">
						<div class="row">
							<div class="col-lg-8 col-12">
								<div class="blog-single-main">
									<div class="row">
										<div class="col-12">
											<div class="comments">
												<h3 class="comment-title">Comments (3)</h3>
												{/* ------------------------------- */}
												{listBinhLuan}
												{/* ------------------------------- */}
												{/* <div class="single-comment">
													<img src="https://via.placeholder.com/80x80" alt="#" />
													<div class="content">
														<h4>megan mart <span>Feb 28, 2018 at 8:59 pm</span></h4>
														<p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
														<div class="button">
															<a href="#" class="btn"><i class="fa fa-reply" aria-hidden="true"></i>Reply</a>
														</div>
													</div>
												</div> */}
											</div>
										</div>
										<div class="col-12">
											{/* <div class="reply">
												<div class="reply-head">
													<h2 class="reply-title">Leave a Comment</h2> 
													<form class="form" action="#">
														<div class="row">

															<div class="col-12">
																<div class="form-group">
																	<label>Your Message<span>*</span></label>
																	<textarea name="message" placeholder=""></textarea>
																</div>
															</div>
															<div class="col-12">
																<button type="submit" class="btn">Post comment</button>
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