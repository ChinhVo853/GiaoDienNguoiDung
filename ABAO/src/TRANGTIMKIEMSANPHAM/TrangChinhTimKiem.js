import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Sanpham from "../SANPHAM/Sanpham";
import Footer from "../TRANGCHU/Footer";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect } from "react";
import ReactPaginate from 'react-paginate';

function TrangChinhTimKiem()
{
    //---------các state ---------------------
    
    //đây là state lọc giá bắt đầu
    const [giaTu,setGiaTu] = useState();
    //đây là state lọc giá kết thúc
    const [giaDen,setGiaDen] =useState();
    //đây là state chứa các sản phẩm đã lấy về được trong khi gọi API
    const [dsSanPham,setdsSanPham]= useState([]);
    //đây là giá trị lấy được trên thanh url
    let { tenSanPham } = useParams();
    // để theo dõi trang hiện tại đang được hiển thị.
    //hiểu cách đơn giản đây sẽ là vị tría của trang 
    const [pageNumber, setPageNumber] = useState(0);
    // Số lượng sản phẩm trên mỗi trang
    const itemsPerPage = 20; 

    //-------------------------đây là gọi API sanPham sẽ được thay đổi ở đây--------------------------
   
    useEffect(() => {
        const fetchData = async () => {
            axios.post(`http://127.0.0.1:8000/api/tim-kiem/${tenSanPham}`, {
            giaTu: giaTu,
            giaDen: giaDen,
            })
            .then(function (response) {
            setdsSanPham(response.data.data);
            })
            .catch(function (error) {
            console.error('Error during login request:', error);
            
            });
        };

        fetchData();
    }, []);

    const locGia = () => {
        axios.post(`http://127.0.0.1:8000/api/tim-kiem/${tenSanPham}`, {
        giaTu: giaTu,
        giaDen: giaDen,
        })
        .then(function (response) {
        setdsSanPham(response.data.data);
        })
        .catch(function (error) {
        console.error('Error during login request:', error);
        
        });
    };
    //-------------------------các biến được tạo để phân trang---------------------

    //Tính toán số lượng trang cần hiển thị dựa trên tổng số sản phẩm và số sản phẩm trên mỗi trang.
    const pageCount = dsSanPham.length / itemsPerPage;

    //-------------------------------đây là các hàm xử lý----------------------------------

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
     

    return(
    <>
        <Head/>
        <Menu/>
        <div>
        <hr></hr>
            <div className="row">
                <div className="khunggia col-sm-3">
                    <h5 className="khoang_gia">KHOẢN GIÁ</h5>
                </div>
                <div className="col-sm-9"></div>
            </div>
        <input onChange={(e) => setGiaTu(e.target.value)} autoComplete="off" type="text" name="text" className="nhap_gia" placeholder=""/>
        <label>
            <p>----</p>
        </label>
        <input  onChange={(e) => setGiaDen(e.target.value)} autoComplete="off" type="text"  name="text" className="nhap_gia" placeholder=""/>
        <button onClick={locGia} className="nutgia">
            Click
        </button>
        <hr></hr>
        </div>
        <div className="tab-pane fade show active" id="man" role="tabpanel">
                <div className="tab-single">
                    <div className="row">
                    {ListSP}
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
    </>
    )
}

export default TrangChinhTimKiem;