var globalVarCurrentFolderId = 0;
var globalMaxLenghtForTrimText = 20;

let colorMap = new Map();
let colorNamesList = new Map();

let defaultColorRGBValue = "aeb9c0";

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
                        //'<div class="folderItemStyle">'+
                               '<div style="display: inline-block">'+
                                   '<span class="fafolder folderColor" style="--folder-color: #'+getColorRGBValueById(item.colorId)+';" ></span>'+
                               '</div>'+
                               '<div class="folderAttr"  data-folder-id = "'+item.id+'" data-folder-name="'+item.name+'" data-folder-color-id="'+item.colorId+'">'+
                                   shorterText(item.name)+
                               '</div> '+
    /*                           '<div class="newFolder" style="display: inline-block; color: #03a023; font-weight: bold;"> '+
                                   '<span class="fafolder-common fafolder-new action-folder-new" data-folder-id="'+item.id+'"></span>'+
                               '</div>'+
                               '<div class="editFolder" style="display: inline-block; color: #0369a0; font-weight: bold;"> '+
                                   '<span class="fafolder-common fafolder-edit action-folder-edit" data-folder-id="'+item.id+'" data-folder-name="'+item.name+'"></span>'+
                               '</div>'+
                               '<div class="editFolder" style="display: inline-block; color: #a00359; font-weight: bold;"> '+
                                   '<span class="fafolder-common fafolder-delete action-folder-delete" data-folder-id="'+item.id+'" data-folder-name="'+item.name+'"></span>'+
                               '</div>'+*/
                           //'</div>'+
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

    function buildColorMap() {
        $.ajax({
             url: endpoint + '/colors',
             beforeSend: function(request) {
                request.setRequestHeader("AuthToken", authKey);
             },
             type: "GET",
             dataType:'json',
             success: function (response) {
                   colorMap.set(0, defaultColorRGBValue);
                   colorNamesList.set(0, 'default');
                   if(response.length > 0) {
                      response.forEach( function(item) {
                         colorMap.set(item.id, item.rgbValue);
                         colorNamesList.set(item.id, item.name);
                      });
                  }
             },
             error: function(error){
                  console.log("Need colors", error);
             }
        });
    }



    function getColorRGBValueById(colorId) {
        return colorMap.get(colorId);
    }

    function setColorInSelectByColorId(colorId) {
        $('#colorList option[value='+colorId+']').prop('selected', true);
    }

    function getColorSelectListByColorId() {

        var result = '';

        result = result + '<div class="form-group">' +
                               '<select id="colorList" class="form-control" size="1" name="colorList" >';

        colorNamesList.forEach( (value, key, map) => {
             result = result + '<option value="'+key+'">'+value+'</option>';

        });

        result = result + '</select>' +
                       '</div>';


        return result;
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
                                '<span class="fatodo-common fatodo-files" data-todo-id="'+item.id+'"></span> ' +
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
    buildColorMap();


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
    $(document).on('click ', 'body .action-folder-new', function(){
        var folderParentId = $(this).attr("data-folder-id");

        var jBoxApp = new jBox("Confirm", {
            confirmButton: "Create",
            cancelButton: "Cancel",
            content: "Name for new folder <br />" +
                    '<input id="folderName" value="New folder" class="form-control"/>',
            blockScroll: false,
            cancel: function () {
                jBoxApp.destroy();
            },
            confirm: function () {
                $.ajax({
                     url: endpoint + '/folders/',
                     beforeSend: function(request) {
                        request.setRequestHeader("AuthToken", authKey);
                     },
                     type: "POST",
                     contentType: "application/json;charset=utf-8",
                      data : JSON.stringify({
                          "parentId" : folderParentId,
                          "name" : $('body #folderName').val()
                       }),
                      dataType:'json',
                     success: function (response) {
                          $('body .folderAttr[data-folder-id="' + folderParentId + '"]').click();
                          jBoxApp.destroy();
                     },
                     error: function(error){
                          console.log("Folder Error", error);
                     }
                });
            }
        });
        jBoxApp.open();

    });

    //edit FOLDER
    $(document).on('click ', 'body .action-folder-edit', function(){
        var folderId = $(this).attr("data-folder-id");
        var folderName = $(this).attr("data-folder-name");
        var folderColorId = $(this).attr("data-folder-color-id");


        var jBoxApp = new jBox("Confirm", {
                    confirmButton: "Save",
                    cancelButton: "Cancel",
                    content: "<div>Folder name<br /></div>" +
                            '<div><input id="folderName" value="'+folderName+'" class="form-control"/> <br /><br /></div>'+
                            '<div>Folder color: <br /></div>' +
                            '<div>' + getColorSelectListByColorId() + '</div>',
                    blockScroll: false,
                    cancel: function () {
                        jBoxApp.destroy();
                    },
                    confirm: function () {
                        $.ajax({
                             url: endpoint + '/folders/' + folderId,
                             beforeSend: function(request) {
                                request.setRequestHeader("AuthToken", authKey);
                             },
                             type: "PUT",
                             contentType: "application/json;charset=utf-8",
                              data : JSON.stringify({
                                  "name" : $('body #folderName').val(),
                                  "colorId" : $('body #colorList').val()
                               }),
                              dataType:'json',
                             success: function (response) {
                                  $('body .folderAttr[data-folder-id="' + folderId + '"]').text(folderName);
                                  jBoxApp.destroy();
                                 new jBox('Notice', {
                                    content: 'Success',
                                    color: 'green'
                                  });
                             },
                             error: function(error){
                                 new jBox('Notice', {
                                    content: 'Folder Error',
                                    color: 'red'
                                  });
                             }
                        });
                    }
                });
             jBoxApp.open();
             setColorInSelectByColorId(folderColorId);

    });

    //delete FOLDER
    $(document).on('click ', 'body .action-folder-delete', function(){
        var folderId = $(this).attr("data-folder-id");
        var folderName = $(this).attr("data-folder-name")

        var jBoxApp = new jBox("Confirm", {
                    confirmButton: "Delete",
                    cancelButton: "Cancel",
                    content: 'Delete folder <b>"' + folderName +'"</b> ?',
                    blockScroll: false,
                    cancel: function () {
                        jBoxApp.destroy();
                    },
                    confirm: function () {
                        $.ajax({
                             url: endpoint + '/folders/' + folderId,
                             beforeSend: function(request) {
                                request.setRequestHeader("AuthToken", authKey);
                             },
                             type: "DELETE",
                             contentType: "application/json;charset=utf-8",
                             success: function (response) {
                                  $('body .folderItem[data-folder-id="' + folderId + '"]').hide();
                                  new jBox('Notice', {
                                    content: 'Folder <b>'+folderName+'</b> deleted',
                                    color: 'green'
                                  });
                                  jBoxApp.destroy();
                             },
                             error: function(error){
                                 new jBox('Notice', {
                                   content: 'Folder cant be deleted!',
                                   color: 'red'
                                 });
                             }
                        });
                    }
                });
                jBoxApp.open();

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
                     new jBox('Notice', {
                        content: 'Folder Error!',
                        color: 'red'
                      });
                 }
            });
        }

    });

