
renderElemetsFromArray(products)
const modal=document.querySelector('#modal')    
document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault()               
    const id = uuidv4()
    const timestamp = moment().valueOf()
    if(event.target.elements.addProductTextBox.value=="" && event.target.elements.addPriceTextBox.value==""){
        event.target.elements.addProductTextBox.style.borderStyle="solid"
        event.target.elements.addProductTextBox.style.borderWidth=2+"px"
        event.target.elements.addProductTextBox.style.borderColor="red"

        event.target.elements.addPriceTextBox.style.borderStyle="solid"
        event.target.elements.addPriceTextBox.style.borderWidth=2+"px"
        event.target.elements.addPriceTextBox.style.borderColor="red"

    }else if(event.target.elements.addProductTextBox.value=="" && event.target.elements.addPriceTextBox.value!=""){
        event.target.elements.addProductTextBox.style.borderStyle="solid"
        event.target.elements.addProductTextBox.style.borderWidth=2+"px"
        event.target.elements.addProductTextBox.style.borderColor="red"

        event.target.elements.addPriceTextBox.style.borderStyle="none"
        event.target.elements.addPriceTextBox.style.borderWidth=2+"px"
        event.target.elements.addPriceTextBox.style.borderColor="red"

    }else if(event.target.elements.addProductTextBox.value!="" && event.target.elements.addPriceTextBox.value==""){
        event.target.elements.addProductTextBox.style.borderStyle="none"
        event.target.elements.addProductTextBox.style.borderWidth=2+"px"
        event.target.elements.addProductTextBox.style.borderColor="red"

        event.target.elements.addPriceTextBox.style.borderStyle="solid"
        event.target.elements.addPriceTextBox.style.borderWidth=2+"px"
        event.target.elements.addPriceTextBox.style.borderColor="red"

    }else{

        const similarEl= products.find(item => {
            return item.title.toLowerCase().includes(event.target.elements.addProductTextBox.value.toLowerCase())
            });

       const similar= products.findIndex(item => {
        return item.title.toLowerCase().includes(event.target.elements.addProductTextBox.value.toLowerCase())
        });

        if(similar!=-1){
           modal.style.display ="flex"
        
            document.querySelector('#cancel').addEventListener('click',e=>{
                modal.style.display ="none"
                event.target.elements.addProductTextBox.value=''
                event.target.elements.addPriceTextBox.value=''
            })

           
            document.querySelector('#replace').addEventListener('click',e=>{
                similarEl.title=event.target.elements.addProductTextBox.value
                similarEl.price=event.target.elements.addPriceTextBox.value
                similarEl.exits=event.target.elements.ISexistCheckBox.checked

                products.splice(similar,1,similarEl)
                modal.style.display ="none"
                renderElemetsFromArray(products)
                saveProducts(products)
            })

        }else{
            event.target.elements.addProductTextBox.style.borderStyle="none"
        event.target.elements.addPriceTextBox.style.borderStyle="none"


        products.push({
            id: id,
            title: event.target.elements.addProductTextBox.value,
            exits: event.target.elements.ISexistCheckBox.checked,
            price: event.target.elements.addPriceTextBox.value,
            updated: timestamp,
            created: timestamp
        })
        renderElemetsFromArray(products)
        saveProducts(products)
        event.target.elements.addProductTextBox.value =''
        event.target.elements.addPriceTextBox.value=''
        }

        
    }



    
})


document.querySelector('#search-place').addEventListener('input', e => renderElemetsFromArray(products))


///for live change:
window.addEventListener('storage', (event) => {
    if (event.key === 'products') {
        products = JSON.parse(event.newValue)
        saveProducts(products)
        renderElemetsFromArray(products)
    }
})
document.querySelector('#sort').addEventListener('change', (e) => {
    filter.sortBy = e.target.value
    renderElemetsFromArray(products)
})

document.querySelector('#search-through-exists').addEventListener('change',e=>{
    if(e.target.checked){
        filter.exist=true
    }else{
        filter.exist=false
    }
    renderElemetsFromArray(products)
})

