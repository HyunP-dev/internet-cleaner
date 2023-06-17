async function filter(sentence) {
    let response = fetch("http://127.0.0.1:8000/check/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sentence: sentence})
    })
    return (await response).text().then(str => str === "true")
}