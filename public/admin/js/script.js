//Buton status
console.log("OK")
const buttonStatus = document.querySelectorAll("[button-status]")

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href)
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status")
      if (status) {
        url.searchParams.set("status", status)
      } else {
        url.searchParams.delete("status")
      }
      window.location.href = url.href
    })
  })
}
// End Button Status
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
  if(deleteImage){
    deleteImage.addEventListener("click", (e) => {
      e.preventDefault();
      uploadImagePreview.src = ""
      deleteImage.style.display = 'none'
      uploadImageInput.value = ""
    })
  }
  
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
// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");

if (checkboxMulti) {
  const inputCheckAll = document.querySelector("input[name= 'checkall']")
  const inputsId = document.querySelectorAll("input[name= 'id']")

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach(item => {
        item.checked = true;
      })
    }
    else {
      inputsId.forEach(item => {
        item.checked = false;
      })
    }
  })
  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name= 'id']:checked").length;
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    })
  })
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]")
    const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")

    // console.log(checkboxMulti)
    // console.log(inputChecked)
    const typeChange = e.target.elements.type.value
    if(typeChange == "delete-all"){
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này?")
      if(!isConfirm){
        return
      }
    }
    if(inputChecked.length>0){
      const ids = []
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach(input => {
        const id = input.value
        ids.push(id)
      })
      inputIds.value = ids.join(", ")
      formChangeMulti.submit()
    }
    else{
      alert("Vui lòng chọn ít nhất một bản ghi!")
    }
    
    
  })
}
// End Form Change Multi