import { useState } from "react";

function MyDropdown (){
    const [item,setItem] = useState();
    return(
        <>
        <div>{item}</div>
        <select onChange={e =>setItem(e.target.value)}>
            <option value='01'>AA</option>
            <option value='02'>BB</option>
            <option value='03'>CC</option>
        </select>
        </>
    )
}
export default MyDropdown;