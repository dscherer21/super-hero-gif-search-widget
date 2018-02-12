$( document ).ready(function() {
    console.log( "ready!" );


  // Initial array of superGifs
  var superGifs = ["Deadpool", "Spiderman", "Batman", "Thor", "Link", "Megaman"];

  // displayGifInfo function re-renders the HTML to display the appropriate content
  function displayGifInfo() {
    var myGiphyAPIKey = '&api_key=ynEpUxgSZew3OyBuOoQhjmul4zUYYUEa';
    var hero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + myGiphyAPIKey + "&limit=10";

    // Creating an AJAX call for the specific hero button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("Getting a response!");
      console.log(response);

      //Clears out old Gifs
      $('#superGifsView').html('');

      //For loop to display all 10 gifs
      for (var counter = 0; counter < response.data.length; counter++) {

      // Creating a div to hold the hero
      var heroDiv = $("<div class='hero col-sm-3'>");

      // Storing the rating data
      var rating = response.data[counter].rating;
      console.log(rating);

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      heroDiv.append(pOne);

      // Retrieving the URL for the still image
      //BUG Changing all the images to the same gif when clicked
      //var imgURL = response.data[counter].images.original_still.url;
      //Retrieving the URL for the moving image
      var imgAction = response.data[counter].images.original.url;
      console.log(imgAction);

      // Creating an element to hold the image
      var image = $("<a class='action'><img src='" + imgAction + "' class='img img-thumbnail' alt='" + hero + "'></a>");

      // Appending the image
      heroDiv.append(image);

      //when img is clicked on change source to moving gif
      //$('.action').on('click', function() {
        //$('.img').attr('src', 'imgAction');
      //});

      // Calls all the gifs to be displayed into the #superGifsView div
      $("#superGifsView").append(heroDiv);
    };

    //when img is clicked on change source to moving gif
    //$('.action').on('click', function() {
      //$('.img').attr('src', 'response.data[counter].images.original.url');
    //});
  });

  };

  // Function for displaying hero data
  function renderButtons() {

    // Deleting the superGifs prior to adding new superGifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonsView").empty();

    // Looping through the array of superGifs
    for (var i = 0; i < superGifs.length; i++) {

      // Then dynamicaly generating buttons for each hero in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of gifBtn to our button
      a.addClass("gifBtn btn btn-primary");
      // Adding a data-attribute
      a.attr("data-name", superGifs[i]);
      // Providing the initial button text
      a.text(superGifs[i]);
      // Adding the button to the buttons-view div
      $("#buttonsView").append(a);
    };
  };

  // This function handles events where a hero button is clicked
  $("#addGif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var hero = $("#gifInput").val().trim();

    // Adding hero from the textbox to our array
    superGifs.push(hero);

    // Calling renderButtons which handles the processing of our hero array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "gifBtn"
  $(document).on("click", ".gifBtn", displayGifInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

});
