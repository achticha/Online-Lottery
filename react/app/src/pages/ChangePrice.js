import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";

function ChangePrice() {
    const [lottos, setLottos] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/lotto/listForSale')

            if (res.data.results !== undefined) {
                setLottos(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            });
        }
    };
    const handleSave = async () => {
        try {
            //ส่งแค่เฉพาะที่มีการเปลี่ยนแปลง
            let arr = [];

            for (let i = 0; i < lottos.length; i++) {
                const item = lottos[i];

                if (item.newPrice !== undefined) {
                    arr.push(item);
                }
            }
            const res = await axios.put(config.apiPath + '/api/lotto/changePrice', arr);

            if (res.data.message === 'success') {
                Swal.fire({
                    title: 'ปรับราคา',
                    text: 'บันทึกการปรับราคาเรียบร้อยแล้ว',
                    icon: 'success',
                    timer: 1000
                });
                 fetchData();
            }

        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })
        }
    };

    const ChangeValue = (number, newPrice) => {
        let newArr = [];
        for (let i = 0; i < lottos.length; i++) {
            let item = lottos[i];

            if (item.number === number) {
                item.newPrice = newPrice.trim() !== "" ? parseInt(newPrice) : 0; // กำหนดให้เป็น 0 หาก newPrice เป็นค่าว่าง
            }

            newArr.push(item);
        }
        setLottos(newArr);
    };

    return (
        <Home>
            <div className="h4">ปรับราคาแบบเร่งด่วน</div>
            <table className="table table-bordered table-striped mt-4">
                <thead>
                    <tr >
                        <th>เลข</th>
                        <th width="310px">ราคาเดิม</th>
                        <th width="310px">ราคาใหม่</th>
                    </tr>
                </thead>
                <tbody>
                    {lottos.length > 0 ? lottos.map((item => (
                        <tr key={item.id}>
                            <td>{item.number}</td>
                            <td>{item.sale}</td>
                            <td><input
                                className="form-control text-end"
                                value={item.newPrice === undefined ? (item.sale || "") : item.newPrice}
                                onChange={(e) => ChangeValue(item.number, e.target.value)}
                            />
                            </td>
                        </tr>
                    ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </table>
            <div className="mt-3 text-center">
                <button onClick={handleSave} className="btn btn-primary">
                    <i className="fa fa-check me-2"></i>บันทึกการปรับราคา
                </button>
            </div>
        </Home>
    )
}
export default ChangePrice;