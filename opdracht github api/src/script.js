let form = document.getElementById('form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let input = document.getElementById('input').value;

    fetch('https://api.github.com/users/' + input)
        .then((result) => {
            if (result.status == 200) {
                document.getElementById('error').style.visibility = "hidden";

                document.getElementsByClassName('results')[0].style.visibility = "visible";
                return result.json();

            } else if (result.status == 404) {
                document.getElementById('error').innerHTML = `<p>The user was not found</p>`;
                document.getElementById('error').style.visibility = "visible";
                document.getElementsByClassName('results')[0].style.visibility = "hidden";
            }
            console.log(result);

        })
        .then((data) => {

            console.log(data);

            document.getElementById('photo').innerHTML = `<a target="_blank" href="https://www.github.com/${input}">  <img src="${data.avatar_url}"></a>`;
            if (data.name == null) {
                data.name = 'No name set';
            }
            document.getElementById('name').innerHTML = `<p><a target="_blank" href="https://www.github.com/${input}">${data.name}</p>`;

            document.getElementById('username').innerHTML = `<p"><a target="_blank" href="https://www.github.com/${input}">${data.login}</p>`;

            const date = new Date(data.created_at);
            const day = date.getDate();
            const months = ['Jan', 'Feb', 'Ma', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            const month = date.getMonth();
            const month_name = months[month];
            const year = date.getFullYear();

            document.getElementById('date_joined').innerHTML = `<p>Joined ${day} ${month_name} ${year}</p>`;

            if (data.bio == null) {
                data.bio = 'No bio';
            }
            document.getElementById('bio').innerHTML = `<p>${data.bio}</p>`;

            document.getElementById('repos').innerHTML = `<p><a target="_blank" href="https://www.github.com/${input}?tab=repositories">Repos</p><strong>${data.public_repos}</strong>`;

            document.getElementById('followers').innerHTML = `<p><a target="_blank" href="https://www.github.com/${input}?tab=followers">Followers</p><strong>${data.followers}</strong>`;

            document.getElementById('following').innerHTML = `<p><a target="_blank" href="https://www.github.com/${input}?tab=following">Following</p> <strong>${data.following}</strong>`;

            if (data.location == null) {
                data.location = 'not available';
            }
            document.getElementById('location').innerHTML = `<p><i class='fa fa-map-marker'> </i> ${data.location}</p>`;

            if (data.twitter_username == null) {
                data.twitter_username = 'not available';
            }
            document.getElementById('twitter').innerHTML = `<p><i class='fa fa-twitter'></i> <a target="_blank" href="https://twitter.com/${data.twitter_username}">${data.twitter_username}</a></p>`;

            if (data.blog == '') {
                data.blog = 'not available';
            }
            document.getElementById('website').innerHTML = `<p><i class='fa fa-link'></i>
            <a target="_blank" href="https://${data.blog}">${data.blog}</a></p>`;

            if (data.company == null) {
                data.company = 'not available';
            }
            document.getElementById('company').innerHTML = `<p><i class='fa fa-building'></i>
             ${data.company}</p>`;

            document.getElementsByClassName('results')[0].style.backgroundColor = '#19253f';



        });
});