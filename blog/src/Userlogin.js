import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Userlogin(){

    const [id, setid] = useState();
    const[pw, setpw] = useState('');
    const navigate = useNavigate();
    const[loginstatus, setloginstatus] = useState("");

    const login = ()=>{
        axios.post('http://localhost:5000/api/login', {
          id:id,
          pw:pw,
        }).then((response)=>{

            if(response.data.message){
                setloginstatus(response.data.message);
            } else{
                 navigate('/test',{
                     state: {
                         id:id,
                         name:response.data[0].name,
                     },
                 });
                // setloginstatus(response.data[0].name);
            }
         console.log(response);
        })
      };

    return(
    <div>
<h1>LOGIN</h1>
<input type= "text" onChange={(e)=>{setid(e.target.value);}} placeholder='아이디입력하세요'/>
<input type= "text" onChange={(e)=>{setpw(e.target.value);}} placeholder="비밀번호입력하세요"/>
<button onClick={login}>login</button>
<h1>{loginstatus}</h1>
    </div>
);

};
export default Userlogin;