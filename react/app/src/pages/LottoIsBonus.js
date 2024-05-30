import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import dayjs from "dayjs";

function LottoIsBonus() {
    const [lottoIsBonus, setLottoIsBonus] = useState([]);

    useEffect(() => {
        handleLottoIsBonus();
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/bonus/lottoIsBonusList');

            if (res.data.results !== undefined) {
                setLottoIsBonus(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error',
            });
        }
    };

    const handleLottoIsBonus = async () => {
        try {
            await axios.get(config.apiPath + '/api/bonus/lottoIsBonus')
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            });
        }
    };

    return (
        <Home>
            <div className="h4">รายงานผลรางวัลของตัวเอง</div>
            <table className="text-center mt-3 table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>เลข</th>
                        <th>ยอดเงิน</th>
                    </tr>
                </thead>
                <tbody>
                    {lottoIsBonus.length > 0 ? lottoIsBonus.map(item =>
                        <tr key={item.id}>
                            <td>{dayjs(item.BonusResultDetail.bonusDate).format(config.dataTimeFormat)}</td>
                            <td>{item.BonusResultDetail.number}</td>
                            <td>{item.BonusResultDetail.price.toLocaleString("th-TH")}</td>
                        </tr>
                    ) : (
                        <></>
                    )}

                </tbody>
            </table>
        </Home>
    )
}
export default LottoIsBonus;