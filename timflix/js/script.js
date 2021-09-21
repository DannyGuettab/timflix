document.addEventListener("DOMContentLoaded", function () {

    var boutonMenu = document.querySelector(".clicmenu");
    var menu = document.querySelector(".menu");

    boutonMenu.addEventListener("click",ouvrirMenu);

    function ouvrirMenu(){
       if(boutonMenu.classList.contains("ouvrir")){
           menu.classList.remove("ferme");
           boutonMenu.classList.remove("ouvrir");
       }else if (boutonMenu.classList.contains("ouvrir") === false){
           menu.classList.add("ferme");
           boutonMenu.classList.add("ouvrir");
       }
    }



    let connexion = new MovieDB();

    if (document.location.pathname.search("fiche-film.html") > 0) {
        let params = (new URL(document.location)).searchParams;

        connexion.requeteInfoFilm(params.get("id"));
        connexion.requeteInfoActeurs(params.get("id"));
    } else {

        connexion.requeteDernierFilm();
        connexion.requetePopulaireFilm();
    }

});


class MovieDB {


    constructor() {
        // console.log("Constructeur");

        this.APIkey = "b481a08175675de22d54692fb3c2c6b7";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3";

        this.imgPath = "https://image.tmdb.org/t/p/"

        this.totalFilm = 9;

        this.filmCarrousel = 9;
    }


    requeteDernierFilm() {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/top_rated?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

        requete.send();
    }

    retourRequeteDernierFilm(e) {
        // console.log("retour dernier film")


        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        //  console.log(data);

        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data) {
        for (let i = 0; i < this.totalFilm; i++) {

            let unArticle = document.querySelector(".template>.film").cloneNode(true);
            unArticle.querySelector("h2").innerHTML = data[i].title;
            //unArticle.querySelector("p.description").innerHTML = data[i].overview || "Aucune description disponible";
            unArticle.querySelector("p.cote").innerHTML = "Note: " + data[i].vote_average + "/10";
            unArticle.querySelector("p.anneesortie").innerHTML = "Sorti le " + data[i].release_date;
            unArticle.querySelector("a").href = "fiche-film.html?id=" + data[i].id;

            let src = this.imgPath + "w185" + data[i].poster_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);


            document.querySelector(".liste-films").appendChild(unArticle);
        }

    }

    requeteInfoFilm(movieId) {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/" + movieId + "?api_key=" + this.APIkey + "&language=" + this.lang);


        requete.send();
    }

    retourRequeteInfoFilm(e) {


        let target = e.currentTarget;
        let data;
        // console.log(target.responseText);

        //console.log(target.responseText);

        data = JSON.parse(target.responseText);


        this.afficheInfoFilm(data);
        //  console.log(data);
    }

    afficheInfoFilm(data) {


        // let unArticle = document.querySelector(".template>.film").cloneNode(true);
        let unArticle = document.querySelector(".fiche-film");
        unArticle.querySelector("h1").innerHTML = data.title;
        unArticle.querySelector("p.annee").innerHTML = data.release_date;
        unArticle.querySelector("p.synopsis").innerHTML = data.overview || "Non disponible.";
        unArticle.querySelector("p.cote").innerHTML = data.vote_average + "/10";
        unArticle.querySelector("p.langue").innerHTML = data.original_language;
        unArticle.querySelector("p.duree").innerHTML = data.runtime;
        unArticle.querySelector("p.budget").innerHTML = data.budget || "Non disponible";
        unArticle.querySelector("p.recette").innerHTML = data.revenue;

        let src = this.imgPath + "w780" + data.poster_path;

        let uneImage = unArticle.querySelector("img");
        uneImage.setAttribute("src", src);
        uneImage.setAttribute("alt", data.title);

    }


    requetePopulaireFilm() {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequetePopulaireFilm.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/popular?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");


        requete.send();
    }

    retourRequetePopulaireFilm(e) {


        let target = e.currentTarget;
        let data;
        //  console.log(target.responseText);

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;


        this.affichePopulaireFilm(data);
        //  console.log(data);
    }

    affichePopulaireFilm(data) {

        for (let i = 0; i < this.filmCarrousel; i++) {

            let unArticle = document.querySelector(".template>.swiper-slide").cloneNode(true);
            unArticle.querySelector("h3").innerHTML = data[i].title;
            unArticle.querySelector("p.cote").innerHTML = data[i].vote_average + " /10";
            unArticle.querySelector("a").href = "fiche-film.html?id=" + data[i].id;

            let src = this.imgPath + "w185" + data[i].poster_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);


            document.querySelector(".swiper-wrapper").appendChild(unArticle);
        }


        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,

            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                375: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }

        });


    }

    requeteInfoActeurs(movieId) {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfoActeurs.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/" + movieId + "/credits?api_key=" + this.APIkey + "&language=" + this.lang);


        requete.send();
    }

    retourRequeteInfoActeurs(e) {


        let target = e.currentTarget;
        let data;
        // console.log(target.responseText);

        //console.log(target.responseText);

        data = JSON.parse(target.responseText);


        this.afficheInfoActeurs(data);
        //  console.log(data);
    }

    afficheInfoActeurs(data) {

        var imageTempo = new Image(185, 278);
        imageTempo.src = "../images/image-tempo.png"
        for (let i = 0; i < data.cast.length; i++) {

            let unArticle = document.querySelector(".template>.swiper-slide").cloneNode(true);
            unArticle.querySelector("h3").innerHTML = data.cast[i].name;
            unArticle.querySelector("p.perso").innerHTML = data.cast[i].character;

            let src = this.imgPath + "w185" + data.cast[i].profile_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data.cast[i].profile_path);

            if (src == "https://image.tmdb.org/t/p/w185null") {
                uneImage.setAttribute("src", imageTempo.src);
            }


            document.querySelector(".swiper-wrapper").appendChild(unArticle);
        }


        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,

            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                375: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }

        });
    }


}















