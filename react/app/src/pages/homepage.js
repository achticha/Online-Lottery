import './css/homepage.css';
import './Wall/script'
import { Link } from "react-router-dom";
import sky from './Wad/sky.png'
import moon from './Wad/moon.png'
import water from './Wad/water.png'
import center from './Wad/center-city.png'
import right from './Wad/right-city.png'
import left from './Wad/left-city.png'
import rail from './Wad/rail.png'
import train from './Wad/train.png'
import hin1 from './Wad/hin1.png'
import hin2 from './Wad/hin2 r.png'
import waterfall from './Wad/waterfall.png'
import desertsky from './Wad/desert-sky.png'
import desertNoSky from './Wad/desert-NoSky.png'
import desertrock from './Wad/desert-rock.png'
import waterII from './Wad/waterII.png'
import man from './Wad/man.png'
import grass from './Wad/grass.png'
import lotter from './Wall/lottery.png'
import onetw from './Wall/1234.png'
import { useEffect, useRef } from "react";

function HomePage() {

    const moons = useRef(null)
    const textone = useRef(null)
    const trains = useRef(null)
    const desertmoons = useRef(null)
    const mans = useRef(null)


    useEffect(() => {
        const handleScroll = () => {
            const value = window.scrollY

            // ตรวจสอบว่า ref ไม่เป็น null ก่อนเข้าถึง style
            if (moons.current !== null) {
                moons.current.style.marginTop = `${value * 1}px`;
            }
            if (textone.current !== null) {
                textone.current.style.marginTop = `${value * -0.5}px`;
            }
            if (trains.current !== null) {
                trains.current.style.left = `${value * 1}px`;
            }
            if (desertmoons.current !== null) {
                desertmoons.current.style.marginTop = `${value * 0.7}px`;
                desertmoons.current.style.left = `${value * 0.1}px`;
            }
            if (mans.current !== null) {
                mans.current.style.left = `${value * 0.4}px`;
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.addEventListener('scroll', handleScroll)
        }
    }, []);
    return (
        <>
        
            <body className='csr'>
                <header>
                    <h2 className='logo'>Lottery</h2>
                    <nav className='navigation'>
                        <div><Link to='/login' className='active'>Login</Link></div>
                    </nav>
                </header>
                <section className='parallax-home'>
                    <img src={sky} alt="" ></img>
                    <img src={moon} alt="" className='moon' ref={moons} ></img>
                    <img src={water} alt="" ></img>
                    <img src={center} alt="" ></img>
                    <img src={right} alt="" ></img>
                    <img src={left} alt="" ></img>
                    <img src={train} alt=""  ref={trains} ></img>
                    <img src={rail} alt="" className='rail'></img>
                    <h1 className='text' ref={textone}>Fortune favors the brave</h1>
                    <img src={hin1} alt="" className='hin1'></img>
                    <img src={hin2} alt="" className='hin2'></img>
                </section>

                <section className='about'>
                    <div className='info-box'>
                        <h2 className='texts'>"Wishing you the best of luck in your ventures!"</h2>
                    </div>
                    <div className='navigation2'><Link to='/lottery' className='btn'>Buy Lottery</Link></div>
                    <img src={waterfall} alt="" className='waterfall' ></img>
                    <img src={desertsky} alt="" className='desertsky'></img>
                    <img src={moon} alt="" className='desertmoon'  ref={desertmoons}></img>
                    <img src={desertNoSky} alt="" className='desertNoSky'></img>
                    <img src={desertrock} alt="" className='desertrock' ></img>
                    <img src={waterII} alt="" className='waterII' ></img>
                    <img src={man} alt="" ref={mans}></img>
                    <img src={grass} alt="" className='grass' ></img>
                </section>

                <section className='product'>
                    <h2 className='text1'>Number popular</h2>
                    <div className='product-card'>
                        <div className='omg'>
                            <img src={lotter} alt="" className='salmon' ></img>
                            <div className='info'>
                                <div className='price-name'>
                                    <h3  className='spans'>997626</h3>
                                    <span className='span'>$120</span>
                                </div>
                                <div className='bot'><Link to='/lottery' className='btn11'>Buy</Link></div>
                            </div>
                        </div>

                        <div className='omg'>
                            <img src={onetw} alt="" className='onetw' ></img>
                            <div className='info'>
                                <div className='price-name'>
                                    <h3  className='spans'>531222</h3>
                                    <span className='span'>$120</span>
                                </div>
                                <div className='bot'><Link to='/lottery' className='btn11'>Buy</Link></div>
                            </div>
                        </div>

                        <div className='omg'>
                            <img src={lotter} alt="" className='salmon' ></img>
                            <div className='info'>
                                <div className='price-name'>
                                    <h3  className='spans'>897694</h3>
                                    <span className='span'>$120</span>
                                </div>
                                <div className='bot'><Link to='/lottery' className='btn11'>Buy</Link></div>
                            </div>
                        </div>   
                    </div>
                </section>
            </body>
        </>
    )
}
export default HomePage;

{/* <section className='parallax-home'>
                    <img src={sky} ref={minis} alt="" ></img> {/* ภาพตกแต่ง */}
