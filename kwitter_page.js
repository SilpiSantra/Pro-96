
const firebaseConfig = {
    apiKey: "AIzaSyCfhxl6LMgxojhFeK_IbN4qEcS_Vu_HJxU",
    authDomain: "chatwebapp-6d648.firebaseapp.com",
    databaseURL: "https://chatwebapp-6d648-default-rtdb.firebaseio.com",
    projectId: "chatwebapp-6d648",
    storageBucket: "chatwebapp-6d648.appspot.com",
    messagingSenderId: "504520303172",
    appId: "1:504520303172:web:e6e9d5d5c2f74912859211"
  };
  
     firebase.initializeApp(firebaseConfig);
  
     user_name = localStorage.getItem("user_name");
     room_name = localStorage.getItem("room_name");
   
   
   
   function send()
   
   {
     msg = document.getElementById("msg").value;
     firebase.database().ref(room_name).push({
       name:user_name,
       message:msg,
       like:0
      });
   
     document.getElementById("msg").value = "";
   }
   
   function getData() {
     firebase.database().ref("/"+room_name).on('value', function(snapshot) {
         document.getElementById("output").innerHTML = "";
       snapshot.forEach(function(childSnapshot) {
          childKey  = childSnapshot.key;
          childData = childSnapshot.val();
          if(childKey != "purpose")
          {
            firebase_message_id = childKey;
            message_data = childData;
   
            console.log(message_data);
            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];
            row = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";       
           document.getElementById("output").innerHTML += row;
          }
       });
     });
   }
   getData();
   
   function updateLike(message_id)
   {
     console.log("clicked on like button - " + message_id);
     button_id = message_id;
     likes = document.getElementById(button_id).value;
     updated_likes = Number(likes) + 1;
     console.log(updated_likes);
   
     firebase.database().ref(room_name).child(message_id).update({
       like : updated_likes  
      });
   
   }
   
   function logout() {
   localStorage.removeItem("user_name");
   localStorage.removeItem("room_name");
   window.location.replace("kwitter.html");
   }
   