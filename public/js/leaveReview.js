async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#review-title").value.trim();
  const description = document.querySelector("#review-description").value.trim();
  const rating = document.querySelector("#review-rating").value;

if (title && description && rating) {
  var url = document.location.href;
  var newurl = new URL(url);
  const movieId = newurl.pathname.split("/").pop();
  console.log("movie", movieId)
  const testmovie = `/movies/${movieId}`
  console.log(testmovie);
  const response = await fetch (testmovie, {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      rating,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to add review");
  }
}
};

document
  .querySelector(".new-review-form")
  .addEventListener("submit", newFormHandler);
