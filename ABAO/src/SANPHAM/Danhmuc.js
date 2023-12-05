import Danhsach from "./Danhsach";
import Nutxemthem from "./Nutxemthem";
function Danhmuc()
{
    return(
        <>
        <div className="product-area section">
            <div className="container">
				<div className="row">
					<div className="col-12">
						<div className="section-title">
							<h2>Trending Item</h2>
						</div>
					</div>
				</div>
                <div className="row">
					<div className="col-12">
						<div className="product-info">
							<div className="nav-main">
								
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#aothun" role="tab">ÁO THUN</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#aokhoac" role="tab">ÁO KHOÁC</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#hoodie" role="tab">HOODIE</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#quan" role="tab">QUẦN</a></li>
									{/* <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#accessories" role="tab">Accessories</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#essential" role="tab">Essential</a></li>
									<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#prices" role="tab">Prices</a></li> */}
								</ul>
								<div className="tab-content" id="myTabContent">
								<Danhsach/>
								</div>
								
							</div>
                        </div>
                    </div>
                </div>
            </div>
			<Nutxemthem/>
        </div>

        </>
    );
}
export default Danhmuc;