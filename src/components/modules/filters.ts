import * as dataObj from '../../db.json';
import Goods from './renderCards';
import Card from '../interfaces/card';

class Filter {
    products: Goods;

    constructor() {
        this.products = new Goods();
    }

    //ФИЛЬТР ПО ЧЕКБОКСУ АКЦИИ
    public isSale(): void {
        const saleCheckbox = document.getElementById('discount-checkbox') as HTMLInputElement;

        if (localStorage.getItem('y-sale')) {
            const dataLS = localStorage.getItem('y-sale') as string;
            saleCheckbox.checked = JSON.parse(dataLS);
            this.filter();
        }

        saleCheckbox.addEventListener('change', () => {
            localStorage.setItem('y-sale', JSON.stringify(saleCheckbox.checked));
            this.filter();
        });
    }

    //ФИЛЬТР ПО ЦЕНЕ
    public inputPrice(): void {
        const min = document.getElementById('min') as HTMLInputElement;
        const max = document.getElementById('max') as HTMLInputElement;

        if (localStorage.getItem('y-priceMin')) {
            const dataLS = localStorage.getItem('y-priceMin') as string;

            if (dataLS === null) {
                throw new Error('ooops');
            } else {
                min.value = JSON.parse(dataLS);
                this.filter();
            }
        }

        if (localStorage.getItem('y-priceMax')) {
            const dataLS = localStorage.getItem('y-priceMax') as string;

            if (dataLS === null) {
                throw new Error('ooops');
            } else {
                max.value = JSON.parse(dataLS);
                this.filter();
            }
        }

        min.addEventListener('change', this.filter);
        max.addEventListener('change', this.filter);
    }

    //ФИЛЬТР ПОИСКА
    public search(): void {
        const searchBtn = document.querySelector('.search__btn') as HTMLButtonElement;
        const search = document.querySelector('[type="search"]') as HTMLInputElement;
        searchBtn.addEventListener('click', this.filter);
        search.addEventListener('search', this.filter);
    }

    //ФИЛЬТР ДЛЯ СЕЛЕКТА
    public selectInput(): void {
        const selectInput = document.getElementById('select') as HTMLSelectElement;
        const selectOptions = document.querySelectorAll('.select-option') as NodeListOf<HTMLOptionElement>;

        const checkData = () => {
            if (selectInput.value === '0') {
                localStorage.setItem('y-select', selectInput.value);
                const values: Card<number>[] = dataObj.goods;
                this.products.renderCards(values);
                this.filter();
            }

            if (selectInput.value === '1') {
                localStorage.setItem('y-select', selectInput.value);
                this.sortAscWord();
            }

            if (selectInput.value === '2') {
                localStorage.setItem('y-select', selectInput.value);
                this.sortDescWord();
            }

            if (selectInput.value === '3') {
                localStorage.setItem('y-select', selectInput.value);
                this.sortAsc();
            }

            if (selectInput.value === '4') {
                localStorage.setItem('y-select', selectInput.value);
                this.sortDesc();
            }
        };

        if (localStorage.getItem('y-select')) {
            const dataLS = localStorage.getItem('y-select') as string | null;

            if (dataLS === null) {
                throw new Error('ooops');
            } else {
                selectInput.value = dataLS;
                selectOptions[+dataLS].setAttribute('selected', 'selected');

                checkData();
            }
        }

        selectInput.addEventListener('change', checkData);
    }

