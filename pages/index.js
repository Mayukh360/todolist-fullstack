import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const todoRef = useRef();
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/completedtask");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    const inputData = {
      todo: todoRef.current.value,
      isCompleted: true,
    };

    try {
      const response = await axios.post("/api/completedtask", inputData);
      console.log(response.data)
      if (response.status === 201) {
       fetchData();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleCheckboxChange = async(id) => {
   
    try {
      const updatedData = data.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      });
      setData(updatedData);

      const updatedItem = updatedData.find((item) => item._id === id);

      const response = await axios.put("/api/completedtask", {
        id: id,
        data: updatedItem,
      });

      if (response.status === 200) {
        console.log("Item updated successfully:", response.data);
      } else {
        console.log("Error updating item:", response.status);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // const completedTasks = data.filter((item) => item.checked);

  // const handleGoToCompletedTasks = () => {
  //   router.push({
  //     pathname: "/completedtask",
  //     query: { data: JSON.stringify(data) },
  //   });
  // };
  const fetchFunc = async () => {
    const response = await axios.get("/api/completedtask");
    console.log(response);
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`/api/completedtask/`,id);
      console.log(response.data);
      if (response.status === 200) {
        fetchData();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <div>
        <form onSubmit={submitHandler}>
          <label>Enter Todo </label>
          <input type="text" ref={todoRef} />
          <button type="submit">Add Todo</button>
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
              <button onClick={() => deleteHandler(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={fetchFunc}>See completed Task</button>
    </>
  );
}
