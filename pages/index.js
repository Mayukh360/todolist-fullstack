// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import axios from "axios";

import Completed from "@/Component/Completed";

export default function Home() {
  // const [data, setData] = useState([]);
  // const todoRef = useRef();
  // const [editingItemId, setEditingItemId] = useState(null);
  // const router = useRouter();
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/api/completedtask");
  //     console.log(response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     console.log("Error:", error.message);
  //   }
  // };
  // useEffect(() => {
    
  //   fetchData();
  // }, []);

  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   const inputData = {
  //     todo: todoRef.current.value,
  //     isCompleted: true,
  //   };

  //   try {
  //     if (editingItemId) {
  //       // Perform PUT request for editing an item
  //       const response = await axios.put ("/api/completedtask", {
  //         id: editingItemId,
  //         data: inputData,
  //       });
  //       console.log("Item updated successfully:", response.data);
  //       setEditingItemId(null); // Clear the editingItemId
  //     } else {
  //       // Perform POST request for adding a new item
  //       const response = await axios.post("/api/completedtask", inputData);
  //       console.log(response.data);
  //     }

  //     fetchData();
  //     todoRef.current.value = ""; // Clear the input field
  //   } catch (error) {
  //     console.log("Error:", error.message);
  //   }
  // };

  // const handleCheckboxChange = async(id) => {
   
  //   try {
  //     const updatedData = data.map((item) => {
  //       if (item._id === id) {
  //         return {
  //           ...item,
  //           isCompleted: !item.isCompleted,
  //         };
  //       }
  //       return item;
  //     });
  //     setData(updatedData);

  //     const updatedItem = updatedData.find((item) => item._id === id);

  //     const response = await axios.put("/api/completedtask", {
  //       id: id,
  //       data: updatedItem,
  //     });

  //     if (response.status === 200) {
  //       console.log("Item updated successfully:", response.data);
  //     } else {
  //       console.log("Error updating item:", response.status);
  //     }
  //   } catch (error) {
  //     console.log("Error:", error.message);
  //   }
  // };

 
  // const fetchFunc = async () => {
  //   const response = await axios.get("/api/completedtask");
  //   console.log(response);
  // };

  // const deleteHandler = async (id) => {
  //   try {
  //     const response = await axios.delete(`/api/completedtask?id=${id}`);
  //     console.log(response.data);
  //     if (response.status === 200) {
  //       fetchData();
  //     } else {
  //       console.log("Error:", response.status);
  //     }
  //   } catch (error) {
  //     console.log("Error:", error.message);
  //   }
  // };

  // const editbtnhandler = (id) => {
  //   const selectedItem = data.find((item) => item._id === id);
  //   if (selectedItem) {
  //     todoRef.current.value = selectedItem.todo;
  //     setEditingItemId(id);
  //   }
  // };
  
  
  

  return (
    <>
      {/* <h1>Todo List</h1>
      <div>
        <form onSubmit={submitHandler}>
          <label>Enter Todo </label>
          <input type="text" ref={todoRef} />
          <button type="submit">{editingItemId?'Update Todo':'Add Todo'}</button>
        </form>
      </div>
      {data.length > 0 && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={!item.isCompleted}
                onChange={() => handleCheckboxChange(item._id)}
              />
              <span>{item.todo}</span>
              
              <button onClick={() => editbtnhandler(item._id)} >Edit</button>
              <button onClick={() => deleteHandler(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={fetchFunc}>See completed Task</button> */}
      <Completed/>
    </>
  );
}
