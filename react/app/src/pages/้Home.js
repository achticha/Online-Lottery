import { useEffect, useState } from "react"
import config from "./config";
import axios from "axios";
import Swal from "sweetalert2";
import './Home.css';
import { Link } from "react-router-dom";
import HomePage from './Wad/Homepage.png'


function Home(props) {
    const [userName, setUserName] = useState('');


    useEffect(() => {
        const sidebar = document.querySelector('.sidebar');
        const fabars = document.querySelector('.fa-bars');

        fabars.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
        fetchData();
        return () => {
            fabars.removeEventListener('click', function () {
                sidebar.classList.toggle('active');
            });
        };

    }, []);

    const fetchData = async () => {
        try {
            const _config = config.header();
            const react2 = await axios.get(config.apiPath + '/api/user/info', _config);
            setUserName(react2.data.payload.username)

        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })

        }
    }


    return (
        <>

            <div className="backcard">
                <nav className="sidebar">
                    <div className="logo-menu">
                        <h2 className="logos">Backoffice</h2>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className="menu">
                        <div className="list active">
                            <Link to='/home'>
                                <i className="fa fa-home me-2"></i>
                                <span className="link-name" style={{ '--i': '1' }}>Home</span>
                            </Link></div>
                        <div className="list">
                            <Link to='/company'>
                                <i className="fa-solid fa-address-book me-2"></i>
                                <span className="link-name" style={{ '--i': '2' }}>ข้อมูลร้าน</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/lotto'>
                                <i className="fa-solid fa-inbox me-2"></i>
                                <span className="link-name" style={{ '--i': '3' }}>Lottery</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/changePrice'>
                                <i className="fa-solid fa-chart-line me-2"></i>
                                <span className="link-name" style={{ '--i': '4' }}>ปรับราคาแบบเร่งด่วน</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/billSale'>
                                <i className="fa-solid fa-basket-shopping me-2"></i>
                                <span className="link-name" style={{ '--i': '5' }}>รายการสั่งซื้อ</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/lottoInShop'>
                                <i className="fa-solid fa-store me-2"></i>
                                <span className="link-name" style={{ '--i': '6' }}>รายการที่ฝากร้าน</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/lottoForSend'>
                                <i className="fa-regular fa-paper-plane me-2"></i>
                                <span className="link-name" style={{ '--i': '7' }}>รายการที่ต้องจัดส่ง</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/bonus'>
                                <i className="fa-regular fa-chess-queen me-2"></i>
                                <span className="link-name" style={{ '--i': '8' }}>ผลรางวัล</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/saleBonus'>
                                <i className="fa-solid fa-wand-sparkles me-2"></i>
                                <span className="link-name" style={{ '--i': '9' }}>รายงานผู้ถูกรางวัล</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/lottoIsBonus'>
                                <i className="fa-solid fa-crown me-2"></i>
                                <span className="link-name" style={{ '--i': '10' }}>รายงานผลรางวัลของตัวเอง</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/reportIncome'>
                                <i className="fa fa-circle-dollar-to-slot me-2"></i>
                                <span className="link-name" style={{ '--i': '11' }}>รายงานรายได้</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/reportProfit'>
                                <i className="fa-solid fa-piggy-bank me-2"></i>
                                <span className="link-name" style={{ '--i': '12' }}>รายงานผลกำไร</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/user'>
                                <i className="fa-solid fa-user-gear me-2"></i>
                                <span className="link-name" style={{ '--i': '13' }}>ผู้ใช้งานระบบ</span>
                            </Link>
                        </div>
                        <div className="list">
                            <Link to='/banner'>
                                <i className="fa-solid fa-photo-film me-2"></i>
                                <span className="link-name" style={{ '--i': '14' }}>จัดการป้ายโฆษณา</span>
                            </Link>
                        </div>

                    </div>
                </nav>

                <div className="content">
                    {props.children === undefined ?
                        <div className="mt-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '50px' }}>
                            <div>Welcome Lottery Backoffic</div>
                            <img className="mt-2" src={HomePage} alt="" style={{ width: '550px', height: '430px' }} />
                        </div>
                        :
                        <div >
                            {props.children}
                        </div>
                    }
                </div>


            </div>

        </>
    );
}
export default Home