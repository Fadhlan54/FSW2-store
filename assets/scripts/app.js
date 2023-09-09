class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>Rp.${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Tambah ke Keranjang</button>
                </div>
            </div>
        `;

        const addToCartButton = prodEl.querySelector('button');
        addToCartButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
}

class ShoppingCart {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: Rp. ${this.totalAmount}</h2>`
    }

    get totalAmount() {
        const sum = this.items.reduce((prevVal, curItem) => {
            return prevVal + curItem.price
        }, 0)
        return sum;
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>Total: Rp. ${0}</h2>
            <button>Pesan Sekarang</button>
        `;
        cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2')
        return cartEl;
    }
}

class ProductList {
    products = [
        new Product(
            'bantal',
            'https://contents.mediadecathlon.com/p1749048/k$f0b275c3207e208e12771a5c385d3ff8/camping-pillow-comfort.jpg?format=auto&quality=70&f=768x768',
            10000,
            'Bantal ini lembut'
        ),
        new Product(
            'karpet',
            'https://cdn2.tstatic.net/travel/foto/bank/images/ilustrasi-karpet-terbang-aladdin.jpg',
            80000,
            'Karpet terbang'
        )
    ]

    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}

class FSW2Shop {
    render() {
        const renderHook = document.getElementById('app');

        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();

        const productList = new ProductList();
        const prodListEl = productList.render();

        renderHook.append(cartEl);
        renderHook.append(prodListEl);
    }
}

class App {
    static init() {
        const shop = new FSW2Shop();
        shop.render();
        this.cart = shop.cart;
    }
    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();