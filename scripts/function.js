//
///for main page
let products = [];

let filter = {
    Object: '',
    exist: false,
    sortBy: 'byCreated'
}

//save on local storage
const saveProducts = (productArray) => {
    localStorage.setItem('products', JSON.stringify(productArray))
}



//get from database for array:
const getItems = () => {
    const JSONitems = localStorage.getItem('products')
    try {
        return JSONitems != null ? JSON.parse(JSONitems) : []
    } catch (error) {
        return [];
    }
}


// products = getItems()
products = getItems()
saveProducts(products)

//remove item
const removeItem = (productArray, id) => {
    let found = productArray.findIndex(item => item.id === id)
    if (found > -1)
        productArray.splice(found, 1)
}


//change exist situation:
//تغییر وضعیت موجود بودن
const changeExist = (productArray, id, value) => {
    let found = productArray.find(item => item.id === id)
    if (!found > -1) {
        found.exits = value
    }

}


 bnnbvcx
//sort by created/edited
const changeSort=(productArray,sortType)=>{
    if(sortType==="byCreate"){
        return productArray.sort((a,b)=>{
            if(a.created>b.created){
                return -1
            }else if(a.created<b.created){
                return 1
            }else{
                return 0
            }
        })
    }
    else if(sortType=='byEdited'){
        return productArray.sort((a,b)=>{
            if(a.edited>b.edited){
                return -1
            }
            else if(b.edited>a.edited){
                return 1
            }else{
                return 0
            }
        })
    }
}


//render elements from array:
const renderElemetsFromArray = (productArray) => {

    productArray = changeSort(productArray, filter.sortBy)
    if (filter.exist === true) {
        productArray = productArray.filter(item => item.exits === true)
    } else {
        productArray = productArray
    }
    FilteredproductArray = productArray.filter((item) => {
        return item.title.toLowerCase().includes(document.querySelector('#search-place').value.toLowerCase())
    })

    document.querySelector('#productsPlace').innerHTML = ''
    FilteredproductArray.forEach((item) => {
        document.querySelector('#productsPlace').appendChild(renderedFromArray(item))
        // const brtag = document.createElement('br')
        // document.querySelector('#productsPlace').appendChild(brtag)
    })

}

const renderedFromArray = (product) => {


    const producDiv = document.createElement('div')
    const ExistCheckBox = document.createElement('input')
    const removeBtn = document.createElement('button')
    const productTitle = document.createElement('a')
    const productPrice = document.createElement('span')
    producDiv.setAttribute('class', 'productsDiv')

    ExistCheckBox.classList.add('product__exit_')
    productPrice.classList.add('product__price')
    ExistCheckBox.setAttribute('type', 'checkbox')
    removeBtn.textContent = 'remove'
    productTitle.textContent = product.title
    productTitle.setAttribute('href', `./editProduct.html#${product.id}`)
    productPrice.textContent = product.price + '$';
    producDiv.appendChild(ExistCheckBox)





    ExistCheckBox.addEventListener('change', event => {
        changeExist(products, product.id, event.target.checked)
    })

    if (product.exits === true) {
        ExistCheckBox.setAttribute('checked', 'true')
    } else if (product.exits === false) {
        ExistCheckBox.removeAttribute('checked', 'true')
    }
    removeBtn.classList.add('mainpage__removeBtn')

    producDiv.appendChild(productTitle)
    producDiv.appendChild(productPrice)
    producDiv.appendChild(removeBtn)

    removeBtn.addEventListener('click', () => {
        removeItem(products, product.id)
        saveProducts(products)
        renderElemetsFromArray(products)
    })




    return producDiv
}

let showLastEdit = (timestamp) => {
    {
        return `last edit:${moment(timestamp).locale('en').fromNow()}`
    }
}


//
//
///for tasks page:

//geting task and return those: