import React, { useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const fileInputRef = React.useRef(null);

  const createCourse = async () => {
    try {
      const token = Cookies.get("token");
      console.log("cookie", token);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("published", true);
      formData.append("imageLink", fileInputRef.current.files[0]);

      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      toast.success(data.message);
      setTimeout(() => {
        navigate("/courses");
      }, 1000);
      const { imageUrl } = data;
      console.log("Image URL:", imageUrl);
    } catch (error) {
      toast.error(data.message);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-center items-center min-h-screen bg-[#F4F4F6]">
        <div className="w-1/2 bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Create a Course</h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-semibold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter the price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block text-gray-700 font-semibold mb-2"
            >
              Photo
            </label>
            <input type="file" ref={fileInputRef} accept="image/*" />
            {fileInputRef.current && fileInputRef.current.files[0] && (
              <img
                src={URL.createObjectURL(fileInputRef.current.files[0])}
                alt="Product Photo"
                className="mt-4 rounded"
                style={{ maxWidth: "200px" }}
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => createCourse()}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
