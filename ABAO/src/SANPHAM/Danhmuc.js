import Danhsach from "./Danhsach";


function Danhmuc()
{
	//---------các state ---------------------

	
	
	

    return(
        <>
        <div className="product-area section">
            <div className="container">
				<div className="row">
					<div className="col-12">
						<div className="section-title">
							<h2>Các Sản Phẩm Mới</h2>
						</div>
					</div>
				</div>
                <div className="row">
					<div className="col-12">
						<div className="product-info">
							<div className="nav-main">
								
								<div className="tab-content" id="myTabContent">
								<Danhsach/>
								</div>
								
							</div>
                        </div>
                    </div>
                </div>
            </div>
			
        </div>

        </>
    );
}
export default Danhmuc;