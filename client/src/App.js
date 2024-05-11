import { useEffect, useState } from "react";
import "./App.css";
import FormSample from "./Form";
import axios from "axios";
import Table from "react-bootstrap/Table";

function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const getData = async () => {
    try {
      await axios.get("http://localhost:5000/users").then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setRefresh(false);
    };
  }, [refresh]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => setRefresh(true));
  };
  const handleEdit = (user) => {
    setIsEdit(true);
    setEditData(user);
  };

  console.log("fetched Data", data);
  return (
    <>
      <FormSample
        setRefresh={setRefresh}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        editData={editData}
      />
      <h5>Fetched Data</h5>
      <Table className="w-50 mx-auto" striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
