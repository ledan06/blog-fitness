const Hashtag = require("../models/hashtag.model")

module.exports.hashtag = async (posts) => {
    for (const post of posts) {
        const hashtagId = post.hashtag
        for (let i = 0; i < hashtagId.length; i++) {
       
            const infoHashtag = await Hashtag.findOne({
                _id: hashtagId[i]
            }).select("title")
            hashtagId.splice(i,1)
            hashtagId.unshift(infoHashtag.title)
        }
        post["infoHashtags"] = hashtagId.reverse()
    }
    return posts;
}