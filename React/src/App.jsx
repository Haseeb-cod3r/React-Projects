import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import api from "./api/axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    age: "",
  });
  const [isData, setIsData] = useState(false);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const btnRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => {
      return { ...prevDetails, [name]: value };
    });
    console.log(formDetails);
  };

  const handleKeyDown1 = (e) => {
    if (e.key === "Enter") {
      inputRef2.current.focus();
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      btnRef.current.click();
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("users");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const postData = async () => {
    if (formDetails.name === "" || formDetails.age === "") {
      alert("Please fill all the fields");
      return;
    }

    const response = await axios({
      url: "https://696477dfe8ce952ce1f1c74c.mockapi.io/users",
      method: "post",
      data: formDetails,
    });
    setFormDetails({
      name: "",
      age: "",
    });
    inputRef1.current.focus();
    refetch();
  };

  const editData = async () => {
    const response = await axios({
      url: `https://696477dfe8ce952ce1f1c74c.mockapi.io/users/${formDetails.id}`,
      method: "put",
      data: formDetails,
    });
    setFormDetails({
      name: "",
      age: "",
    });
    inputRef1.current.focus();
    refetch();
  };

  const deleteData = async (id) => {
    const response = await axios({
      url: `https://696477dfe8ce952ce1f1c74c.mockapi.io/users/${id}`,
      method: "delete",
    });
    refetch();
  };

  const { data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchData,
  });
  useEffect(() => {
    data?.length === 0 ? setIsData(false) : setIsData(true);
  }, [data]);

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#f9fafb",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <input
        ref={inputRef1}
        onKeyDown={handleKeyDown1}
        type="text"
        placeholder="Enter name"
        name="name"
        onChange={handleOnChange}
        value={formDetails.name}
        style={{
          padding: "10px 12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          outline: "none",
          fontSize: "14px",
        }}
      />{" "}
      <br />
      <input
        type="number"
        onKeyDown={handleKeyDown2}
        ref={inputRef2}
        placeholder="Enter age"
        name="age"
        onChange={handleOnChange}
        value={formDetails.age}
        style={{
          padding: "10px 12px",
          marginBottom: "16px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          outline: "none",
          fontSize: "14px",
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        {formDetails.editMode ? (
          <button
            onClick={editData}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#16a34a",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            save
          </button>
        ) : (
          <button
            ref={btnRef}
            onClick={postData}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#16a34a",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Post Data
          </button>
        )}
      </div>
      <div>
        {isData ? (
          data?.map((usersDetails) => (
            <div
              key={usersDetails.id}
              style={{
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "12px",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                Name: {usersDetails.name}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#4b5563",
                }}
              >
                Age: {usersDetails.age}
              </p>
              <button
                onClick={() => {
                  setFormDetails({
                    ...usersDetails,
                    editMode: true,
                  });
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteData(usersDetails.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <h1
            style={{
              color: "black",
              fontSize: "20px",
            }}
          >
            There is no "Data" yet
          </h1>
        )}
      </div>
    </div>
  );
}

export default App;
