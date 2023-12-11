import Sanpham from "./Sanpham";
function Danhsach(props) {
    
   

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