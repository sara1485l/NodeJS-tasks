const { productsData } = require('../models/products');

const getAllProducts = async (req, res) => {
    try {
    const products = await productsData.find();
    res.status(200).json(products);
    } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
    }
};




const getProductById = async (req, res) => {
    try {
    const { id } = req.params; 
    const product = await productsData.findOne({ id: id }); 

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
    } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
    }
};





const addProduct = async (req, res) => {
    try {
    const { id, title, description, price, quantity } = req.body;

    if (!id || !title || !description || !price || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new productsData({
        id,
        title,
        description,
        price,
        quantity
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
    }
};





const deleteProduct = async (req, res) => {
    try {
    const { id } = req.params;

    const deletedProduct = await productsData.findOneAndDelete({ id: id });

    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
    }
};


const editProduct = async (req, res) => {
    try {
    const { id } = req.params;
    const { title, description, price, quantity } = req.body; 

    const updatedProduct = await productsData.findOneAndUpdate(
        { id: id }, 
        { title, description, price, quantity },
        { new: true } 
    );

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
    }
};

module.exports = { getAllProducts,getProductById,addProduct,deleteProduct,editProduct };
