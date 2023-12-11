import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Sanpham from "../SANPHAM/Sanpham";
import Footer from "../TRANGCHU/Footer";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect } from "react";
import LocGia from "./LocGia";

function TrangChinhTimKiem()
{
    const [dsSanPham,setdsSanPham]= useState([]);
    let { tenSanPham } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =await axios.get(`http://127.0.0.1:8000/api/tim-kiem/${tenSanPham}`);
                setdsSanPham(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const ListSP = dsSanPham.map(function(item, index) {
        return (
          <Sanpham key={index} data={item} />
        );
      });

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
        <input type="text" autocomplete="off" name="text" className="nhap_gia" placeholder=""/>
        <label>
            <p>----</p>
        </label>
        <input type="text" autocomplete="off" name="text" className="nhap_gia" placeholder=""/>
        <button className="nutgia">
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
       
        <Footer/>
    </>
    )
}

export default TrangChinhTimKiem;