$(document).ready(() => {
    $.ajax("/api/")
    $("#updateLooBtn").on("click", (event) => {
        // this will just enable all the toggles
    });
});

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