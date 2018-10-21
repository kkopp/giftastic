$( document ).ready(function() {



$("#newButton").on("click", function() {

    var person = "darth vader"
    var queryURL = "https://api.giphy.com/v1/stickers/search?api_key=5TRw6UUxhHk9vmQzHs0hHTMMQ4REtBFV&q=" + person + "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function(response) {
        var results = response.data;
    
        for (i = 0; i < results.length; i++) {
        var imageUrl = results[i].images.fixed_height.url;

        var newImage = $("<img>");

        newImage.attr("src", imageUrl);
        newImage.attr("alt", "new image"); // see if you can put the name of the search term in the alt tag

        $("#images").prepend(newImage);
        }




        
      });
  });

});