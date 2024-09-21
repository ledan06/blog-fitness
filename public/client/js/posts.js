const likeButton = document.querySelector("#like-button")
const likeCount = document.querySelector("#like-count")
if(likeButton){
    likeButton.addEventListener("click", ()=> {
        const idPost = likeButton.getAttribute("button-like")
        const isActive = likeCount.classList.contains("active")
        const typeLike = isActive ? "dislike" : "like"
        let link =`/post/like/${typeLike}/${idPost}`

        const option = {
            method: "PATCH"
        }

        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if(data.code == 200){
                    likeCount.innerHTML = `${data.like} Lượt thích`
                    likeCount.classList.toggle("active")
                }
                if(data.code == 401){
                    const confirmLogin = confirm("Bạn cần đăng nhập để thích bài viết. Bạn có muốn đăng nhập không?");
                    if (confirmLogin) {
                        window.location.href = "/user/login";
                    }
                }
            })
    })
}