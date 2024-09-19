import axios from "axios";
import React from "react";

const AddForm = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [retailer, setRetailer] = React.useState("");
    const [amountInStock, setAmountInStock] = React.useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "retailer":
                setRetailer(value);
                break;
            case "amountInStock":
                setAmountInStock(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, price, retailer, amountInStock);
        axios.post("http://localhost:5000/api/new", {
            name,
            price,
            retailer,
            amountInStock
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleReset = () => {
        setName("");
        setPrice("");
        setRetailer("");
        setAmountInStock("");
    }

  return (
    <>
      <form>
        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange}/>
        <input type="number" placeholder="Price" name="price" value={price} onChange={handleChange}/>
        <input type="text" placeholder="Retailer" name="retailer" value={retailer} onChange={handleChange}/>
        <input type="number" placeholder="Amount in stock" name="amountInStock" value={amountInStock} onChange={handleChange}/>
        <div>
          <button onClick={handleSubmit}>Add</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </>
  );
};

export default AddForm;
