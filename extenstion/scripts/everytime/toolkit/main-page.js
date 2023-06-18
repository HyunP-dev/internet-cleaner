function censorListElements() {
    /**
     * @type {Element[]}
     */
    let doms = Array.from(document.querySelectorAll(".board .list"))

    for (let dom of doms) {
        let paragraphDom = dom.querySelector("p")
        filter(paragraphDom.innerText).then(isSafe => {
            if (isSafe) return
            paragraphDom.innerText = "검열됨"
        })
    }
}

function censorArticleElements() {
    /**
     * @type {Element[]}
     */
    let doms = Array.from(document.querySelectorAll(".board .article"))

    function Article(dom) {
        this.title = dom.querySelector(".title")
        this.small = dom.querySelector(".small")
    }

    let articles = doms.map(dom => new Article(dom))
    for (let article of articles) {
        filter(article.title.innerText + " " + article.small.innerText).then(isSafe => {
            if (isSafe) return
            article.title.innerText = "검열됨"
            article.small.innerText = "검열됨"
        })
    }
}

