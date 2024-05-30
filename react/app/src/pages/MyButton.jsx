import { useState } from "react";
import Menu from "../components/Menu";
function MyButton(){
    const [x,setX] = useState(0);
    const handleChangeX = () =>{
        setX(x+1);
    }
    return(
        <>
        <Menu/>
               <div>
               <div>x = {x}</div>
               <button onClick={handleChangeX}>Click Here</button>
               </div>
        </>
    )
}
export default MyButton;