// edit to_do_item
    $(document).on('click ', 'body .fatodo-edit', function(){
        var todoItemID = $(this).attr("data-todo-id");
        var jBoxEdit = new jBox("Confirm", {
            confirmButton: "Save",
            cancelButton: "Cancel",
            content: "" +
                '<div><textarea id="noteTextContent" style="width: 100%;" rows="5" class="form-control"/>'+$('body .todoItemContent[data-todo-id="' + todoItemID + '"]').html() + '</textarea></div>',
            blockScroll: false,
            cancel: function () {
                jBoxEdit.destroy();
            },
            confirm: function () {
                  var todoText = $('body #noteTextContent').val();
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
                          $('body .todoItemContent[data-todo-id="' + todoItemID + '"]').html(todoText);
                           new jBox('Notice', {
                              content: 'Success',
                              color: 'green'
                            });
                          jBoxEdit.destroy();
                       },
                       error: function(error){
                            new jBox('Notice', {
                               content: 'Save error ;(',
                               color: 'red'
                             });
                       }
                  });
                }
        });
        jBoxEdit.open();
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
               new jBox('Notice', {
                  content: 'Success',
                  color: 'green'
                });
             },
             error: function(error){
                 new jBox('Notice', {
                    content: 'Save error ;(',
                    color: 'red'
                  });
             }
        });
    });

