const cart = document.querySelector("nav .cart")
const cartSideBar = document.querySelector("nav .cart-sidebar")
const closeCart = document.querySelector(".close-cart")
const burger = document.querySelector(".burger")
const menuSideBar = document.querySelector(".menu-sidebar")
const closeMenu = document.querySelector(".close-menu")
const cartItemsTotal = document.querySelector("noi")
const cartPriceTotal = document.querySelector(".total-amount")
const cartUi = document.querySelector(".cart-sidebar .cart")
const totalDiv = document.querySelector(".total-sum")
const clearBtn = document.querySelector(".clear-cart-btn")
const cartContent = document.querySelector(".cart-content")

let Cart=[];
let buttonsDOM=[];

cart.addEventListener("click",function(){
    cartSideBar.style.transform = "translate(0%)"
    const bodyOverlay = document.createElement("div")
    bodyOverlay.classList.add("overlay");
    setTimeout(function(){
        document.querySelector("body").append(bodyOverlay)
    },300)
})

closeCart.addEventListener("click",function(){
    cartSideBar.style.transform = "translate(100%)"
    const bodyOverlay = document.querySelector(".overlay")
    document.querySelector("body").removeChild(bodyOverlay)
})

burger.addEventListener("click",function(){
    menuSidebar.style.transform = "translate(0%)"
})

closeMenu.addEventListener("click",function(){
    menuSidebar.style.transform = "translate(-100%)"
})

class Product{
    async getProduct(){
        const response = await fetch("products.json");
        const data = await response.json;
        let products = data.items;
        products = products.map(item=>{
            const{title,price} = item.fields;
            const{id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title,price,id,image};
        })
        return products;
    }
}

class UI{
    displayProducts(products){
        let result = "";
        products.forEach(products=>{
            const productDiv = document.createElement("div")
            productDiv.innerHTML =`<div class="product-card">
            <img src="${product.image}"alt="product">
            <span class= "add-to-cart" data-id="${product.id}">
            <i class= "fa fa-cart--plus fa-1x"
            <style ="margin-right:0.1em; font-size: 1em;"></i>
            Add to Cart
            </span>
            <div class="product-name">${product.title}</div>
            <div class="product-pricing">${product.price}</div>
            </div>`
        const p = document.querySelector(".product")
        p.append(productDiv)
        })
    }
}

getButtons();{
    const btns = document.querySelectorAll(".add-to-cart")
    Array.from(btns)
    buttonsDOM = btns;
    btns.forEach((btn=>{
        let id = btn.dataset.id
        let inCart = Cart.find((item)=>item.id===id);
        if(inCart)
        {
            btn.innerHTML = "In Cart"
            btn.disabled = true
        }
        btn.addEventListener("click",(e)=>{
            e.currentTarget.innerHTML = "In Cart"
            e.currentTarget.style.color = "white"
            e.currentTarget.style.pointerEvents = "none"
            let cartItem = {...Storage.getStorageProducts(id),'amount':1}
            Cart.push(cartItem)
            Storage.saveCart(Cart)
            this.setCartValues(Cart)
            this.addCartItem(CartItem)
        })
}))
setCartValues(cart);{
    let tempTotal = 0;
    letitemsTotal = 0;
    Cart.map((item)=>{
        tempTotal += (item.price*item.amount);
        itemTotal += item.amount;
        parseFloat(tempTotal.toFixed(2))
    })
    cartItemsTotal.innerHTML = itemsTotal
    cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2))
}
addCartItem(cartItem);{
    let cartItemUi = document.createElement("div")
    cartItemUi.innerHTML = `<div class= "cart-product">
                            <div class = "product-image">
                              <img src = "${cartItem.image} alt="product">
                              </div>
                              <div class="cart-product-content">
                              <div class ="cart-product-name"><h3>${cartItem.title}</h3></div>
                              <div
                              class= "cart-product-price"><h3>${cartItem.price}</h3></div>
                              <div class= "cart-product-remove-data-id="${cartItem.id}"
                              href = "#" style="color:red;">remove</a></div>
                              </div>
                              <div class = "plus-minus">
                              <i class = "fa fa-angle-left add-amount"
                              data-id="${cartItem.id}"></i>
                              <span class="no-of-items">${cartItem.amount}</span>
                              data-id="${cartItem.id}"</i>
                              </div>
                              </div>`
                              cartContent.append(cartItemUi)
             }
            setupApp();{
                Cart = Stoarge.getCart()
                this.setCartValues(Cart)
                Cart.map((item)=>{
                    this.addCartItem(item)
                })
            }
            cartLogic();{
                clearBtn.addEventListener("click",()=>{
                    this.closeCart()
                })
                cartConetnt.addEventListener("click",(event)=>{
                    if(event.target.classList.contains("cart-product-remove")){
                        let id = event.target.dataset.id
                        this.removeItem(id)
                        let div = event.target.parentElement.parentElement.parentElement.parentElement
                        div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
                    }
                    else if(event.target.classList.contains("add-amount")){
                        let id = event.dataset.id
                        let item = Cart.find((item)=>item.id===id)
                        item.amount++
                        Storage.saveCart(cart)
                        this.setCartValues(Cart)
                        event.target.nextElementSibling.innerHTML = item.amount
                    }
                    else if(event.target.classList.contains("reduce-amount")){
                        let id = event.target.dataset.id
                        let item = Cart.find((item)=>item.id===id)
                        if(item.amount>1){
                            item.amount--
                            Storage.saveCart(Cart)
                            this.setCartValues(Cart)
                            event.target.previousElementSibling.innerHTML = item.amount
                        }
                        else{
                            this.removeItem(id)
                            let div = event.target.parentElement.parentElement.parentElement.parentElement
                            div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
                        }
                    }
                }
            )}
}

