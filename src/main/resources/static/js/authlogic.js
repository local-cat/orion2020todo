$(document).ready(function() {
    let client = '/client';
    let clientApp = '/app';
    let endpoint = '/api/v1';

    let authKey = getCookie('todo_auth_token');


    function checkPageAuth() {
        $.ajax({
             url: endpoint + '/profile',
             beforeSend: function(request) {
                request.setRequestHeader("AuthToken", authKey);
             },
             type: "GET",
             dataType:'json',
             success: function (response) {
                  window.location.replace(client + clientApp);
             },
             error: function(error){
                  console.log("Need auth", error);
             }
        });
    }

    checkPageAuth();

    $("#authButton").on('click' , function() {

    let loginR = $("#login").val();
    let passwordR = $("#inputPassword").val();
    console.log(passwordR);
            $.ajax({
                 url: endpoint + '/auth',
                 contentType: "application/json",
                 type: "POST",
                 data : JSON.stringify({
                    "login" : loginR ,
                    "password" : passwordR
                 }),
                 dataType:'json',
                 success: function (response) {
                      setCookie('todo_auth_token', response.token);
                      window.location.replace(client + clientApp);
                 },
                 error: function(error){
                      $("#error").show();
                      console.log("Need auth", error);
                 }
            });
    });




});




