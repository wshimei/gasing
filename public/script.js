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
      var thumbsUp = $(`#thumbs-o-up-${data._id}`)

      thumbsUp.attr('class', 'fa fa-thumbs-up pull-right')
    })
  })
})
