function SmallBanner()
{
    return(
        <>
	<section class="small-banner section">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-4 col-md-6 col-12">
					<div class="single-banner">
						<img src="Banner02-01.png" alt="#"/>
						<div class="content">
							{/* <p>Man's Collectons</p>
							<h3>Summer travel <br/> collection</h3> */}
							<a href="#">Discover Now</a>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-12">
					<div class="single-banner">
						<img src="Banner03-01.png" alt="#"/>
						<div class="content">
							{/* <p>Bag Collectons</p>
							<h3>Awesome Bag <br/> 2020</h3> */}
							<a href="#">Shop Now</a>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-12">
					<div class="single-banner tab-height">
						<img src="Banner01.png" alt="#"/>
						<div class="content">
							{/* <p>Flash Sale</p>
							<h3>Mid Season <br/> Up to <span>40%</span> Off</h3> */}
							<a href="#">Discover Now</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
        </>
    );
}
export default SmallBanner;