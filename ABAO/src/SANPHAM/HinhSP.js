function HinhSP(item) {
    
    if(item.anh){
        
    return (
        <> 
            <img className="default-img" style={{ width: "300px", height: "500px" }} src={`http://localhost:8000/` + item.anh} alt="#" />
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