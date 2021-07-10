var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos");
    console.log(response);
};

getUserRepos();