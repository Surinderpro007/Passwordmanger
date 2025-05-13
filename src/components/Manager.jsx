import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const handleEyePassword = () => {
    if (ref.current.innerHTML === "Show") {
      passwordRef.current.type = "text";
      ref.current.innerHTML = "Hide";
    } else {
      ref.current.innerHTML = "Show";
      passwordRef.current.type = "password";
    }

  };

  const [form, setForm] = useState({ website: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
 
 const itemsPerPage = 5;
 const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = passwordArray.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(passwordArray.length / itemsPerPage);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = (e) => {
    e.preventDefault();
    if(form.website.length >= 4 && form.username.length >= 4 && form.password.length >= 4){
      setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
      toast.success("Added Successfully");
      setForm({ website: "", username: "", password: "" });
    }
    else{
      toast.error(
        "Length should be more than 4 characters"
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const copybtn = (item) => {
    navigator.clipboard
      .writeText(item)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy");
      });
  };


  const editBtn=(id)=>{
       setForm(passwordArray.filter(i => i.id === id)[0]);
       setPasswordArray(passwordArray.filter((item)=>{
        return item.id!==id;
    }))
    
  }

  const deleteBtn=(id)=>{
    let msg =  confirm("Are you sure you want to delete this?");
    if(msg){
        
      setPasswordArray(passwordArray.filter((item)=>{
        return item.id!==id;
      }))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>{
        return item.id!==id;
      })));
      
    }
      toast.success("Delete successfully");
  }


  return (
    <div className="container mx-auto mt-10 w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <form className=" w-[50%] mx-auto">
        <div className="mb-5">
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter URL
          </label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            type="url"
            id="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="inp mb-5">
          <div className="flex gap-4">
            <div className="inp2 w-1/2">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                name="username"
                value={form.username}
                type="text"
                onChange={handleChange}
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your username"
                required
              />
            </div>
            <div className="inp2 w-1/2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={form.password}
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required
                />
                <span
                  onClick={handleEyePassword}
                  className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer">
                  <p ref={ref}>Show</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={savePassword}
          type="submit"
          className="saveBtn m-auto flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>

      <div className="relative overflow-x-auto py-5">
        {passwordArray.length === 0 && (
          <h2 className="text-[25px] font-semibold text-center">
            No Passwords to show
          </h2>
        )}
        {passwordArray.length != 0 && (
          <div className="tableData h-[510px] overflow-y-auto">
          <table className="w-[70%] m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-2xl overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  Site URL
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                     <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-3 items-center"
                    >
                      <a href={item.website} target="_blank">
                        {" "}
                        {item.website}
                      </a>

                      <div
                        className="copy cursor-pointer"
                        onClick={() => {
                          copybtn(item.website);
                        }}
                      >
                        <img className=" w-4" src="../icons/copy.svg" alt="" />
                      </div>
                    </td>
                   
                    <td className="px-6 py-4">{item.username}</td>
                    <td className="px-6 py-4">{item.password}</td>
                    <td className="px-6 py-4 flex gap-3 items-center cursor-pointer">
                      <button  type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"   onClick={() => {
                          editBtn(item.id);
                        }} >
                        <img src="../icons/edit.svg" className="w-4" alt="" />
                      </button>
                      <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg  px-5 py-2.5 text-center  mb-2"   onClick={() => {
                          deleteBtn(item.id  );
                        }}>
                        <img src="../icons/delete.svg" className="w-4" alt="" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
     <div className="flex justify-center mt-4 gap-4">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(prev => prev - 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => prev + 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
          </div>
        )}
        
      </div>
          
    </div>
  );
};

export default Manager;
