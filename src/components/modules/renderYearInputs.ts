import Filter from './filters';

class Years {
    filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public createInputYears(): void {
        const yearFrom = document.getElementById('slider-1') as HTMLInputElement;
        const yearTo = document.getElementById('slider-2') as HTMLInputElement;
        const displayYearFrom = document.getElementById('range1') as HTMLSpanElement;
        const displayYearTo = document.getElementById('range2') as HTMLSpanElement;
        const yearBetween = 0;
        const sliderTrack = document.querySelector('.slider-track') as HTMLDivElement;
        const sliderMinValue = yearFrom.min;
        const sliderMaxValue = yearFrom.max;

        const updateDataFrom = () => {
            displayYearFrom.textContent = `${yearFrom.value}`;
            fillColor();
            this.filter.filter();
        };

        const updateDataTo = () => {
            displayYearTo.textContent = `${yearTo.value}`;
            fillColor();
            this.filter.filter();
        };

        if (localStorage.getItem('y-yearMin')) {
            const minValFromLS = localStorage.getItem('y-yearMin') as string;
            yearFrom.value = JSON.parse(minValFromLS);
            updateDataFrom();
        } else {
            yearFrom.value = `${sliderMinValue}`;
            updateDataFrom();
        }

        if (localStorage.getItem('y-yearMax')) {
            const maxValFromLS = localStorage.getItem('y-yearMax') as string;
            yearTo.value = JSON.parse(maxValFromLS);
            updateDataTo();
        } else {
            yearTo.value = `${sliderMaxValue}`;
            updateDataTo();
        }

        //ограничение на перемещение левого бегунка + дизайн
        yearFrom.addEventListener('input', () => {
            if (parseInt(yearTo.value) - parseInt(yearFrom.value) <= yearBetween) {
                yearTo.value = `${parseInt(yearTo.value) - yearBetween}`;
            }
            displayYearFrom.textContent = yearFrom.value;
            localStorage.setItem('y-yearMin', yearFrom.value);
            fillColor();
        });

        //ограничение на перемещение правого бегунка + дизайн
        yearTo.addEventListener('input', () => {
            if (parseInt(yearTo.value) - parseInt(yearFrom.value) <= yearBetween) {
                yearTo.value = `${parseInt(yearFrom.value) + yearBetween}`;
            }
            displayYearTo.textContent = yearTo.value;
            localStorage.setItem('y-yearMax', yearTo.value);
            fillColor();
        });

        yearFrom.addEventListener('change', this.filter.filter);
        yearTo.addEventListener('change', this.filter.filter);

        function fillColor() {
            const percent1 = ((+yearFrom.value - +sliderMinValue) / (+sliderMaxValue - +sliderMinValue)) * 100;
            const percent2 = ((+yearTo.value - +sliderMinValue) / (+sliderMaxValue - +sliderMinValue)) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
        }
    }
}

export default Years;
