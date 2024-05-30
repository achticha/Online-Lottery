import Swal from "sweetalert2";
import Home from "./้Home";
import config from "./config";
import axios from "axios";
import { useEffect, useState } from "react";
import * as dayjs from 'dayjs';
import MyModal from "./componnents/MyModal";

function Bonus() {
    const [bonusDetails, setBonusDetails] = useState([]);//ค่านี้จะถูกไปวนลูปเลยต้องเป็น[]
    const [details, setDetails] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/bonus/list');
            if (res.data.results !== undefined) {
                setBonusDetails(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            });
        }
    };


    const handleGetBonus = async () => {
        try {
            const res = await axios.post(config.apiPath + '/api/bonus/getBonus')
            if (res.data.message === 'success') {
                Swal.fire({
                    title: 'ดึงข้อมูลจาก API',
                    text: 'ดึงข้อมูลจาก API มาเข้าฐานข้อมูลได้เรียบร้อย',
                    icon: 'success',
                    timer: 1500
                });

                fetchData();
            }
            if (res.data.message === 'exists') {
                Swal.fire({
                    title: 'ดึงข้อมูลจาก API',
                    text: 'มีข้อมูลในระบบล่าสุดแล้ว',
                    icon: 'success',
                    timer: 1500
                })
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            });
        }
    }

    const handleDetail = async (bonusDate) => {
        try {
            const res = await axios.get(config.apiPath + '/api/bonus/listDetail/' + bonusDate);
            if (res.data.results !== undefined) {
                setDetails(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            });
        }
    }

    return (
        <>
            <Home>
                <div className="h4">ผลรางวัล</div>
                <button onClick={handleGetBonus} className="btn btn-primary">
                    <i className="fa fa-refresh me-2"></i>ดึงผลรางวัลจาก API
                </button>

                <table className="table mt-3 table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>งวดวันที่</th>
                            <th width='120px'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bonusDetails.length > 0 ? bonusDetails.map(item =>
                            <tr key={item.id}>
                                <td>{dayjs(item.bonusDate).format(config.dataTimeFormat)}</td>
                                <td className="text-center">
                                    <button data-bs-target="#MyModal" data-bs-toggle="modal" className="btn btn-primary" onClick={(e) => handleDetail(item.bonusDate)}>
                                        <i className="fa fa-file me-2"></i>ดูข้อมูล
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </Home>
            <MyModal id='MyModal' title='ข้อมูลผลรางวัล' btnCloseId='myButtonClose' modalSize="modal-lg" >
                <table className="table mt-3 table-bordered table-striped">
                    <thead className="text-center">
                        <tr>
                            <th>เลขที่ออก</th>
                            <th>เงินรางวัล</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {details.length > 0 ? (details.map((item =>
                            <tr key={item.id}>
                                <td>{item.number}</td>
                                <td>{item.price.toLocaleString("th-TH")}</td>
                            </tr>
                        ))
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </MyModal>
        </>
    )
}
export default Bonus;