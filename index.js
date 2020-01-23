function initProgram() {
    const axios = require("axios");
    const inquirer = require("inquirer");
    const fs = require('fs');
    const pdf = require('html-pdf');


    let username;
    let userCompany;
    let userRealName;
    let profileImageURL;
    let userLocation;
    let userGitHubProfile;
    let userBlog;
    let userBio;
    let numberOfPublicRepos;
    let numberOfFollowers
    let numberOfGitHubStars;
    let numberOfUsersFollowing;
    let userFavColor;


    inquirer.prompt([{
                message: "Enter your GitHub username",
                name: "usernameProvided"
            },
            {
                message: "What is your favorite color?",
                name: "favoriteColor"
            }
        ])


        .then(function ({
            usernameProvided,
            favoriteColor
        }) {
            username = usernameProvided;
            userFavColor = favoriteColor;
            const queryUrl = `https://api.github.com/users/${username}`;
            goLookOne(queryUrl);
        });


    function goLookOne(URL) {

        axios.get(URL)
            .then(function (response) {

                profileImageURL = response.data.avatar_url;
                console.log(profileImageURL)
                userRealName = response.data.name;
                console.log(userRealName)
                userLocation = response.data.location;
                console.log(userLocation)
                userCompany = response.data.company;
                console.log(userCompany)
                userGitHubProfile = response.data.html_url;
                console.log(userGitHubProfile)
                userBlog = response.data.blog;
                console.log(userBlog)
                userBio = response.data.bio;
                console.log(userBio)
                numberOfPublicRepos = response.data.public_repos;
                console.log(numberOfPublicRepos)
                numberOfFollowers = response.data.followers;
                console.log(numberOfFollowers)
                numberOfUsersFollowing = response.data.following;
                console.log(numberOfUsersFollowing)
                makeHTMLFile(URL);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {});
    }

    function makeHTMLFile() {
        const resume =

            `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <style>
  
          body {
              margin: 0;
              margin-left: .15in;
              margin-right: .15in;
              margin-top: .18in;
              margin-bottom: .22in;
          }
  
          .top,
          .middle,
          .bottom {
              height: 3.53in;
              width: 8.2in;
              position: absolute;
              margin: 0;
              border-radius: 10px;
          }
  
          .top,
          .bottom {
              background: #373737;
          }
  
          .middle {
              margin-top: 3.53in;
          }
  
          .bottom {
              margin-top: 7.06in;
          }
  
          .top-card {
              height: 3.25in;
              margin-top: 0.5in;
              width: 7.84in;
              margin-left: 0.18in;
              position: absolute;
              border-radius: 10px;
          }
  
          .pic {
              margin-top: 0.25in;
              height: 1.64in;
              width: 1.64in;
              margin-left: 3.3in;
              position: absolute;
              border-radius: 50%;
              border: white 2px solid;
          }
  
          .hi {
              position: absolute;
              margin-top: 2in;
              width: 8.2in;
              text-align: center;
          }
  
          .my-name {
              position: absolute;
              margin-top: 2.4in;
              width: 8.2in;
              text-align: center;
          }
  
          .currently-at {
              position: absolute;
              margin-top: 2.8125in;
              width: 8.2in;
              text-align: center;
          }
  
          .more-info {
              position: absolute;
              margin-top: 3.125in;
              width: 8.2in;
              text-align: center;
          }
  
          .bio {
              position: absolute;
              margin-top: 4in;
              width: 7.84in;
              margin-left: 0.18in;
              text-align: center;
          }
  
          .cards {
              position: absolute;
              width: 3.25in;
              height: 1in;
              border: #373737 2px solid;
              border-radius: 10px;
              text-align: center;
          }
  
          .card-left {
              margin-left: 0.9in;
          }
  
          .card-right {
              margin-left: 4.25in;
          }
  
          .card-top {
              margin-top: 4.72in;
          }
  
          .card-bottom {
              margin-top: 5.85in;
          }
  
          a,
          h1,
          h2,
          h3 {
              text-decoration: none;
              color: white;
              font-family: 'Verdana', sans-serif;
              margin: 0.075in;
          }
  
          p {
              font-family: 'Verdana', sans-serif;
              font-size: 20px;
          }
  
          span {
              margin: 0.05in;
          }
      </style>
          <title>Document</title>
        </head>
        <body>
        
   
        
    <div class="top-card" style="background: ${userFavColor}"></div>
            <img src="${profileImageURL}" class="pic"></src>
            <h1 class="hi">Hi!</h1>
            <h1 class="my-name">My name is ${userRealName}</h1>
            <h2 class="currently-at">I'm currently @ ${userCompany}</h2>
            <h2 class="more-info">
                <span><a href="https://www.google.com/maps/place/${userLocation}">${userLocation}</a></span>
                <span><a href="${userGitHubProfile}">Github</a></span>
                <span><a href="${userBlog}">Blog</a></span>
            </h2>
          
            <p class="bio">
            ${userBio}
            </p>
            <div class="cards card-left card-top" style="background: ${userFavColor}">
                <h2>
                    Public Repositories
                </h2>
                <h3>
                ${numberOfPublicRepos}
                </h3>
            </div>
            <div class="cards card-right card-top" style="background: ${userFavColor}">
                <h2>
                    Github Stars
                </h2>
                <h3>
                ${numberOfGitHubStars}
                </h3>
            </div>
            <div class="cards card-left card-bottom" style="background: ${userFavColor}">
                <h2>
                    Followers
                </h2>
                <h3>
                ${numberOfFollowers}
                </h3>
            </div>
            
            <div class="cards card-right card-bottom" style="background: ${userFavColor}">
                <h2>
                    Following
                </h2>
                <h3>
                ${numberOfUsersFollowing}
                </h3>
            </div>
            </body>
        </html>`;


        // fs.mkdir('/', { recursive: true}, (err)
        //  );


        fs.writeFile(`./html/${username}.html`, resume, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");

            makePDFFile();
        });
    }

    function makePDFFile() {
        const html = fs.readFileSync(`./html/${username}.html`, 'utf8');
        const options = {
            "height": "14in",
            "width": "12in",
        };

        pdf.create(html, options).toFile(`./pdf/${username}.pdf`, function (err, res) {
            if (err) return console.log(err);
            console.log(res);
        });
    }
}
initProgram()