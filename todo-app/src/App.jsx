import React, { useContext, useEffect, useRef, useState } from "react";
import { themeContext } from "./context/Them";
import cross from "./assets/images/icon-cross.svg";
import sun from "./assets/images/icon-sun.svg";
import moon from "./assets/images/moon.png";
import edit from "./assets/images/edit.png";

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);
  const { toggleTheme, theme } = useContext(themeContext);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editId, editValue]);

  function handleOnKeyDown(e) {
    if (e.key === "Enter" && value.trim()) {
      setData([
        ...data,
        { task: value.trim(), state: "normal", id: crypto.randomUUID() },
      ]);
      setValue("");
    } else if (e.key === "Enter") {
      alert("input field cannot be empty!");
    }
  }
  function handleCompleteState(id) {
    if (id === editId) {
      return;
    }
    setData((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return task.state === "complete"
            ? { ...task, state: "normal" }
            : { ...task, state: "complete" };
        }
        return task;
      });
    });
  }
  function handleActiveState(id) {
    setData((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return task.state === "active"
            ? { ...task, state: "normal" }
            : { ...task, state: "active" };
        }
        return task;
      });
    });
  }
  function handleDelete(id) {
    setData((prev) => {
      return prev.filter((task) => {
        if (task.id !== id) {
          return task;
        }
      });
    });
  }
  function handleEdit(id, task) {
    setEditId(id);
    setEditValue(task);
  }
  function handleEditKey(e, id) {
    if (e.key === "Enter") {
      setData((prev) => {
        return prev.map((task) => {
          if (task.id === id) {
            return { ...task, task: editValue };
          }
          return task;
        });
      });
      setEditId(null);
      setEditValue("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#161722] flex justify-center px-4">
      <div className="w-full max-w-xl py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-blue-500">
            TODO
          </h1>

          <img
            src={theme === "dark" ? sun : moon}
            alt="toggle theme"
            className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
            onClick={() => toggleTheme()}
          />
        </div>

        {/* Input */}
        <div className="flex items-center gap-4 bg-white dark:bg-[#25273c] px-4 sm:px-5 py-4 rounded-lg shadow-md mb-10">
          <input
            value={value}
            onKeyDown={(e) => handleOnKeyDown(e)}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Create a new todo..."
            className="flex-1  outline-none text-sm sm:text-base text-gray-700 dark:text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Todo List */}

        {data.map(({ task, state, id }) => {
          if (filter === "all") {
            return (
              <div
                key={id}
                className="mt-6 bg-white dark:bg-[#25273c] rounded-lg shadow-md overflow-hidden "
              >
                {/* Todo Item */}
                <div className="flex items-center gap-4 px-4 sm:px-5 py-4 border-b last:border-none ">
                  {editId === id ? (
                    <div
                      onClick={() => {
                        handleCompleteState(id);
                      }}
                      className={
                        "w-5 h-5 dark:text-white sm:w-6 sm:h-6 cursor-pointer border rounded-full text-black"
                      }
                    ></div>
                  ) : (
                    <div
                      onClick={() => {
                        handleCompleteState(id);
                      }}
                      className={`w-5 h-5 cursor-pointer dark:text-white sm:w-6 sm:h-6 border rounded-full text-black ${state === "complete" ? "dark:bg-white bg-black" : ""}`}
                    ></div>
                  )}

                  {editId === id ? (
                    <input
                      value={editValue}
                      ref={inputRef}
                      onChange={(e) => {
                        setEditValue(e.target.value);
                      }}
                      onKeyDown={(e) => handleEditKey(e, id)}
                      type="text"
                      placeholder="edit todo..."
                      className="flex-1  outline-none text-sm sm:text-base text-gray-700 bg-gray-500 p-3 rounded-2xl dark:text-gray-200 placeholder-gray-400"
                    />
                  ) : state === "complete" ? (
                    <p
                      onClick={() => {
                        handleActiveState(id);
                      }}
                      className={`flex-1 cursor-pointer text-sm line-through sm:text-base  ${state === "active" ? "text-red-500" : "text-gray-400 dark:text-gray-600"}`}
                    >
                      {task}
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        handleActiveState(id);
                      }}
                      className={`flex-1 text-sm cursor-pointer sm:text-base  ${state === "active" ? "text-red-500" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      {task}
                    </p>
                  )}

                  <img
                    onClick={() => {
                      handleEdit(id, task);
                    }}
                    src={edit}
                    alt="edit"
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  />
                  <img
                    onClick={() => {
                      handleDelete(id);
                    }}
                    src={cross}
                    alt="delete"
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  />
                </div>
              </div>
            );
          }

          if (filter === "active" && state === "active") {
            return (
              <div
                key={id}
                className="mt-6 bg-white dark:bg-[#25273c] rounded-lg shadow-md overflow-hidden "
              >
                {/* Todo Item */}
                <div className="flex items-center gap-4 px-4 sm:px-5 py-4 border-b last:border-none  ">
                  {editId === id ? (
                    <div
                      className={
                        "w-5 h-5 dark:text-white sm:w-6 cursor-pointer sm:h-6 border rounded-full text-black"
                      }
                    ></div>
                  ) : (
                    <div
                      onClick={() => {
                        handleCompleteState(id);
                      }}
                      className={`w-5 h-5 dark:text-white cursor-pointer sm:w-6 sm:h-6 border rounded-full text-black ${state === "complete" ? "dark:bg-white bg-black" : ""}`}
                    ></div>
                  )}

                  {editId === id ? (
                    <input
                      value={editValue}
                      onKeyDown={() => handleEditKey(id)}
                      type="text"
                      placeholder="edit todo..."
                      className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-700 dark:text-gray-200 placeholder-gray-400"
                    />
                  ) : (
                    <p
                      onClick={() => {
                        handleActiveState(id);
                      }}
                      className={`flex-1 cursor-pointer text-sm sm:text-base  ${state === "active" ? "text-red-500" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      {task}
                    </p>
                  )}
                  <img
                    onClick={() => {
                      handleEdit(id, task);
                    }}
                    src={edit}
                    alt="edit"
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  />
                  <img
                    onClick={() => {
                      handleDelete(id);
                    }}
                    src={cross}
                    alt="delete"
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  />
                </div>
              </div>
            );
          }

          if (filter === "complete" && state === "complete") {
            return (
              <div
                key={id}
                className="mt-6 bg-white dark:bg-[#25273c] rounded-lg shadow-md overflow-hidden "
              >
                {/* Todo Item */}
                <div className="flex items-center  gap-4 px-4 sm:px-5 py-4 border-b last:border-none ">
                  {editId === id ? (
                    <div
                      onClick={() => {
                        handleCompleteState(id);
                      }}
                      className={
                        "w-5 h-5 dark:text-white cursor-pointer sm:w-6 sm:h-6 border rounded-full text-black"
                      }
                    ></div>
                  ) : (
                    <div
                      onClick={() => {
                        handleCompleteState(id);
                      }}
                      className={`w-5 h-5 dark:text-white cursor-pointer sm:w-6 sm:h-6 border rounded-full text-black ${state === "complete" ? "dark:bg-white bg-black" : ""}`}
                    ></div>
                  )}

                  {editId === id ? (
                    <input
                      value={editValue}
                      onKeyDown={() => handleEditKey(id)}
                      type="text"
                      placeholder="edit todo..."
                      className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-700 dark:text-gray-200 placeholder-gray-400"
                    />
                  ) : state === "complete" ? (
                    <p
                      onClick={() => {
                        handleActiveState(id);
                      }}
                      className={`flex-1 text-sm cursor-pointer line-through sm:text-base  ${state === "active" ? "text-red-500" : "text-gray-400 dark:text-gray-600"}`}
                    >
                      {task}
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        handleActiveState(id);
                      }}
                      className={`flex-1 text-sm cursor-pointer sm:text-base  ${state === "active" ? "text-red-500" : "text-gray-700 dark:text-gray-200"}`}
                    >
                      {task}
                    </p>
                  )}
                  <img
                    onClick={() => {
                      handleEdit(id, task);
                    }}
                    src={edit}
                    alt="edit"
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  />
                  <img
                    onClick={() => {
                      handleDelete(id);
                    }}
                    src={cross}
                    alt="delete"
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  />
                </div>
              </div>
            );
          }
        })}

        {/* Footer */}
        <div className="mt-4 bg-white dark:bg-[#25273c] px-4 py-4 rounded-lg shadow-md text-sm text-gray-400 mt-10 ">
          {/* Top Row */}
          <div className="flex justify-between items-center">
            <span>{data.length}</span>
            <button
              onClick={() => {
                setData([]);
              }}
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              Clear All
            </button>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-6 mt-4 font-semibold">
            <button
              onClick={() => setFilter("all")}
              className={`${filter === "all" ? "text-blue-500" : "hover:text-gray-700 dark:hover:text-gray-200"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`${filter === "active" ? "text-blue-500" : "hover:text-gray-700 dark:hover:text-gray-200"}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("complete")}
              className={`${filter === "complete" ? "text-blue-500" : "hover:text-gray-700 dark:hover:text-gray-200"}`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
