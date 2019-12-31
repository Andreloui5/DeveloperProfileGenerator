//Initial variables

const axios = require("axios");
const inquirer = require("inquirer");
const electron = require("electron");
const fs = require("fs"),
    convertFactory = require('electron-html-to');
const generateHTML = require("./generateHTML");

//This section of code was taken from npmjs.com/package/electron-html-to
// let conversion = convertFactory({
//     converterPath: convertFactory.converters.PDF
//     });

// conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
//     if (err) {
//         return console.error(err);
//     }
    
//     console.log(result.numberOfPages);
//     console.log(result.logs);
//     result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
//     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
//     });
//end section taken from npmjs.com

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    },
    {
      type: "checkbox",
      name: "color",
      message: "Which color is your favorite?",
      choices: ["green", "blue", "pink", "red"],
  }
  ])
  .then(function (data) {
    console.log(`${data.username}, ${data.color}`);
  }
    // function({username}, {color}) {
  //   const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  //   axios.get(queryUrl).then(function(usernameResult) {
  //     const repoNames = usernameResult.data.map(function(repo) {
  //       return repo.name;
  //     });

  //     const repoNamesStr = repoNames.join("\n");

  //     fs.writeFile("repos.txt", repoNamesStr, function(err) {
  //       if (err) {
  //         throw err;
  //       }

  //       console.log(`Saved ${repoNames.length} repos`);
  //     });
  //   });
  // }
  );
  