//delete to_do_item
$(document).on('click ', 'body .fatodo-delete', function(){
        var todoItemId = $(this).attr("data-todo-id");

        var jBoxApp = new jBox("Confirm", {
            confirmButton: "Delete",
            cancelButton: "Cancel",
            content: "Delete note?",
            blockScroll: false,
            cancel: function () {
                jBoxApp.destroy();
            },
            confirm: function () {
                  $.ajax({
                       url: endpoint + '/todoitems/' + todoItemId,
                       beforeSend: function(request) {
                          request.setRequestHeader("AuthToken", authKey);
                       },
                       type: "DELETE",
                       contentType: "application/json;charset=utf-8",
                       success: function (response) {
                            $('body .todoItem[data-todo-id="' + todoItemId + '"]').hide();
                             new jBox('Notice', {
                                content: 'TODO note deleted',
                                color: 'green'
                              });
                       },
                       error: function(error){
                            new jBox('Notice', {
                               content: 'TODO item cant be deleted!',
                               color: 'red'
                             });
                       }
                  });
            }
        });
        jBoxApp.open();
    });


//FILES ____________________


    function refreshFilesList(toDoItemId) {
            $.ajax(
             {
                    url: endpoint + '/files/' + toDoItemId,
                    type: 'GET',
                     beforeSend: function(request) {
                        request.setRequestHeader("AuthToken", authKey);
                     },
                    success: function(data)
                    {
                        var fileList = '';

                        if(data.length > 0) {
                            data.forEach(function(item) {
                                fileList = fileList + item.name + '<br />';
                            });
                        }

                         $("body #file_list").html(fileList);
                    },
                    error: function(xhr, textStatus, errorThrown)
                    {

                    }
             });
    }

    $(document).on('click ', 'body .fatodo-files', function(e)
	{

	  if($(this).attr('data-todo-id'))
	  {
		var container_id = $(this).attr('data-todo-id');

		new $.Zebra_Dialog('<div id="files_container"></div>',
		{
		'buttons':  [],
		'position': ['center', 'top + 60'],
		'title': 'Files'
		});

		$("body #files_container").html(''+
            '<div class="rowspaced">'+
                '<div id="files_table_list" style="height: 350px; overflow: auto; border:1px solid #eee; ">'+

                    '<table class="table table-hover">'+
                        '<thead class="thead">'+
                            '<tr>'+
                                '<th>'+
                                 '   Имя файла'+
                                '</th>'+
                            '</tr>'+
                        '</thead>'+
                       ' <tbody>'+


                        '<tr>'+
                        '    <td>'+
/*                                                                '        <button type="button" data-download-file="41" class="btn btn-xs btn-default download-file">'+
                        '            <i class="fa fa-icon fa-download iconspace"></i>'+
                        '            cat__2.svg'+
                        '        </button>'+*/
                        '<div id="file_list"> </div>' +
                        '    </td>'+

                        '</tr>'+


                        '</tbody>'+
                    '</table>'+


                '</div>'+

            '<div><br />'+
                '<button type="button" class="btn btn-primary " name="call_upl_files" id="call_upl_files"><i class="fa fa-icon fa-upload iconspace-xs"></i>Выберите файл(ы)</button> '+

                ' <button type="button" class="btn btn-success " name="btn_upl_files" id="btn_upl_files">'+
                    '<i class="fa fa-icon fa-floppy-o iconspace-xs"></i>'+
                    'Загрузить файлы'+
                '</button>'+
            '</div>'+

            '<div style="display: none;">'+
                '<form id="form_upload_files" name="form_upload_files" enctype="multipart/form-data">'+
                    '<input type="file" name="files[]" id="upl_files" size="300" data-multiple-caption="Выбрано файлов: {count}" multiple="">'+
                    '<input type="hidden" name="entity_id" id="entity_id" value="'+container_id+'">'+
                '</form>'+
            '</div>'+
        '</div>');

        refreshFilesList(container_id);

        $("body #call_upl_files").on('click',function(e)
        {
            //e.preventDefault();
            $('#upl_files').click();
        });

        $("#upl_files").on('change',function(e)
        {
            $('body #call_upl_files').html('<i class="fa fa-icon fa-upload iconspace-xs"></i>Выберите файл(ы)');
            e.preventDefault();

            //labelVal = $('#call_upl_files').html();
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = ( this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
            else
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                $('body #call_upl_files').html(fileName);
            else
                $('body #call_upl_files').html(file_upload_label);
        });

	$("body #btn_upl_files").on('click',function(e)
	{
		e.preventDefault();

		var form_options = {
			url: endpoint + '/files/upload/multi',
			type: 'POST',
             beforeSend: function(request) {
                request.setRequestHeader("AuthToken", authKey);
             },
			complete: function(response)
			{
				refreshFilesList(container_id);
				e.preventDefault();
			},

			error: function()
			{

			}
		};

		$("body #form_upload_files").ajaxForm(form_options);
		$("body #form_upload_files").submit();
	});

	 }

	});

//TECHNICAL
    $(document).on('click', '#signOutButton', function(){
           setCookie('todo_auth_token', '', 0);
           window.location.replace(client + clientAuth);
    });


var menu = document.querySelector('.menu');

function showMenu(x, y){
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.classList.add('show-menu');
}


 /**
   * Function to check if we clicked inside an element with a particular class
   * name.
   *
   * @param {Object} e The event
   * @param {String} className The class name to check against
   * @return {Boolean}
   */
  function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;

    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }

    return false;
  }

  /**
   * Get's exact position of event.
   *
   * @param {Object} e The event passed in
   * @return {Object} Returns the x and y position
   */
  function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // CONTEXT C O R E    F U N C T I O N S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Variables.
   */
  var contextMenuClassName = "context-menu";
  var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";

  var taskItemClassName = "folderAttr";
  var taskItemInContext;

  var clickCoords;
  var clickCoordsX;
  var clickCoordsY;

  var menu = document.querySelector("#context-menu");
  var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;
  var menuWidth;
  var menuHeight;
  var menuPosition;
  var menuPositionX;
  var menuPositionY;

  var windowWidth;
  var windowHeight;

  /**
   * Initialise our application's code.
   */
  function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
  }

  /** !!!!!!!!!!!!!!!!!!!!!!!
   * Listens for contextmenu events.
   */
  function contextListener() {
    document.addEventListener( "contextmenu", function(e) {
      taskItemInContext = clickInsideElement( e, taskItemClassName );

      if ( taskItemInContext ) {
        e.preventDefault();

        var dataFolderId = 0;
        if(e.target.attributes['data-folder-id'] != undefined) {
            dataFolderId = e.target.attributes['data-folder-id'].value;
        }

        var dataFolderName = '';
        if(e.target.attributes['data-folder-name'] != undefined) {
            dataFolderName = e.target.attributes['data-folder-name'].value;
        }

        var dataFolderColorId = '';
        if(e.target.attributes['data-folder-color-id'] != undefined) {
            dataFolderColorId = e.target.attributes['data-folder-color-id'].value;
        }

        $("body .context-menu__link").each(
            function (index, elem) {
                //Kostyl
                if(dataFolderId == 0) {
                     $(elem).css("display","none");
                     if($(elem).attr("data-action") == "Create") {
                        $(elem).css("display","block");
                     }
                }
                else
                {
                    $(elem).css("display","block");
                }


                $(elem).attr("data-folder-id", dataFolderId);
                $(elem).attr("data-folder-name", dataFolderName);
                $(elem).attr("data-folder-color-id", dataFolderColorId);
            }
        );

        toggleMenuOn();
        positionMenu(e);
      } else {
        taskItemInContext = null;
        toggleMenuOff();
      }
    });
  }

  /**
   * Listens for click events.
   */
  function clickListener() {
    document.addEventListener( "click", function(e) {
      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

      if ( clickeElIsLink ) {
        e.preventDefault();
        menuItemListener( clickeElIsLink );
      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
          toggleMenuOff();
        }
      }
    });
  }

  /**
   * Listens for keyup events.
   */
  function keyupListener() {
    window.onkeyup = function(e) {
      if ( e.keyCode === 27 ) {
        toggleMenuOff();
      }
    }
  }

  /**
   * Window resize event listener
   */
  function resizeListener() {
    window.onresize = function(e) {
      toggleMenuOff();
    };
  }

  /**
   * Turns the custom context menu on.
   */
  function toggleMenuOn() {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add( contextMenuActive );
    }
  }

  /**
   * Turns the custom context menu off.
   */
  function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      menu.classList.remove( contextMenuActive );
    }
  }

  /**
   * Positions the menu properly.
   *
   * @param {Object} e The event
   */
  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) {
      menu.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) {
      menu.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickCoordsY + "px";
    }
  }

  /**
   * Dummy action function that logs an action when a menu item link is clicked
   *
   * @param {HTMLElement} link The link that was clicked
   */
  function menuItemListener( link ) {
    console.log( "Task ID - " + taskItemInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
    toggleMenuOff();
  }

  /**
   * Run the app.
   */
   init();

});
