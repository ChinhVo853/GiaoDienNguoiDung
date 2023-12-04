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
   

    const ListSP = dsSanPham.map(function(item, index) {
        return (
          <Sanpham key={index} data={item} />
        );
      });
      
    return (
        <>
            <div className="tab-pane fade show active" id="man" role="tabpanel">
                <div className="tab-single">
                    <div className="row">
                    {ListSP}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Danhsach;