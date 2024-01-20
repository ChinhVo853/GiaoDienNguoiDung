function HinhSP(item) {
    if(item.anh){
       console.log(item);
    return (
        <> 
            <img className="default-img" style={{ width: "300px", height: "500px" }} src={item.anh.image_path + item.anh.url} alt="#" />
        </>
    );
    }
   
    return (
    <>  
      <img className="default-img" style={{ width: "300px", height: "500px" }} src="https://via.placeholder.com/550x750" alt="#" />
            {/* <img className="hover-img" src="https://via.placeholder.com/550x750" alt="#" /> */}    

    </>);

}
export default HinhSP