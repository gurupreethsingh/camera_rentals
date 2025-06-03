const Product = require("../models/ProductModel");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const productUploadDir = path.join("uploads", "products");

if (!fs.existsSync(productUploadDir)) {
  fs.mkdirSync(productUploadDir, { recursive: true });
}

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productUploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

const productUpload = multer({ storage: productStorage });
exports.productUpload = productUpload;

exports.createProduct = async (req, res) => {
  try {
    if (!req.body.vendor || !req.body.outlet) {
      return res
        .status(400)
        .json({ message: "Vendor and Outlet are required." });
    }

    if (req.body.subcategory === "") delete req.body.subcategory;
    if (req.body.category === "") delete req.body.category;

    const {
      product_name,
      slug,
      description,
      sku,
      selling_price,
      display_price,
      category,
      subcategory,
      brand,
      barcode,
      stock,
      warehouse_stock,
      total_products_sold,
      outlet,
      dimensions,
      color,
      material,
      ratings,
      avg_rating,
      total_reviews,
      tags,
      section_to_appear,
      featured,
      is_new_arrival,
      is_trending,
      availability_status,
      discount,
      min_purchase_qty,
      max_purchase_qty,
      delivery_time_estimate,
      replacement_policy,
      origin_country,
      pricing_rules,
      campaign,
      vendor,
      reviews,
      orders,
      purchases,
      returns,
      wishlist_users,
      questions,
      related_products,
      bundles,
      vector_embedding,
      popularity_score,
      meta_title,
      meta_description,
      createdBy,
      updatedBy,
      version,
      admin_notes,
    } = req.body;

    const normalize = (f) => f?.path?.replace(/\\/g, "/") || "";

    const newProduct = new Product({
      product_name,
      slug,
      description,
      sku,
      selling_price,
      display_price,
      product_image: normalize(req.files["product_image"]?.[0]),
      product_image_1: normalize(req.files["product_image_1"]?.[0]),
      product_image_2: normalize(req.files["product_image_2"]?.[0]),
      product_image_3: normalize(req.files["product_image_3"]?.[0]),
      product_image_4: normalize(req.files["product_image_4"]?.[0]),
      product_image_5: normalize(req.files["product_image_5"]?.[0]),
      product_image_6: normalize(req.files["product_image_6"]?.[0]),
      product_image_7: normalize(req.files["product_image_7"]?.[0]),
      product_image_8: normalize(req.files["product_image_8"]?.[0]),
      product_image_9: normalize(req.files["product_image_9"]?.[0]),
      product_image_10: normalize(req.files["product_image_10"]?.[0]),
      category,
      subcategory,
      brand,
      barcode,
      stock,
      warehouse_stock,
      total_products_sold,
      outlet,
      dimensions,
      color,
      material,
      ratings,
      avg_rating,
      total_reviews,
      tags,
      section_to_appear,
      featured,
      is_new_arrival,
      is_trending,
      availability_status,
      discount,
      min_purchase_qty,
      max_purchase_qty,
      delivery_time_estimate,
      replacement_policy,
      origin_country,
      pricing_rules,
      campaign,
      vendor,
      reviews,
      orders,
      purchases,
      returns,
      wishlist_users,
      questions,
      related_products,
      bundles,
      vector_embedding,
      popularity_score,
      meta_title,
      meta_description,
      createdBy,
      updatedBy,
      version,
      admin_notes,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create Product Error:", error);
    if (error.code === 11000 && error.keyPattern?.sku) {
      return res
        .status(400)
        .json({ message: "SKU already exists. Please use a unique SKU." });
    }
    res.status(500).json({ message: "Failed to create product." });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate("category")
      .populate("subcategory")
      .populate("vendor");
    res.status(200).json(products);
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subcategory")
      .populate("vendor")
      .populate({
        path: "related_products",
        select: "product_name product_image selling_price",
      })
      .populate({
        path: "bundles.items.product",
        select: "product_name product_image selling_price",
      });

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const {
      product_name,
      slug,
      description,
      selling_price,
      display_price,
      category,
      subcategory,
      brand,
      barcode,
      stock,
      warehouse_stock,
      total_products_sold,
      outlet,
      dimensions,
      color,
      material,
      ratings,
      avg_rating,
      total_reviews,
      tags,
      section_to_appear,
      featured,
      is_new_arrival,
      is_trending,
      availability_status,
      discount,
      min_purchase_qty,
      max_purchase_qty,
      delivery_time_estimate,
      replacement_policy,
      origin_country,
      pricing_rules,
      campaign,
      vendor,
      reviews,
      orders,
      purchases,
      returns,
      wishlist_users,
      questions,
      related_products,
      bundles,
      vector_embedding,
      popularity_score,
      meta_title,
      meta_description,
      updatedBy,
      version,
      admin_notes,
    } = req.body;

    const cleanArray = (arr) => {
      if (typeof arr === "string") {
        try {
          const parsed = JSON.parse(arr);
          if (Array.isArray(parsed)) return parsed;
          return [];
        } catch {
          return [];
        }
      }
      if (!Array.isArray(arr)) return [];
      return arr;
    };

    let safePricingRules = [];
    if (pricing_rules) {
      if (typeof pricing_rules === "string") {
        try {
          const parsed = JSON.parse(pricing_rules);
          if (Array.isArray(parsed)) {
            safePricingRules = parsed;
          }
        } catch (err) {
          console.error("Invalid pricing_rules format:", err);
          safePricingRules = [];
        }
      } else if (Array.isArray(pricing_rules)) {
        safePricingRules = pricing_rules;
      }
    }

    const updatedFields = {
      product_name,
      slug,
      description,
      selling_price: selling_price ? Number(selling_price) : 0,
      display_price: display_price ? Number(display_price) : 0,
      category,
      subcategory,
      brand,
      barcode,
      stock: stock ? Number(stock) : 0,
      warehouse_stock: cleanArray(warehouse_stock),
      total_products_sold: total_products_sold
        ? Number(total_products_sold)
        : 0,
      outlet,
      dimensions,
      color,
      material,
      ratings: ratings ? Number(ratings) : 0,
      avg_rating: avg_rating ? Number(avg_rating) : 0,
      total_reviews: total_reviews ? Number(total_reviews) : 0,
      tags: cleanArray(tags),
      section_to_appear: cleanArray(section_to_appear),
      featured: featured === "true" || featured === true,
      is_new_arrival: is_new_arrival === "true" || is_new_arrival === true,
      is_trending: is_trending === "true" || is_trending === true,
      availability_status:
        availability_status === "true" || availability_status === true,
      discount: discount ? Number(discount) : 0,
      min_purchase_qty: min_purchase_qty ? Number(min_purchase_qty) : 1,
      max_purchase_qty: max_purchase_qty ? Number(max_purchase_qty) : 100,
      delivery_time_estimate,
      replacement_policy,
      origin_country,
      pricing_rules: safePricingRules,
      campaign,
      vendor,
      reviews: cleanArray(reviews),
      orders: cleanArray(orders),
      purchases: cleanArray(purchases),
      returns: cleanArray(returns),
      wishlist_users: cleanArray(wishlist_users),
      questions: cleanArray(questions),
      related_products: cleanArray(related_products),
      bundles: cleanArray(bundles),
      vector_embedding: cleanArray(vector_embedding),
      popularity_score: popularity_score ? Number(popularity_score) : 0,
      meta_title,
      meta_description,
      updatedBy,
      version: version ? Number(version) : 1,
      admin_notes,
      updatedAt: Date.now(),
    };

    const oldProduct = await Product.findById(req.params.id);
    if (!oldProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (req.files) {
      // ✅ Replace and delete main product image
      if (req.files["product_image"] && req.files["product_image"][0]) {
        const oldPath = oldProduct.product_image;
        if (oldPath) {
          const fullPath = path.join(__dirname, "..", oldPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }
        updatedFields.product_image = req.files[
          "product_image"
        ][0].path.replace(/\\/g, "/");
      }

      // ✅ Replace and delete gallery images (1 to 10)
      for (let i = 1; i <= 10; i++) {
        const key = `product_image_${i}`;
        if (req.files[key] && req.files[key][0]) {
          const oldPath = oldProduct[key];
          if (oldPath) {
            const fullPath = path.join(__dirname, "..", oldPath);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
          }
          updatedFields[key] = req.files[key][0].path.replace(/\\/g, "/");
        }
      }
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Failed to update product." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Failed to update product." });
  }
};

// exports.deleteProductById = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndUpdate(
//       req.params.id,
//       { isDeleted: true, updatedAt: Date.now() },
//       { new: true }
//     );
//     if (!deleted)
//       return res.status(404).json({ message: "Product not found." });
//     res.status(200).json({ message: "Product deleted." });
//   } catch (error) {
//     console.error("Delete Product Error:", error);
//     res.status(500).json({ message: "Failed to delete product." });
//   }
// };

exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found." });

    const imageFields = [
      "product_image",
      "product_image_1",
      "product_image_2",
      "product_image_3",
      "product_image_4",
      "product_image_5",
      "product_image_6",
      "product_image_7",
      "product_image_8",
      "product_image_9",
      "product_image_10",
    ];

    imageFields.forEach((field) => {
      const imagePath = product[field];
      if (imagePath) {
        const absolutePath = path.join(__dirname, "..", imagePath);
        fs.unlink(absolutePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error(`Failed to delete ${field}:`, err.message);
          } else {
            console.log(`Deleted image: ${absolutePath}`);
          }
        });
      }
    });

    await Product.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Product and images deleted permanently." });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Failed to delete product." });
  }
};

