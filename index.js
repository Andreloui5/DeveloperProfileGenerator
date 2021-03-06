//Initial variables

const axios = require("axios");
const inquirer = require("inquirer");
const electron = require("electron");
const fs = require("fs"),
  convertFactory = require('electron-html-to');
const generateHTML = require("./generateHTML");

var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});
 

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
  .then(function (res) {
    // console.log(`${res.username}, ${res.color}`);
    let userChoice = `${res.color}`;
    //URLs for our 2 axios requests
    const queryUrl1 = `https://api.github.com/users/${res.username}`;
    const queryUrl2 = `https://api.github.com/users/${res.username}/repos`;

    //First axios request
    axios.get(queryUrl1).then(function (usernameResult) {
      // console.log(usernameResult.data);
      //store needed results in a variable
      const profileInfo = usernameResult.data;
      // console.log(profileInfo);

      // make second axios request
      axios.get(queryUrl2).then(function (result) {
        // console.log(result);
        let repoArray = result.data
        // go through each repo and add all stars
        let totalStars = 0
        repoArray.forEach(repo => totalStars += repo.stargazers_count);
        // console.log(totalStars);

        //Call generateHTML to make HTML doc
        let makeHTML = generateHTML(userChoice, profileInfo, totalStars);
        fs.writeFile(`${profileInfo.name}.html`, makeHTML, function (err) {
          if (err) {
            throw err;
          }
        });
        //convert the HTML doc into a pdf
        conversion({ html: makeHTML }, function(err, result) {
          if (err) {
            return console.error(err);
          }
          result.stream.pipe(fs.createWriteStream(`${profileInfo.name}.pdf`));
          conversion.kill();
        });
      });
    });
  });
