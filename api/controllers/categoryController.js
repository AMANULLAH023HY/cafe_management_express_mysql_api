const db = require("../config/db");

// Add new Category Controller
const addCategoryController = (req, res) => {
  try {
    const category = req.body;
    let query = "INSERT INTO category (name)VALUES(?)";
    db.query(query, [category.name], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Category Added successfully!",
          category: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// Get all category controller
const getAllCategoryController = (req, res, next) => {
  try {
    let query = "SELECT * FROM category ORDER BY name";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Get all category name",
          category: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// Update category controller

const updateCategotyController = (req, res) => {
  try {
    const category = req.body;
    let query = "UPDATE category SET name = ? WHERE id = ?";
    db.query(query, [category.name, category.id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.affected == 0) {
          res.status(404).json({
            message: "Category id does't found!",
          });
        } else {
          res.status(200).json({
            message: "Category updated successfully!",
            category: result,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// Delete category controller
const deleteCategotyController = (req, res) => {
  try {
    const category = req.body;
    let query = "DELETE FROM category WHERE id = ?";
    db.query(query, [category.id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Category Deleted successfully!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addCategoryController,
  getAllCategoryController,
  updateCategotyController,
  deleteCategotyController,
};
