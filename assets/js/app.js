$(document).ready(function() {

	var gifTastic = {
		topics: [],
		initialTopics: function() {

			this.topics = ["Game of Thrones", "30 Rock", "Seinfeld", "Breaking Bad", "Lost", "Chuck", "Married With Children", "Curb Your Enthusiasm",
							"The Sopranos", "Modern Family", "The Wire", "Entourage", "Parks and Recreation", "The Office", "Michael Scott", "Ron Swanson", 
							"The King of Queens", "Alf", "Wonder Years", "24", "Alias", "South Park", "The Simpsons"]

		}, // end initialTopics

		addTopic: function() {

			var topic = $("#tv-input").val().trim();

	        this.topics.push(topic);

		},

		renderButtons: function() {

			//Clear out buttons area
			$(".buttons").empty();

			for (var i = 0; i < this.topics.length; i++) {
				
				var topicBtn = $("<button>").attr("data-topic", this.topics[i]).addClass("btn btn-primary btn-topic btn-md").text(this.topics[i]);

				$(".buttons").append(topicBtn);

			}


		}, //end renderButtons

		getGifs: function(topic) {

			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10&offset=&rating=&lang=&fmt=json";

		    $.ajax({
		      url: queryURL,
		      method: "GET"
		    }).done(function(response) {
		    	// console.log(response)

		    	for (var i = 0; i < 10; i++) {
		    		var gifDiv = $("<div>").addClass("gifDiv");
		    		var gifRating = $("<p>").addClass("gifRating").text("Rating: " + response.data[i].rating)
		    		var gifImgStill = response.data[i].images.fixed_height_still.url;
					var gifImg = response.data[i].images.fixed_height.url;
					var $gifImg = $("<img>").attr("src", gifImgStill).attr("data-still", gifImgStill).attr("data-animate", gifImg)
						.attr("data-state", "still").attr("alt", "giphy").addClass("giphyImg");

					gifDiv.append($gifImg).append(gifRating);

					$(".gifs").append(gifDiv);				    		
		    	}

		    });// end ajax call

		} //end getGifs

	} // end gifTastic object

	// ------------------------App Execution Starts Here-----------------------------

	gifTastic.initialTopics();

	gifTastic.renderButtons();



	$(document).on("click", ".btn-topic", function() {

		//Retrieve topic from clicked button
		var curTopic = ($(this).data("topic"));

		//Clear out gifs area
		$(".gifs").empty();

		//Load gifs for topic clicked
		gifTastic.getGifs(curTopic);

	}); // end topic click 

	$(document).on("click", "#add-tv", function(event) {
        
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var newTopic = $("#tv-input").val().trim();

        if (newTopic.length === 0) {

        	alert("Please enter some text to create a new topic!");
        } else {

			//add new topic
			gifTastic.addTopic();

			gifTastic.renderButtons();

        }

        $("#tv-input").val("");


	}); // end topic click 

	$(document).on("click", ".giphyImg", function() {

        var state = $(this).data("state");

		if (state === "still") {
			$(this).data("state", "animate").attr("src", $(this).data("animate"))
		} else {
			$(this).data("state", "still").attr("src", $(this).data("still"))
		}        


	}); // end topic click 



}); // end document ready