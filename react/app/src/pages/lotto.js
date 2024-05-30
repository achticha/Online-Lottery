import { useEffect, useState, useRef } from "react";
import Home from "./้Home";
import axios from "axios";
import Swal from "sweetalert2";
import config from "./config";
import * as dayjs from 'dayjs';
function Lotto() {
    const [number, setNumber] = useState('')
    const [roundNumber, setRoundNumber] = useState('')
    const [bookNumber, setBookNumber] = useState('')
    const [cost, setCost] = useState('')
    const [sale, setSale] = useState('')
    const [lottos, setLottos] = useState([])
    const [id, setId] = useState(0);
    const [lottoDate, setLottoDate] = useState(new Date())

    const myRef = useRef();

    useEffect(() => {
        myRef.current.focus();
        fetchData();

    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/lotto/list');
            if (res.data.results != undefined) {
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

    const handleSave = async () => {
        try {
            const payload = {
                number: number,
                roundNumber: parseInt(roundNumber),
                bookNumber: parseInt(bookNumber),
                cost: parseInt(cost),
                sale: parseInt(sale),
                lottoDate: new Date(lottoDate),
            }
            let res;

            if (id === 0) {
                res = await axios.post(config.apiPath + '/api/lotto/creact', payload);
            } else {
                res = await axios.put(config.apiPath + '/api/lotto/edit/' + id, payload)

            }


            if (res.data.result.id != undefined) {
                // ทำการเซ็ตค่า state ของ input ให้เป็นค่าว่างทั้งหมด
                setNumber('');
                setRoundNumber('');
                setBookNumber('');
                setCost('');
                setSale('');

                myRef.current.focus();
                myRef.current.select();

                fetchData();
                setId(0);
            }

        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })

        }
    }
    const handleDelete = async (item) => {
        try {
            Swal.fire({
                title: "Confirm Delete",
                text: "Are you sure for delete",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
            }).then(async res => {
                if (res.isConfirmed) {
                    const resFromApi = await axios.delete(config.apiPath + '/api/lotto/remove/' + item.id);

                    if (resFromApi.data.result.id != undefined) {
                        Swal.fire({
                            title: 'delete',
                            text: 'delete data success',
                            icon: 'success',
                            timer: 1000,
                        });

                        fetchData();
                    }

                }
            })
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })
        }
    }

    const handleEdit = (item) => {
        setNumber(item.number);
        setRoundNumber(item.roundNumber);
        setBookNumber(item.bookNumber);
        setCost(item.cost);
        setSale(item.sale);
        setId(item.id)
    }

    return (
        <>
            <Home>
                <div className="h4">ข้อมูล Lottery</div>

                <div className="alert alert-info mt-3 ">
                    <div className="row">
                        <div className="col-3">
                            <label>วันที่ซื้อเข้า</label>
                            <input value={dayjs(lottoDate).format(config.dateFormat)} onChange={(e) => setLottoDate(e.target.value)} className="form-control" type="date"></input>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3">
                            <label>เลข</label>
                            <input value={number} ref={myRef} onChange={e => setNumber(e.target.value)} className="form-control"></input>
                        </div>
                        <div className="col-3">
                            <label>เล่มที่</label>
                            <input value={bookNumber} onChange={e => setBookNumber(e.target.value)} className="form-control"></input>
                        </div>
                        <div className="col-2">
                            <label>งวดที่</label>
                            <input value={roundNumber} onChange={e => setRoundNumber(e.target.value)} className="form-control"></input>
                        </div>
                        <div className="col-2">
                            <label>ต้นทุน</label>
                            <input value={cost} onChange={e => setCost(e.target.value)} className="form-control"></input>
                        </div>
                        <div className="col-2">
                            <label>ราคาจำหน่าย</label>
                            <input value={sale} onChange={e => setSale(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={handleSave} className="btn btn-primary"><i className="fa fa-check me-1"></i>save</button>
                    </div>
                </div>

                <table className="mt-3 table table-bordered table-striped text-center">
                    <thead>
                        <tr>
                            <th>สถานะ</th>
                            <th>วันที่ซื้อเข้า</th>
                            <th>เล่มที่</th>
                            <th>งวดที่</th>
                            <th>เลข</th>
                            <th>ราคาทุน</th>
                            <th>ราคาจำหน่าย</th>
                            <th width="110px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lottos.length > 0 ? lottos.map(item =>
                            <tr>
                                <td className="text-center mt-2 ">
                                    {item.isSale == 0 ? (
                                        <div className="badge bg-success " style={{ padding: '10px 10px', borderRadius: '100px', width: '130px', textAlign: 'center', fontSize: '13px' }}>
                                            <i className="fa fa-check text-white me-2"></i>ยังมีอยู่ในสต๊อก
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger" style={{ padding: '10px 10px', borderRadius: '100px', width: '130px', textAlign: 'center', fontSize: '13px' }}>
                                            <i className="fa fa-times text-white me-2"></i>จำหน่ายแล้ว
                                        </div>
                                    )}
                                </td>
                                <td>{dayjs(item.lottoDate).format(config.dataFormat)}</td>
                                <td>{item.bookNumber}</td>
                                <td>{item.roundNumber}</td>
                                <td>{item.number}</td>
                                <td>{item.cost}</td>
                                <td>{item.sale}</td>
                                <td className="text-center">
                                    {item.isSale === 0 && (
                                        <>
                                            <button onClick={(e) => handleEdit(item)} className="btn btn-primary me-2">
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button onClick={(e) => handleDelete(item)} className="btn btn-danger">
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </>
                                    )}
                                </td>

                            </tr>
                        ) : <></>}
                    </tbody>
                </table>
            </Home>
        </>
    )
}
export default Lotto;