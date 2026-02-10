import { useContext, useEffect, useRef, useState } from "react";
import Modal from "./modal";
import {
  useDeleteUser,
  useEditData,
  useAddData,
  useFetchData,
} from "./api/apiCalls";
import { appContext } from "./context/appContext";

function App() {
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(false);
  const { isOpen, setIsOpen, isEditMode, setIsEditMode, form, setForm } =
    useContext(appContext);
  const divRef = useRef(null);

  function startSmoothProgress() {
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 100);

    return interval;
  }
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchData(setProgress, startSmoothProgress);
  const deleteUser = useDeleteUser();
  const editUser = useEditData();
  const addData = useAddData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0 },
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  function handleOnChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateForm() {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.Role.trim()) {
      newErrors.Role = "Role is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // true = valid form
  }

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center h-dvh justify-center">
        <div className="flex justify-between text-sm mb-1 w-[50%]">
          <span>Loading...</span>
          <span>{progress}%</span>
        </div>

        <div className="w-[50%] bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className={`bg-sky-500 h-2 transition-all duration-300 w-${progress}`}
          ></div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <div className="text-red-500 text-5xl mb-3">⚠️</div>
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mt-1">Please try again later.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-sky-500 text-white px-5 py-2 rounded-full cursor-pointer font-medium hover:bg-sky-600 transition"
          >
            + Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left text-gray-600">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.pages?.map((pages) =>
                pages?.map(({ name, email, Role, id }) => (
                  <tr
                    key={id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-4">{id ? id : "pending..."}</td>
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {name}
                    </td>
                    <td className="py-4 px-4 text-gray-600">{email}</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        {Role}
                      </span>
                    </td>
                    <td className="py-4 px-4 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setForm({ ...form, name, email, Role });
                          setIsOpen(true);
                          setIsEditMode({
                            mode: true,
                            id: id,
                          });
                        }}
                        className="px-4 py-1 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200  cursor-pointer transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser.mutate({ id })}
                        className="px-4 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200  cursor-pointer transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>{" "}
      </div>

      <div ref={divRef} className="flex items-center justify-center gap-4 mt-6">
        {isFetchingNextPage && (
          <div className="flex justify-center my-4">
            <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!hasNextPage && (
          <div className="flex justify-center my-4">
            <h2
              disabled
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full mr-5"
            >
              No more data
            </h2>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-sky-500 text-white px-5 py-2 rounded-full cursor-pointer font-medium hover:bg-sky-600 transition"
            >
              + Add User
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Add User</h2>

        <form className="space-y-4">
          <input
            value={form.name}
            onChange={handleOnChange}
            name="name"
            placeholder="Name"
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <input
            value={form.email}
            type="email"
            onChange={handleOnChange}
            name="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <input
            value={form.Role}
            onChange={handleOnChange}
            name="Role"
            placeholder="Role"
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.Role && <p className="text-red-500 text-sm">{errors.Role}</p>}
          {isEditMode.mode ? (
            <button
              onClick={() => {
                if (validateForm()) {
                  editUser.mutate({
                    id: isEditMode.id,
                    setIsEditMode,
                    setForm,
                    setIsOpen,
                    form,
                  });
                }
              }}
              type="button"
              className="w-full cursor-pointer bg-yellow-500 text-white py-2 rounded-full"
            >
              Edit User
            </button>
          ) : (
            <button
              onClick={() => {
                if (validateForm()) {
                  addData.mutate({ setForm, setIsOpen, form });
                }
              }}
              type="button"
              className="w-full cursor-pointer bg-sky-500 text-white py-2 rounded-full"
            >
              Add User
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
}

export default App;
