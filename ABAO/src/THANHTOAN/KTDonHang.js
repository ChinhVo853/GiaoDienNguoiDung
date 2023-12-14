import React from 'react';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";

function KTDonHang() {
  return (
    <>
      <Head />
      <Menu />

      <section className="vh-50" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-stepper" style={{ borderRadius: "10px" }}>
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span className="lead fw-normal">Trạng thái đơn hàng</span>
                      <span className="text-muted small">by DHFL on 21 Jan, 2020</span>
                    </div>
                    {/* <div>
                      <button className="btn btn-outline-primary" type="button">Track order details</button>
                    </div> */}
                  </div>
                  <hr className="my-4" />

                  <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                    <span className="dot"></span>
                    
                    <hr className="flex-fill track-line"></hr><span className="dot"></span>
                    <hr className="flex-fill track-line"></hr><span className="dot"></span>
                    <hr className="flex-fill track-line"></hr><span className="d-flex justify-content-center align-items-center big-dot dot">
                      <i className="fa fa-check text-white"></i>
                    </span>
                  </div>

                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start"><span>Chờ xác nhận</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center"><span>Đã xác nhận</span>
                      </div>
                    <div className="d-flex flex-column justify-content-center align-items-center"><span>Đang giao hàng</span></div>
                    
                    <div className="d-flex flex-column align-items-end"><span>Giao thành công</span></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default KTDonHang;
