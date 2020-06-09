export const fetchData = (url) => {
    console.log(url)
    return fetch(url).then((res) => res.json())
}