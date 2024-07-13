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
    if (!req.body.id) {
      return res.status(400).send('No module name uploaded');
    }
  
    try {
      const numDeleted = await req.db('user').where('Course', req.body.id).del();
      if (numDeleted) {
        return res.status(200).send({ message: `Module '${req.body.id}' deleted successfully` });
      } else {
        return res.status(404).send({ message: `Module '${req.body.id}' not found` });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error deleting module');
    }
  };
  
  module.exports = { handleModuleCreation, handleModuleDeletion };
  