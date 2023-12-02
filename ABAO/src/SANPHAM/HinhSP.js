function HinhSP(item) {
    
    if(item.anh){
        
    return (
        <> 
            <img class="default-img"src={`http://localhost:8000/` + item.anh} alt="#" />
        </>
    );
    }
   
    return (
    <>  
      <img class="default-img" src="https://via.placeholder.com/550x750" alt="#" />
            {/* <img class="hover-img" src="https://via.placeholder.com/550x750" alt="#" /> */}    

    </>);

}
export default HinhSP