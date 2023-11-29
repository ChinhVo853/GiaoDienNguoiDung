import Sanpham from "./Sanpham";

function Danhsach() {
    return (
        <>
            <div class="tab-pane fade show active" id="man" role="tabpanel">
                <div class="tab-single">
                    <div class="row">
                        <Sanpham />
                        <Sanpham />
                        <Sanpham />
                        <Sanpham />
                        <Sanpham />
                        <Sanpham />
                        <Sanpham />
                        <Sanpham />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Danhsach;