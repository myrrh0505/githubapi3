"use strict";

//Renders the repositories from GitHub
function displayResults(responseJson) {
    console.log(responseJson);

    for (let i = 0; i < responseJson.length; i++) {
        $('.displayRepo').append(`
        <p>${responseJson[i].name}</p>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        `
            
        )
    
    }
   console.log('run displayResults')

}


//Grabs GitHub API data
function grabRepos(userName) {
 

 fetch(`https://api.github.com/users/${userName}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        console.log('Error here')
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

 
}


//Listens to the "enter button"
//Then runs subsequent functions to generate user Repos on DOM
function watchForm() {
    $("form").submit(e => {
        e.preventDefault();
        const userName = $('#userId').val();
        $('.displayRepo').empty();
        console.log(userName);

        grabRepos(userName);
    });
}

//Runs watchForm 
$(function() {
    console.log("App loaded! Waiting for submit!");
    watchForm();
  });
  