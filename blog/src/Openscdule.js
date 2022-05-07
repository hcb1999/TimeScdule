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
import CloseIcon from '@material-ui/icons/Close';
function Openscdule() {

  const navigate = useNavigate();
  const location=useLocation();
    const {title,people,place} = location.state;

  

    const [selectstartdate, setstartdate] = useState(new Date("2014-08-18T21:11:5")); //시작시간 material-ui를 가져오는데 datetimepicker에서 new Date()로 변수를 입력받아야되서 따로 뺏음 밑에도 같음
    const [selectenddate, setenddate] = useState(new Date("2014-08-19T21:11:5")); // 종료시간

   
      return(
    <div className ="Container">

<div>    📅<strong>일정:</strong> {title}</div> <br/>
<div>    👪<strong>동석자:</strong> {people}</div> <br/>
<div>    🌏<strong>장소:</strong> {place}</div> <br/>


        
  
   </div>

      );
}
export default Openscdule;