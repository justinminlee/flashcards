import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import Module from './components/Module';
import CategoryList from './components/CategoryList';
import CategoryPage from './components/CategoryPage';
import sampleData from './data/sampleData.json';
import './App.css';

function App() {
  const [modules, setModules] = useState([]);
  const [newModuleName, setNewModuleName] = useState('');

  // Load modules from localStorage when the app starts
  useEffect(() => {
    const savedModules = localStorage.getItem('modules');
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    }
  }, []);

  // Save modules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('modules', JSON.stringify(modules));
  }, [modules]);

  const createModule = () => {
    if (newModuleName.trim() === '') {
      alert('Module name cannot be empty');
      return;
    }
    const newModule = {
      id: modules.length ? modules[modules.length - 1].id + 1 : 1,
      name: newModuleName
    };
    setModules([...modules, newModule]);
    setNewModuleName('');
  };

  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  const renameModule = (id, newName) => {
    setModules(modules.map(module => module.id === id ? { ...module, name: newName } : module));
  };

  return (
    <Router>
      <div>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={
              <>
                <div className="modules">
                  {modules.map(module => (
                    <Module
                      key={module.id}
                      module={module}
                      onDelete={deleteModule}
                      onRename={renameModule}
                    />
                  ))}
                </div>
                <div className="create-module-form">
                  <input
                    type="text"
                    placeholder="Enter module name"
                    value={newModuleName}
                    onChange={(e) => setNewModuleName(e.target.value)}
                  />
                  <button className="create-module-button" onClick={createModule}>
                    Create new module
                  </button>
                </div>
              </>
            } />
            <Route path="/module/:moduleName" element={<CategoryList />} />
            <Route path="/module/:moduleName/category/:categoryName" element={<CategoryRouteWrapper />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const CategoryRouteWrapper = () => {
  const { moduleName, categoryName } = useParams();
  // Here, you should fetch or find the data for the specific category
  // For demonstration, we use sampleData
  return <CategoryPage data={sampleData} categoryName={categoryName} />;
};

export default App;
