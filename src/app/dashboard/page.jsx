"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CoursesApis from "../_Utils/CoursesApis";

const defaultForm = {
  title: "The Future of AI — Build Intelligent Experiences",
  category: "Artificial Intelligence",
  Author: "David Miller",
  description:
    "Step into the next generation of technology by creating smart AI-powered products, creative systems, and automated experiences that solve real-world problems and redefine how people interact with digital platforms.",
  price: 129,
  discount: 22,
  rating: 4.9,
};

export default function DashboardPage() {
  const [formData, setFormData] = useState(defaultForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.category.trim()) return "Category is required";
    if (!formData.Author.trim()) return "Author is required";
    if (!formData.description.trim()) return "Description is required";
    if (Number(formData.price) <= 0) return "Price must be greater than 0";
    if (Number(formData.discount) < 0) return "Discount cannot be negative";
    if (Number(formData.discount) > 100) return "Discount cannot exceed 100";
    if (Number(formData.rating) < 0 || Number(formData.rating) > 5) return "Rating must be between 0 and 5";
    if (!selectedImage) return "Course image is required";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorMessage = validate();

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      setLoading(true);
      const imageFormData = new FormData();
      imageFormData.append("files", selectedImage);
      const uploadResponse = await CoursesApis.uploadCourseImage(imageFormData);
      const uploadedImageId = uploadResponse?.data?.[0]?.id;

      if (!uploadedImageId) {
        throw new Error("Image upload failed");
      }

      const payload = {
        data: {
          title: formData.title.trim(),
          category: formData.category.trim(),
          Author: formData.Author.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          discount: Number(formData.discount),
          rating: Number(formData.rating),
          images: [uploadedImageId],
        },
      };

      await CoursesApis.createCourse(payload);
      toast.success("Course created successfully");
      setFormData(defaultForm);
      setSelectedImage(null);
    } catch (error) {
      const apiError =
        error?.response?.data?.error?.message || "Failed to create course";
      toast.error(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto w-[90%] xl:w-[70%] py-10">
      <h1 className="text-2xl font-semibold mb-2">Course Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">
        Create and insert courses to your Strapi collection.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-neutral-200 rounded-xl p-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="border rounded px-3 py-2"
            placeholder="Course title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm text-gray-700">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            className="border rounded px-3 py-2"
            placeholder="Web Development"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Author" className="text-sm text-gray-700">
            Author
          </label>
          <input
            id="Author"
            name="Author"
            type="text"
            className="border rounded px-3 py-2"
            placeholder="Instructor name"
            value={formData.Author}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-sm text-gray-700">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            className="border rounded px-3 py-2"
            placeholder="79"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="discount" className="text-sm text-gray-700">
            Discount (%)
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            min="0"
            max="100"
            className="border rounded px-3 py-2"
            placeholder="15"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="rating" className="text-sm text-gray-700">
            Rating (0 to 5)
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            className="border rounded px-3 py-2"
            placeholder="4.8"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="description" className="text-sm text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            className="border rounded px-3 py-2"
            placeholder="Brief course description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="image" className="text-sm text-gray-700">
            Course Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="border rounded px-3 py-2"
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              setSelectedImage(file);
            }}
          />
          {selectedImage ? (
            <p className="text-xs text-gray-500">Selected: {selectedImage.name}</p>
          ) : (
            <p className="text-xs text-gray-400">Upload one image for this course</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
