import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Danhsach from "../SANPHAM/Danhsach";
import Nutxemthem from "../SANPHAM/Nutxemthem";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Danhmuc from "../SANPHAM/Danhmuc";
import Sanpham from "../SANPHAM/Sanpham";
import ReactPaginate from 'react-paginate';

function Trangchinhcacloaisanpham() {
//--------------------------các state----------------------------
    //đây là state lọc giá bắt đầu
    const [giaTu,setGiaTu] = useState();
    //đây là state lọc giá kết thúc
    const [giaDen,setGiaDen] =useState();

    //đây là giá trị lấy được trên thanh url
    let { loaiID } = useParams();

    //lưu danh sách sản phẩm
    const [dsSanPham ,setDSSanPham] = useState([]); 

    // để theo dõi trang hiện tại đang được hiển thị.
    //hiểu cách đơn giản đây sẽ là vị tría của trang 
    const [pageNumber, setPageNumber] = useState(0);

    // Số lượng sản phẩm trên mỗi trang
    const itemsPerPage = 20; 

    //Tính toán số lượng trang cần hiển thị dựa trên tổng số sản phẩm và số sản phẩm trên mỗi trang.
    const pageCount = dsSanPham.length / itemsPerPage;

//----------------API------------------------------
useEffect(() => {

    const fetchData = async () => {
        axios.post(`http://127.0.0.1:8000/api/loc-loai/${loaiID}`, {
    giaTu: giaTu,
    giaDen: giaDen,
    })
    .then(function (response) {
    setDSSanPham(response.data.data);
    })
    .catch(function (error) {
    console.error('Error during login request:', error);
    
    });
    };

    fetchData();
  }, [loaiID]);


  const locGia = () => {
        axios.post(`http://127.0.0.1:8000/api/loc-loai/${loaiID}`, {
        giaTu: giaTu,
        giaDen: giaDen,
        })
        .then(function (response) {
        setDSSanPham(response.data.data);
        })
        .catch(function (error) {
        console.error('Error during login request:', error);
        
        });
    };

    const GiaTang = async () => {
        const response = await axios('http://127.0.0.1:8000/api/gia-tang');
        setDSSanPham(response.data.data);
    }

    const GiaGiam = async () => {
        const response = await axios('http://127.0.0.1:8000/api/gia-giam');
        setDSSanPham(response.data.data);
    }
//--------------------hàm xử lý ------------------------


    //đây là hàm trả về các danh sách sản phẩm đã có phân trang
    //Phương thức slice được sử dụng để cắt một phần của mảng data. 
    //trong slice sẽ truyền vào 2 tham số lần lược là bắt đâu và kết thúc
    //bắt đầu kết ở đây là vị trí mảng
    //pageNumber và itemsPerPage đã được tạo ở state 
    const ListSP = dsSanPham
    .slice(pageNumber * itemsPerPage, (pageNumber+1) * itemsPerPage)
    .map(function(item, index) {
        return (
          <Sanpham key={index} data={item} />
        );
    });


  //được gọi khi người dùng chuyển trang, cập nhật giá trị của pageNumber với trang đã chọn.
    //selected là các ReactPaginate hiểu đơn giản thì đây là nơi lưu trử trạng thái trang
    //ví dụ khi click vào ô số 2 thì setPageNumber sẽ được update lại là số 1 vì là mảng nên bắt đầu từ 0
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };
     

    return (
        <>
            <Head />
            <Menu />

            <div>
                <hr></hr>
                    <div className="row">
                        <div className="khunggia col-sm-3">
                            <h5 className="khoang_gia">KHOẢN GIÁ</h5>
                        </div>
                        <div className="col-sm-9">
                            <input onChange={(e) => setGiaTu(e.target.value)} autoComplete="off" type="text" name="text" className="nhap_gia" placeholder=""/>
                                <label>
                                    <p>----</p>
                                </label>
                                <input  onChange={(e) => setGiaDen(e.target.value)} autoComplete="off" type="text"  name="text" className="nhap_gia" placeholder=""/>
                                <button onClick={locGia} className="nutgia">
                                    Click
                                </button>
                        </div>
                        
                        <div className="col-sm-3">
                        <div className="">
                            <h5 className="khoang_gia">XẾP GIÁ</h5>
                        </div>
                            <button onClick={GiaTang} className="nutgia">THẤP </button>

                            <button onClick={GiaGiam} className="nutgia">CAO</button>
                        </div>
                    </div>
                                
                        
                        <hr></hr>
            </div>


            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{dsSanPham[0]?.loai.ten}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-info">
                                <div className="nav-main">


                                    <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="man" role="tabpanel">
                                        <div className="tab-single">
                                            <div className="row">
                                       {ListSP}
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        />
        <Footer/>
    

            </div>
            <Footer />
        </>
    );
}
export default Trangchinhcacloaisanpham;