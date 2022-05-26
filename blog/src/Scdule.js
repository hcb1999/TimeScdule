import Fab from '@material-ui/core/Fab';           
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
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
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Header from "./Header";

//**프로그램 실행방법 **//
//밑에 보이는 명령어 입력할수잇는 터미널창에서 yarn dev를 입력하면 실행됨 dev는 일종의 내가 지정한 명령어 서버와 프론트엔드를 동시에 접속할수있게만듬
//실행하면 서버와 프론트엔드가 열리게됨 보이는 화면이 프론트엔드, 서버는 위 주소에서 5000/api/scdule을 하면 이동가능


const FullCalendarApp = () => { //풀캘린더 라이브러리 사용
const location=useLocation();
const {id,name} = location.state;
const[scdule, setscdule] = useState({}); // 서버에서 데이터를 가져와 밑에 fullcalender모듈에서 event부분에 입력하면 화면에 일정이 나옴
const[friend,setfriend]= useState([{}]);
const [toggled, setToggled] = useState(false);

const handleToggleSidebar = (value) => {
  setToggled(value);
};

/*for(let i =0; i<friend.length; i++){
  <div><span>{friend[i].name}</span></div>
  console.log(friend[i].name);
  */

  function Friend({ f }) { //map함수를 이용해서 friend의 배열을 차례로 출력한다
    return (
      
        <MenuItem>{f.name}</MenuItem> 
      
    );
  }

useEffect ( ()=> {
  axios.post('http://localhost:5000/api/scdule',{
  pcode:id,
  })// 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌 
  .then(res =>{
    
    console.log(res.data[0]);
    console.log(res.data[1]);
    console.log(res.data[1].name);
    
      setfriend(res.data[1]);
    
    setscdule(res.data[0]);
    
    console.log(res);
  })
}, []);

    console.log(friend);
   
const navigate= useNavigate();

const openupload = () =>{
  navigate('/upload',{
    state: {
        id:id,
        name:name
    },
});
}
const AddFriend = () => {
  navigate('/AddFriend',{
    state: {
      id:id,
    }
  });
}
  return (
    <div>
    <Header handleToggleSidebar={handleToggleSidebar} />
    
      <div id ="header" style={{display:'flex'}}>
         
      <ProSidebar
        style={{
          height: "126.5vh"
        }}
    toggled={toggled} 
    breakPoint="md"
    onToggle={handleToggleSidebar}
  >
  <SidebarHeader>
        <div className="sidebar-header">
          <p className="user-name text-white mb-2">{name}</p>
        </div>
      </SidebarHeader>

      <Menu iconShape="circle">
          <SubMenu
            title= "친구목록"
          >
            <MenuItem>
              
                 About

            
            </MenuItem>
            {friend.map((f, index) => (
    <Friend f={f} key={index} />
    ))}
            </SubMenu>
            <SubMenu title= "카테고리">
            <MenuItem>여행</MenuItem>
            <MenuItem>코딩</MenuItem>

            </SubMenu>
            </Menu>
      
     
       <h3 className='textleft'>친구목록 <button className='textright' onClick={AddFriend}>➕</button></h3>
       <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px"
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <span> TimeScdule </span>
          </a>
        </div>
      </SidebarFooter>
       </ProSidebar>
     
          
          <div style={{width:'100vw'}}>
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
      </div>
    <div className='addbtn'>
        <Fab onClick={openupload} color="primary" aria-label="add" variant="extended" >
          <AddIcon onClick={openupload}/>일정추가
        </Fab>
        </div>

    </div>
    </div>
  );
  

      }
      


export default FullCalendarApp;