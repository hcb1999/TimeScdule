import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import { Link } from 'react-router-dom';

 function Register() {
    const [user, setuser] = useState({
      pcode:"",
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
        pcode:user.pcode,  
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
   
    const {pcode,id,password,name,email,tel,age,sex} = user;

   const handleInput = (event) => {
        const { value, name } = event.target;
        setuser({ 
          ...user,
          [name]: value });
      };
    

return (
<div>
       
        <div>현재 입력값: {pcode} {id} {password} {name} {email} {tel} {age} {sex}</div>
        
        <input     
            value={pcode}
            placeholder="임시 회원코드 입력(시퀀스로바꿀거)"
            name="pcode"
            onChange={handleInput}
          />
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