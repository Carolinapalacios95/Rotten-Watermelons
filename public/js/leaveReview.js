async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#review-title").value.trim();
  const description = document.querySelector("#review-description").value.trim();
  const rating = document.querySelector("#review-rating").value;

if (title && description && rating) {
  const response = await fetch(`/api/movies`, {
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
  .querySelector(".newReviewBtn")
  .addEventListener("submit", newFormHandler);
