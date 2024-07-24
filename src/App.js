import { useEffect, useState } from "react";
import { Empolye } from "./Employdata";



function App() {
  const[data, setData]=useState([]);
  const[firstName, setfirstName]=useState('');
  const[lastName, setlastName]=useState('');
  const[age, setAge]=useState(0);
  const[id,setId]=useState(0);
  const [isUpadate, setIsUpdate] = useState(false);

  
  useEffect(()=>{
    setData(Empolye)
  },[])

  const handlEdit=(id)=>{
    const dt=data.filter(item=>item.id===id);
    if(dt!==undefined){
      setIsUpdate(true);
      setId(id);
      setfirstName(dt[0].firstName);
      setlastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }
  const handleDelete=(id)=>{
    if(id>0){
      if(window.confirm("Are you sure to delete")){
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }
  const handleUpdate=()=>{
    const index=data.map((item)=>{
      return item.id;
    }).indexOf(id);
    const dt=[...data];
    dt[index].firstName=firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  }

  const handleClear=(id)=>{
    setId(id);
    setfirstName('');
    setlastName('');
    setAge('');
    setIsUpdate(false);
  }
  const handleSave=(e)=>{
    e.preventDefault();
    const dt=[...data];
    const newObject={
      id:Empolye.length+1,
      firstName: firstName,
      lastName: lastName,
      age:age
    }
    dt.push(newObject);
    setData(dt);
  }

  return (
    <div className="App">
    <div>
        <div>
          <label>FirstName:
            <input type="text" placeholder="Enter First Name" onChange={(e)=>setfirstName(e.target.value)} value={firstName}
            ></input>
          </label>
        </div>
        <div>
          <label>LastName:
            <input type="text" placeholder="Enter Last Name" onChange={(e) => setlastName(e.target.value)} value={lastName}
            ></input>
          </label>
        </div>
        <div>
          <label>Age:
            <input type="text" placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} value={age}>
            </input>
          </label>
        </div>
        <div>
        {
          !isUpadate ?
          <button onClick={(e) => handleSave(e)}>Save</button>
          :
          <button onClick={() => handleUpdate()}>Update</button>
        }
          <button onClick={()=>handleClear()}>Clear</button>
        </div>
    </div>
   

    <table>
      <thead>
          <tr>
            <th>sr No.</th>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>age</th>
            <th>action</th>
          </tr>
      </thead>
      <tbody>
        {
          data.map((item,index) => {
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button onClick={()=> handlEdit(item.id)}>Edit</button>
                  <button onClick={()=> handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

    </div>
  );
}

export default App;
