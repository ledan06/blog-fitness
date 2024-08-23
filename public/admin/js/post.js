// // Hashtag Suggest
// const inputHashtag = document.querySelector(".inner-hashtag")
// if(inputHashtag){
//     const input = inputHashtag.querySelector("input[name='hashtag']")
//     const boxSuggest = inputHashtag.querySelector(".inner-suggest")
//     input.addEventListener("keyup", ()=> {
//         const keyword = input.value
        
//         const link = `/admin/posts/suggest?keyword=${keyword}`

//         fetch(link)
//             .then(res => res.json())
//             .then(data => {
//                 const hashtagLists  = data.hashtag.map(item => item.hashtag)
//                 const boxlist = boxSuggest.querySelector(".inner-list")

//                 boxlist.innerHTML = "";

//                 if(hashtagLists.length > 0){
//                     boxSuggest.classList.add("show")
//                     const htmls = hashtagLists.map(hashtagList => {
//                         return `
//                             <li class="suggest-item">${hashtagList}</li>
//                         `
//                     })
                    
//                         boxlist.innerHTML = htmls.join("")

//                     const suggestItem =boxlist.querySelectorAll(".suggest-item")
//                     suggestItem.forEach(item => {
//                         item.addEventListener("click", ()=>{
//                             input.value = item.textContent
//                             boxSuggest.classList.remove("show")
//                             input.focus(); 
//                         })
//                     })
//                 } else {
//                     boxSuggest.classList.remove("show")
//                 }
                
//             })
//     })
// }
// // End Hashtag Suggest

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
