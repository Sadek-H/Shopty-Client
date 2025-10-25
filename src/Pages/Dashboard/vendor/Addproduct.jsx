import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const subCategorySpecs = {
  mobile: ["Display", "Battery", "Camera", "RAM", "Storage"],
  laptops: ["Processor", "RAM", "Storage", "GPU", "Screen Size"],
  accessories: ["Type", "Compatibility", "Color", "Warranty"],
};

const AddProduct = () => {
const [category, setCategory] = useState("");
const [subCategory, setSubCategory] = useState("");
const [FileSystem, setFiles] = useState([]);
const [specs, setSpecs] = useState([]);


useEffect(() => {
  if (subCategory) {
    const initialSpecs = subCategorySpecs[subCategory].map((key) => ({
      key,
      value: "",
    }));
    setSpecs(initialSpecs);
  }
}, [subCategory]);

const addSpec = () => {
  setSpecs([...specs, { key: "", value: "" }]);
}

const RemoveInput = (index) => {
 setSpecs(specs.filter((id)=> id !== index))

}

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    formdata.append("specifications", JSON.stringify(specs));
    console.log("Data",formdata);
    // images
    formdata.delete("images");
    FileSystem.forEach((file) => {
      formdata.append("images", file);
      
    });

  

    axios
      .post("http://localhost:3000/products", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
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
    setFiles((prevFiles) => {
      const combined = [...prevFiles, ...files];
      return combined.slice(0, 4); // max 4 files
    });
  };

  const handleDelete = (name) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };



  return (
    <div className="w-full rounded-2xl shadow-xl p-8 bg-gray-50 px-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Add Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          className="w-full border rounded-lg p-3"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
          }}
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="gaming">Gaming</option>
        </select>

        {/* SubCategory */}
        {category === "electronics" && (
          <select
            name="subcategory"
            value={subCategory}
            onChange={(e) =>{
              setSubCategory(e.target.value);
              setSpecs([]); // Reset specs when subcategory changes
            }}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Subcategory</option>
            <option value="mobile">Mobile Phones</option>
            <option value="laptops">Laptops</option>
            <option value="accessories">Accessories</option>
          </select>
        )}

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          className="w-full border rounded-lg p-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded-lg p-3"
        />

        {/*  Specs Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-3">Specifications</h3>
           {specs.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Key"
                value={spec.key}
                onChange={(e)=>{
                  const newSpecs = [...specs];
                  newSpecs[index].value = e.target.value;
                  setSpecs(newSpecs);
                }}
              
                className="w-1/3 border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Value"
                onChange={(e)=>{
                  const newSpecs = [...specs];
                  newSpecs[index].value = e.target.value;
                  setSpecs(newSpecs);
                }}
              
                className="w-2/3 border rounded-lg p-2"
              />
              <button
                type="button"
                onClick={() => RemoveInput(index)}
                className="text-red-500"
              >
                <MdDeleteForever size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpec}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            ➕ Add Spec
          </button>
        </div>

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

          <div className="mt-4 flex gap-4 flex-wrap">
            {FileSystem.map((file, i) => (
              <div key={i} className="shadow p-3 rounded relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-14 h-14 object-cover rounded"
                />
                <span
                  onClick={() => handleDelete(file.name)}
                  className="text-red-500 hover:text-red-800 cursor-pointer absolute top-1 right-0"
                >
                  <MdDeleteForever />
                </span>
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
