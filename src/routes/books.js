import { Router } from "express";
import { connect } from "../database.js";
// Importar ObjectId para poder hacer uso de la función ObjectId 
import { ObjectId } from 'mongodb';

const router = Router();

//Get Books
router.get("/books", async (req, res) => {
  try {
    const db = await connect();
    const results = await db.collection("books").find({}).toArray();
    res.json({ code: "200", result: results });
  } catch (error) {
    console.log(error);
  }
});

//Create Book
router.post("/newBook", async (req, res) => {
  try {
    const db = await connect();
    const book = {
      title: req.body.title,
      category: req.body.category.toUpperCase(),
      author: req.body.author,
      isbn: req.body.isbn,
    };
    const result = await db.collection("books").insertOne(book);
    res.json({ code: "200", message: result });
  } catch (error) {
    console.log(error);
  }
});

//Update Book
router.put("/updateBook/:id", async (req, res) => {
  try {
    const db = await connect();

    const { id } = req.params;
    // validar que el id sea un ObjectId válido
    const result = await db.collection("books").findOne({ _id: new ObjectId(id) });
    if (!result) {
        return res.json({
            code: "400",
            message: `Book ${id} does not exist`,
            });
    }

    const updateBook = {
      title: req.body.title,
      category: req.body.category.toUpperCase(),
      author: req.body.author,
      isbn: req.body.isbn,
    };

    await db.collection("books").updateOne({ _id: new ObjectId(id) }, { $set: updateBook });

    res.json({
      code: "200",
      message: `Book ${id} updated successfully`,
    });
  } catch (error) {
    console.log(error);
  }
});

//Delete Book
router.delete("/deleteBook/:id", async (req, res) => {
    try {
        const db = await connect();

        const { id } = req.params;

        const result = await db.collection("books").findOne({ _id: new ObjectId(id) });
        if (!result) {
            return res.json({
                code: "400",
                message: `Book ${id} does not exist`,
                });
        }
      
        await db.collection("books").deleteOne({ _id: new ObjectId(id) });
        
        res.json({
            code: "200",
            message: `Book ${id} deleted successfully`,
          });

    } catch (error) {
        console.log(error);
    }
});

//Get Book
router.get("/getBook/:id", async (req, res) => {
    try {
        const db = await connect();

        const { id } = req.params;
      
        const result = await db.collection("books").findOne({ _id: new ObjectId(id) });
        res.json({
            code: "200",
            message: result,
          });
    } catch (error) {
        console.log(error);
    }
});

// Buscar libros por categoria
router.get("/getBooksByCategory/:category", async (req, res) => {
    try {
        const db = await connect();

        const { category} = req.params;

        

        const result = await db.collection("books").find({ category: category.toUpperCase() }).toArray();

        if (result.length === 0) {
            return res.json({
                code: "400",
                message: `Category ${category} does not exist`,
                });
        }


        res.json({
            code: "200",
            message: result,
        });


    } catch (error) {
        console.log(error);
    }
});

export default router;
