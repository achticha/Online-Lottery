import { useEffect, useState } from "react";

function MyModal (props) {
    const [modalSize, setModalSize] = useState("modal")

    useEffect(() => {
        if(props.modalSize !== undefined){
            setModalSize("modal modal-lg")
        }
    })
    return (
        <>
            <div className={modalSize} id={props.id} tabIndex="-1" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id={props.btnCloseId}></button>
                        </div>
                        <div className="modal-body">
                            <p>{props.children}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    
}
export default MyModal;