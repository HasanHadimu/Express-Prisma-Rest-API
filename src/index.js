const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
dotenv.config();

const PORT = process.env.PORT;

// data to json
app.use(express.json())

app.get("/api", (req, res) => {
    res.send("Hello World");
});

// get data product
app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany(); 

    res.send(products);  
})

// post data product
app.post("/products", async (req, res) => {
    const newProductData = req.body;

    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: Number(newProductData.price),
        },
    });

    res.send("create product success");
})


// delete data product
app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;

    await prisma.product.delete({
        where: {
            id: parseInt(productId),
        },
    });

    res.send("product deleted");
})

app.listen(PORT, () => {
    console.log("Express API running on port: " + PORT);
});
