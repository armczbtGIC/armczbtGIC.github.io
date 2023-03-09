
var load5 = document.getElementById('load5');

var resb = document.getElementById('gridResBook');

          function catchbooks(){


            fetch('https://jsonplaceholder.typicode.com/photos').then(async (res) => {

              load5.hidden=false;
              let data = await res.json();
              console.log(data);
              let text='';
              for(let i=0; i<data.length; i++){
                text+="<div class='grid-item'><img src='"+data[i].thumbnailUrl+"'alt='' class='book'><p><span style='font-weight: bold;'> Titre:"+data[i].title+"</span></p><p> Album ID:"+data[i].albumId+"</p><p> Category:"+data[i].id+"</p><a href='./bookinfo.html?bookId="+data[i].id+"' target='popup' onclick='window.open(./bookinfo.html?bookId="+data[i].id+",'_blank'); return false;'>More details</a></div>";
              }
              
              resb.innerHTML=text;
              
              load5.hidden = true;
              
            })

          }

      

load5.hidden = true;
