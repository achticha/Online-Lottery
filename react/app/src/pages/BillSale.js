import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import * as dayjs from 'dayjs';

function BillSale() {
    const currentDate = dayjs(new Date()).format("YYYY-MM-DD");
    const currentTime = dayjs(new Date()).format("HH:mm")

    const [billSales, setBillSales] = useState([]);//array
    const [billSale, setBillSale] = useState({});//object
    const [totalPrice, setTotalPrice] = useState(0);
    const [payDate, SetPayDate] = useState(currentDate);
    const [payTime, setPayTime] = useState(currentTime);
    const [payAlertData, setPayAlertData] = useState(currentDate);
    const [payRemark, setPayRemark] = useState('');
    const [lottos, setLottos] = useState([])

    useEffect(() => {
        fetchData();
        fetchData1();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/lotto/billsale');

            if (res.data.result.length > 0) {
                setBillSales(res.data.result);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })
        }
    }
    const fetchData1 = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/lotto/wherecf');

            if (res.data.results !== undefined) {
                setLottos(res.data.results);
            }

        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })
        }
    }
    const handleSumTotalPrice = (item) => {
        setBillSale(item);

        let sum = 0;
        for (let i = 0; i < item.billSaleDetail.length; i++) {
            const billSaleDetails = item.billSaleDetail[i]
            sum += parseInt(billSaleDetails.price);
        }
        setTotalPrice(sum);
    }

    const handleRemove = async (billSale) => {
        try {
            console.log('5555' + JSON.stringify(billSale));
            const button = await Swal.fire({
                title: 'ลบคำสั่งซื้อ',
                text: 'ยืนยันการลบคำสั่งซื้อ' + billSale.customerName,
                icon: 'question',
                showConfirmButton: true,
                showCancelButton: true
            });

            if (button.isConfirmed) {
                const res = await axios.delete(config.apiPath + "/api/lotto/removeBill/" + billSale.id)
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'ลบคำสั่งซื้อ',
                        text: 'ลบคำสั่งซื้อเรียบร้อยแล้ว',
                        icon: 'success',
                        timer: 500
                    });

                    fetchData();
                }
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error',
            })
        }
    }
    const handlePay = (item) => {
        handleSumTotalPrice(item);
        setPayRemark("");
        setPayAlertData(currentDate);
        SetPayDate(currentDate);
        setPayTime(currentTime);
    }
    const handleConfirmPay = async () => {
        const button = await Swal.fire({
            title: 'ยืนยันการชำระเงิน',
            text: 'บันทึกการชำระเงิน',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
        });
        if (button.isConfirmed) {
            const payload = {
                id: billSale.id,
                payRemark: payRemark,
                payDate: payDate,
                payTime: payTime,
                payAlertData: payAlertData,
            };

            try {
                const result = await axios.post(config.apiPath + '/api/lotto/confirmPay', { billSale: payload });

                if (result.data.message === 'success') {
                    Swal.fire({
                        title: 'บันทึกข้อมูลสำเร็จ',
                        text: 'ระบบได้ทำการบันทึกข้อมูลของคุณเรียบร้อยแล้ว',
                        icon: 'success',
                        timer: 1000
                    });

                    fetchData();

                    document.getElementById('btnCloseModalPay').click();
                    document.getElementById('btnCloseModalBillSaleDetail').click();
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
                <div className="h4" >รายการสั่งซื้อ</div>
                <table className="text-center mt-3 table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>วันที่ทำรายการ</th>
                            <th>ลูกค้า</th>
                            <th>เบอร์โทร</th>
                            <th>ที่อยู่</th>
                            <th>วันที่ชำระ</th>
                            <th width="">สถานะ</th>
                            <th width=""></th>
                        </tr>
                    </thead>
                    <tbody>
                        {billSales.length > 0 ? billSales.map(item =>
                            <tr key={item.id}>
                                <td>{dayjs(item.createdDate).format(config.dataTimeFormat)}</td>
                                <td>{item.customerName}</td>
                                <td>{item.customerPhone}</td>
                                <td>{item.customerAddress}</td>
                                <td>{item.payDate !== null ? (
                                    <>
                                        {dayjs(item.payDate).format(config.dataFormat)}
                                        {" "}
                                        {item.payTime}
                                    </>
                                ) : (
                                    <> - </>
                                )}</td>
                                <td>
                                {item.payDate !== null ? (
                                              <div className="badge bg-info"  style={{ padding: '10px 10px', borderRadius: '100px', width: '130px', textAlign: 'center', fontSize: '15px' }}>สำเร็จ</div>
                                            ) : (
                                                <div className="badge bg-warning " style={{ padding: '10px 10px', borderRadius: '100px', width: '130px', textAlign: 'center', fontSize: '15px' }}>
                                                รอตรวจสอบ
                                            </div>
                                            )}
                                {/* <button data-bs-toggle="modal" data-bs-target="#modalBillSaleDetail" className="btn btn-primary me-2" onClick={(e) => handleSumTotalPrice(item)}>
                                        <i className="fa fa-file me-2"></i>
                                        สถานะ
                                    </button> */}
                                </td>
                                <td className="text-center">
                                    
                                    <button data-bs-toggle="modal" data-bs-target="#modalPay" className="btn btn-success me-2" onClick={(e) => handlePay(item)}>
                                        <i className="fa fa-check me-2"></i>
                                        ชำระเรียบร้อย
                                    </button>
                                    <button onClick={(e) => handleRemove(item)} className="btn btn-danger">
                                        <i className="fa fa-times me-2"></i>
                                        ยกเลิกคำสั่งซื้อ
                                    </button>
                                </td>
                            </tr>
                        ) : <></>}
                    </tbody>
                </table>
            </Home>
            <div className="modal" id="modalBillSaleDetail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">สถานะ</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCloseModalBillSaleDetail"></button>
                        </div>
                        <div className="modal-body">
                            <div className="h5">Bill Sale ID: {billSale.id}</div>
                            <div className="h6">ลูกค้า : {billSale.customerName} {billSale.customerPhone}</div>
                            <div className="mt-3">
                                ที่อยู่ : {billSale.customerAddress}
                            </div>
                            <table className="mt-3 table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th width="50px" className="text-end">ลำดับ</th>
                                        <th className="text-center">เลข</th>
                                        <th className="text-center" width="100px">ราคา</th>
                                        <th width="110"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billSale.billSaleDetail !== undefined ? billSale.billSaleDetail.map((item, index) =>
                                        <tr key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{item.lotto.number}</td>
                                            <td className="text-center">{item.price}</td>
                                            <td className="text-center">
                                                <button className="btn btn-warning">
                                                    <i className="fa fa-times me-2"></i>
                                                    ลบ
                                                </button>
                                            </td>
                                        </tr>
                                    ) : <></>}
                                </tbody>
                            </table>
                            <div className="text-center h5">
                                ยอดเงินรวม : {totalPrice} บาท
                            </div>

                            <div className="mt-3 text-center">
                                <button onClick={(e) => handlePay(billSale)} className="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#modalPay">
                                    <i className="fa fa-check me-2"></i>
                                    ยืนยันการชำระ
                                </button>
                                <button onClick={(e) => handleRemove(billSale)} className="btn btn-danger">
                                    <i className="fa fa-times me-2"></i>
                                    ยกเลิกคำสั่งซื้อ1
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-lg" id="modalPay" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">รายการคำสั่งซื้อ</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCloseModalPay"></button>
                        </div>
                        <div className="modal-body">
                            <div className="h5">Bill Sale ID: {billSale.id}</div>
                            <div className="h6">ลูกค้า : {billSale.customerName} {billSale.customerPhone}</div>
                            <div className="mt-3">
                                ที่อยู่ : {billSale.customerAddress}
                            </div>
                            <table className="mt-3 table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th width="50px" className="text-end">ลำดับ</th>
                                        <th className="text-center">เลข</th>
                                        <th className="text-center" width="100px">ราคา</th>
                                        <th width="110"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billSale.billSaleDetail !== undefined ? billSale.billSaleDetail.map((item, index) =>
                                        <tr key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{item.lotto.number}</td>
                                            <td className="text-center">{item.price}</td>
                                            <td className="text-center">
                                                <button className="btn btn-warning">
                                                    <i className="fa fa-times me-2"></i>
                                                    ลบ
                                                </button>
                                            </td>
                                        </tr>
                                    ) : <></>}
                                </tbody>
                            </table>
                            <div className="text-center h5">
                                ยอดเงินรวม : {totalPrice} บาท
                            </div>
                            <div className="card bg-info mt-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <div>
                                                <label>วันที่ชำระ</label>
                                                <input value={payDate} onChange={(e) => SetPayDate(e.target.value)} className="form-control" type="date"></input>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div>
                                                <label>เวลาที่ชำระเงิน</label>
                                                <input value={payTime} onChange={(e) => setPayTime(e.target.value)} className="form-control" type="time"></input>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div>
                                                <label>วันที่แจ้ง</label>
                                                <input value={payAlertData} onChange={(e) => setPayAlertData(e.target.value)} className="form-control" type="date"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12">
                                            <label>หมายเหตุ</label>
                                            <input value={payRemark} onChange={(e) => setPayRemark(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <button onClick={handleConfirmPay} className="btn btn-success me-2 ">
                                    <i className="fa fa-check me-2"></i>
                                    ยืนยันการชำระเงิน
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillSale;