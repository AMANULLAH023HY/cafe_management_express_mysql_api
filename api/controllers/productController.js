const db = require("../config/db");

// add new product controller
const addProductController = (req, res) => {
  try {
    const product = req.body;

    let query =
      "INSERT INTO product (name,categoryId,description, price,status )VALUES(?,?,?,?,'true')";
    db.query(
      query,
      [product.name, product.categoryId, product.description, product.price],
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Something went wrong",
            error: err.message,
          });
        } else {
          res.status(200).json({
            message: "Product Added successfully!",
            product: result,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// Get all Product controller
const getAllProductController = (req, res) => {
  try {
    let query =
      "SELECT p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName FROM product as p INNER JOIN category as c ON p.categoryId = c.id";

    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Get all product show",
          product: result,
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

// Get product by categoryId

const getproductByCatId = (req, res) => {
  try {
    const id = req.params.id;
    let query =
      "SELECT id,name, price FROM product WHERE categoryId =? AND status = 'true'";
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Internal server Error",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Get product by categoryID",
          product: result,
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

// Get product by Id

const getproductById = (req, res) => {
  try {
    const id = req.params.id;
    let query = "SELECT id,name,description, price FROM product WHERE id =? ";
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Internal server Error",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Get product by categoryID",
          product: result,
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

// Upadate product controller

const updateProductController = (req, res) => {
  try {
    const product = req.body;
    let query =
      "UPDATE product SET name =?, categoryId = ?,  description=?, price = ? WHERE id = ?";
    db.query(
      query,
      [
        product.name,
        product.description,
        product.price,
        product.categoryId,
        product.id,
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Something went wrong!",
            error: err.message,
          });
        } else {
          if (result.affectedRows == 0) {
            res.status(404).json({
              message: "Product id doesn't found",
            });
          } else {
            res.status(200).json({
              message: "Product updated successfully!",
              product: result,
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};


// Upadate product status controller

const updateProductStatusController = (req, res) => {
  try {
    const product = req.body;
    let query =
      "UPDATE product SET status =? WHERE id = ?";
    db.query(
      query,
      [
        product.status,
        product.id,
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Something went wrong!",
            error: err.message,
          });
        } else {
          if (result.affectedRows == 0) {
            res.status(404).json({
              message: "Product id doesn't found",
            });
          } else {
            res.status(200).json({
              message: "Product Status updated successfully!",
              product: result,
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// Delete product controller
const deleteProductController = (req, res) => {
  try {
    const id = req.params.id;
    let query = "DELETE FROM product WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      } else {
        if (result.affectedRows == 0) {
          res.status(404).json({
            message: "Product id doesn't exist",
          });
        } else {
          res.status(200).json({
            message: "Product deleted successfully!",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

module.exports = {
  addProductController,
  getAllProductController,
  getproductByCatId,
  getproductById,
  updateProductController,
  deleteProductController,
  updateProductStatusController
};