    private sortAsc(): void {
        const wrapper = document.querySelector('.goods') as HTMLDivElement;
        const cards = wrapper.children as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i; j < cards.length; j++) {
                const leftelem = cards[i].dataset.price as string;
                const righttelem = cards[j].dataset.price as string;

                if (+leftelem > +righttelem) {
                    insertAfter(wrapper.replaceChild(cards[j], cards[i]) as HTMLElement, cards[i]);
                }
            }
        }

        function insertAfter(elem: HTMLElement, refElem: HTMLElement) {
            return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
        }
    }

    private sortDesc(): void {
        const wrapper = document.querySelector('.goods') as HTMLDivElement;
        const cards = wrapper.children as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i; j < cards.length; j++) {
                const leftelem = cards[i].dataset.price as string;
                const righttelem = cards[j].dataset.price as string;

                if (+leftelem < +righttelem) {
                    insertAfter(wrapper.replaceChild(cards[j], cards[i]) as HTMLElement, cards[i]);
                }
            }
        }

        function insertAfter(elem: HTMLElement, refElem: HTMLElement) {
            return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
        }
    }

    private sortAscWord(): void {
        const wrapper = document.querySelector('.goods') as HTMLDivElement;
        const cards = wrapper.children as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i; j < cards.length; j++) {
                const leftelem = cards[i].dataset.name as string;
                const righttelem = cards[j].dataset.name as string;

                if (leftelem > righttelem) {
                    insertAfter(wrapper.replaceChild(cards[j], cards[i]) as HTMLElement, cards[i]);
                }
            }
        }

        function insertAfter(elem: HTMLElement, refElem: HTMLElement) {
            return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
        }
    }

    private sortDescWord(): void {
        const wrapper = document.querySelector('.goods') as HTMLDivElement;
        const cards = wrapper.children as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i; j < cards.length; j++) {
                const leftelem = cards[i].dataset.name as string;
                const righttelem = cards[j].dataset.name as string;

                if (leftelem < righttelem) {
                    insertAfter(wrapper.replaceChild(cards[j], cards[i]) as HTMLElement, cards[i]);
                }
            }
        }

        function insertAfter(elem: HTMLElement, refElem: HTMLElement) {
            return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
        }
    }

    //ОБЩИЙ ФИЛЬТР ДЛЯ ОБЪЕДИНЕНИЯ
    public filter(): void {
        const cards = document.querySelectorAll('.goods .card') as NodeListOf<HTMLDivElement> | null;
        const saleCheckbox = document.getElementById('discount-checkbox') as HTMLInputElement;
        const min = document.getElementById('min') as HTMLInputElement;
        const max = document.getElementById('max') as HTMLInputElement;
        const searchInput = document.querySelector('.search__input') as HTMLInputElement;
        const searchText = new RegExp(searchInput.value.trim(), 'i');
        const activeLi = document.querySelector('.catalog-list li.active') as HTMLLIElement;
        const searchInfo = document.querySelector('.info') as HTMLParagraphElement;
        const minYear = document.getElementById('slider-1') as HTMLInputElement;
        const maxYear = document.getElementById('slider-2') as HTMLInputElement;
        const minStock = document.getElementById('stock-slider-1') as HTMLInputElement;
        const maxStock = document.getElementById('stock-slider-2') as HTMLInputElement;

        if (min.value) localStorage.setItem('y-priceMin', min.value);
        if (max.value) localStorage.setItem('y-priceMax', max.value);

        const prodInputs = document.querySelectorAll('.input-item') as NodeListOf<HTMLInputElement>;
        const currentCheckedInput = [] as Array<string>;
        prodInputs.forEach((elem) => {
            if (elem.checked) {
                currentCheckedInput.push(elem.value);
            }
        });
        localStorage.setItem('y-prod', JSON.stringify(currentCheckedInput));

        const colorInputs = document.querySelectorAll('.input-color-item') as NodeListOf<HTMLInputElement>;
        const currentColorCheckedInput = [] as Array<string>;
        colorInputs.forEach((elem) => {
            if (elem.checked) {
                currentColorCheckedInput.push(elem.value);
            }
        });
        localStorage.setItem('y-color', JSON.stringify(currentColorCheckedInput));

        const connectInputs = document.querySelectorAll('.connect-input-item') as NodeListOf<HTMLInputElement>;
        const currentConnectCheckedInput = [] as Array<string>;
        connectInputs.forEach((elem) => {
            if (elem.checked) {
                currentConnectCheckedInput.push(elem.value);
            }
        });
        localStorage.setItem('y-connect', JSON.stringify(currentConnectCheckedInput));

        if (cards === null) {
            throw new Error('данные карточек не получены');
        } else {
            cards.forEach((card) => {
                const cardPrice = card.querySelector('.card__price') as HTMLSpanElement; //получаем цену из карточки
                const price = parseFloat(`${cardPrice.textContent}`) as number; //отделяем от рубля
                const discount = card.querySelector('.card__sale') as HTMLDivElement; //маячок Акция
                const title = card.querySelector('.card__title') as HTMLHeadingElement; //наименование товара для поиска
                const year = parseFloat(`${card.dataset.year}`) as number;
                const amount = parseFloat(`${card.dataset.stock}`) as number;

                card.style.display = ''; //показываем все карточки
                searchInfo.textContent = '';

                if (
                    (+min.value && +max.value && price < +min.value && price > +max.value) ||
                    (+min.value && price < +min.value) ||
                    (+max.value && price > +max.value)
                ) {
                    card.style.display = 'none';
                } else if (saleCheckbox.checked && !discount) {
                    card.style.display = 'none';
                } else if (currentCheckedInput.length === 1 && card.dataset.production !== currentCheckedInput[0]) {
                    card.style.display = 'none';
                } else if (
                    currentCheckedInput.length === 2 &&
                    card.dataset.production !== currentCheckedInput[0] &&
                    card.dataset.production !== currentCheckedInput[1]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentCheckedInput.length === 3 &&
                    card.dataset.production !== currentCheckedInput[0] &&
                    card.dataset.production !== currentCheckedInput[1] &&
                    card.dataset.production !== currentCheckedInput[2]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentCheckedInput.length === 4 &&
                    card.dataset.production !== currentCheckedInput[0] &&
                    card.dataset.production !== currentCheckedInput[1] &&
                    card.dataset.production !== currentCheckedInput[2] &&
                    card.dataset.production !== currentCheckedInput[3]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentColorCheckedInput.length === 1 &&
                    card.dataset.color !== currentColorCheckedInput[0]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentColorCheckedInput.length === 2 &&
                    card.dataset.color !== currentColorCheckedInput[0] &&
                    card.dataset.color !== currentColorCheckedInput[1]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentColorCheckedInput.length === 3 &&
                    card.dataset.color !== currentColorCheckedInput[0] &&
                    card.dataset.color !== currentColorCheckedInput[1] &&
                    card.dataset.color !== currentColorCheckedInput[2]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentColorCheckedInput.length === 4 &&
                    card.dataset.color !== currentColorCheckedInput[0] &&
                    card.dataset.color !== currentColorCheckedInput[1] &&
                    card.dataset.color !== currentColorCheckedInput[2] &&
                    card.dataset.color !== currentColorCheckedInput[3]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentConnectCheckedInput.length === 1 &&
                    card.dataset.connection !== currentConnectCheckedInput[0]
                ) {
                    card.style.display = 'none';
                } else if (
                    currentConnectCheckedInput.length === 2 &&
                    card.dataset.connection !== currentConnectCheckedInput[0] &&
                    card.dataset.connection !== currentConnectCheckedInput[1]
                ) {
                    card.style.display = 'none';
                } else if (!searchText.test(`${title.textContent}`)) {
                    card.style.display = 'none';
                    searchInfo.innerHTML = `Товары по вашему запросу <span style="font-style: italic; font-weight:700;">${searchInput.value}</span>:`;
                } else if (
                    activeLi &&
                    card.dataset.category !== activeLi.textContent &&
                    activeLi.textContent !== 'Все товары'
                ) {
                    card.style.display = 'none';
                } else if (year < +minYear.value || year > +maxYear.value) {
                    card.style.display = 'none';
                } else if (amount < +minStock.value || amount > +maxStock.value) {
                    card.style.display = 'none';
                }
            });

            //если хотя бы одна карточка без display none, то поиск удался, иначе товары не найдены
            const entryPoint = Array.from(cards).find((item) => item.style.display !== 'none');
            if (!entryPoint) {
                searchInfo.innerHTML = `Товары по вашему запросу <span style="font-style: italic; font-weight:700;">${searchInput.value}</span> не найдены`;
            }
        }
    }
}

export default Filter;
