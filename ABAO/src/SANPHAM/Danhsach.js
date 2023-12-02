import Sanpham from "./Sanpham";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Danhsach() {
    const [dsSanPham, setDsSanPham] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/danh-sach-san-pham');
                setDsSanPham(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
   

    const ListSP = dsSanPham.map(function(item){
        
        return(
           
            <Sanpham data={item}/>
        );
    });
    return (
        <>
            <div class="tab-pane fade show active" id="man" role="tabpanel">
                <div class="tab-single">
                    <div class="row">
                    {ListSP}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Danhsach;