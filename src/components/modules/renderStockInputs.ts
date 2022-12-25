import Filter from './filters';

class Stock {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public createInputStock(): void {
        const stockFrom = document.getElementById('stock-slider-1') as HTMLInputElement;
        const stockTo = document.getElementById('stock-slider-2') as HTMLInputElement;
        const displayStockFrom = document.getElementById('stock-range1') as HTMLSpanElement;
        const displayStockTo = document.getElementById('stock-range2') as HTMLSpanElement;
        const amountBetween = 0;
        const stockTrack = document.querySelector('.slider-stock-track') as HTMLDivElement;
        const stockMinValue = stockFrom.min;
        const stockMaxValue = stockFrom.max;

        const updateDataFrom = () => {
            displayStockFrom.textContent = `${stockFrom.value}`;
            fillColor();
            this.filter.filter();
        };

        const updateDataTo = () => {
            displayStockTo.textContent = `${stockTo.value}`;
            fillColor();
            this.filter.filter();
        };

        if (localStorage.getItem('y-stockMin')) {
            const minValFromLS = localStorage.getItem('y-stockMin') as string;
            stockFrom.value = JSON.parse(minValFromLS);
            updateDataFrom();
        } else {
            stockFrom.value = `${stockMinValue}`;
            updateDataFrom();
        }

        if (localStorage.getItem('y-stockMax')) {
            const maxValFromLS = localStorage.getItem('y-stockMax') as string;
            stockTo.value = JSON.parse(maxValFromLS);
            updateDataTo();
        } else {
            stockTo.value = `${stockMaxValue}`;
            updateDataTo();
        }

        stockFrom.addEventListener('input', () => {
            if (parseInt(stockTo.value) - parseInt(stockFrom.value) <= amountBetween) {
                stockTo.value = `${parseInt(stockTo.value) - amountBetween}`;
            }
            displayStockFrom.textContent = stockFrom.value;
            localStorage.setItem('y-stockMin', stockFrom.value);
            fillColor();
        });

        stockTo.addEventListener('input', () => {
            if (parseInt(stockTo.value) - parseInt(stockFrom.value) <= amountBetween) {
                stockTo.value = `${parseInt(stockFrom.value) + amountBetween}`;
            }
            displayStockTo.textContent = stockTo.value;
            localStorage.setItem('y-stockMax', stockTo.value);
            fillColor();
        });

        stockFrom.addEventListener('change', this.filter.filter);
        stockTo.addEventListener('change', this.filter.filter);

        function fillColor() {
            const percent1 = ((+stockFrom.value - +stockMinValue) / (+stockMaxValue - +stockMinValue)) * 100;
            const percent2 = ((+stockTo.value - +stockMinValue) / (+stockMaxValue - +stockMinValue)) * 100;
            stockTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
        }
    }
}

export default Stock;
