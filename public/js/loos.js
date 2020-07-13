$(function() {
    $(".change-thumb").on("click", function(event) {
      event.preventDefault();
      let id = $(this).attr("data-id");
      let newThumb = $(this).attr("data-newthumb");
      console.log("sending id="+ id + " value=" + newThumb);
  
      let newThumbState = {
        thumbs_up: newThumbState
      };
  
      // Send the PUT request.
      $.ajax("/api/bathroom/" + id, {
        type: "PUT",
        data: newThumbState
      }).then(function () {
          console.log("changed state to", newThumb);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    // $(".addLoo").on("submit", (event)=> {
    //   // Make sure to preventDefault on a submit event.
    //   event.preventDefault();
  
    //   let newLoo = {
    //     location_name: $("#looName").val().trim(),
    //     street_address: $("#looStreet").val().trim(),
    //     availiable: $("[location_name=available]:checked").val()
    //   };

    //   console.log(newLoo);
  
    //   // Send the POST request.
      
    // });
  });
  