import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import * as dayjs from 'dayjs';
function ReportIncome() {
    const myDate = new Date();

    const [billSaleDetails, setBillSaleDetails] = useState([]);
    const [fromDate, setFromDate] = useState(myDate);
    const [toDate, setToDate] = useState(myDate);
    const [totalPrice, setTotalPrice] = useState(0);
    const [firstLoad, setFirstLoad] = useState(false)

    useEffect(() => {
        if (!firstLoad) {
            setFirstLoad(true);
            fetchData();

        }

        computeSum();
    }, [billSaleDetails]);

    const fetchData = async () => {
        try {
            const payload = {
                fromDate: fromDate,
                toDate: toDate
            }
            const res = await axios.post(config.apiPath + '/api/billSale/income', payload)
            if (res.data.results != undefined) {
                setBillSaleDetails(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            });
        }
    };

    const computeSum = () => {
        let sum = 0;
        for (let i = 0; i < billSaleDetails.length; i++) {
            let item = billSaleDetails[i]

            sum += item.price;
        }
        setTotalPrice(sum);
    }

    return (
        <>
            <Home>
                <div className="h4">รายงานรายได้</div>
                <div className="mt-3">
                    <div className="alert alert-info">
                        <div className="row">
                            <div className="col-6">
                                <label>จากวันที่</label>
                                <input value={dayjs(fromDate).format(config.dateFormat)} onChange={(e) => setFromDate(e.target.value)} className="form-control" type="date"></input>
                            </div>
                            <div className="col-6">
                                <label>ถึงวันที่</label>
                                <input value={dayjs(toDate).format(config.dateFormat)} onChange={(e) => setToDate(e.target.value)} className="form-control" type="date"></input>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button onClick={fetchData} className="btn btn-primary">
                                <i className="fa fa-check me-2"></i>แสดงรายการ
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-4 text-center">
                    <span className="h5">ยอดเงิน : {totalPrice.toLocaleString('th-TH')} บาท</span>
                </div>
                <table className="text-center mt-3 table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>เลข</th>
                            <th>ยอดเงิน</th>
                            <th>วันที่โอน</th>
                            <th>ลูกค้า</th>
                            <th>เบอร์โทร</th>
                            <th>ที่อยู่</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billSaleDetails.length > 0 ? billSaleDetails.map((item => (
                            <tr key={item.id}>
                                <td>{item.lotto.number}</td>
                                <td>{item.price}</td>
                                <td>{dayjs(item.billSale.payDate).format(config.dataFormat)}{""} {item.billSale.payTime}</td>
                                <td>{item.billSale.customerName}</td>
                                <td>{item.billSale.customerPhone}</td>
                                <td>{item.billSale.customerAddress}</td>
                            </tr>
                        ))
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </Home>
        </>
    )
}
export default ReportIncome;