function loadUsers() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.send();

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            let users = JSON.parse(xhr.responseText);
            showUsers(users);
        } else {
            console.log(xhr.status);
        }
    });

    function showUsers(users) {
        users.forEach(function (user) {
            let li = list.appendChild(document.createElement('li'));
            li.innerHTML = user.name;
            showUserInfo(user, li);
        });
    }

    function showUserInfo(user, li) {
        li.addEventListener('click', function(e) {
            let target = e.target;
            if (target.tagName !== "LI") return;

            let old = this.querySelector('.card');
            if(old) {old.remove()}

            let res = '';
            for (let i in user) {
                if (typeof(user[i]) !== 'object') {
                    res += `<p>${i} : ${user[i]}</p>`;
                }
            }
            let template = `
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <p>${res}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="remove">Close this</a>
                    </div>
                </div>
            `;
            target.insertAdjacentHTML('beforeend', template);
        })
    }

// Removing of card
    let list = document.querySelector('#list');
    list.addEventListener('click', function(e) {
        if (!e.target.classList.contains('remove')) return;
        e.target.parentNode.parentNode.remove();
    });

}

let btnShow = document.querySelector('.btn');
btnShow.addEventListener('click', function() {
    loadUsers();
    btnShow.parentNode.removeChild(btnShow);
});