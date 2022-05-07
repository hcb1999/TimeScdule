import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import { Link } from 'react-router-dom';
 import {
  Avatar, Button, CssBaseline,  TextField,FormControl, FormControlLabel,  Checkbox, FormHelperText,  Grid,  Box, Typography,  Container} from '@mui/material/';
 function Register() {
    const [user, setuser] = useState({
      id:"",
      password: "",
      name: "",
      email:"",
      tel:"",
      age:"",
      sex:""
    });
console.log(user);
    const submitReview = ()=>{
      axios.post('http://localhost:5000/api/user', {  
        id:user.id,
        password: user.password,
        name: user.name,
        email:user.email,
        tel:user.tel,
        age:user.age,
        sex:user.sex
      }).then(()=>{
        alert('등록 완료!');
      })
    };
   
    const {id,password,name,email,tel,age,sex} = user;

   const handleInput = (event) => { //구조분해할당 이해가 많이 필요할듯
        const { value, name } = event.target;
        setuser({ 
          ...user,
          [name]: value });
      };
    

return (
<div>
       
        <div>현재 입력값:  {id} {password} {name} {email} {tel} {age} {sex}</div>
      
          <input
             value={id}
            type="text"
            placeholder="아이디를 입력하세요"
            name="id"
            onChange={handleInput}
          />
          <input
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            name="password"
            onChange={handleInput}
          />
          <input
            type="text"
            value={name}
            placeholder="이름을 입력하세요"
            name="name"
            onChange={handleInput}
          />
          <input
            type="text"
            value={email}
            placeholder="이메일을 입력하세요"
            name="email"
            onChange={handleInput}
          />
          <input
            type="text"
            value={tel}
            placeholder="전화번호를 입력하세요"
            name="tel"
            onChange={handleInput}
          />
          <input
            type="text"
            value={age}
            placeholder="나이를 입력하세요"
            name="age"
            onChange={handleInput}
          />
          <input
          
            type="text"
            value={sex}
            className="password loginInput"
            placeholder="성별을 입력하세요"
            name="sex"
            onChange={handleInput}
          />
          
          
          <button onClick ={submitReview}>가입</button>
          <Link to ='/login' >로그인 페이지로 가기</Link>
          </div>
);
}
        export default Register;