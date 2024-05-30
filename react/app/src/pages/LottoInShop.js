import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import * as dayjs from 'dayjs';
import MyModal from "./componnents/MyModal";

function LottoInShop() {
    const [billSales, setBillSales] = useState([]);
    const [billSale, setBillSale] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/lotto/lottoInShop');

            if (res.data.results !== null) {
                setBillSales(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })
        }
    };
    const handleInfo = (item) => {
        setBillSale(item)
    }
    return (
        <>
            <Home>
                <div className="h4">รายการที่ฝากร้าน</div>
                {billSales.length > 0 ? (
                    <table className="text-center table mt-3 table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>เลขบิล</th>
                                <th>ลูกค้า</th>
                                <th>เบอร์โทร</th>
                                <th>วันที่ชำระ</th>
                                <th>เวลาที่ชำระ</th>
                                <th width="111px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {billSales.length > 0 ? billSales.map(item =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.customerName}</td>
                                    <td>{item.customerPhone}</td>
                                    <td>{dayjs(item.payDate).format(config.dataFormat)}</td>
                                    <td>{item.payTime}</td>
                                    <td className="text-center">
                                        <button data-bs-target="#modalDetail" data-bs-toggle="modal" className="btn btn-primary" onClick={(e) => handleInfo(item)}>
                                            <i className="fa fa-file me-1"></i> ดูเลข
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div className="h5 mt-3 text-center" style={{ color: 'red' }}>ไม่มีรายการที่ฝากร้าน</div>
                )}
            </Home>

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
    );
}
export default LottoInShop;