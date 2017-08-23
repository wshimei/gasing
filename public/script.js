/* global $ */
$(function () {
  const $likeButton = $('.like')

  $likeButton.on('submit', function (e) {
    e.preventDefault()

    var $liked = $(this).serializeArray()

    $.post(`/projects/${$liked[1].value}/like`, {
      project: $liked[0].value,
      projectId: $liked[1].value,
      likedBy: $liked[2].value
    }).done(function (data) {
      console.log(`#thumbs-up-${data._id}`)
      var openThumbsUp = $(`#thumbs-o-up-${data._id}`)
      // var closeThumbsUp = $(`#thumbs-up-${data._id}`)

      openThumbsUp.attr('class', 'fa fa-thumbs-up pull-right')
    })

    console.log($liked)
    // console.log($liked[1].value)
  })
})
