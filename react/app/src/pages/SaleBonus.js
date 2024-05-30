import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import * as dayjs from 'dayjs';
import MyModal from "./componnents/MyModal";

function SaleBonus() {
    const [billSaleDetailBonus, setBillSaleDetailBonus] = useState([]);
    const [transferMoneyDate, setTransferMoneyDate] = useState('');
    const [transferMoneyTime, setTransferMoneyTime] = useState('');
    const [price, setPrice] = useState(0);
    const [billSaleId, setBillSaleId] = useState(0);
    const [deliverDate, setDeliverDate] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/bonus/checkBonus');

            if (res.data.results != undefined) {
                setBillSaleDetailBonus(res.data.results);
            }

        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })
        }
    }

    const handleTransferMoney = async () => {
        const button = await Swal.fire({
            title: 'ยืนยันการบันทึก',
            text: 'ต้องการบันทึกข้อมูล ใช่หรือไม่',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        });

        if (button.isConfirmed) {
            try {
                const payload = {
                    billSaleId: parseInt(billSaleId),
                    transferMoneyTime: transferMoneyTime,
                    transferMoneyDate: new Date(transferMoneyDate),
                    price: parseInt(price)

                }
                const res = await axios.post(config.apiPath + '/api/billSale/transferMoney', payload);
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                        text: 'ระบบบันทึกข้อมูลเรียบร้อยแล้ว',
                        icon: 'success',
                        timer: 1000
                    });
                    await fetchData();
                    document.getElementById('btnCloseModalTransfer').click();
                }
            } catch (e) {
                Swal.fire({
                    title: 'error',
                    text: e,
                    icon: 'error'
                })
            }
        }
    }

    const handleDeliverMoney = async () => {
        const button = await Swal.fire({
            title: 'ยืนยันการบันทึก',
            text: 'ต้องการบันทึกข้อมูล ใช่หรือไม่',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        });

        if (button.isConfirmed) {
            try {
                const payload = {
                    billSaleId: parseInt(billSaleId),
                    deliverDate: new Date(deliverDate),
                    price: parseInt(price)

                }
                const res = await axios.post(config.apiPath + '/api/billSale/deliverMoney', payload);
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                        text: 'ระบบบันทึกข้อมูลเรียบร้อยแล้ว',
                        icon: 'success',
                        timer: 1000
                    });
                    await fetchData();
                    document.getElementById('btnCloseModalDeliverMoney').click();
                }
            } catch (e) {
                Swal.fire({
                    title: 'error',
                    text: e,
                    icon: 'error'
                })
            }
        }
    }

    return (
        <>
            <Home>
                <div className="h4">รายงานผู้ถูกรางวัล</div>

                <table className="table mt-3 table-bordered table-striped text-center">
                    <thead>
                        <tr>
                            <th>เลข</th>
                            <th>ยอดเงิน</th>
                            <th>งวดวันที่</th>
                            <th>ลูกค้า</th>
                            <th>เบอร์โทร</th>
                            <th>วันที่โอนเงิน</th>
                            <th>เวลาที่โอน</th>
                            <th>วันที่ส่งมอบเงิน</th>
                            <th width="320px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {billSaleDetailBonus.length > 0 ? billSaleDetailBonus.map((item) =>
                            <tr key={item.id}>
                                <td>{item.number}</td>
                                <td>{item.bonusPrice.toLocaleString("th-TH")}</td>
                                <td>{dayjs(item.bonusDate).format(config.dataFormat)}</td>
                                <td>{item.billSaleDetail.billSale.customerName != undefined ? item.billSaleDetail.billSale.customerName : ''}</td>
                                <td>{item.billSaleDetail.billSale.customerPhone != undefined ? item.billSaleDetail.billSale.customerPhone : ''}</td>
                                <td>{item.billSaleDetail.billSale.transferMoneyDate != undefined ? dayjs(item.billSaleDetail.billSale.transferMoneyDate).format(config.dataFormat) : ''}</td>
                                <td>{item.billSaleDetail.billSale.transferMoneyTime != undefined ? item.billSaleDetail.billSale.transferMoneyTime : ''}</td>
                                <td>{item.billSaleDetail.billSale.deliverDate != undefined ? dayjs(item.billSaleDetail.billSale.deliverDate).format(config.dataFormat) : ''}</td>
                                <td className="text-center">
                                    <button data-bs-target="#modalDeliverMoney"data-bs-toggle="modal" className="btn btn-success me-2" onClick={(e) => setBillSaleId(item.billSaleDetail.billSaleId)}>
                                        <i className="fa fa-check me-2"></i>โอนเงินให้ {item.billSaleDetail.billSaleId}
                                    </button>
                                    <button data-bs-target="#modalTransfer" data-bs-toggle="modal" className="btn btn-success me-2" onClick={(e) => setBillSaleId(item.billSaleDetail.billSaleId)} >
                                        <i className="fa fa-person me-2"></i>นำเงินไปมอบ
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <></>
                        )}

                    </tbody>
                </table>
            </Home>

            <MyModal id="modalTransfer" title="นำเงินไปมอบให้ลูกค้า" btnCloseId="btnCloseModalTransfer">
                <div>
                    <label>วันที่โอนเงิน</label>
                    <input onChange={(e) => setTransferMoneyDate(e.target.value)} value={transferMoneyDate} className="form-control" type="date"></input>
                </div>
                <div className="mt-3">
                    <label>เวลาโอน</label>
                    <input onChange={(e) => setTransferMoneyTime(e.target.value)} value={transferMoneyTime} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>ยอดเงิน</label>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <button onClick={handleTransferMoney} className="btn btn-primary">
                        <i className="fa fa-check me-2"></i>บันทึก
                    </button>
                </div>
            </MyModal>

            <MyModal id="modalDeliverMoney" title="โอนเงิน" btnCloseId="btnCloseModalDeliverMoney">
                <div>
                    <label>วันที่ส่งมอบเงิน</label>
                    <input onChange={(e) => setDeliverDate(e.target.value)} value={deliverDate} className="form-control" type="date"></input>
                </div>
                <div className="mt-3">
                    <label>ยอดเงิน</label>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <button onClick={handleDeliverMoney} className="btn btn-primary">
                        <i className="fa fa-check me-2"></i>บันทึก
                    </button>
                </div>
            </MyModal>
        </>
    )
}
export default SaleBonus;