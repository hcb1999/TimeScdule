import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import { Link } from 'react-router-dom';
 import { Avatar, Button, CssBaseline,  TextField,FormControl, FormControlLabel,  Checkbox, FormHelperText,  Grid, Box, Typography,  Container} from '@mui/material/';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
 function Register() {

  const theme = createTheme();
  const [checked, setChecked] = useState(false);

  // 동의 체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

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
   /* <TextField
    required
    fullWidth
    type="password"
    onChange={handleInput}
    value={password}
    id="password"
    name="password"
    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
  />

<input
value={id}
type="text"
placeholder="아이디를 입력하세요"
name="id"
onChange={handleInput}
/>
*/
    const {id,password,name,email,tel,age,sex} = user;

   const handleInput = (event) => { //구조분해할당 이해가 많이 필요할듯
        const { value, name } = event.target;
        setuser({ 
          ...user,
          [name]: value });
      };
    

return (
<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    onChange={handleInput}
                    value={id}
                    id="id"
                    name="id"
                    label="아이디를 입력하세요"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    onChange={handleInput}
                    value={password}
                    id="password"
                    name="password"
                    label="비밀번호 입력  (숫자+영문자+특수문자 8자리 이상)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                   required
                   fullWidth 
                   onChange={handleInput}
                   value={name}
                   id="name"
                   name="name" 
                   label="이름" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    onChange={handleInput}
                    value={email}
                    id="email"
                    name="email"
                    label="이메일 주소"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    onChange={handleInput}
                    value={tel}
                    id="tel"
                    name="tel"
                    label="전화번호"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    onChange={handleInput}
                    value={age}
                    id="age"
                    name="age"
                    label="생년월일"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    onChange={handleInput}
                    value={sex}
                    id="sex"
                    name="sex"
                    label="성별"
                  />
                </Grid>
               
                
                  <FormControlLabel
                    control={<Checkbox onChange={handleAgree} color="primary" />}
                    label="회원가입 약관에 동의합니다."
                  />
           
                </Grid>
              <Button
                type="submit"
                onClick={submitReview}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
              <Link to ="./login">
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인 페이지로 이동
              </Button>
              </Link>
            </FormControl>
          
        </Box>
      </Container>
    </ThemeProvider>
  );
};
        export default Register;