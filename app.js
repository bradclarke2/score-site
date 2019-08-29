let numberOfAnswers;
$(document).ready(function () {
    jQuery.support.cors = true;

    function getNumberOfAnswers() {
        return $.ajax({
            url: 'http://51.143.154.149:8080/answers',
            type: 'GET',
            // datatype: 'in',
            success: function (data, textStatus, jqXHR) {
                numberOfAnswers = data;
                extracted();
            },
            error: function () {
                alert('Failed!');
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            }
        });
    }



    function extracted() {
        $.ajax({
            url: 'http://51.143.154.149:8080/code-group',
            type: 'GET',
            datatype: 'json',
            success: function (data, textStatus, jqXHR) {
                for (const codeGroup of data) {
                    $('#user-cards').append(createCard(codeGroup, numberOfAnswers));
                }
            },
            error: function () {
                alert('Failed!');
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            }
        });
    }

    getNumberOfAnswers();
    setTimeout("location.reload();", 60000);
});

function createCard(codeGroup, numberOfAnswers) {
    let allTheUsers = "";
    for(const user of codeGroup.users){
        allTheUsers += `<div data-letters="${user.forename.charAt(0).toUpperCase()}${user.surname.charAt(0).toUpperCase()}"></div>`
    }
    console.log(codeGroup.score.length);
    console.log(numberOfAnswers);

    let percentageComplete = numberOfAnswers === 0 ? 0 : Math.round((codeGroup.score.length/numberOfAnswers)*100);
    return `
    <div class="card" style="width: 18rem; margin: 10px;" id="${codeGroup.id}">
      <section style="display: flex;">
        ${allTheUsers}
      </section>
      <div class="card-body">
        <h5 class="card-title">${codeGroup.teamName}</h5>
        <div style="width:50%;height:50%;margin:auto;font-size:xx-large;color:green;text-align:center;">${codeGroup.score.length}/${numberOfAnswers}</div>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 1 mins ago</small>
      </div>
    </div>`
    console.log(percentageComplete);
}

