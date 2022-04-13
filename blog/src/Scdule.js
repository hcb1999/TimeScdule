import Fab from '@material-ui/core/Fab';           
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Modal from './components/Modal'
import React, { useEffect , useState } from 'react'
import './App.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//**프로그램 실행방법 **//
//밑에 보이는 명령어 입력할수잇는 터미널창에서 yarn dev를 입력하면 실행됨 dev는 일종의 내가 지정한 명령어 서버와 프론트엔드를 동시에 접속할수있게만듬
//실행하면 서버와 프론트엔드가 열리게됨 보이는 화면이 프론트엔드, 서버는 위 주소에서 5000/api/scdule을 하면 이동가능

function FullCalendarApp() { //풀캘린더 라이브러리 사용
const location=useLocation();
const {id,name} = location.state;
const[scdule, setscdule] = useState({}); // 서버(데이터베이스)에서 데이터를 가져와 밑에 fullcalender모듈에서 event부분에 입력하면 화면에 일정이 나옴

useEffect ( ()=> {
  axios.post('http://localhost:5000/api/scdule',{
  pcode:id,
  })// 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌 
  .then(res =>{
    setscdule(res.data);
  })
}, []);
const navigate= useNavigate();

const openupload = () =>{
  navigate('/upload',{
    state: {
        id:id,
        name:name
    },
});
}

  return (
    
    <div className="App">
      <div className='Header'>
       <header><strong>캘린더</strong></header> 
       <hr/>  
       <img className="Image" src="img/profile.png" />
      <h3>이름:{name}</h3>
     
       <h3 className='textleft'>친구목록 <span className='textright'>➕</span></h3>
       <div className='textleft'>
         <input type='checkbox'></input>  <span>최범준</span>
       <br></br>
       <input type='checkbox'></input>  <span>정유민</span>  
       </div>
     
      <h3 className='textleft'>카테고리 <span className='textright'>➕</span></h3>
      <div className='textleft'>
      <input type='checkbox'></input>  <span>여행</span>
       <br></br>
       <input type='checkbox'></input>  <span>친구</span>  
       </div>
     
       <h4>내 일기장 바로가기</h4>
       
        </div>   
      <FullCalendar //풀캘린더 모듈 함수

      
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ // 화면 중앙 상단 헤더부분 center 순서대로 월 주 일
          center: 'dayGridMonth,timeGridWeek,timeGridDay', 
        }}
        
        events={scdule} // 일정을 달력위에 뿌려줌
        eventColor="red"
        nowIndicator 
        dateClick={(info) => console.log(info.event.start)} //날짜 클릭시 나오는 함수 
        eventClick={(info) => {
          axios.post('http://localhost:5000/api/selectscdule', {
          scode: info.event.extendedProps.scode
        }).then((response)=>{
          navigate('/openscdule',{
            state:{
                 title:response.data[0].title,
                 people:response.data[0].withpeo,
                 place: response.data[0].place
            },
          });
        })
        }
    }
        
        locale = 'ko' // 한국어버전
      />
    <div className='addbtn'>
        <Fab onClick={openupload} color="primary" aria-label="add" variant="extended" >
          <AddIcon onClick={openupload}/>일정추가
        </Fab>
        </div>

    </div>
    
  );
  

      }
      


export default FullCalendarApp;