

function register(e) {
    location.href(index.html); 
    e.preventDefault();
    var data={};
    var e = document.getElementById("ddlViewBy");
    var value = e.value;
    var text = e.options[e.selectedIndex].text;

    data.interest=text;
    localStorage.setItem("interest",text)
    data.name=document.getElementById('name').value;
    data.password=document.getElementById('phone').value;
    data.email=document.getElementById('email').value ; 
    data.pass=document.getElementById('pass').value ; 
    data.rpass=document.getElementById('rpass').value ; 
    data.pass=document.getElementById('pass').value ; 
    data.pass=document.getElementById('pass').value ;

    console.log(data);
    $.ajax({
    url: "https://us-central1-projectnewsify.cloudfunctions.net/createUser",
    type : "POST",
    data:data,
    success: function (response) {
      console.log("https://us-central1-projectnewsify.cloudfunctions.net/createUser",response)
      location.href(index.html)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
    },
  });
  
    }