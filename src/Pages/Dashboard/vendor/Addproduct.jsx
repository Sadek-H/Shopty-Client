import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const categoryFields = {
  electronics: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "model", label: "Model", type: "text" },
    { name: "warranty", label: "Warranty (e.g. 1 Year)", type: "text" },
    { name: "specs", label: "Specifications", type: "textarea" },
  ],
  fashion: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "size", label: "Size (S, M, L, XL)", type: "text" },
    { name: "color", label: "Color", type: "text" },
    { name: "material", label: "Material", type: "text" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Men", "Women", "Unisex"],
    },
  ],
  books: [
    { name: "author", label: "Author", type: "text" },
    { name: "publisher", label: "Publisher", type: "text" },
    { name: "isbn", label: "ISBN", type: "text" },
    { name: "language", label: "Language", type: "text" },
    { name: "edition", label: "Edition", type: "text" },
  ],
  gaming: [
    {
      name: "platform",
      label: "Platform",
      type: "select",
      options: ["PC", "PS5", "Xbox", "Nintendo"],
    },
    { name: "genre", label: "Genre", type: "text" },
    { name: "pegi", label: "PEGI Rating", type: "number" },
    { name: "developer", label: "Developer", type: "text" },
  ],
};

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [FileSystem, setFiles] = useState([]);
  console.log(FileSystem);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    formdata.delete('images');
     FileSystem.forEach(file => {
      formdata.append('images',file);
     });
    console.log("Submitted Product Data:", formdata);

    axios
      .post("http://localhost:3000/products", formdata,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => {
        console.log(res.data);
        e.target.reset();
        toast.success("Product added successfully!");
      })
      .catch((err) => {
        toast.error(`Failed to add product: ${err.message}`);
      });
  };
 
  const handlefile = (e) => {
    
     const files = Array.from(e.target.files);
     setFiles(
       (prevFiles) => {
         const combined = [...prevFiles, ...files];
         return combined.slice(0, 4); 
       }
     );

  }
  const handleDelete = (name) => {
    console.log(name);
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  return (
    <div className="w-full rounded-2xl shadow-xl p-8 bg-gray-50 px-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Add Product
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded"></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Fields */}
        <input
          name="name"
          placeholder="Product Name"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
          required
        />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
          required
        >
          <option
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition text-gray-500"
            value=""
          >
            Select Category
          </option>
          {Object.keys(categoryFields).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
        />

        {/* Dynamic Fields */}
        {category &&
          categoryFields[category]?.map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.label}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
                  defaultValue=""
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.label}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
                />
              )}
            </div>
          ))}

        {/* Image Upload */}
        <div>
          <label
            htmlFor="images"
            className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
          >
            📁 Click to upload files 
            <input
              type="file"
              id="images"
              name="images"
              multiple
              className="hidden"
              onChange={handlefile}
            />
          </label>
         <div className="mt-4 flex gap-4">
           {FileSystem.map((file, i) => (
            <div key={i} className="shadow p-3 rounded relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-14 h-14 object-cover rounded"
              />
              
         
             <span onClick={() => handleDelete(file.name)} className="text-red-500 hover:text-red-800 cursor-pointer absolute top-1 right-0 "><MdDeleteForever /></span>
            </div>
          ))}
         </div>
        </div>

        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
