import Sanpham from "./Sanpham";
function Danhsach(props) {
    
   
    //hàm này duyệt qua các mảng của biến được truyền qua ở đây là props
    //vì props chưa phải là 1 mảng nên phải là props.data
    const ListSP = props.data.map(function(item, index) {
        return (
          <Sanpham key={index} data={item} />
        );
      });
      
    return (
        <>
            <div className="tab-pane fade show active" id="man" role="tabpanel">
                <div className="tab-single">
                    <div className="row">
                    {ListSP}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Danhsach;