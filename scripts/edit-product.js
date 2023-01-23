products = getItems()
saveProducts(products)

let productPageTitle = document.querySelector('#page-title')
let ProductTitle = document.querySelector('#product-title')
let ProductPrice = document.querySelector('#product-price')
let lastEditElement = document.querySelector('#last-edit')


let productID = location.hash.substring(1)

let product = products.find(item => item.id === productID)
if (product === undefined) {
    location.assign('./index.html')
}

productPageTitle.innerHTML = product.title + ' editing...'
document.querySelector('title').innerHTML = product.title + ' editing'
ProductTitle.value = product.title
ProductPrice.value = product.price
lastEditElement.textContent = showLastEdit(product.updated)


document.querySelector('#removeBtn-editpage').addEventListener('click', (e) => {
    removeItem(products, productID)
    location.assign('./index.html')
    saveProducts(products)
    renderElemetsFromArray(products)
})

document.querySelector('#redToMainPage').addEventListener('click', () =>
    location.assign('./index.html'))

document.querySelector('#save-change').addEventListener('click', (e) => {
        product.updated = moment().valueOf()
        lastEditElement.textContent = showLastEdit(product.updated)
        product.title = ProductTitle.value
        productPageTitle.innerHTML = product.title + ' editing...'
        saveProducts(products)
        renderElemetsFromArray(products)
})


///for live change
window.addEventListener('storage', (event) => {
    if (event.key === 'products') {
        products = JSON.parse(event.newValue)
        product = products.find((item) => item.id === productID)
        if (product === undefined) {
            // redirecting if this product element isn't exist:
            location.assign('./index.html')
        } else {
            productPageTitle.textContent = product.title + ' editing...'
            ProductTitle.value = product.title
            ProductPrice.value = product.price
            lastEditElement.textContent = showLastEdit(product.updated)
        }
    }
})