//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBib3V0b25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGljbWVudVwiKTtcclxuICAgIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51XCIpO1xyXG5cclxuICAgIGJvdXRvbk1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsb3V2cmlyTWVudSk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3V2cmlyTWVudSgpe1xyXG4gICAgICAgaWYoYm91dG9uTWVudS5jbGFzc0xpc3QuY29udGFpbnMoXCJvdXZyaXJcIikpe1xyXG4gICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImZlcm1lXCIpO1xyXG4gICAgICAgICAgIGJvdXRvbk1lbnUuY2xhc3NMaXN0LnJlbW92ZShcIm91dnJpclwiKTtcclxuICAgICAgIH1lbHNlIGlmIChib3V0b25NZW51LmNsYXNzTGlzdC5jb250YWlucyhcIm91dnJpclwiKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZChcImZlcm1lXCIpO1xyXG4gICAgICAgICAgIGJvdXRvbk1lbnUuY2xhc3NMaXN0LmFkZChcIm91dnJpclwiKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goXCJmaWNoZS1maWxtLmh0bWxcIikgPiAwKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IChuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKSkuc2VhcmNoUGFyYW1zO1xyXG5cclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZUluZm9GaWxtKHBhcmFtcy5nZXQoXCJpZFwiKSk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvQWN0ZXVycyhwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlUG9wdWxhaXJlRmlsbSgpO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuY2xhc3MgTW92aWVEQiB7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29uc3RydWN0ZXVyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLkFQSWtleSA9IFwiYjQ4MWEwODE3NTY3NWRlMjJkNTQ2OTJmYjNjMmM2YjdcIjtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DQVwiO1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzNcIjtcclxuXHJcbiAgICAgICAgdGhpcy5pbWdQYXRoID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9cIlxyXG5cclxuICAgICAgICB0aGlzLnRvdGFsRmlsbSA9IDk7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsbUNhcnJvdXNlbCA9IDk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpIHtcclxuXHJcblxyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlRGVybmllckZpbG0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vcmVxdWV0ZS5vcGVuKFwiR0VUXCIsXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9YjQ4MWEwODE3NTY3NWRlMjJkNTQ2OTJmYjNjMmM2YjcmbGFuZ3VhZ2U9ZnItQ0EmcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVUkwgKyBcIi9tb3ZpZS90b3BfcmF0ZWQ/YXBpX2tleT1cIiArIHRoaXMuQVBJa2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XHJcblxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91clJlcXVldGVEZXJuaWVyRmlsbShlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXRvdXIgZGVybmllciBmaWxtXCIpXHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG5cclxuICAgICAgICAvLyAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWZmaWNoZURlcm5pZXJGaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVEZXJuaWVyRmlsbShkYXRhKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT4uZmlsbVwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgLy91bkFydGljbGUucXVlcnlTZWxlY3RvcihcInAuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyB8fCBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5jb3RlXCIpLmlubmVySFRNTCA9IFwiTm90ZTogXCIgKyBkYXRhW2ldLnZvdGVfYXZlcmFnZSArIFwiLzEwXCI7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5hbm5lZXNvcnRpZVwiKS5pbm5lckhUTUwgPSBcIlNvcnRpIGxlIFwiICsgZGF0YVtpXS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5ocmVmID0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzE4NVwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUmVxdWV0ZUluZm9GaWxtLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAvL3JlcXVldGUub3BlbihcIkdFVFwiLFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PWI0ODFhMDgxNzU2NzVkZTIyZDU0NjkyZmIzYzJjNmI3Jmxhbmd1YWdlPWZyLUNBJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVVJMICsgXCIvbW92aWUvXCIgKyBtb3ZpZUlkICsgXCI/YXBpX2tleT1cIiArIHRoaXMuQVBJa2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcpO1xyXG5cclxuXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZUluZm9GaWxtKGUpIHtcclxuXHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGE7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlSW5mb0ZpbG0oZGF0YSk7XHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVJbmZvRmlsbShkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAvLyBsZXQgdW5BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT4uZmlsbVwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgbGV0IHVuQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmljaGUtZmlsbVwiKTtcclxuICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgxXCIpLmlubmVySFRNTCA9IGRhdGEudGl0bGU7XHJcbiAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmFubmVlXCIpLmlubmVySFRNTCA9IGRhdGEucmVsZWFzZV9kYXRlO1xyXG4gICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5zeW5vcHNpc1wiKS5pbm5lckhUTUwgPSBkYXRhLm92ZXJ2aWV3IHx8IFwiTm9uIGRpc3BvbmlibGUuXCI7XHJcbiAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmNvdGVcIikuaW5uZXJIVE1MID0gZGF0YS52b3RlX2F2ZXJhZ2UgKyBcIi8xMFwiO1xyXG4gICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5sYW5ndWVcIikuaW5uZXJIVE1MID0gZGF0YS5vcmlnaW5hbF9sYW5ndWFnZTtcclxuICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcInAuZHVyZWVcIikuaW5uZXJIVE1MID0gZGF0YS5ydW50aW1lO1xyXG4gICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5idWRnZXRcIikuaW5uZXJIVE1MID0gZGF0YS5idWRnZXQgfHwgXCJOb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5yZWNldHRlXCIpLmlubmVySFRNTCA9IGRhdGEucmV2ZW51ZTtcclxuXHJcbiAgICAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzc4MFwiICsgZGF0YS5wb3N0ZXJfcGF0aDtcclxuXHJcbiAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyYyk7XHJcbiAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGEudGl0bGUpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVxdWV0ZVBvcHVsYWlyZUZpbG0oKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUmVxdWV0ZVBvcHVsYWlyZUZpbG0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vcmVxdWV0ZS5vcGVuKFwiR0VUXCIsXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9YjQ4MWEwODE3NTY3NWRlMjJkNTQ2OTJmYjNjMmM2YjcmbGFuZ3VhZ2U9ZnItQ0EmcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVUkwgKyBcIi9tb3ZpZS9wb3B1bGFyP2FwaV9rZXk9XCIgKyB0aGlzLkFQSWtleSArIFwiJmxhbmd1YWdlPVwiICsgdGhpcy5sYW5nICsgXCImcGFnZT0xXCIpO1xyXG5cclxuXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZVBvcHVsYWlyZUZpbG0oZSkge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YTtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmFmZmljaGVQb3B1bGFpcmVGaWxtKGRhdGEpO1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlUG9wdWxhaXJlRmlsbShkYXRhKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxtQ2Fycm91c2VsOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlPi5zd2lwZXItc2xpZGVcIikuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgzXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5jb3RlXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udm90ZV9hdmVyYWdlICsgXCIgLzEwXCI7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5ocmVmID0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzE4NVwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLXdyYXBwZXJcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcblxyXG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgMzc1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDQwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMjQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZUluZm9BY3RldXJzKG1vdmllSWQpIHtcclxuXHJcblxyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlSW5mb0FjdGV1cnMuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vcmVxdWV0ZS5vcGVuKFwiR0VUXCIsXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9YjQ4MWEwODE3NTY3NWRlMjJkNTQ2OTJmYjNjMmM2YjcmbGFuZ3VhZ2U9ZnItQ0EmcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVUkwgKyBcIi9tb3ZpZS9cIiArIG1vdmllSWQgKyBcIi9jcmVkaXRzP2FwaV9rZXk9XCIgKyB0aGlzLkFQSWtleSArIFwiJmxhbmd1YWdlPVwiICsgdGhpcy5sYW5nKTtcclxuXHJcblxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91clJlcXVldGVJbmZvQWN0ZXVycyhlKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYWZmaWNoZUluZm9BY3RldXJzKGRhdGEpO1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlSW5mb0FjdGV1cnMoZGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgaW1hZ2VUZW1wbyA9IG5ldyBJbWFnZSgxODUsIDI3OCk7XHJcbiAgICAgICAgaW1hZ2VUZW1wby5zcmMgPSBcIi4uL2ltYWdlcy9pbWFnZS10ZW1wby5wbmdcIlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5jYXN0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT4uc3dpcGVyLXNsaWRlXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKS5pbm5lckhUTUwgPSBkYXRhLmNhc3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLnBlcnNvXCIpLmlubmVySFRNTCA9IGRhdGEuY2FzdFtpXS5jaGFyYWN0ZXI7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MTg1XCIgKyBkYXRhLmNhc3RbaV0ucHJvZmlsZV9wYXRoO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YS5jYXN0W2ldLnByb2ZpbGVfcGF0aCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3JjID09IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzE4NW51bGxcIikge1xyXG4gICAgICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIGltYWdlVGVtcG8uc3JjKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLXdyYXBwZXJcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcblxyXG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgMzc1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA0MCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDI0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
