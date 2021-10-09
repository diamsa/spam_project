const fs = require("fs");

fs.readFile("./myOwnData.csv", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const dataInArray = data
      .toString()
      .split("\n")
      .map((row) => {
        return row.split(",");
      });

    console.log(dataInArray);
  }
});
