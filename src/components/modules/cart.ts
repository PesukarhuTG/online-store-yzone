class Cart {
    disabled: boolean;

    constructor() {
        this.disabled = false;
    }

    public getTotalSum(arr: Array<number>): number | string {
        if (!arr.length) return 0;

        const sum = arr.reduce((a: number, b: number) => a + b);
        if (sum < 1000) return 'Сумма заказа должна быть больше 1000 руб.';
        if (sum > 500000) return 'Сумма заказа превышает 500000 руб.';
        return sum;
    }

    public addRemoveGoodToCart(): void {
        const cards = document.querySelectorAll('.goods .card') as NodeListOf<HTMLDivElement>;
        const counter = document.querySelector('.cart-counter') as HTMLSpanElement;
        const modal = document.querySelector('.modal') as HTMLDivElement;
        const modalClose = document.querySelector('.modal__close') as HTMLDivElement;
        let count = 0;
        let choosedGoods = [] as string[];
        let dataLS: string;

        //получение из Local Storage
        if (localStorage.getItem('y-goods')) {
            dataLS = localStorage.getItem('y-goods') as string;
            choosedGoods = JSON.parse(dataLS);
            count = +choosedGoods.length;
            counter.textContent = `${count}`;
        } else {
            choosedGoods = [];
        }

        cards.forEach((card) => {
            const btn = card.querySelector('.card__btn') as HTMLButtonElement;
            btn.addEventListener('click', () => {
                if (count > 19 && !card.classList.contains('incart')) {
                    modal.classList.add('active');
                    this.disabledScroll();
                } else {
                    if (card.classList.contains('incart')) {
                        card.classList.remove('incart');
                        count--;
                        counter.textContent = `${count}`;
                        btn.textContent = 'В корзину';
                        const id = card.dataset.id as string;
                        const elemIdx = choosedGoods.indexOf(id);
                        choosedGoods.splice(elemIdx, 1);
                        localStorage.setItem('y-goods', JSON.stringify(choosedGoods));
                    } else {
                        card.classList.add('incart');
                        count++;
                        counter.textContent = `${count}`;
                        btn.textContent = 'Удалить из корзины';
                        const id = card.dataset.id as string;
                        choosedGoods.push(id);
                        localStorage.setItem('y-goods', JSON.stringify(choosedGoods));
                    }
                }
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            this.enabledScroll();
        });
    }

    private disabledScroll(): void {
        if (this.disabled) return;

        const widthScroll = (window.innerWidth - document.body.offsetWidth) as number;

        this.disabled = true;

        document.body.style.cssText = `
                  overflow: hidden;
                  padding-right: ${widthScroll}px;
              `;
    }

    private enabledScroll(): void {
        this.disabled = false;
        document.body.style.cssText = '';
    }
}

export default Cart;
