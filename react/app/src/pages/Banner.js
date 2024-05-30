import { useEffect, useState, useRef } from "react";
import Home from "./้Home";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";

function Banner() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [banners, setBanners] = useState([]);
    const inputFileRef = useRef(null); // สร้าง ref

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/banner/list');

            if (res.data.results !== undefined) {
                setBanners(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error',
            })
        }
    }

    const onFileChange = (event) => { 
        setSelectedFile(event.target.files[0]);
    }

    const handleSave = async () => {
        try {
            //ต้องจำให้ได้เป็นงานอัพโหลด ต้องได้ใช้แนวทางนี้บ่อยๆ
            const formData = new FormData();
            formData.append("myFile", selectedFile, selectedFile.name); //ต้องดูหลังบ้านด้วยว่ารับมาเป็นอะไร หน้าบ้านเลยส่ง('myFile')กลับไปให้ตรงกัน

            const res = await axios.post(config.apiPath + '/api/banner/uploadFile', formData);

            if (res.data.message === 'success') {
                Swal.fire({
                    title: 'upload file',
                    text: 'upload file success',
                    icon: 'success',
                    timer: 1000,
                });

                setSelectedFile(null); // Reset selected file
                inputFileRef.current.value = ''; // Reset input file

                fetchData();


            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e,
                icon: 'error',
            });
        }
    };
    const showImage = (name) => {
        const fullPath = config.apiPath + "/uploads/" + name;
        return <img src={fullPath} className="img-fluid" width={"400px"}></img>
    }
    const handleDelete = async (item) => {
        const button = await Swal.fire({
            title: "ลบรายการ",
            text: "ต้องการลบรายการ ใช่หรือไม่",
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
        });

        if (button.isConfirmed) {
            const res = await axios.delete(config.apiPath + '/api/banner/remove/' + item.id);

            if (res.data.message === 'success') {
                Swal.fire({
                    title: 'ลบรายการ',
                    text: 'ลบรายการแล้ว',
                    icon: 'success',
                    timer: 1000,
                });

                fetchData();
            }
        }
    }
    return (
        <Home>
            <div className="h4">จัดการป้ายโฆษณา</div>

            <div className="mt-3">
                <label>เลือกภาพจากอุปกรณ์ของคุณ</label>
                {/* <input onChange={(e) => onFileChange(e)} type="file" className="form-control"></input> */}
                <input ref={inputFileRef} onChange={(e) => onFileChange(e)} type="file" className="form-control"></input>
            </div>
            <div className="mt-3">
                {selectedFile == null ? (
                    <></>
                ) : (
                    <button onClick={handleSave} className="btn btn-primary">
                        <i className="fa fa-check me-2"></i>อัพโหลดและบันทึก
                    </button>
                )}
            </div>

            <table className="table mt-3 table-bordered">
                <thead>
                    <tr>
                        <th>ภาพ</th>
                        <th width="60px"></th>
                    </tr>
                </thead>
                <tbody>
                    {banners.length > 0 ? banners.map((item => (
                        <tr key={item.id}>
                            <td>{showImage(item.name)}</td>
                            <td className="text-center">
                                <button onClick={(e) => handleDelete(item)} className="btn btn-danger">
                                    <i className="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </table>
        </Home>
    )
}
export default Banner;