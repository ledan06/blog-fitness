const boxSearch = document.querySelector(".box-search")
if(boxSearch){
    const input = boxSearch.querySelector("input[name='keyword']")
    const boxSuggest = boxSearch.querySelector(".inner-suggest")

    input.addEventListener("keyup", ()=> {
        const keyword = input.value
        const link = `/search/suggest?keyword=${keyword}`

        fetch(link)
            .then(res => res.json())
            .then(data=> {
                const posts = data.posts
                if(posts.length > 0){
                    boxSuggest.classList.add("show")
                    const htmls = posts.map(post => {
                        return `
                            <a class="inner-item" href="/post/detail/${post.slug}">
                                <div class="inner-image"><img src="${post.thumbnail}"/></div>
                                <div class="inner-info">
                                    <div class="inner-title">${post.title}</div>
                                </div>
                            </a>
                        `
                    })
                    const boxlist = boxSuggest.querySelector(".inner-list")
                    boxlist.innerHTML = htmls.join("")
                } else {
                    boxSuggest.classList.remove("show")
                }
            })
    })
    input.addEventListener("blur", ()=> {
        setTimeout(() => {
            boxSuggest.classList.remove("show")
        }, 200)
    })
}