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
      place_id: $("h1").attr("id"),
      location_name: locationName,
      street_address: locationAddress,
      location_phone: locationPhone,
      // basics
      available: $("#looAvailable").is(":checked"),
      needs_key: $("#needsKey").is(":checked"),
      gender_neutral: $("#gender").is(":checked"),
      handicap_accessible: $("#accessible").is(":checked"),
      // supplies
      has_water: $("#hasWater").is(":checked"),
      has_soap: $("#hasSoap").is(":checked"),
      has_paper: $("#hasPaper").is(":checked"),
      has_mirror: $("#hasMirror").is(":checked"),
      clean_rating: $("cleanRange").is(":checked")
    }

    // clean rating slider needs separate function to get input value

    // post request passing in verified loo
    $.ajax("/api/bathroom", {
      type: "POST",
      data: verifiedLoo
    }).then(function () {
        console.log("Added new Bathroom");
        // Reload the home page to show new loo
        alert("Thanks for adding a loo!");
        window.location.replace("/home");
      }
    );
  });
});