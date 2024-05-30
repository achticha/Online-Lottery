import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import * as dayjs from 'dayjs';


function ReportProfit() {
    const myDate = new Date();
    const [fromDate, setFromDate] = useState(myDate);
    const [toDate, setToDate] = useState(myDate);
    const [results, setResults] = useState([]);
    const [sumSale, setSumSale] = useState(0);
    const [sumBonus, setSumBonus] = useState(0);
    const [sumCost, setSumCost] = useState(0);

    useEffect(() => {
        handleSumSale();
        handleSumBonus();
        handleSumCost();
    }, [results]);

    const handleSumSale = () => {
        if (results.billSaleDatails !== undefined) {
            let sum = 0

            for (let i = 0; i < results.billSaleDatails.length; i++) {
                sum += results.billSaleDatails[i].price
            }
            setSumSale(sum);
        }
    };

    const handleSumBonus = () => {
        if (results.lottoIsBonus !== undefined) {
            let sum = 0

            for (let j = 0; j < results.lottoIsBonus.length; j++) {
                sum += results.lottoIsBonus[j].BonusResultDetail.price
            }
            setSumBonus(sum);
        }
    };

    const handleSumCost = () => {
        if (results.lottos !== undefined) {
            let sum = 0

            for (let k = 0; k < results.lottos.length; k++) {
                sum += results.lottos[k].cost;
            }
            setSumCost(sum);
        }
    };

    const fetchData = async () => {
        try {
            const payload = {
                fromDate: fromDate,
                toDate: toDate,
            }
            const res = await axios.post(config.apiPath + '/api/billSale/profit', payload);
            if (res.data !== undefined) {
                setResults(res.data);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error',
            });
        }
    };
    return (
        <Home>
            <div className="h4">รายงานผลกำไร</div>
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

            <div className="mt-4 mb-4  row  text-center">
                <div className="col-3">
                    <div>รายได้จากการขาย</div>
                    <div className="alert alert-success">{sumSale.toLocaleString("th-TH")}</div>
                    <table className="mt-3 table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>ราคาขาย</th>
                                <th>เลข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.billSaleDatails !== undefined && results.billSaleDatails.length > 0 ? (
                                results.billSaleDatails.map(item => (
                                    <tr key={item.id}>
                                        <td>{dayjs(item.billSale.payDate).format(config.dataFormat)}{"    "}{item.billSale.payTime}</td>
                                        <td>{item.price}</td>
                                        <td>{item.lotto.number}</td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <div>รายได้จากผลรางวัล</div>
                    <div className="alert alert-success">{sumBonus.toLocaleString("th-TH")}</div>
                    <table className="mt-3 table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>ยอดเงิน</th>
                                <th>เลข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.lottoIsBonus !== undefined && results.lottoIsBonus.length > 0 ? (
                                results.lottoIsBonus.map(item => (
                                    <tr key={item.id}>
                                        <td>{dayjs(item.BonusResultDetail.bonusDate).format(config.dataTimeFormat)}</td>
                                        <td>{item.BonusResultDetail.price.toLocaleString("th-TH")}</td>
                                        <td>{item.BonusResultDetail.number}</td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <div>ต้นทุนซื้อ</div>
                    <div className="alert alert-danger">{sumCost.toLocaleString("th-TH")}</div>
                    <table className="mt-3 table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>ยอดเงิน</th>
                                <th>เลข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.lottos !== undefined && results.lottos.length > 0 ? (
                                results.lottos.map(item => (
                                    <tr key={item.id}>
                                        <td>{dayjs(item.lottoDate).format(config.dataTimeFormat)}</td>
                                        <td>{item.sale.toLocaleString("th-TH")}</td>
                                        <td>{item.number}</td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <div>ผลกำไร</div>
                    <div className="alert alert-primary ">
                        {((sumSale + sumBonus) - sumCost).toLocaleString("th-TH")}
                    </div>
                </div>
            </div>
        </Home >
    )
}
export default ReportProfit;