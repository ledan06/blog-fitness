
// Hashtag Suggest
const inputHashtag = document.querySelector(".inner-hashtag");
if (inputHashtag) {
    const input = inputHashtag.querySelector("input[name='hashtag']");
    const boxSuggest = inputHashtag.querySelector(".inner-suggest");

    input.addEventListener("keyup", () => {
        // Lấy từ khóa mới nhất sau dấu phẩy (nếu có)
        const keywords = input.value.split(',').map(kw => kw.trim());
        const keyword = keywords[keywords.length - 1];

        if (keyword.length === 0) {
            boxSuggest.classList.remove("show");
            return;
        }

        const link = `/admin/posts/suggest?keyword=${keyword}`;

        fetch(link)
            .then(res => res.json())
            .then(data => {
                const hashtagLists = data.hashtag.map(item => item.hashtag);
                if (hashtagLists.length > 0) {
                    boxSuggest.classList.add("show");
                    const htmls = hashtagLists.map(hashtagList => {
                        return `<li class="suggest-item">${hashtagList}</li>`;
                    });
                    const boxlist = boxSuggest.querySelector(".inner-list");
                    boxlist.innerHTML = htmls.join("");

                    const suggestItems = boxlist.querySelectorAll(".suggest-item");
                    suggestItems.forEach(item => {
                        item.addEventListener("click", () => {
                            // Thay thế từ khóa cuối cùng bằng gợi ý được chọn
                            keywords[keywords.length - 1] = item.textContent;
                            input.value = keywords.join(', ');
                            boxSuggest.classList.remove("show");
                            input.focus();
                        });
                    });
                } else {
                    boxSuggest.classList.remove("show");
                }
            });
    });
}

// Change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonsChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", ()=> {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            let statusChange = statusCurrent == "posted" ? "draft" : "posted";
            
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}
// End Change status


// End Hashtag Suggest
const buttonDelete = document.querySelectorAll("[button-delete-item]")
if(buttonDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete-item")
    const path = formDelete.getAttribute("data-path")
    buttonDelete.forEach(button => {
        button.addEventListener("click", ()=>{
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDelete.action = action
                formDelete.submit();
            }
        })
    })
}

// Delete Post
