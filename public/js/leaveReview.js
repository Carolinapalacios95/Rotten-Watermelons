async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#review-title").value;
  const review = document.querySelector("#review-content").value;

  const response = await fetch(`/api/review`, {
    method: "POST",
    body: JSON.stringify({
      title,
      review,
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

document
  .querySelector(".newReviewBtn")
  .addEventListener("submit", newFormHandler);
