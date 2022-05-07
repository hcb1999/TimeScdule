import Fab from '@material-ui/core/Fab';           
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import React, { useEffect , useState } from 'react';
import './App.css';
import axios from 'axios';
import { MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
function Upload() {
    const navigate = useNavigate();
  const location=useLocation();
    const {id,name} = location.state;
    const [selectstartdate, setstartdate] = useState(new Date("2014-08-18T21:11:5")); //시작시간 material-ui를 가져오는데 datetimepicker에서 new Date()로 변수를 입력받아야되서 따로 뺏음 밑에도 같음
    const [selectenddate, setenddate] = useState(new Date("2014-08-19T21:11:5")); // 종료시간
    const [send, setsend] = useState({   // 프론트엔드 화면에서 일정을 입력하면 서버(데이터베이스)에 저장하려고 만든 변수
        pcode: id,
        scode : '',
        ccode : '',
        title : '',
        withpeo : '',
        place : '',
        alarm: ''
      });
      const {pcode,scode,ccode,title,withpeo,place,alarm} = send;
      const onChange = (event)=>{ 
        const {name, value} =event.target; //구조 분해 할당
        setsend({
          ...send, 
         [name]: value
        });
      };
      const submitReview = ()=>{
        axios.post('http://localhost:5000/api/editscdule', {
          pcode:id,  
          scode: send.scode,
          ccode:send.ccode,
          title: send.title,
          start: selectstartdate,
          end: selectenddate,
          withpeo: send.withpeo,
          place: send.place,
          alarm: send.alarm
        }).then(()=>{
          alert('등록 완료!');
          navigate(-1);
        })
      
      };
      return(
    <div className ="Container">
   
<div>현재 입력되고 있는 값: {pcode} {scode} {ccode} {title} {withpeo} {place} {alarm} </div>
     <TextField id= "standard-basic" name="scode" value ={scode} onChange ={onChange} label ="일정코드입력" />
     <TextField  name="ccode" value ={ccode} onChange ={onChange} label ="카테고리 추가이름" />
     <TextField  name="title" value ={title} onChange ={onChange} label ="일정을 입력하세요" />
     <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <DateTimePicker  value={selectstartdate} onChange={setstartdate} format="yyyy-MM-dd HH:mm"/>
       <DateTimePicker  value={selectenddate} onChange={setenddate} format="yyyy-MM-dd HH:mm"/>
         </MuiPickersUtilsProvider>
     <TextField  name='withpeo' value ={withpeo} onChange ={onChange} label ="동석자" />        
     <TextField  name='place' value ={place} onChange ={onChange} label ="장소" />
     <TextField  name='alarm' value ={alarm} onChange ={onChange} label ="알람시간" />
     <footer>
          <button className="close" onClick={submitReview}>
            저장
          </button>
        </footer>
        
  
  </div>

      );
}
export default Upload;