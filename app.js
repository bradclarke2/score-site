$(document).ready(function () {
    jQuery.support.cors = true;
    $.ajax({
        url: 'http://localhost:8080/users',
        type: 'GET',
        datatype: 'json',
        success: function (data, textStatus, jqXHR) {
            for (const val of data) {
                $('#textthing').append(val.id);
                $('#user-cards').append(createCard(val));
            }
        },
        error: function () { alert('Failed!'); },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
    });
});

function createCard(codeGroup) {
    var allTheUsers = "";
    for(const user of codeGroup.users){
        allTheUsers += `<p class="card-text">${user.forename}</p>`
    }

    return `
    <div class="card" style="width: 18rem;" id="${codeGroup.id}">
      <img class="user-image" style="max-width: 80%;height: auto;margin: auto;" src="/assets/dog.jpg" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        ${allTheUsers}
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>`
}

