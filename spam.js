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

    const fourRow = [];
    for (let i = 0; i < dataInArray.length; i++) {
      fourRow.push([
        dataInArray[i][0],
        dataInArray[i][1],
        dataInArray[i][2],
        dataInArray[i][3],
      ]);
    }

    console.log(fourRow);
  }
});
