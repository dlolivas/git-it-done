var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            displayRepos(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to GitHub');
      });
  };

  var formSubmitHandler = function(event) {
      event.preventDefault();//it prevents the browser from sending the form's input data to a URL, as we'll handle what happens with the form input data ourselves in JavaScript.
      //get value from input element
      var username = nameInputEl.value.trim();//trim is for unecessary space . Here we are getting the value from the input element via nameInputEl dom var and storing the value in its own var called username

      if (username){
          getUserRepos(username);// if there is in fact a value to username we pass that data to getUserRepos() as an argument then to clear the form we clear out the input element value
          nameInputEl.value = "";
      } else {
          alert("please enter a GitHub Username");
      }
      console.log(event);
  };
// this function will accept both the array of the repo data and the term we seatched for as parameters
  var displayRepos = function(repos, searchTerm) {
      

      //check if api retuned any repos 
      if (repos.length === 0) {
          repoContainerEl.textContent = "No repositories found.";
      }

      //clear old content 
      repoContainerEl.textContent = "";
      repoSearchTerm.textContent = searchTerm;

      //loop oveer repos
      for (var i=0; i < repos.length; i++){
          //format repo name
          var repoName = repos[i].owner.login + "/" + repos[i].name;

          //create a container for each repo
          var repoEl = document.createElement("div");
          repoEl.classList = "list-item flex-row justify-space-between align-center";

          //create a span element to hold a repository name
          var titleEl = document.createElement("span");
          titleEl.textContent = repoName;

          //append to container
          repoEl.appendChild(titleEl);

          //create a status element
          var statusEl = document.createElement("span");
          statusEl.classList = "flex-row align-center";

          //check if current repo has issues or not 
          if (repos[i].open_issues_count > 0) {
              statusEl.innerHTML =
              "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";

          } else {
              statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
          }
          
          //append to container 
          repoEl.appendChild(statusEl);



          //append container to the dom 
          repoContainerEl.appendChild(repoEl);
      }
  };

  userFormEl.addEventListener("submit", formSubmitHandler);