exports.deleteProductImage = async (req, res) => {
  const { id } = req.params;
  const { imageKey } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product || !product[imageKey]) {
      return res.status(404).json({ message: "Image or product not found" });
    }

    const imagePath = product[imageKey];
    const fullPath = path.join(__dirname, "..", imagePath);

    // Delete the file
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // Remove image path from DB
    product[imageKey] = undefined;
    await product.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};

// DELETE individual product image by field name (e.g. product_image_1)
exports.deleteProductImageByKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageKey } = req.body;

    if (!imageKey || !id) {
      return res.status(400).json({ error: "Missing product ID or imageKey" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const imagePath = product[imageKey];
    if (!imagePath) {
      return res
        .status(404)
        .json({ error: "Image not found for the given key" });
    }

    // Delete the physical image file from disk
    const fs = require("fs");
    const path = require("path");
    const fullPath = path.join(__dirname, "..", imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // Remove the image field from product
    product[imageKey] = undefined;
    await product.save();

    return res.status(200).json({ message: "Image deleted successfully." });
  } catch (err) {
    console.error("Error deleting product image:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.countAllProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments({ isDeleted: false });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Count failed" });
  }
};

exports.countProductsByCategory = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Count by category failed" });
  }
};

exports.countProductsBySubCategory = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$subcategory", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Count by subcategory failed" });
  }
};

