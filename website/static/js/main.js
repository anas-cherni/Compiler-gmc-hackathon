"use strict";

const challenges_descriptions={
	"test_challenge":"Write a code that reads a name from stdin and prints it back",
	"test2_challenge":"Write a code that reads a name from stdin and greets it `hello, name` no endline at the end",
	"test4_challenge":"Write a code that can travel in time forth and back",
	"test3_challenge":"Write a code that tells the future",
	
	
}


        $(document).ready(function() {

		$("#description").html(challenges_descriptions[$("#message").val()])
$("#submit").click(
  function (e) {
    e.preventDefault();
    var $submit = $(".submitting"),
      waitText = "Submitting...";

	  const challenge_name=$("#message").val();
	  const source_code=btoa($("#source_code").val());
    $.ajax({
      type: "POST",
      url: "/send",
      data: JSON.stringify({
		 source_code,
		 challenge_name
	  }),
      contentType: "application/json",
      dataType: "json",

      beforeSend: function () {
        $submit.css("display", "block").text(waitText);
      },
      success: function (msg) {
		console.log("message here",msg.status.description) ;
        if (msg.status.description.toLowerCase() == "accepted") {
          $("#form-message-warning").hide();
          setTimeout(function () {
            $("#contactForm").fadeIn();
          }, 1000);

            // $("#form-message-success").html("Accepted <br> <a href='/result/"+msg.id+"'>Click here to see the result</a>");
            $("#form-message-success").html("Accepted <br>");
          setTimeout(function () {
            $("#form-message-success").fadeIn();
			
          }, 1400);

          setTimeout(function () {
            $("#form-message-success").fadeOut();
          }, 8000);

          setTimeout(function () {
            $submit.css("display", "none").text(waitText);
          }, 1400);

        //   setTimeout(function () {
        //     // $("#contactForm").each(function () {
        //     //   this.reset();
        //     // });
        //   }, 1400);
        } else {
          $("#form-message-warning").html(msg.status.description+'\n'+atob(msg.compile_output));
          $("#form-message-warning").fadeIn();
          $submit.css("display", "none");
        }
      },
      error: function (message) {
		console.log("message here",message) ;
        $("#form-message-warning").html(
          "Something went wrong. Please try again.\n",
		  message.status.description
        );
        $("#form-message-warning").fadeIn();
        // $submit.css("display", "none");
      },
    });

}
	);
	$("#message").change(function(e){
		console.log(e.target.value)
console.log(challenges_descriptions[e.target.value])
		$("#description").html(challenges_descriptions[e.target.value])
	})
		})