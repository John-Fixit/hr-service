/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Drawer from "../../../components/Request&FormComponent/Drawer";
import Separator from "../../../components/payroll_components/Separator";
import Header from "./components/Header";
import ExitDetails from "./components/ExitDetails";
import HistoryTable from "./components/HistoryTable";

const Exit = () => {
     const [exitInformation, setExitInformation] = useState({
  date:'',
  reason:'',
  approvals:[],
  attachments:[],
  note:'',
  status:'pending'
  })
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState('');
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [currentViewedExitDetails, setCurrentViewedExitDetails] = useState({})


  // show the drawer for the view form
  const view = () => {
    setSideBarNeeded(false);
    setWhatTodo('view');
    setIsOpen(true);
  };

  const submitForm =()=>{
  if(exitInformation.type==''||exitInformation.date==''){
  alert("Every input in the form must be filled");
}else{
// console.log(exitInformation);
}
  }

  return (
    <div className="py-8 font-helvetica">
      <Header />
     <div className="mb-6">
  <Separator separator_text={'History'}/>
  </div>

      <HistoryTable view={view} setCurrentViewedExitDetails={setCurrentViewedExitDetails} setExitInformation={setExitInformation} />
      <Drawer
      handleSubmit={submitForm}
        sideBarNeeded={sideBarNeeded}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
       

       {whatTodo=='view' &&  <ExitDetails currentViewedExitDetails={currentViewedExitDetails} /> }
      </Drawer>
    </div>
  );
};

export default Exit;
