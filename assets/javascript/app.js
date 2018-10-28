$( document ).ready(function() {

var topics = ["happy", "sad", "excited", "silly", "angry", "upset", "scared"];

function makeButtons() {

    $(".buttonContainer").empty();
  
    for (var i = 0; i < topics.length; i++) {

      var emotion = $("<button>");
      emotion.addClass("topic");
      emotion.attr("data-name", topics[i]);
      emotion.text(topics[i]);
      $(".buttonContainer").append(emotion);
    }
  }


$("#addTopic").on("click", function() {
  var topic = $("#topic-input").val().trim();
  topics.push(topic);
  makeButtons()

  return false;
});

function displayImg() {
  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5TRw6UUxhHk9vmQzHs0hHTMMQ4REtBFV&q=" + topics + "&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response) {
    console.log(response.data);

    var results = response.data;

    for (i = 0; i < results.length; i++) {
    var imgDiv = $("<div class=gifs>");
    var showImg = $("<img>");
        showImg.attr("src", results[i].images.fixed_height_still.url);
        showImg.attr("data-still", results[i].images.fixed_height_still.url);
        showImg.attr("data-state", "still");
        showImg.addClass("gif");
        showImg.attr("data-animate", results[i].fixed_height.url);
    
    imgDiv.append(showImg);

    $("#images").prepend(showImg);
    }

  });

}

$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});


});

displayGifs();
$(document).on("click", ".show", displayImg);

makeButtons();