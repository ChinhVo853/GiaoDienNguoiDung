import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Sanpham from "../SANPHAM/Sanpham";
import Footer from "../TRANGCHU/Footer";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect } from "react";


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
       {ListSP}
        <Footer/>
    </>
    )
}

export default TrangChinhTimKiem;