const scroller = document.getElementById("scroller");
const scroller2 = document.getElementById("scroller2");
const scrollerd = document.getElementById("scrollerd");
const scrollerd2 = document.getElementById("scrollerd2");
var txt = "";
var page = 1;
var limit = 15;
var txt2 = "";
var page2 = 1;
var limit2 = 15;
var isLoading = false;
var isLoading2 = false;
var load = document.getElementById('load');
var load2 = document.getElementById('load2');

window.localStorage.clear();



function getInfos() {
    return fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${limit}`)
        .then(async (res) => {
            let data = await res.json();
            console.log(data);
            localStorage.setItem(`${page}`, JSON.stringify(data)); 
            localStorage.setItem(`max-page`, page); 
            return data;
        });
}


function getInfosDrink() {
    return fetch(`https://api.punkapi.com/v2/beers?page=${page2}&per_page=${limit2}`)
        .then(async (res2) => {
            let data2 = await res2.json();
            console.log(data2);
            localStorage.setItem(`${page2}`, JSON.stringify(data2)); // stocke les données dans localStorage avec la clé `passengerData${page}`
            localStorage.setItem(`max-page-drink`, page2); // stocke le numéro de page dans localStorage avec la clé `passengerPage`
            return data2;
        });
}

function appInfos() {
    
    const storedPage = localStorage.getItem(`max-page`); // récupère le numéro de page stocké dans localStorage
    if (storedPage) {
        page = parseInt(storedPage) + 1;
    }
    load.hidden=false;
    getInfos().then((dat) => {
        console.log(dat);

        for (let i = 0; i < dat.data.length; i++) {
            txt += "<div class='flight'><p> ✈️ " + dat.data[i].airline[0].name + " - " + dat.data[i].airline[0].country + "</p><p> 😀 " + dat.data[i].name + "</p></div>";
        }
        load.hidden=true;
        scroller.innerHTML = txt;
        txt = scroller.innerHTML;
    });
}

function appInfosDrink() {
    console.log(page2,limit2);
    const storedPage2 = localStorage.getItem(`max-page-drink`); // récupère le numéro de page stocké dans localStorage
    if (storedPage2) {
        page2 = parseInt(storedPage2) + 1;
    }
    console.log(page2,limit2);
    load2.hidden=false;
    getInfosDrink().then((dat2) => {
        console.log(dat2);

        for (let i = 0; i < dat2.length; i++) {
            txt2 += "<div class='drink' data-id='"+dat2[i].id+"'><h2 data-id='"+dat2[i].id+"'> " + dat2[i].name + "</h2><p class='desc' data-id='"+dat2[i].id+"'>" + dat2[i].description + "</p></div>";
        }
        load2.hidden=true;
        scrollerd.innerHTML = txt2;
        txt2 = scrollerd.innerHTML;
    });
}




appInfosDrink();

appInfos();
scroller2.addEventListener("scroll", handleScroll);


function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = scroller2;
    if ((clientHeight + scrollTop) >= scrollHeight*0.99 && !isLoading) {
        isLoading = true;
        load.hidden=false;
        page++;
        const storedData = localStorage.getItem(`${page}`); // récupère les données stockées pour la page courante
        if (storedData) {
            const dat = JSON.parse(storedData);
            for (let i = 0; i < dat.data.length; i++) {
                txt += "<div class='flight'><p> ✈️ " + dat.data[i].airline[0].name + " - " + dat.data[i].airline[0].country + "</p><p> 😀 " + dat.data[i].name + "</p></div>";
            }
            load.hidden=true;
            scroller.innerHTML = txt;
            txt = scroller.innerHTML;
            isLoading = false;
            if ((clientHeight + scrollTop) >= scrollHeight*0.99) {
                handleScroll();
            }
        } else {
            getInfos().then((dat) => {
                console.log(dat);
    
                for (let i = 0; i < dat.data.length; i++) {
                    txt += "<div class='flight'><p> ✈️ " + dat.data[i].airline[0].name + " - " + dat.data[i].airline[0].country + "</p><p> 😀 " + dat.data[i].name + "</p></div>";
                }
                load.hidden=true;
                scroller.innerHTML = txt;
                txt = scroller.innerHTML;
                isLoading = false;
                if ((clientHeight + scrollTop) >= scrollHeight*0.99) {
                    handleScroll();
                }
            });
        }
    }
}

scrollerd2.addEventListener("scroll", handleScrollDrink);

function handleScrollDrink() {
    const { scrollTop, clientHeight, scrollHeight } = scrollerd2;
    
    if ((clientHeight + scrollTop) >= scrollHeight*0.99 && !isLoading2) {
        
        isLoading2 = true;
        load2.hidden=false;
        page2++;
        const storedData2 = localStorage.getItem(`${page2}`); // récupère les données stockées pour la page courante
        if (storedData2) {
            const dat2 = JSON.parse(storedData2);
            for (let i = 0; i < dat2.length; i++) {
                txt2 += "<div class='drink' data-id='"+dat2[i].id+"'><h2 data-id='"+dat2[i].id+"'> " + dat2[i].name + "</h2><p class='desc' data-id='"+dat2[i].id+"'>" + dat2[i].description + "</p></div>";
            }
            load2.hidden=true;
            scrollerd.innerHTML = txt2;
            txt2 = scrollerd.innerHTML;
            isLoading2 = false;
            if ((clientHeight + scrollTop) >= scrollHeight*0.99) {
                handleScrollDrink();
            }
        } else {
            getInfosDrink().then((dat2) => {
                console.log(dat2);
    
                for (let i = 0; i < dat2.length; i++) {
                    txt2 += "<div class='drink' data-id='"+dat2[i].id+"'><h2 data-id='"+dat2[i].id+"'> " + dat2[i].name + "</h2><p class='desc' data-id='"+dat2[i].id+"'>" + dat2[i].description + "</p></div>";
                }
                load2.hidden=true;
                scrollerd.innerHTML = txt2;
                txt2 = scrollerd.innerHTML;
                isLoading2 = false;
                if ((clientHeight + scrollTop) >= scrollHeight*0.99) {
                    handleScrollDrink();
                }
            });
        }
    }
}


const details2 = document.getElementById('details2');

async function fetchDrinkDetails(drinkId) {
  const response = await fetch(`https://api.punkapi.com/v2/beers/${drinkId}`);
  const data = await response.json();
  return data;
}



scrollerd2.addEventListener('click', async (event) => {
    console.log(event.target.dataset.id);
    const drinkId = event.target.dataset.id;
    const drinkDetails = await fetchDrinkDetails(drinkId);
    console.log(drinkDetails)
    details2.style.opacity = 0;

    setTimeout(function(){ 
        details2.innerHTML = `<img src="${drinkDetails[0].image_url}" alt="${drinkDetails.name}"><h2>${drinkDetails[0].name}</h2><p>${drinkDetails[0].description}</p>`;
        details2.style.opacity = 1;
    },500);
  
    // Afficher les informations de la boisson dans la div "details"
    
    event.target.parentNode.style.opacity = 1;
});