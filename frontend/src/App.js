import React, { useState, useEffect } from "react";
import axios from "axios";
import AddForm from "./AddForm";

function App() {
  const [data, setData] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    retailer: "",
    amountInStock: "",
  });

  const handleEdit = (index) => {
    setEditIdx(index);
    setFormData(data[index]);
  };

  const handleDelete = (index) => {
    axios
      .delete(`http://localhost:5000/api/delete/${data[index].id}`)
      .then((response) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const newData = data.map((item, index) =>
      index === editIdx ? formData : item
    );
    setData(newData);
    axios
      .put(`http://localhost:5000/api/update/${data[editIdx].id}`, formData)
      .then((response) => {
        console.log(response);
        setEditIdx(-1);
        setFormData({ name: "", price: "", retailer: "", amountInStock: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("Fetching data from API");
    axios
      .get("http://localhost:5000/api")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Retailer</th>
              <th>Amount In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                {editIdx === index ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="retailer"
                        value={formData.retailer}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="amountInStock"
                        value={formData.amountInStock}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={() => setEditIdx(-1)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.retailer}</td>
                    <td>{item.amountInStock}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddForm />
    </>
  );
}
export default App;
