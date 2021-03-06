$(document).on("turbolinks:load", function() {

  function addSerchedUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    $('#user-search-result').append(html);
  }


  function addClickedUser(id,name){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${ id }">
                  <input name="group[user_ids][]" type="hidden" value="${ id }">
                  <p class="chat-group-user__name">${ name }</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${ id }" data-user-name="${ name }">削除</a>
                </div>`
    $('#chat-group-users').append(html);
  }

  $('#user-search-field').on("keyup",function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users){
      $('#user-search-result').empty();
        users.forEach(function(user){
          addSerchedUser(user);
        })
    })
    .fail(function(){
      alert("失敗");
    })
  });

  $("#user-search-result").on("click", ".user-search-add", function(){
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    addClickedUser(id,name);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