exports.countProductsByVendor = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$vendor", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Count by vendor failed" });
  }
};

exports.countProductsByStatus = async (req, res) => {
  try {
    const available = await Product.countDocuments({
      availability_status: true,
      isDeleted: false,
    });
    const unavailable = await Product.countDocuments({
      availability_status: false,
      isDeleted: false,
    });
    res.status(200).json({ available, unavailable });
  } catch (err) {
    res.status(500).json({ message: "Count by status failed" });
  }
};

exports.countProductsBySection = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $unwind: "$section_to_appear" },
      { $group: { _id: "$section_to_appear", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Section count failed" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
      isDeleted: false,
    })
      .populate("subcategory")
      .populate("vendor");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch by category." });
  }
};

exports.getProductsBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({
      subcategory: req.params.subCategoryId,
      isDeleted: false,
    })
      .populate("category")
      .populate("vendor");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch by subcategory." });
  }
};

exports.getProductsSorted = async (req, res) => {
  try {
    const { field = "createdAt", order = "desc" } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;
    const products = await Product.find({ isDeleted: false }).sort({
      [field]: sortOrder,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to sort products." });
  }
};

// 🔥 Add this function properly
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      isDeleted: false,
      $or: [
        { product_name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { color: { $regex: query, $options: "i" } },
        { material: { $regex: query, $options: "i" } },
        { meta_title: { $regex: query, $options: "i" } },
        { meta_description: { $regex: query, $options: "i" } },
      ],
    }).populate("category subcategory vendor");

    res.status(200).json(products);
  } catch (error) {
    console.error("Search Products Error:", error.message);
    res.status(500).json({ message: "Failed to search products" });
  }
};
