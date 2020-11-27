//TODO ставить и ьрать из куки?
var globalVarCurrentFolderId = 0;
var globalMaxLenghtForTrimText = 20;

$(document).ready(function() {
    let client = '/client';
    let clientAuth = '/auth';
    let endpoint = '/api/v1';


    function createToDoItemCheckBox(itemFromResponse) {
        var checked = '';
        if(itemFromResponse.status) {
            checked = 'checked';
        }
        return '<input type="checkbox" class="todoStatus" data-todo-id="'+itemFromResponse.id+'" data-todo-status="'+itemFromResponse.status+'" '+checked+' />';
    }


    function shorterText(stringText) {
        if(stringText != null) {
            if(stringText.length <= globalMaxLenghtForTrimText ) {
                return stringText;
            }
            else {
                return stringText.substring(0, globalMaxLenghtForTrimText) + '...';
            }
        }

        return '';
    }

    function createFoldersInMenu(folderParentId , itemFromResponse) {

      var folderListTextStrorager = '';

      if(itemFromResponse.length > 0) {
            itemFromResponse.forEach( function(item) {
                folderListTextStrorager = folderListTextStrorager +
                   '<li class="nav-item folderItem" data-folder-id="'+item.id+'">'+
                           '<div style="display: inline-block">'+
                               '<span class="fafolder"></span>'+
                           '</div>'+
                           '<div class="folderAttr" data-folder-id = "'+item.id+'" data-folder-name="'+item.name+'">'+
                               shorterText(item.name)+
                           '</div> '+
                           '<div class="newFolder" style="display: inline-block; color: #03a023; font-weight: bold;"> '+
                               '<span class="fafolder-common fafolder-new" data-folder-id="'+item.id+'"></span>'+
                           '</div>'+
                           '<div class="editFolder" style="display: inline-block; color: #0369a0; font-weight: bold;"> '+
                               '<span class="fafolder-common fafolder-edit" data-folder-id="'+item.id+'" data-folder-name="'+item.name+'"></span>'+
                           '</div>'+
                           '<div class="editFolder" style="display: inline-block; color: #a00359; font-weight: bold;"> '+
                               '<span class="fafolder-common fafolder-delete" data-folder-id="'+item.id+'" data-folder-name="'+item.name+'"></span>'+
                           '</div>'+
                           '<div class="folderListContainer" data-parent-folder-id = "'+item.id+'" >'+
                           '</div>'+
                   '</li>';

            });

            var wrapperContent = ''+
                '<ul class="nav flex-column">'+
                    folderListTextStrorager+
               '</ul>';

            $('.folderListContainer[data-parent-folder-id="'+folderParentId+'"]').html(wrapperContent);
      }
    }

    let authKey = getCookie('todo_auth_token');

    function checkPageAppAuth() {
        $.ajax({
             url: endpoint + '/profile',
             beforeSend: function(request) {
                request.setRequestHeader("AuthToken", authKey);
             },
             type: "GET",
             dataType:'json',
             success: function (response) {
                  $("#username").text(response.name);
             },
             error: function(error){
                  console.log("Need auth", error);
                  window.location.replace(client + clientAuth);
             }
        });
    }


    function getToDoItemsFromFolder(folderIds) {
        $("#todoTableList > tbody").empty();
        $("#loaderToDoList").show();
        $.ajax({
             url: endpoint + '/todoitems/folders/' + folderIds,
             beforeSend: function(request) {
                request.setRequestHeader("AuthToken", authKey);
             },
             type: "GET",
             success: function (response) {
                  $("#loaderToDoList").hide();

                  if(response.length > 0) {
                        response.forEach( function(item) {

                            var classViewItem = 'activeTask';
                            if(item.status) {
                                classViewItem = 'completeTask';
                            }

                            $('#todoTableList tbody').append('<tr class="todoItem highlightItem" data-todo-id="'+item.id+'">'+
                            '<td>'+createToDoItemCheckBox(item)+'</td>'+
                            '<td class="todoItemContent '+classViewItem+'" data-todo-id="'+item.id+'">'+item.content+'</td>'+
                            '<td>'+
                                '<span class="fatodo-common fatodo-edit" data-todo-id="'+item.id+'"></span> '+
                                '<span class="fatodo-common fatodo-delete" data-todo-id="'+item.id+'"></span>' +
                            '</td>'+
                            '</tr>');
                        });
                  }
             },
             error: function(error){
                  console.log("ToDoList Error", error);
             }
        });
    }


    //init page
    checkPageAppAuth();
    getToDoItemsFromFolder(0);


    // add listeners
    $(document).on('click ', 'body .folderAttr', function(){
        var folderParentId = $(this).attr("data-folder-id");
        var folderName = $(this).attr("data-folder-name");

        $.ajax({
             url: endpoint + '/folders/' + folderParentId,
             beforeSend: function(request) {
                request.setRequestHeader("AuthToken", authKey);
             },
             type: "GET",
             success: function (response) {
                  globalVarCurrentFolderId = folderParentId;
                  createFoldersInMenu(folderParentId, response);
                  $('#folderHeaderForToDoList').html('&nbsp;' + folderName);
                  getToDoItemsFromFolder(folderParentId);
             },
             error: function(error){
                  console.log("Folder Error", error);
             }
        });
    });

    //create NEW FOLDER
    $(document).on('click ', 'body .fafolder-new', function(){
        var folderParentId = $(this).attr("data-folder-id");

        let folderName = prompt('Name new folder?', 'New folder');

        if(folderName != null) {
            $.ajax({
                 url: endpoint + '/folders/',
                 beforeSend: function(request) {
                    request.setRequestHeader("AuthToken", authKey);
                 },
                 type: "POST",
                 contentType: "application/json;charset=utf-8",
                  data : JSON.stringify({
                      "parentId" : folderParentId,
                      "name" : folderName
                   }),
                  dataType:'json',
                 success: function (response) {
                      $('body .folderAttr[data-folder-id="' + folderParentId + '"]').click();
                 },
                 error: function(error){
                      console.log("Folder Error", error);
                 }
            });
        }
    });

    //edit FOLDER
    $(document).on('click ', 'body .fafolder-edit', function(){
        var folderId = $(this).attr("data-folder-id");
        let folderName = prompt('Rename folder?', $(this).attr("data-folder-name"));

        if(folderName != null) {
            $.ajax({
                 url: endpoint + '/folders/' + folderId,
                 beforeSend: function(request) {
                    request.setRequestHeader("AuthToken", authKey);
                 },
                 type: "PUT",
                 contentType: "application/json;charset=utf-8",
                  data : JSON.stringify({
                      "name" : folderName
                   }),
                  dataType:'json',
                 success: function (response) {

                      $('body .folderAttr[data-folder-id="' + folderId + '"]').text(folderName);
                 },
                 error: function(error){
                      console.log("Folder Error", error);
                 }
            });
        }
    });

    //delete FOLDER
    $(document).on('click ', 'body .fafolder-delete', function(){
        var folderId = $(this).attr("data-folder-id");
        var folderName = $(this).attr("data-folder-name")

        let folderDeleteCondition = confirm('Delete folder "' + folderName +'" ?');

        if(folderDeleteCondition) {
            $.ajax({
                 url: endpoint + '/folders/' + folderId,
                 beforeSend: function(request) {
                    request.setRequestHeader("AuthToken", authKey);
                 },
                 type: "DELETE",
                 contentType: "application/json;charset=utf-8",
                 success: function (response) {
                      $('body .folderItem[data-folder-id="' + folderId + '"]').hide();
                 },
                 error: function(error){
                      alert('Folder not may be deleted!');
                 }
            });
        }
    });


//TO_DO ITEMS ****************************************

//new to_do_item
    $(document).on('keydown ', '#addNewTask', function(e){
        if (e.keyCode === 13) {
            $.ajax({
                 url: endpoint + '/todoitems',
                 beforeSend: function(request) {
                    request.setRequestHeader("AuthToken", authKey);
                 },
                 type: "POST",
                 contentType: "application/json;charset=utf-8",
                 data : JSON.stringify({
                     "folderId" : globalVarCurrentFolderId,
                     "content" : $("#addNewTask").val(),
                     "status" : false
                  }),
                 dataType:'json',
                 success: function (response) {
                    $("#addNewTask").val('');
                    getToDoItemsFromFolder(globalVarCurrentFolderId);
                 },
                 error: function(error){
                      console.log("Folder Error", error);
                 }
            });
        }

    });

// edit to_do_item
    $(document).on('click ', 'body .fatodo-edit', function(){
        var todoItemID = $(this).attr("data-todo-id");
        let todoText = prompt('What`s new?)', $('body .todoItemContent[data-todo-id="' + todoItemID + '"]').text());

        if(todoText != null) {
            $.ajax({
                 url: endpoint + '/todoitems/' + todoItemID,
                 beforeSend: function(request) {
                    request.setRequestHeader("AuthToken", authKey);
                 },
                 type: "PUT",
                 contentType: "application/json;charset=utf-8",
                  data : JSON.stringify({
                      "content" : todoText
                   }),
                  dataType:'json',
                 success: function (response) {
                    //не обновляем весь сипсок, не бесим пользоваля)
                    $('body .todoItemContent[data-todo-id="' + todoItemID + '"]').text(todoText)
                 },
                 error: function(error){
                        alert("Save error ;(");
                      console.log("ToDo Item Error", error);
                 }
            });
        }
    });

// ckeck/uncheck to_do_item
    $(document).on('click ', 'body .todoStatus', function(){
        var todoItemID = $(this).attr("data-todo-id");
        var todoStatus = $(this).attr("data-todo-status");

        if(todoStatus == 'true') {
            newStatus =false;
        }
        else {
            newStatus =true;
        }

        $.ajax({
             url: endpoint + '/todoitems/' + todoItemID,
             beforeSend: function(request) {
                request.setRequestHeader("AuthToken", authKey);
             },
             type: "PUT",
             contentType: "application/json;charset=utf-8",
              data : JSON.stringify({
                  "status" : newStatus
               }),
              dataType:'json',
             success: function (response) {
                $('body .todoStatus[data-todo-id="' + todoItemID + '"]').attr("data-todo-status", newStatus);
                if(newStatus) {
                    $('body .todoItemContent[data-todo-id="' + todoItemID + '"]').removeClass('activeTask').addClass('completeTask');
                }
                else {
                    $('body .todoItemContent[data-todo-id="' + todoItemID + '"]').addClass('activeTask').removeClass('completeTask');
                }
             },
             error: function(error){
                    alert("Save error ;(");
                  console.log("ToDo Item Error", error);
             }
        });
    });

//delete to_do_item
$(document).on('click ', 'body .fatodo-delete', function(){
        var todoItemId = $(this).attr("data-todo-id");

        let todoItemDeleteCondition = confirm('Delete item  ?');

        if(todoItemDeleteCondition) {
            $.ajax({
                 url: endpoint + '/todoitems/' + todoItemId,
                 beforeSend: function(request) {
                    request.setRequestHeader("AuthToken", authKey);
                 },
                 type: "DELETE",
                 contentType: "application/json;charset=utf-8",
                 success: function (response) {
                      $('body .todoItem[data-todo-id="' + todoItemId + '"]').hide();
                 },
                 error: function(error){
                      alert('TODO item not may be deleted!');
                 }
            });
        }
    });


//TECHNICAL
    $(document).on('click', '#signOutButton', function(){
           setCookie('todo_auth_token', '', 0);
           window.location.replace(client + clientAuth);
    });


});
