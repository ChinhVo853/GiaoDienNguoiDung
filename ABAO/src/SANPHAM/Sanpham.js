import React from "react";
import ClickSP from "./ClickSP";
import GiaSP from "./GiaSP";
import HinhSP from "./HinhSP";
import TenSP from "./TenSP";

function Sanpham({ data }) {
  const DaXem = () => {
    const daXemItem = {
      id: data.id,
      ten: data.ten,
      gia: data.gia_ban,
      hinh: data.hinh_anh[0]?.url,
    };


   
    let daXem = JSON.parse(localStorage.getItem('viewed')) || [];
    const daXemItemIndex = daXem.findIndex(item => item.id === daXemItem.id);

   

    if (daXemItemIndex === -1) {
      daXem.unshift(daXemItem);
      daXem = daXem.slice(0, 10);
      localStorage.setItem('viewed', JSON.stringify(daXem));
      
    } 
    window.location.href = `/ChiTiet/${data.id}`;

  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-4 col-12">
      <div className="single-product">
        <div className="product-img" onClick={DaXem}>
          <HinhSP anh={data?.hinh_anh[0]?.url} />
          <ClickSP />
        </div>
        <div className="product-content">
          <TenSP ten={data.ten} />
          <GiaSP gia={data.gia_ban} />
        </div>
      </div>
    </div>
  );
}

export default Sanpham;