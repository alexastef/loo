$(document).ready(() => {
  function loadPlacePhoto() {
    const photoReference = $("#place_img").data("photo-reference");
    const placeName = $("#place_img").data("place-name");
    console.log("photoReference",photoReference);
    $.ajax({
      url: `/api/photo/${photoReference}`,
      method: "get",
    }).then(photoSrc => {
      $("#place_img").attr("src",photoSrc).attr("alt",`${placeName} Photo`)
    });
  }
  loadPlacePhoto();

  $("#addLooBtn").on("click", (event) => {
    event.preventDefault();
    
    let name = $("h1");
    let locationName = name[0].innerText;

    let address = $(".streetAddress");
    let locationAddress = address[0].innerText;

    let phone = $(".placePhone");
    let locationPhone = phone[0].innerText;

    let verifiedLoo = {
      location_name: locationName,
      street_address: locationAddress,
      location_phone: locationPhone,
      available: $("#looAvailable").val(),
      needs_key: $("#needsKey").val(),
      gender_neutral: $("#gender").val(),
      handicap_accessible: $("#accessible").val(),
      has_water: $("#hasWater").val(),
      has_soap: $("#hasSoap").val(),
      has_paper: $("#hasPaper").val(),
      has_mirror: $("#hasMirror").val(),
      clean_rating: $("cleanRange").val()
    }

    // clean rating slider needs separate function to get input value

    //post request passing in verified loo
    $.ajax("/api/bathroom", {
      type: "POST",
      data: verifiedLoo
    }).then(function () {
        console.log("Added new Bathroom");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});