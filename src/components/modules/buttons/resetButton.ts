import Filter from '../filters';

class ResetButton {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public resetFiltres() {
        const resetBtn = document.getElementById('btn-reset') as HTMLButtonElement;
        const checkboxInputs = document.querySelectorAll('[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        const priceInputs = document.querySelectorAll('.filter-price__input') as NodeListOf<HTMLInputElement>;
        const categories = document.querySelectorAll('.catalog-list__item') as NodeListOf<HTMLLIElement>;
        const minRangeInputs = document.querySelectorAll('#slider-1, #stock-slider-1') as NodeListOf<HTMLInputElement>;
        const maxRangeInputs = document.querySelectorAll('#slider-2, #stock-slider-2') as NodeListOf<HTMLInputElement>;
        const rangeTracks = document.querySelectorAll(
            '.slider-track, .slider-stock-track'
        ) as NodeListOf<HTMLDivElement>;
        const displayRangeElements = document.querySelectorAll(
            '#range1, #range1, #stock-range1, #stock-range2'
        ) as NodeListOf<HTMLSpanElement>;

        resetBtn.addEventListener('click', () => {
            checkboxInputs.forEach((input) => {
                input.checked = false;
                localStorage.setItem('y-sale', JSON.stringify(input.checked));
            });

            priceInputs.forEach((input) => {
                input.value = '';
                localStorage.setItem('y-priceMin', '');
                localStorage.setItem('y-priceMax', '');
            });

            minRangeInputs.forEach((input) => {
                input.value = input.min;
                localStorage.setItem('y-yearMin', '');
                localStorage.setItem('y-stockMin', '');
            });

            maxRangeInputs.forEach((input) => {
                input.value = input.max;
                localStorage.setItem('y-yearMax', '');
                localStorage.setItem('y-stockMax', '');
            });

            rangeTracks.forEach((elem) => {
                elem.style.background = '#005bff';
            });

            displayRangeElements.forEach((elem) => {
                elem.textContent = `${elem.dataset.reset}`;
            });

            categories.forEach((elem) => {
                elem.classList.remove('active');
                localStorage.setItem('y-catalog', '');
            });

            this.filter.filter();
        });
    }
}

export default ResetButton;
