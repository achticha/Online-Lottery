import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import './css/Buy.css';
import { Link } from "react-router-dom";
import robot from './image/robot.png'

function Lottery() {
  const [lottos, setLottos] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhon] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  //const [banners, setBanners] = useState('');


  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const handleChangInput1 = (value) => {
    if (value.length > 0) {
      setInput1(value);
      ref2.current.focus();
    }
  }

  const handleChangInput2 = (value) => {
    if (value.length > 0) {
      setInput2(value);
      ref3.current.focus();
    }
  }

  const handleChangInput3 = (value) => {
    if (value.length > 0) {
      setInput3(value);
      ref4.current.focus();
    }
  }

  const handleChangInput4 = (value) => {
    if (value.length > 0) {
      setInput4(value);
      ref5.current.focus();
    }
  }

  const handleChangInput5 = (value) => {
    if (value.length > 0) {
      setInput5(value);
      ref6.current.focus();
    }
  }

  const handleChangInput6 = (value) => {
    if (value.length > 0) {
      setInput6(value);
    }
  }

  useEffect(() => {
    if (!isLoad) {
      fetchData();
      setIsLoad(true);

    }
    computePrice();
  }, [carts, isLoad])

  // const fetchDataBanner = async () => {
  //   try {
  //     const res = await axios.get(config.apiPath + '/api/banner/list');

  //     if (res.data.results !== undefined) {
  //       setBanners(res.data.results);
  //     }
  //   } catch (e) {
  //     Swal.fire({
  //       title: 'error',
  //       text: e,
  //       icon: 'error'
  //     })
  //   }
  // }

  const computePrice = () => {
    let sum = 0;
    for (let i = 0; i < carts.length; i++) {
      sum += parseInt(carts[i].item.sale)
    }
    setTotalPrice(sum);
  }

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + '/api/lotto/listForSale');
      setLottos(res.data.results);

    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e,
        icon: 'error'
      })
    }
  }

  const handleSearch = async () => {
    try {
      let position = " ";
      if (input1 !== "" && input6 === "") {
        position = 'start';
      } else if (input1 === "" && input6 !== "") {
        position = 'end';

      }
      const payload = {
        number: input1 + input2 + input3 + input4 + input5 + input6,
        position: position
      }
      const res = await axios.post(config.apiPath + '/api/lotto/search', payload);

      if (res.data.results.length > 0) {
        setLottos(res.data.results);
      } else {
        Swal.fire({
          title: 'error',
          text: 'ค้นหาไม่พบ',
          icon: 'error'
        })
      }

    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e,
        icon: 'error'
      })
    }

  }
  const handleClearFormSearch = () => {
    setInput1("");
    setInput2("");
    setInput3("");
    setInput4("");
    setInput5("");
    setInput6("");

    fetchData();
  }

  const handleAddToCart = (item) => {
    setCarts([...carts, { item: item, qty: 1 }]);
  }

  const handleRemoveItem = (index) => {
    setCarts((carts) => {
      return carts.filter((item, i) => i !== index);
    });
  }
  const handleComfirmBuy = async () => {
    const button = await Swal.fire({
      title: 'ยืนยันคำสั่งซื้อ',
      text: 'คุณยืนยันการทำทำรายการ ใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    })

    if (button.isConfirmed) {
      const payload = {
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        carts: carts
      }
      const res = await axios.post(config.apiPath + '/api/lotto/confirmBuy', payload);

      if (res.data.message === 'success') {
        Swal.fire({
          title: 'บันทึกข้อมูลสำเร็จ',
          text: 'เราได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว',
          icon: 'success',
          timer: 1000
        })
        setCarts([]);
        document.getElementById('btnCloseModel').click();
      }
    }
  };
  const handleStartForm = () => {
    setCustomerName("");
    setCustomerPhon("");
    setCustomerAddress("");
  };

  // const showImage = (name) => {
  //   const fullPath = config.apiPath + "/uploads/" + name;
  //   return <img src={fullPath} className="img-fluid" width={"400px"}></img>
  // }

  return (
    <>
      <div className="bodyi">
        <header className='headers'>
          <div className='monry'><Link to='/'><img src={robot} alt=""></img></Link></div>
          <nav className='takra'>
            {carts.length > 0 &&
              <div>
                <button data-bs-toggle="modal" data-bs-target="#modalBillSaleDetail" className="linktakra">
                  <i className="fa fa-shopping-cart me-2"></i>{carts.length}
                </button>
              </div>
            }
          </nav>
        </header>

        {/* <div className="mt-3 container-fluid">
                      <div className="row">
                          {banners.length > 0 ? (
                              banners.map((item) =>
                                  <div className="col-3 mt-3">{showImage(item.name)}</div>)
                          ) : (
                              <></>
                          )}
                      </div>
                  </div> */}

        {/* <div className="mt-3">
          <div className="">
            {carts.length > 0 ? (<div>
              <>
                <div className="h4">สินค้าในตะกร้าของฉัน</div>
                <div className="mt-3">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th className="bg-dark text-white">เลข</th>
                        <th className="bg-dark text-white text-end">ราคา</th>
                        <th className="bg-dark text-white text-end">จำนวน</th>
                        <th className="bg-dark text-white text-end">ยอดเงินรวม</th>
                        <th className="bg-dark text-white" width="150px"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((item, index) => (
                        <tr key={item.number}>
                          <td><div className="h5 text-primary">{item.item.number}</div></td>
                          <td className="text-end">{item.item.sale}</td>
                          <td className="text-end ">{item.qty}</td>
                          <td className="text-end">{item.qty * item.item.sale}</td>
                          <td className="text-center">
                            <button onClick={(e) => { handleRemoveItem(index) }} className="btn btn-danger">
                              <i className="fa fa-times me-2"></i>
                              ลบรายการ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody></table>
                  <div className="text-center h3 text-success mt-3 mb-2">
                    ยอดรวม {totalPrice.toLocaleString("th-TH")} บาท
                  </div>
                  <div className="text-center mt-3">
                    <button data-bs-toggle="modal" data-bs-target="#modalConfirm" className="btn btn-primary" onClick={handleStartForm}>
                      <i className="fa fa-check me-2"></i>
                      ยืนยันการซื้อ
                    </button>
                  </div>
                </div>
              </>
            </div>
            ) : (<></>)}
          </div>
        </div> */}


        <div className="textkk text-center"> Lottery </div>
        <div className="mt-5 text-center">
          <input style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input1}
            onChange={(e) => handleChangInput1(e.target.value)}
          ></input>
          <input style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input2}
            ref={ref2}
            onChange={(e) => handleChangInput2(e.target.value)}
          ></input>
          <input style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input3}
            ref={ref3}
            onChange={(e) => handleChangInput3(e.target.value)}
          ></input>
          <input style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input4}
            ref={ref4}
            onChange={(e) => handleChangInput4(e.target.value)}
          ></input>
          <input style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input5}
            ref={ref5}
            onChange={(e) => handleChangInput5(e.target.value)}
          ></input>
          <input style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input6}
            ref={ref6}
            onChange={(e) => handleChangInput6(e.target.value)}
          ></input>
        </div>

        <div className="text-center mt-3">
          <button onClick={handleClearFormSearch} className="btn btn-danger me-2" >
            <i className="fa fa-refresh me-2"></i>
            clear
          </button>
          <button onClick={handleSearch} className="btn btn-primary">
            <i className="fa fa-search me-2"></i>
            ค้นหา
          </button>
        </div>

        <div className="mt-5 container-fluid ps-5 pe-5 mb-5 ">
          <div className="row">
            {lottos.length > 0 ? lottos.map(item =>
              <div className="col-3" key={item.number}>
                <div className="boxlotto">
                  <div className="card-body text-center">
                    <div className="textw1">{item.number}</div>
                    <div className="textw2">{item.sale} บาท</div>
                    <div className="mt-3">
                      <button onClick={(e) => handleAddToCart(item)} className="btn1">
                        <i className="fa fa-shopping-cart me-2"></i>
                        เลือกซื้อ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : ''}
          </div>
        </div>
        <div class="modal" id="modalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">ยืนยันข้อมูลการซื้อ</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCloseModel"></button>
              </div>
              <div class="modal-body">
                <div className="alert alert-info">
                  <div>ชำระเงิน</div>
                  <div>ช่องทางการชำระเงิน</div>
                  <div>แนบสลิป</div>
                </div>
                <div className="mt-3">
                  <div>ชื่อผู้ซื้อ</div>
                  <div><input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control"></input></div>
                  <div className="mt-3">เบอร์โทร</div>
                  <div><input value={customerPhone} onChange={(e) => setCustomerPhon(e.target.value)} className="form-control"></input></div>
                  <div className="mt-3">ที่อยู่ในการจัดส่ง (หากต้องการฝากไว้ที่ร้าน ไม่ต้องกรอกข้อมูลช่องนี้)</div>
                  <div><input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="form-control"></input></div>
                  <div className="mt-3">
                    <button onClick={handleComfirmBuy} className="btn btn-primary">
                      <i className="fa-regular fa-share-from-square me-2"></i>send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="modal" id="modalBillSaleDetail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-3" id="exampleModalLabel">รายการคำสั่งซื้อ</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCloseModalBillSaleDetail"></button>
              </div>
              <div className="mt-3">
                <div className="wht">
                  {carts.length > 0 ? (<div>
                    <>
                      <div className="h4">สินค้าในตะกร้าของฉัน</div>
                      <div className="mt-3">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th className="bg-dark text-white">เลข</th>
                              <th className="bg-dark text-white text-end">ราคา</th>
                              <th className="bg-dark text-white text-end">จำนวน</th>
                              <th className="bg-dark text-white text-end">ยอดเงินรวม</th>
                              <th className="bg-dark text-white" width="150px"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {carts.map((item, index) => (
                              <tr key={item.number}>
                                <td><div className="h5 text-primary">{item.item.number}</div></td>
                                <td className="text-end">{item.item.sale}</td>
                                <td className="text-end ">{item.qty}</td>
                                <td className="text-end">{item.qty * item.item.sale}</td>
                                <td className="text-center">
                                  <button onClick={(e) => { handleRemoveItem(index) }} className="btn btn-danger">
                                    <i className="fa fa-times me-2"></i>
                                    ลบรายการ
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody></table>
                        <div className="text-center h3 text-success mt-3 mb-2">
                          ยอดรวม {totalPrice.toLocaleString("th-TH")} บาท
                        </div>
                        <div className="text-center mt-3">
                          <button data-bs-toggle="modal" data-bs-target="#modalConfirm" className="btn btn-primary" onClick={handleStartForm}>
                            <i className="fa-solid fa-circle-dollar-to-slot me-2"></i>
                            ยืนยันการซื้อ
                          </button>
                        </div>
                      </div>
                    </>
                  </div>
                  ) : (<></>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lottery;