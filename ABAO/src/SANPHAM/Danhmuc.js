import Danhsach from "./Danhsach";
import Nutxemthem from "./Nutxemthem";
function Danhmuc()
{
    return(
        <>
        <div class="product-area section">
            <div class="container">
				<div class="row">
					<div class="col-12">
						<div class="section-title">
							<h2>Trending Item</h2>
						</div>
					</div>
				</div>
                <div class="row">
					<div class="col-12">
						<div class="product-info">
							<div class="nav-main">
								
								<ul class="nav nav-tabs" id="myTab" role="tablist">
									<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#aothun" role="tab">ÁO THUN</a></li>
									<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#aokhoac" role="tab">ÁO KHOÁC</a></li>
									<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#hoodie" role="tab">HOODIE</a></li>
									<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#quan" role="tab">QUẦN</a></li>
									{/* <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#accessories" role="tab">Accessories</a></li>
									<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#essential" role="tab">Essential</a></li>
									<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#prices" role="tab">Prices</a></li> */}
								</ul>
								<div class="tab-content" id="myTabContent">
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