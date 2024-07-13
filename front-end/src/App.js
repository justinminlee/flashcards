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
      name: newModuleName
    };

    fetch('http://localhost:4000/new_module', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newModule)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const createdModule = { id: data.id, name: newModuleName };
      setModules([...modules, createdModule]);
      setNewModuleName('');
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const deleteModule = (id) => {
    fetch('http://localhost:4000/delete_module', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error('Network response was not ok: ' + response.statusText + ' - ' + text);
        });
      }
      return response.json();
    })
    .then(data => {
      setModules(modules.filter(module => module.id !== id));
      console.log('Module deleted:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const renameModule = (id, newName) => {
    setModules(modules.map(module => module.id === id ? { ...module, name: newName } : module));
  };

  return (
    <Router>
      <div className="App">
        <Header />
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
    </Router>
  );
}

const CategoryRouteWrapper = () => {
  const { moduleName, categoryName } = useParams();
  return <CategoryPage data={sampleData} categoryName={categoryName} />;
};

export default App;