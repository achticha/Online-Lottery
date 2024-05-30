import { useEffect } from "react";
import Swal from 'sweetalert2'
function MyUseEffect(){
    
    useEffect(()=>{
        console.log('start component');
    })

    const handleShowAlert = () =>{
        Swal.fire({
            title:'my title',
            text:'my text',
            icon:"success",
            showCancelButton:true,
            showConfirmButton:true,
            confirmButtonColor:'green',
            timer:20000,

        }).then(res=>{
            if(res.isConfirmed){
                console.log('confirm');
            }else{
                console.log('cancel');
            }
        })

    }
    return(
        <>
        <h3>Use Effect</h3>
        <button onClick={handleShowAlert}>click for......</button>
        </>
    )
}
export default MyUseEffect