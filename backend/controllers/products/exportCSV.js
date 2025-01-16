const { Parser } = require("json2csv");
const XLSX = require("xlsx");
const productModel = require("../../models/productModel");

async function exportCSV(req, res) {
  try {
    const products = await productModel.find().populate("category");
    const filteredProducts = products.map((product) => {
      return {
        Name: product.productName,
        Category: product.category.categoryName,
        Stock: Object.keys(product.size).reduce(
          (total, key) => total + product.size[key].quantity,
          0
        ),
        Price: Object.keys(product.size).reduce(
          (lowestPrice, key) => Math.min(lowestPrice, product.size[key].price),
          Infinity
        ),
        imgUrl: product.imageUrl[0],
        Link: `http://localhost:3006/product/${product._id}`,
      };
    });

    const { format } = req.query;

    if (format === "excel") {
      // Tạo workbook và worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredProducts);

      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      // Tạo file Excel dưới dạng buffer
      const excelBuffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });

      // Gửi file Excel
      res.header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.header("Content-Disposition", "attachment; filename=products.xlsx");
      return res.send(excelBuffer);
    } else {
      // Mặc định xuất CSV
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(filteredProducts);

      res.header("Content-Type", "text/csv; charset=utf-8");
      res.header("Content-Disposition", "attachment; filename=products.csv");
      return res.send(csv);
    }

    // const json2csvParser = new Parser();
    // const csv = json2csvParser.parse(filteredProducts);
    // res.header("Content-Type", "text/csv; charset=utf-8");
    // res.header("Content-Disposition", "attachment; filename=products.csv");
    // res.send(csv);
  } catch (error) {
    console.error("Error generating CSV:", err);
    res.status(500).send("Error generating CSV");
  }
}

module.exports = exportCSV;
