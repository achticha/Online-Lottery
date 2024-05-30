import { useEffect, useState } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import MyModal from "./componnents/MyModal";
import { Link } from "react-router-dom";

function User() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [levels, setLevels] = useState(["admin", "user"]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/user/list');

            if (res.data.length > 0) {
                setUsers(res.data)
            }

        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error',
            })
        }
    };

    const handleNew = async () => {
        setUser({
            name: '',
            user: '',
            password: '',
            passwordConfirm: '',
            phone: '',
            email: '',
            address: '',
            level: '',
        })
    }

    const handleSave = async () => {
        try {
            if (user.password !== user.passwordConfirm) {
                Swal.fire({
                    title: 'ตรวจสอบข้อมูล',
                    text: 'password ไม่ตรงกันโปรดตรวจสอบอีกครั้ง',
                    icon: 'warning',
                    timer: 2000
                });
            } else {
                const payload = {
                    name: user.name,
                    user: user.user,
                    password: user.password,
                    phone: user.phone,
                    email: user.email,
                    address: user.address,
                    level: user.level,
                };

                let id = 0;

                if (user.id !== undefined) {
                    const res = await axios.put(config.apiPath + '/api/user/edit/' + user.id, payload);
                    id = res.data.id;
                } else {
                    const res = await axios.post(config.apiPath + '/api/user/create', payload);
                    id = res.data.id;
                }

                if (id !== 0) {
                    Swal.fire({
                        title: 'บันทึกข้อมูล',
                        text: 'บันทึกข้อมูลแล้ว',
                        icon: 'success',
                        timer: 1000,
                    });
                    await fetchData();

                    document.getElementById('btnCloseModalUser').click();
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

    const handleDelete = async (item) => {
        const button = await Swal.fire({
            title: 'ลบข้อมูล',
            text: 'ยืนยันการลบรายการ',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
        });

        if (button.isConfirmed) {
            const res = await axios.delete(config.apiPath + '/api/user/remove/' + item.id);

            if (res.data.id !== undefined) {
                Swal.fire({
                    title: 'ลบรายการ',
                    text: 'ลบรายการแล้ว',
                    icon: 'success',
                    timer: 1000
                });

                await fetchData();
            }
        }
    }
    return (
        <>
            <Home>
                <div className="h4">ผู้ใช้งานระบบ</div>
                <button onClick={handleNew} className="mt-3 btn btn-primary" data-bs-target="#modalUser" data-bs-toggle="modal">
                    <i className="fa fa-plus me-2"></i> เพิ่มรายการ
                </button>
                <div className="modal-body">
                    <table className="mt-3 table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ชื่อ</th>
                                <th>username</th>
                                <th>level</th>
                                <th>email</th>
                                <th>เบอร์โทร</th>
                                <th>ที่อยู่</th>
                                <th width='110px'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (users.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.user}</td>
                                    <td>{item.level}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td className="text-center">
                                        <>
                                            <button onClick={(e) => setUser(item)} data-bs-target="#modalUser" data-bs-toggle="modal" className="btn btn-primary me-2">
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button onClick={(e) => handleDelete(item)} className="btn btn-danger">
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
                <button className="mt-3 btn btn-danger">
                    <Link  className="text-white" style={{ textDecoration: 'none' }} to='/'>Logout</Link>
                </button>
            </Home>

            <MyModal id='modalUser' title='ข้อมูลผู้ใช้ระบบ' btnCloseId='btnCloseModalUser'>
                <div>
                    <label>ชื่อ</label>
                    <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>username</label>
                    <input value={user.user} onChange={(e) => setUser({ ...user, user: e.target.value })} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>password</label>
                    <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>ยืนยัน password</label>
                    <input type="password" value={user.passwordConfirm} onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>email</label>
                    <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>เบอร์โทร</label>
                    <input value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>ที่อยู่</label>
                    <input value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} className="form-control"></input>
                </div>
                <div className="mt-3">
                    <label>level</label>
                    <select value={user.level} onChange={(e) => setUser({ ...user, level: e.target.value })} className="form-control">
                        {levels.length > 0 ? (
                            levels.map((item) =>
                                <option>
                                    {item}
                                </option>)
                        ) : (
                            <></>
                        )}
                    </select>
                </div>
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSave}>
                        <i className="fa fa-check"></i>บันทึก
                    </button>
                </div>

            </MyModal>

        </>
    )
}
export default User;