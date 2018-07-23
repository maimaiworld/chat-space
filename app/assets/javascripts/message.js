$(function(){

  var message_list = $(".messages");

  function appendMessage(message){
    var img = message.image ? `<img src=${ message.image }>` : "";

    var html =`<div class="message" data-message-id="${ message.id }">
                <div class="message__name">
                  ${ message.name }
                </div>
                <div class="message__date">
                  ${ message.created_at }
                </div>
                <div class="message__content">
                  <div class="upper_message">
                  ${ message.body }
                  </div>
                  <div class="lower_message">
                  ${ img }
                  </div>
                </div>
              </div>`
  }

  function pageScrollDown(target){
    target.animate({scrollTop: message_list[0].scrollHeight}, 'fast');
  }

  $('#new_message').submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      if (message.length !== 0){
      appendMessage(message);
      $('#new_message')[0].reset();
      }
      $('.form__button').prop('disabled', false);
    })
    .fail(function(){
      alert('送信失敗');
      $('.form__button').prop('disabled', false);
    })
  });

  setInterval(function(){

    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      var lastMessageId = $('.messages').find('.message').last().data('message-id')
      $.ajax({
        url: location.pathname,
        type: "GET",
        data: {"lastMessageId": lastMessageId},
        dataType: 'json',
      })
      .done(function(messages){
        messages.forEach(function(message){
          appendMessage(message);
        })
      })
      .fail(function(){
        alert('送信失敗');
      })
    }
  },5000);

});
