//Like Post
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
//End Like Post

//Comment Post
const formComment = document.querySelector("#comment-form")
if(formComment){
    const buttonSubmit = formComment.querySelector("button")
    if(formComment){
        formComment.addEventListener("submit", (e)=> {
            e.preventDefault()
            const content = formComment.querySelector("textarea").value
            const postId = buttonSubmit.getAttribute("post-id")
            link = `/post/comment/${postId}`
    
            const data = { comment: content };
            fetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res=>res.json())
                .then(data => {
                    const commentList = document.querySelector(".comment-list")
                    const newComment = document.createElement('div')
                    const createdAtDate = new Date(data.createdAt)
                    newComment.classList.add("comment")
                    const htmls = `
                        <strong>${data.user.fullName}</strong>
                        <p>${data.content}</p>
                        <small class="text-muted">${createdAtDate.toLocaleString()}</small>
                        <button class="btn btn-danger btn-sm delete-comment-btn" data-id="${data.id}"><i class="fa-solid fa-trash"></i></button>
                        <hr>
                    `
                    newComment.innerHTML = htmls
                    commentList.insertAdjacentElement('afterbegin', newComment);

                    formComment.querySelector("textarea").value = '';
                })
        })
    }
}
//End Comment Post

//Delete Comment Post
const buttonDelete = document.querySelectorAll(".delete-comment-btn")
if(buttonDelete){
    buttonDelete.forEach(button => {
        button.addEventListener("click", ()=> {
            const commentId = button.getAttribute("data-id")
            const link = `/post/delete/${commentId}`
    
            fetch(link, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        const commentElement = button.closest(".comment");
                        commentElement.remove();
                    }
                    else{
                        alert("Bạn không có quyền xóa bình luận này!");
                    }
            })
        })
        
    });
}
