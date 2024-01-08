import Head from './Head';
import Menu from './Menu';
import Example from './Example';
import SlideShow from './SlideShow';
import SmallBanner from './SmallBanner';
import Danhmuc from '../SANPHAM/Danhmuc';
import Footer from './Footer';
import Dichvu from './DichVu';
import Cacsanphambanchay from '../Hot/Cacsanphambanchay';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { resolvePath } from 'react-router-dom';

function TrangChu() {
  const [slideShowData, setSlideShowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-san-pham`);
        setSlideShowData(response.data.dataSlideShow);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <Head />
      <Menu />
      <div className='Hbanner'>
        <SlideShow hinh={slideShowData} />
      </div>
      <div className='SmallBanner'>
        <SmallBanner hinh={slideShowData}/>
      </div>
      <Danhmuc />
      <Dichvu />
      <Footer />
    </>
  );
}

export default TrangChu;
