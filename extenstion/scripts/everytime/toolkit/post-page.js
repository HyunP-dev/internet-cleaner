function censorArticle() {
    let article = document.querySelector("article .article")
    let titleDom = article.querySelector("h2")
    let paragraphDom = article.querySelector("p")
    filter(titleDom.innerText + " " + paragraphDom.innerText).then(isSafe => {
        if (isSafe) return
        titleDom.innerText = "검열됨"
        paragraphDom.innerText = "검열됨"
    })
}

function censorComments() {
    let comments = Array.from(document.querySelectorAll("article .comments > article"))
    for (let comment of comments) {
        let paragraph = comment.querySelector("p")
        let sentence = paragraph.innerText
        filter(sentence).then(isSafe => {
            if (isSafe) return
            paragraph.innerText = "검열됨"
        })
    }
}