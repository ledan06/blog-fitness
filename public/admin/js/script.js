// Upload Image
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
    
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")


  uploadImageInput.addEventListener("change", (e) => {
    const [file] = e.target.files
    
    const deleteImage = document.querySelector("[delete-image]")
    if (file) {
      deleteImage.style.display = 'block'
      uploadImagePreview.src = URL.createObjectURL(file)
    }
  })
  // Delete Image
  const deleteImage = document.querySelector("[delete-image]")

  deleteImage.addEventListener("click", (e) => {
    e.preventDefault();
    uploadImagePreview.src = ""
    deleteImage.style.display = 'none'
    uploadImageInput.value = ""
  })
  // End Delete Image
}

// Show Alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"))
  const closeAlert = showAlert.querySelector("[close-alert]")
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time)
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}

// End Show Alert
