import './css/styles.css';
import { fetchCountries } from "./scripts/fetchCountries.js"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 500;

const inputRef = document.querySelector("#search-box");
const ulRef = document.querySelector(".country-list");
const divRef = document.querySelector(".country-info");

inputRef.addEventListener("input", debounce(eventInput, DEBOUNCE_DELAY));

function eventInput(event) {
    if (!event.target.value=="") {
        fetchCountries(event.target.value.trim())
        .then(renderCard)
        .catch((err) => {
            Notify.failure('Oops, there is no country with that name')
        });
    };
}

function renderCard(data) {
    if (data.length === 1) {
        divCard(data);
    };
    if (data.length < 10 && data.length >= 2) {
        ulListCard(data);
    };
    if (data.length >= 10) {
        moreTenCard();
    };
    
}

function divCard(data) {
    console.log("1");
};

function ulListCard(data) {
    console.log(data);
};

function moreTenCard() {
    Notify.info("Too many matches found. Please enter a more specific name.")
};



