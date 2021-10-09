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
    //console.log(fourRow);

    function divideDataByClass(parsedData) {
      let shortOrLargeNames = [[], []];
      for (let i = 1; i < parsedData.length; i++) {
        if (parsedData[i][0].length > 6) {
          shortOrLargeNames[0].push(parsedData[i][0]);
        } else {
          shortOrLargeNames[1].push(parsedData[i][0]);
        }
      }
      return shortOrLargeNames;
    }
    console.log(divideDataByClass(fourRow));
  }
});
