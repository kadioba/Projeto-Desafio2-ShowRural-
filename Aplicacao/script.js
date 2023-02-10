const imageInput = document.getElementById("imageInput");
const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", () => {
const image = imageInput.files[0];
const formData = new FormData();
formData.append("image", image);

fetch("http://localhost:3000/server", {
method: "POST",
body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
});