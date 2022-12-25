import * as dataObj from '../../db.json';
import Card from '../interfaces/card';
import { Goods, Productions, Categories, Connections, Colors, Years, Stock, Cart, Filter } from './index';
import { ClearButton, ResetButton, ScrollToTopButton } from './buttons/index';

class Loader {
    products: Goods;
    productions: Productions;
    categories: Categories;
    colors: Colors;
    connections: Connections;
    years: Years;
    stock: Stock;
    cart: Cart;
    filter: Filter;
    resetBtn: ResetButton;
    clearBtn: ClearButton;
    scrollBtn: ScrollToTopButton;

    constructor() {
        this.products = new Goods();
        this.productions = new Productions();
        this.categories = new Categories();
        this.colors = new Colors();
        this.connections = new Connections();
        this.years = new Years();
        this.stock = new Stock();
        this.cart = new Cart();
        this.filter = new Filter();
        this.resetBtn = new ResetButton();
        this.clearBtn = new ClearButton();
        this.scrollBtn = new ScrollToTopButton();
    }

    public async load(): Promise<void> {
        const values: Card<number>[] = await dataObj.goods;
        await this.products.renderCards(values);
        await this.productions.renderProduction();
        await this.colors.renderColors();
        await this.connections.renderConnectType();
        await this.categories.renderCatalog();

        this.cart.addRemoveGoodToCart();
        await this.years.createInputYears();
        await this.stock.createInputStock();

        this.filter.selectInput();
        await this.filter.isSale();
        await this.filter.inputPrice();
        this.filter.search();

        this.resetBtn.resetFiltres();
        this.clearBtn.clearStorage();
        this.scrollBtn.createTopBtn();
    }
}

export default Loader;
