import { useEffect, useState } from "react"
import Home from "./้Home"
import axios from "axios";
import config from "./config";
import Swal from "sweetalert2";

function Company() {
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [id,setId] = useState(0);

    useEffect(() =>{
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const res = await axios.get(config.apiPath + '/api/company/info')

            if(res.data.id !== undefined){
                setName(res.data.name);
                setPhone(res.data.phone);
                setAddress(res.data.address);
                setId(res.data.id);
            }

        }catch(e){
            Swal.fire({
                title: 'erroe',
                text: e,
                icon: 'error'
            })
        }
    }

    const handleSave = async () => {
        try{
            const payload = {
                name: name,
                phone: phone,
                address: address,
            };

            let res;

            if(id == 0){
                 res = await axios.post(config.apiPath + '/api/company/create',payload);
                setId(0);
            }else{
                 res = await axios.put(config.apiPath + '/api/company/edit/' + id, payload);
            }

            if(res.data.id != undefined){
                Swal.fire({
                    title: 'save',
                    text: 'กรอกข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 1000
                });
                fetchData();
            }
        }catch (e){
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error'
            })

        }

    }

    return(
        <>
        <Home>
            <div className="h3">ข้อมูลร้าน</div>
            <div className="mt-4">
                <label>ชื่อ</label>
                <input value={name} onChange={(e) =>setName(e.target.value)} className="form-control"></input>
            </div>
            <div className="mt-4">
                <label>เบอร์โทร</label>
                <input value={phone} onChange={(e) =>setPhone(e.target.value)} className="form-control"></input>
            </div>
            <div className="mt-4">
                <label>ที่อยู่</label>
                <input value={address} onChange={(e) =>setAddress(e.target.value)}  className="form-control"></input>
            </div>
            <div className="mt-4">
                <button onClick={handleSave} className="btn btn-primary"><i className="fa fa-check me-1"></i>save</button>
            </div>
        </Home>
        </>
    )
}
export default Company