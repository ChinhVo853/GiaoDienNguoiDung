function Menu() {
  return (
    <>
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item"><a className="nav-link" href="/">TRANG CHỦ</a></li>
          <li className="nav-item">
            <a className="nav-link">SẢN PHẨM</a>
            <div className="dropdown-content">
              <a>ÁO THUN</a>
              <a>ÁO KHOÁC</a>
              <a>HOODIE</a>
              <a>QUẦN</a>
            </div>
          </li>
          <li className="nav-item"><a className="nav-link" href="/">GIỚI THIỆU</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
