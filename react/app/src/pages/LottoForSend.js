import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import * as dayjs from 'dayjs';
import MyModal from "./componnents/MyModal";

function LottoForSend() {
    const currentDate = dayjs(new Date()).format("YYYY-MM-DD");
    const currentTime = dayjs(new Date()).format("HH:mm")

    const [billSales, setBillSales] = useState([]);
    const [billSale, setBillSale] = useState({});
    const [sendName, setSendName] = useState('');
    const [sendData, setSendData] = useState(currentDate);
    const [sendTime, setSendTime] = useState(currentTime);
    const [traceCode, setTraceCode] = useState('');
    const [sendPlatform, setSendPlatform] = useState('');
    const [remark, setRemark] = useState('');
    const [price, setPrice] = useState(0);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/lotto/lottoForSend');

            if (res.data.results !== undefined) {
                setBillSales(res.data.results);
            }

        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })
        }
    }
    const handleInfo = (item) => {
        setBillSale(item)
    }

    const handleSave = async () => {
        const button = await Swal.fire({
            title: 'บันทึกการจัดส่ง',
            text: 'ยืนยันบันทึกการจัดส่งบันทึก',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
        });

        if (button.isConfirmed) {
            try {
                const payload = {
                    data: {
                        billSaleId: billSale.id,
                        sendName: sendName,
                        sendData: new Date(sendData),
                        sendTime: sendTime,
                        traceCode: traceCode,
                        sendPlatform: sendPlatform,
                        remark: remark,
                        price: parseInt(price),
                    },
                };
                const res = await axios.post(config.apiPath + "/api/lotto/sendSave", payload)
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'จัดส่ง',
                        text: 'บันทึกการจัดส่งแล้วเรียบร้อย',
                        icon: 'success',
                        timer: 1000
                    })
                    
                    fetchData();
                    setSendName('');
                    document.getElementById('btnCloseSend').click();
                }

            } catch (e) {
                Swal.fire({
                    title: 'error',
                    text: e,
                    icon: 'error'
                });
            }
        }
    }

    return (
        <>
            <Home>
                <div className="h4">รายการที่ต้องจัดส่ง</div>
                {billSales.length > 0 ? (
                    <table className="table mt-3 table-bordered table-striped text-center">
                        <thead>
                            <tr>
                                <th>เลขบิล</th>
                                <th>ลูกค้า</th>
                                <th>เบอร์โทร</th>
                                <th>ที่อยู่</th>
                                <th>วันที่ชำระ</th>
                                <th>เวลาที่ชำระ</th>
                                <th>วันที่จัดส่ง</th>
                                <th>ค่าจัดส่ง</th>
                                {billSales.length > 0 && <th width='200px'></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {billSales.map(item =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.customerName}</td>
                                    <td>{item.customerPhone}</td>
                                    <td>{item.customerAddress}</td>
                                    <td>{dayjs(item.payDate).format(config.dataFormat)}</td>
                                    <td>{item.payTime}</td>
                                    <td>{item.BillSaleForSend.length > 0 ? (
                                        <>
                                            <span>
                                                {dayjs(item.BillSaleForSend[0].sendData).format(config.dataFormat
                                                )}
                                            </span>{" "}
                                            <span>{item.BillSaleForSend[0].sendTime}</span>
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                    </td>
                                    <td>{item.BillSaleForSend.length > 0 ? item.BillSaleForSend[0].price : "-"}</td>
                                    {billSales.length > 0 &&
                                        <td className="text-center">
                                            <button data-bs-target="#modalDetail" data-bs-toggle="modal" className="btn btn-primary me-2" onClick={(e) => handleInfo(item)}>
                                                <i className="fa fa-file me-2"></i>ดูเลข
                                            </button>
                                            {item.BillSaleForSend.length > 0 ? (
                                                <button className="btn btn-success disabled"> จัดส่ง
                                                    <i className="fa fa-chevron-right ms-2"></i>
                                                </button>
                                            ) : (
                                                <button className="btn btn-success" data-bs-target="#modalSend" data-bs-toggle="modal" onClick={(e) => setBillSale(item)} >
                                                    จัดส่ง
                                                    <i className="fa fa-chevron-right ms-2"></i>
                                                </button>
                                            )}
                                        </td>}
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div className="h5 mt-3 text-center" style={{ color: 'red' }}>ไม่มีรายการที่ต้องจัดส่ง</div>
                )}
            </Home>

            <MyModal title="บันทึกการจัดส่ง" id="modalSend" btnCloseId="btnCloseSend">
                <div>
                    <label>ผู้จัดส่ง</label>
                    <input onChange={(e) => setSendName(e.target.value)} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>วันที่ส่ง</label>
                    <input onChange={(e) => setSendData(e.target.value)} type="date" value={sendData} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>เวลา</label>
                    <input onChange={(e) => setSendTime(e.target.value)} type="time" value={sendTime} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>เลขติดตาม</label>
                    <input onChange={(e) => setTraceCode(e.target.value)} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>ช่องทางการจัดส่ง</label>
                    <input onChange={(e) => setSendPlatform(e.target.value)} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>หมายเหตุ</label>
                    <input onChange={(e) => setRemark(e.target.value)} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>ค่าจัดส่ง</label>
                    <input onChange={(e) => setPrice(e.target.value)} className="form-control"></input>
                </div>
                <div className="mt-3 text-center">
                    <button onClick={handleSave} className="btn btn-primary">
                        <i className="fa fa-check me-2"></i>บันทึก
                    </button>
                </div>

            </MyModal>

            <MyModal title="รายการที่ลูกค้าซื้อ" id="modalDetail" btnCloseId="btnClose">
                <div>Bill id : {billSale.id}</div>
                <div className="mt-1"> ชื่อ : {billSale.customerName} เบอร์โทร : {billSale.customerPhone} </div>

                <div className="h5 mt-3">รายการ</div>
                <table className="table table-bordered table-striped mt-3">
                    <thead>
                        <tr>
                            <th className="text-center">เลข</th>
                            <th className="text-center">ยอดเงิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billSale.billSaleDetail !== undefined ?
                            billSale.billSaleDetail.map(item => (
                                <tr>
                                    <td className="text-center">{item.lotto.number}</td>
                                    <td className="text-center">{item.price}</td>
                                </tr>
                            ))
                            : <></>
                        }

                    </tbody>
                </table>
            </MyModal>
        </>
    )
}
export default LottoForSend;