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

//Asks initial questions of the user
inquirer
  .prompt([
    //Finds user's Github username
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    },
    //Finds what color the user likes (to use in final pdf)
    {
      type: "checkbox",
      name: "color",
      message: "Which color is your favorite?",
      choices: ["green", "blue", "pink", "red"],
    }
  ])
  .then(function (data) {
    console.log(`${data.username}, ${data.color}`);
      //URLs for our 2 axios requests
      const queryUrl1 = `https://api.github.com/users/${data.username}`;
      const queryUrl2 = `https://api.github.com/users/${data.username}/repos`;

      //First axios request
      axios.get(queryUrl1).then( function(usernameResult) {
        // console.log(usernameResult);
        //store result in a variable
        const profileInfo = usernameResult;

        //make second axios request
        axios.get(queryUrl2).then( function(userRepoResult) {
          console.log(userRepoResult);
          // store result in a variable
          const repoInfo = userRepoResult;
  
        });

      });

        // fs.writeFile("repos.txt", repoNamesStr, function (err) {
        //   if (err) {
        //     throw err;
        //   }

        //   console.log(`Saved ${repoNames.length} repos`);
        // });
      });
