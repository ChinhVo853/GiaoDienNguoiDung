import Sanphamcuahot from './Sanphamcuahot';

function Cacsanphambanchay()
{
    return(
        <>
        <section class="shop-home-list section">
		<div class="container">
			<div class="row">
				<div class="col-lg-4 col-md-6 col-12">
					<div class="row">
						<div class="col-12">
							<div class="shop-section-title">
								<h1>On sale</h1>
							</div>
						</div>
					</div>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
					<Sanphamcuahot/>

				</div>
                
				<div class="col-lg-4 col-md-6 col-12">
					<div class="row">
						<div class="col-12">
							<div class="shop-section-title">
								<h1>Best Seller</h1>
							</div>
						</div>
					</div>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
				</div>
				<div class="col-lg-4 col-md-6 col-12">
					<div class="row">
						<div class="col-12">
							<div class="shop-section-title">
								<h1>Top viewed</h1>
							</div>
						</div>
					</div>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
				</div>
			</div>
		</div>
	</section>
        </>
    );
}
export default Cacsanphambanchay;