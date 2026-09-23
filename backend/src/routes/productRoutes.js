const express = require("express");

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const { imageUploads } = require("../utils/multer");

const router = express.Router();

router
  .route("/createproduct")
  .post(
    authMiddleware.protectRoute,
    imageUploads,
    productController.createNewProduct,
  );

router.route("/getallproducts").get(productController.getAllProducts);
router.route("/getproductdetail/:id").get(productController.getProductDetails);
router
  .route("/deleteproduct/:id")
  .delete(authMiddleware.protectRoute, productController.deleteProduct);

module.exports = router;
