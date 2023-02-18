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
var count=0;

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



generalBtn.addEventListener("click", function() {
    fetchGeneralNews();
});

businessBtn.addEventListener("click", function() {
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function() {
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function() {
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function() {
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function() {
    //newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
    fetchQueryNews();
});


function fetchHeadlines() {
    
    $.ajax({
    url: "https://us-central1-projectnewsify.cloudfunctions.net/getNews",
    success: function (response) {
    //   console.log("https://us-central1-projectnewsify.cloudfunctions.net/getNews",response);
      newsDataArr=response;
      displayNews();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
    },
  });
  
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
    
console.log(newsDataArr.length)
document.getElementById("newsdisplay").innerHTML="";
    for(var i=0;i<newsDataArr.length;i++)
{
    console.log("news fss")
    if(newsDataArr[i].urlToImage==null){
        console.log("dummy");
        newsDataArr[i].urlToImage="../static/images/download.png"
    }    
    var items = [];
    var li =
      '<div class="box" id="newsdisplay">'+
        '<a href="#" class="fas fa-heart"></a>'+
        '<a href="#" class="fas fa-eye"></a>'+
        '<img class="image" src="'+newsDataArr[i].urlToImage+'"alt="">'+
        '<a href="'+newsDataArr[i].url+'"><h4 style="color:white;font-size: 20px;"onclick="">'+newsDataArr[i].title+'</h4>'+'</a>'+
        '<h5 style="font-size: 14px;">'+newsDataArr[i].author+'</h5>'+
        '<div class="likedislike">'+
            '<button class="btn" style:"color:#fff;"><i id="green" onclick="green()" class="fa fa-thumbs-up fa-lg " aria-hidden="true"></i> 2</button>'+
        '<button class="btn" style:"color:#fff;font-weight:bold;"><i id="red" onclick="red()"  class="fa fa-thumbs-down fa-lg" aria-hidden="true"></i> 0</button>'+
        '<button class="btn"><i  class="fas fa-comment" onclick="viewMoreSpecialPackageModal('+i+')"></i></button>'+
        '<button class="btn" ><i  class="fa fa-share-alt" onclick="copyToClipboard('+ newsDataArr[i].url +')"></i></button>'+
        '</div>'+
    '</div>'+
    '<div class="modal fade" id="examplecomments'+i+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
            '<div class="modal-dialog modal-dialog-centered" role="document">'+
              '<div class="modal-content">'+
                '<div class="modal-header">'+
                 ' <h5 class="modal-title" style="color: black; id="exampleModalLongTitle">'+newsDataArr[i].title+'</h5>'+
                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                 ' </button>'+
                '</div>'+
                '<div class="modal-body" style="text-align: center;">'+
                // '<label for="lname">Last name:</label><br>'+
                '<form>'+
                '<input type="text" id="lname" name="lname" value="" placeholder="Comment" style="background-color:lightgrey;padding:1%;border-radius:0.3rem;color:white;border-bottom: 1.5px solid grey;display:inline;">'+
                '<input type="submit" class=" button" value="Submit" style="background-color:#263159;color:white;padding:1%;border-radius:0.3rem;margin-left:3%;display:inline"></input>'
                +'</div>'+
                '</form>'+
                '<div class="modal-footer">'+
                 ' <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
                  '<button type="button" class="btn btn-primary">Save changes</button>'+
               ' </div>'+
              '</div>'+
            '</div>'+
          '</div>'; 
    items.push(li);
    // console.log(li); 

        $("#newsdisplay").append(items.join(""));        
};
}
function displayNews1() {
    
    console.log(newsDataArr.length)
    
        for(var i=0;i<newsDataArr.length;i++)
    {
        console.log("news fss")
        if(newsDataArr[i].urlToImage==null){
            console.log("dummy");
            newsDataArr[i].urlToImage="../static/images/download.png"
        }    
        var items = [];
        var li =
          '<div class="box" id="newsdisplay">'+
            '<a href="#" class="fas fa-heart"></a>'+
            '<a href="#" class="fas fa-eye"></a>'+
            '<img class="image" src="'+newsDataArr[i].urlToImage+'"alt="">'+
            '<a href="'+newsDataArr[i].url+'"><h4 style="color:white;font-size: 20px;"onclick="">'+newsDataArr[i].title+'</h4>'+'</a>'+
            '<h5 style="font-size: 14px;">'+newsDataArr[i].author+'</h5>'+
            '<div class="likedislike">'+
                '<button class="btn" style:"color:#fff;"><i id="green" onclick="green()" class="fa fa-thumbs-up fa-lg " aria-hidden="true"></i> 0</button>'+
            '<button class="btn" style:"color:#fff;font-weight:bold;"><i id="red" onclick="red()"  class="fa fa-thumbs-down fa-lg" aria-hidden="true"></i> 0</button>'+
            '<button class="btn"><i  class="fas fa-comment" onclick="viewMoreSpecialPackageModal('+i+')"></i></button>'+
            '<button class="btn" ><i  class="fa fa-share-alt"></i></button>'+
            '</div>'+
        '</div>'+
        '<div class="modal fade" id="examplecomments'+i+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
                '<div class="modal-dialog modal-dialog-centered" role="document">'+
                  '<div class="modal-content">'+
                    '<div class="modal-header">'+
                     ' <h5 class="modal-title" style="color: black; id="exampleModalLongTitle">'+newsDataArr[i].title+'</h5>'+
                      '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                     ' </button>'+
                    '</div>'+
                    '<div class="modal-body">'+
                    '<input type="text" id="lname" name="lname" placeholder="Comment" style="background-color:lightgrey;padding:1%;border-radius:0.3rem;color:white;border-bottom: 1.5px solid grey;display:inline;">'+
                '<input type="submit" class="button" value="Submit" style="background-color:#263159;color:white;padding:1%;border-radius:0.3rem;margin-left:3%;display:inline"></input>'
                    +'</div>'+
                    '<div class="modal-footer">'+
                   ' </div>'+
                  '</div>'+
                '</div>'+
              '</div>'; 
        items.push(li);
        // console.log(li); 
            $("#newsdisplay").append(items.join(""));        
    };
    }
    

 
          
function viewMoreSpecialPackageModal(new1){

    $("#examplecomments"+new1).modal("show");
    console.log(new1);
}
function viewMoreSpecialPackageModal1(new1){

    $("#examplecomments1"+new1).modal("show");
    console.log(new1);
}

var btn1 = document.querySelector('green');
var btn2 = document.querySelector('#red');

function green() {
  
    if (btn2.classList.contains('red')) {
      btn2.classList.remove('red');
    } 
  this.classList.toggle('green');
  
};

function red () {
  
    if (btn1.classList.contains('green')) {
      btn1.classList.remove('green');
    } 
  this.classList.toggle('red');
  
};


function genre(genres) {
    console.log("before referesh")
    localStorage.setItem("interest",genres)    
    console.log("after referesh")
    var inte = localStorage.getItem("interest")
    var data2 = {
        'interest' : genres
    };    
    console.log(data2)
    $.ajax({
    url: "https://us-central1-projectnewsify.cloudfunctions.net/topPicks",
    type : "POST",
    data:data2,
    success: function (response) {
      console.log("https://us-central1-projectnewsify.cloudfunctions.net/topPicks",response);
      newsDataArr=response;
      displayNews();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
    },
  });
  
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
}




