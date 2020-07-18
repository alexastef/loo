$(document).ready(() => {
  // when edit button is clicked
  $("#editLooBtn").on("click", (event) => {
    // toggles are enabled
    $(".custom-control-input").removeAttr("disabled");

    // range is enabled
    $("#cleanRange").removeAttr("disabled");

    // hide edit div and show update div
    $(".editDiv").attr("style", "display: none");
    $(".updateDiv").attr("style", "display: inline-block");

    // prevent from resetting
    event.preventDefault();
  });

  // when update button is clicked
  $("#updateLooBtn").on("click", (event) => {
    event.preventDefault();

    let name = $("h1");
    let locationName = name[0].innerText;

    let address = $(".streetAddress");
    let locationAddress = address[0].innerText;

    let phone = $(".placePhone");
    let locationPhone = phone[0].innerText;

    // pull new information from form
    let updatedLoo = {
      place_id: $("form.looForm").data("place-id"),
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
      clean_rating: $("#cleanRange").val(),
    };

    // put request passing in loo to be updated
    $.ajax("/api/details", {
      type: "PUT",
      data: updatedLoo,
    }).then(() => {
      // reload home page
      console.log("Loo updated");
      window.location.replace("/");
    });
  });

  function loadPlacePhoto() {
    const photoReference = $("#place_img").data("photo-reference");
    const placeName = $("#place_img").data("place-name");
    console.log("photoReference", photoReference);
    $.ajax({
      url: `/api/photo/${photoReference}`,
      method: "get",
    }).then((photoSrc) => {
      $("#place_img").attr("src", photoSrc).attr("alt", `${placeName} Photo`);
    });
  }

  loadPlacePhoto();
});
