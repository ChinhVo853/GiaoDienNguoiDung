function Menu()
{
    return(
        <>
        <nav class="main-nav">
    <ul class="nav-list">
      <li class="nav-item"><a href="#" class="nav-link">TRANG CHỦ</a></li>
      <li class="nav-item">
        <a href="#" class="nav-link">SẢN PHẨM</a>
        <div class="dropdown-content">
          <a href="#">ÁO THUN</a>
          <a href="#">ÁO KHOÁC</a>
          <a href="#">HOODIE</a>
          <a href="#">QUẦN</a>
        </div>
      </li>
      <li class="nav-item"><a href="#" class="nav-link">GIỚI THIỆU</a></li>

      
    </ul>
  </nav>
        </>
    );
}
export default Menu;