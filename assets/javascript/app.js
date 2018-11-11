$( document ).ready(function() {

  var topics = ["frustrated", "happy", "sad", "excited", "silly", "angry", "upset", "scared", "grumpy", "irate", "sleepy", "funny", "elated"];
  
  function makeButtons() {
  
      $(".buttonContainer").empty();
    
      for (var i = 0; i < topics.length; i++) {
  
        var emotion = $("<button>");
        emotion.addClass("btn btn-outline-secondary moviebtn");
        emotion.attr("data-name", topics[i]);
        emotion.text(topics[i]);
        $(".buttonContainer").append(emotion);
      }
    }
  
  makeButtons();
  
    $("#addTopic").on("click", function() {
      event.preventDefault();
      var topic = $("#topic-input").val().trim();
      topics.push(topic);
      makeButtons();
      $("#topic-input").val("");
      return false;
  });

  

  $(".buttonContainer").on("click", ".moviebtn", function () {
    //console.warn("we're here 0");
    var buttonTopics = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5TRw6UUxhHk9vmQzHs0hHTMMQ4REtBFV&q=" + buttonTopics + "&limit=10";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      console.log(response.data);

      var results = response.data;
      $("#images").empty();
  
      for (i = 0; i < results.length; i++) {

      var imgDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var emotionImg = $("<img>");

        emotionImg.attr("src", results[i].images.original_still.url);
        emotionImg.attr("data-still", results[i].images.original_still.url);
        emotionImg.attr("data-animate", results[i].images.original.url);
        emotionImg.attr("data-state", "still");
        emotionImg.attr("class", "gif");
        imgDiv.append(p);
        imgDiv.append(emotionImg);
        $("#images").append(imgDiv);
      }
  
    });
  
  });

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	$(document).on("click", ".gif", changeState);

});

