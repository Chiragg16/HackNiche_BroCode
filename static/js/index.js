// variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "272dcee210274c80b7df905af4e925ec";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};


// generalBtn.addEventListener("click", function() {
//     newsType.innerHTML = "<h4>General News</h4>";
//     fetchGeneralNews();
// });

// businessBtn.addEventListener("click", function() {
//     newsType.innerHTML = "<h4>Business News</h4>";
//     fetchBusinessNews();
// });

// sportsBtn.addEventListener("click", function() {
//     newsType.innerHTML = "<h4>Sports News</h4>";
//     fetchSportsNews();
// });

// entertainmentBtn.addEventListener("click", function() {
//     newsType.innerHTML = "<h4>Entertainment News</h4>";
//     fetchEntertainmentNews();
// });

// technologyBtn.addEventListener("click", function() {
//     newsType.innerHTML = "<h4>Technology News</h4>";
//     fetchTechnologyNews();
// });

// searchBtn.addEventListener("click", function() {
//     //newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
//     fetchQueryNews();
// });

const fetchHeadlines = async() => {
    const response = await fetch(HEADLINES_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


const fetchGeneralNews = async() => {
    const response = await fetch(GENERAL_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchBusinessNews = async() => {
    const response = await fetch(BUSINESS_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchEntertainmentNews = async() => {
    const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchSportsNews = async() => {
    const response = await fetch(SPORTS_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchTechnologyNews = async() => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews = async() => {

    if (newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //error handle
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

function displayNews() {

   
    newsDataArr.forEach(news => {
    if(news.urlToImage==null){
        console.log("dummy");
        news.urlToImage="../static/images/download.png"
    }    
    var items = [];
    var li =
      '<div class="box" id="newsdisplay">'+
        '<a href="#" class="fas fa-heart"></a>'+
        '<a href="#" class="fas fa-eye"></a>'+
        '<img class="image" style="width:100%" src="'+news.urlToImage+'"alt="">'+
        '<h4 style="font-size: 20px;">'+news.title+'</h4>'+
        '<h5 style="font-size: 14px;">'+news.author+'</h5>'+
        '<div class="likedislike">'+
        '<button class="btn"><i id="green" class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button>'+
        '<button class="btn"><i id="red" class="fa fa-thumbs-down fa-lg" aria-hidden="true"></i></button>'+
        '<button class="btn " data-toggle="modal" data-target="#examplecomments"><i  class="fas fa-comment"></i></button>'+
        '<button class="btn" ><i  class="fa fa-share-alt"></i></button>'+
        '</div>'+
        '<div class="modal fade" id="examplecomments" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
            '<div class="modal-dialog modal-dialog-centered" role="document">'+
              '<div class="modal-content">'+
               ' <div class="modal-header" style="text-align: center; margin:auto">'+
                 ' <h2 class="modal-title" id="exampleModalLongTitle" style="text-align: center; margin:auto;width:50%; color:black">Title</h2>'+
                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color:black">'+
                   ' <span aria-hidden="true" style="color: black; margin-left:500%;">&times;</span>'+
                 ' </button>'+
               ' </div>'+
               ' <div class="modal-body">'+
                   ' <h2 style="text-align: center; color:black"></h2>'+
                   ' <p class="firstnewss" style="color:black;max-width: 500px; text-align: center;margin: auto;">Lorem ipsum dolor sit amet consectetur adipisicing elit. '+
                       ' Accusantium excepturi enim tempora quam, quod eius eos aliquam esse laboriosam '+
                     '   itaque quae natus neque rem? Nesciunt amet fugit aliquid ipsa recusandae?'+
                      '  Lorem ipsum dolor sit amet consectetur adipisicing elit.'+ 
                       ' Accusantium excepturi enim tempora quam, quod eius eos aliquam esse laboriosam '+
                       ' itaque quae natus neque rem? Nesciunt amet fugit aliquid ipsa recusandae?'+
                   ' </p>'+
               ' </div>'+
                '<div class="modal-footer">'+
                    '<h3><a href="#"> <button class = "modalbutton">'+
                       ' Read More'+
                    '</button></a></h3>'+
                 ' <!-- <button type="button" class="btn btn-secondary" style = "margin:auto;padding:2%;color:black"data-dismiss="modal">Close</button>'+
                '  <button type="button" class="btn btn-primary" style = "margin:auto;padding:2%;">Save changes</button> -->'+
                '</div>'+
             ' </div>'+
           ' </div>'+
          '</div>'+
    '</div>';
    items.push(li);
    console.log(li);
        $("#newsdisplay").append(items.join(""));        
    });

}