/* global $ */
$(function () {
  const $likeButton = $('.like')

  $likeButton.on('submit', function (e) {
    e.preventDefault()

    var $liked = $(this).serializeArray()

    $.get('/').done(function (data) {
        alert(data)
      })

    console.log($liked[0].value)
    console.log($liked[1].value)
  })
})
