const handleModuleCreation = async (req, res) => {


  if (!req.body.name) {
    return res.status(400).send('No module name uploaded');
  }

  const datetime = new Date();

  try {
    const [id] = await req.db('user').insert({ Date: datetime, Course: req.body.name });
    console.log(id);
    return res.status(200).send({ id });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error creating module');
  }
  };

  // deleting a module based on id
  
  const handleModuleDeletion = async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).send({ message: 'No module ID provided' });
    }
  
    try {
      console.log(`Attempting to delete module with ID: ${id}`);
      // Update the query to use 'Id' instead of 'Course'
      const numDeleted = await req.db('user').where('Id', id).del();
  
      if (numDeleted) {
        console.log(`Module with ID '${id}' deleted successfully`);
        return res.status(200).send({ message: `Module with ID '${id}' deleted successfully` });
      } else {
        console.log(`Module with ID '${id}' not found`);
        return res.status(404).send({ message: `Module with ID '${id}' not found` });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).send({ message: 'Unexpected error' });
    }
  };
  
  
  module.exports = { handleModuleCreation, handleModuleDeletion };
  