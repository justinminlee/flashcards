import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = () => {
  const { moduleName } = useParams();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [files, setFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [renameCategoryName, setRenameCategoryName] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const navigate = useNavigate();

  // Load categories from localStorage when the component mounts
  useEffect(() => {
    const savedCategories = localStorage.getItem(`categories-${moduleName}`);
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, [moduleName]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`categories-${moduleName}`, JSON.stringify(categories));
  }, [categories, moduleName]);

  const createCategory = () => {
    if (newCategoryName.trim() === '' || files.length === 0) {
      alert('Category name and at least one file are required');
      return;
    }
    const fileMetadata = files.map(file => ({
      name: file.name,
      type: file.type
    }));
    const newCategory = {
      name: newCategoryName,
      files: fileMetadata
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setFiles([]);
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const startRenameCategory = (index) => {
    setIsEditing(true);
    setCurrentCategoryIndex(index);
    setRenameCategoryName(categories[index].name);
  };

  const renameCategory = () => {
    const updatedCategories = [...categories];
    updatedCategories[currentCategoryIndex].name = renameCategoryName;
    setCategories(updatedCategories);
    setIsEditing(false);
    setCurrentCategoryIndex(null);
    setRenameCategoryName('');
  };

  const handleNavigate = (categoryName) => {
    navigate(`/module/${moduleName}/category/${categoryName}`);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleAddFiles = (index) => {
    if (uploadingFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }
    const fileMetadata = uploadingFiles.map(file => ({
      name: file.name,
      type: file.type
    }));
    const updatedCategories = [...categories];
    updatedCategories[index].files = [...updatedCategories[index].files, ...fileMetadata];
    setCategories(updatedCategories);
    setUploadingFiles([]);
  };

  const handleDeleteFile = (categoryIndex, fileIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].files = updatedCategories[categoryIndex].files.filter((_, i) => i !== fileIndex);
    setCategories(updatedCategories);
  };

  return (
    <div className="category-list">
      <h2>{moduleName} Categories</h2>
      <div className="categories">
        {categories.map((category, index) => (
          <div key={index} className="category">
            {isEditing && currentCategoryIndex === index ? (
              <div>
                <input
                  type="text"
                  value={renameCategoryName}
                  onChange={(e) => setRenameCategoryName(e.target.value)}
                />
                <button onClick={renameCategory}>Save</button>
              </div>
            ) : (
              <>
                <div onClick={() => handleNavigate(category.name)}>
                  {category.name}
                </div>
                <button onClick={() => startRenameCategory(index)}>Rename</button>
                <button onClick={() => deleteCategory(index)}>Delete</button>
                <div className="files">
                  {category.files.map((file, fileIndex) => (
                    <div key={fileIndex} className="file">
                      {file.name}
                      <button onClick={() => handleDeleteFile(index, fileIndex)}>Delete</button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setUploadingFiles(Array.from(e.target.files))}
                />
                <button onClick={() => handleAddFiles(index)}>Add Files</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="create-category-form">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button onClick={createCategory}>Create new category</button>
      </div>
    </div>
  );
};

export default CategoryList;
