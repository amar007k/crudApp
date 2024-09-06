//import logo from './logo.svg';
import './App.css';
//import { MdClose } from "react-icons/md";
import { useState ,useEffect} from 'react';
import axios from 'axios';
import Formtable from './component/Formtable';

axios.defaults.baseURL = "http://localhost:8080/"


function App() {

  const[addSection,setAddSection] =useState(false)
  const[editSection,setEditSection] = useState(false)
  const[formdata,setformData] = useState({
    name:"",
    email:"",
    mobile:"",
  })

  const[formdataEdit,setformDataEdit] = useState({
    name:"",
    email:"",
    mobile:"",
    _id:""
  })
const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const{value,name} = e.target
    setformData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

//to save the data from UI
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formdata);
  try {
    const response = await axios.post("/create", formdata);
    console.log(response);
    if (response.data.success) {
      setAddSection(false);
      alert(response.data.message);
      getFetchData();
      setformData({
        name:"",
        email:"",
        mobile:""
      })
      
    }
  } catch (error) {
    console.error("There was an error submitting the form!", error);
  }
};

//to ftech the data from database and display them in UI

const getFetchData = async()=>{
  try {
    const response = await axios.get("/");
    console.log(response);
    if (response.data.success) {
      setDataList(response.data.data)
      //alert(response.data.message);
    }
  } catch (error) {
    console.error("There was an error submitting the form!", error);
  }
}
useEffect(() => {
  getFetchData();
}, []);

//console.log(dataList)
const handleDelete = async(id)=>{
  const response = await axios.delete("/delete/"+id);
      if(response.data.success){
        getFetchData();
        alert(response.data.message);

      }

}

const handleUpdate = async(e)=>{
  e.preventDefault()
  const response = await axios.put("/update",formdataEdit);
  if(response.data.success){
    getFetchData();
    alert(response.data.message);
    setEditSection(false)
  }

}

const handleEditOnChange = async(e)=>{
  const{value,name} = e.target
  setformDataEdit((prev)=>{
    return{
      ...prev,
      [name]:value
    }
  })
}

const handleEdit = async(el)=>{
  setformDataEdit(el)
  setEditSection(true)
}

  return (
   <>
   <div className="container">
    <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

    {
      addSection && (
       <Formtable
       handleSubmit = {handleSubmit}
        handleOnChange = {handleOnChange}
        handleclose = {()=>setAddSection(false)}
       rest = {formdata}
       
       />
      )
    }

    {
      editSection && (
        <Formtable
        handleSubmit = {handleUpdate}
        handleOnChange = {handleEditOnChange}
        handleclose = {()=>setEditSection(false)}
        rest = {formdataEdit}        
        />
      )
    }
  

    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            dataList[0] ?(
            dataList.map((el)=>{
              return(
                <tr>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>delete</button>
                  </td>
                </tr>
              )
            }))
            :(
              <p>No Data</p>
            )
          }
        </tbody>
      </table>
    </div>


   </div>
   </>
  );
}

export default App;