addAmount();{
    const addBtn = document.querySelectorAll(".add-amount")
    addBtn.forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            let id = (event.currentTarget.dataset.id)
            Cart.map((item)=>{
                if(item.id===id){
                item.amount++
                Storage.saveCart(Cart)
                this.setCartValues(Cart)
                const amountUi = event.currentTarget.parentElement.children[1]
                amountUi.innerHTML = item.amount
                }
            })
        })
    })
    reduceAmount();{
        const reduceBtn = document.querySelectorAll(".reduce-amount")
        reduceBtn.forEach((btn)=>{
            btn.addEventListener("click",(event)=>{
                let id = (event.currentTarget.dataset.id)
                Cart.map((item)=>{
                    if(item.id===id){
                        item.amount--
                        if(item.amount>0){
                            Storage.saveCart(Cart)
                            this.setCartValues(Cart)
                            const amountUi = event.currentTarget.parentElement.children[1]
                            amountUi.innerHTML = item.amount
                        }
                        else{
                            event.target.parentElement.parentElement.parentElement.removeChild(event.currentTarget.parentElement.parentElement)
                            this.removeItem(id)
                        }
                    }
                })
            })
        })
        clearCart();{
            let cartItem = Cart.map(item=>item.id)
            cartItem.forEach((id)=>this.removeItem(id))
            const cartProduct = document.querySelectorAll(".cart-product")
            cartProduct.forEach((item)=>{
                if(item){
                    item.parentElement.removeChild(item)
                }
            })
        }
        removeItem(id);{
            Cart = Cart.filter((item)=>item.id!==id)
            this.setCartValues(Cart)
            Storage.saveCart(Cart)
            let button = this.getSingleButton(id)
            button.style.pointerEvents = "unset"
            button.innerHTML = `<i class= "fa fa-cart-plus"></i>Add to Cart`
        }
        getSingleButton(id);{
            let btn
            buttonsDOM.forEach((button)=>{
                if(button.dataset.id===id){
                    btn = button
                }
            })
            return btn
        }
    }
}

class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getStorageProducts(id){
        let products = JSON.parse(localStorage.getItem(`products`))
        return products.find((item)=>item.id===id)
    }
    static saveCart(Cart){
        localStorage.setItem(`Cart`,JSON.stringify(Cart))
    }
    static getCart(){
        return localStorage.getItem(`Cart`)? JSON.parse(localStorage.getItem("Cart")):[]
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const products = new Product();
    const ui = new UI();
    ui.setupApp()
    products.getProduct().then(products=>{
        Ui.displayProducts(products)
        Storage.saveProducts(products)
    }).then(()=>{
        ui.getButtons();
        ui.cartLogic();
    })
})