const fs = require("fs");

fs.readFile("./myOwnData.csv", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const dataInArray = data
      .toString()
      .split("\r\n")
      .map((row) => {
        return row.split(",");
      });

    function takingFourRows() {
      const fourRow = [];
      for (let i = 0; i < dataInArray.length; i++) {
        fourRow.push([
          dataInArray[i][0],
          dataInArray[i][1],
          dataInArray[i][2],
          dataInArray[i][3],
        ]);
      }
      return fourRow;
    }

    let spamWords = ["year", "dick", ":", ";", ";", "sell", "how"];
    let hamWords = ["think", "trade", "vote"];

    let split_Emailtext = takingFourRows()[3][2].split(" ");

    let amountSpamHamWords = countWordsSpamOrHam(
      spamWords,
      hamWords,
      split_Emailtext
    );

    //return an object with the time a spam or ham word was repeated
    function countWordsSpamOrHam(spamWord, hamWord, wordChecked) {
      let objRepetitions = {
        spam: {},
        ham: {},
      };
      for (let i = 0; i < wordChecked.length; i++) {
        if (checkIfInSpamOrHam(wordChecked[i], spamWord)) {
          if (checkIfInObj(wordChecked[i], "spam")) {
            objRepetitions.spam[wordChecked[i]] += 1;
          } else {
            objRepetitions.spam[wordChecked[i]] = 1;
          }
        } else if (checkIfInSpamOrHam(wordChecked[i], hamWord)) {
          if (checkIfInObj(wordChecked[i], "ham")) {
            objRepetitions.ham[wordChecked[i]] += 1;
          } else {
            objRepetitions.ham[wordChecked[i]] = 1;
          }
        }
      }
      function checkIfInObj(word, objSpamorHam) {
        let myObjKeys = Object.keys(objRepetitions[objSpamorHam]);
        if (myObjKeys.includes(word)) {
          return true;
        } else {
          return false;
        }
      }
      function checkIfInSpamOrHam(word, array_to_check) {
        if (array_to_check.includes(word)) {
          return true;
        } else {
          return false;
        }
      }

      return objRepetitions;
    }

    //return an array divided by spam or ham. Index 0 for spam. Index for 1 ham.
    function divideDataByClass(parsedData) {
      let spamOrHam = [];
      let spamWordsArray = Object.values(parsedData.spam);
      let hamWordsArray = Object.values(parsedData.ham);

      spamOrHam.push(spamWordsArray);
      spamOrHam.push(hamWordsArray);

      return spamOrHam;
    }

    // return the mean of a number
    function calMean(numbers) {
      let summary = null;
      for (let i = 0; i < numbers.length; i++) {
        summary += numbers[i];
      }
      return summary / numbers.length;
    }
    //return the standart deviation of a number. Input is an array.
    function standartDevi(numbers) {
      const avg = calMean(numbers);
      let variance = null;
      for (let i = 0; i < numbers.length; i++) {
        variance += (numbers[i] - avg) ** 2 / numbers.length;
      }
      return Math.sqrt(variance);
    }
    let dataSet = divideDataByClass(amountSpamHamWords);

    //return an array with the mean and standart dev of each class
    function summarizedData(numbers) {
      let summarizedValues = [[], []];

      for (let i = 0; i < numbers.length; i++) {
        summarizedValues[i].push(
          calMean(numbers[i]),
          standartDevi(numbers[i]),
          numbers[i].length
        );
      }

      return summarizedValues;
    }

    console.log(summarizedData(dataSet));
  }
});
