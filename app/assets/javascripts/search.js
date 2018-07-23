$(function() {

  function appendUser(user){
    var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>`

    $("#user-search-result").append(html);
  }

  function appendNoUser(user){
    var html =
      `<div class='chat-group-user clearfix'>${user}</div>`

      $("#user-search-result").append(html);
  }

  function addChatUser(id, name){
    var html =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
        <input name='group[user_ids][]' type='hidden' value='${id}'>
        <p class='chat-group-user__name'>${name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}" data-user-name="${name}">削除</a>
      </div>`

    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input == "") {
     $("#user-search-result").empty();
    }else{
      $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
      })
      .done(function(users) {
      $("#user-search-result").empty();
        if (users.length !== 0) {
           users.forEach(function(user){
             appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーがいません");
        }
      })
      .fail(function() {
        alert('ユーザーの検索に失敗しました');
      });
    }
      return false;
    });

  $("#user-search-result").on("click",".chat-group-user__btn--add",function(e){
    e.preventDefault();
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    addChatUser(id, name);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click",".js-remove-btn",function(e){
    e.preventDefault();
    $(this).parent().remove();
  });
});
