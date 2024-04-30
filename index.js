import express from "express";
import exphbs from "express-handlebars";
import path from "path";

const PORT = 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static('public'));

app.set("view engine", "hbs");

app.engine("hbs", exphbs.engine({
    layoutsDir: __dirname + "/views",
    extname: ".hbs"
}));

app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.get("/", (req,res)=>{
    res.render("main", {layout: "main", frutas:  [
        "banana",
        "cebollas",
        "lechuga",
        "papas",
        "pimenton",
        "tomate"
        ]})
});

app.get("/:producto", (req, res) => {
    const { producto } = req.params;
    const productos = ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"];

    if (!productos.includes(producto)) {
        return res.status(404).send("Producto no encontrado");
    }
    res.render("Producto", {
        layout: "Producto",
        productos: productos,
        producto: producto
    });
});

app.listen(PORT, console.log(`Server Corriendo en http://localhost:${PORT}`))