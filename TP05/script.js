var btn1 = document.getElementById('btn1');
var aname = document.getElementById('aname');
var type = document.getElementById('type');
var partic = document.getElementById('partic');
var price = document.getElementById('price');
var link = document.getElementById('link');
var key = document.getElementById('key');
var acc = document.getElementById('acc');
var load = document.getElementById('load');
var load2 = document.getElementById('load2');
var load5 = document.getElementById('load5');
var resGen = document.getElementById('resGen');
var resNat = document.getElementById('resNat');
var load3 = document.getElementById('load3');
var load4 = document.getElementById('load4');
var resGrid = document.getElementById('gridRes');
var tabAc = document.getElementById('tablAc');
var resb = document.getElementById('gridResBook');

    function boredApi() {
      load.hidden = false;
      fetch('https://www.boredapi.com/api/activity').then(async (res) => {
          let data = await res.json();
          tabAc = false;
          console.log(data);
          aname.innerHTML=data.activity;
          type.innerHTML=data.type;
          partic.innerHTML=data.participants;
          price.innerHTML=data.price;
          link.innerHTML=data.link;
          key.innerHTML=data.key;
          acc.innerHTML=data.accessibility;
          load.hidden = true;
        })
      }


      function genderapi() {
        
        let value = document.getElementById("name").value;
        if(value!==''){
          load2.hidden = false;
          fetch('https://api.genderize.io?name='+value).then(async (res) => {
            let data = await res.json();
            console.log(data);
            let color;
            if(data.gender==='female'){
              color='FF95C4';
            }else{
              color='7BBFFF';
            }
            resGen.innerHTML="<span style='color: black; font-weight: bold;'>"+value+"</span>"+" is a "+"<span style='color:#"+color+"; font-weight: bold;'>"+data.gender+"</span>"+" with a probability of "+"<span style='color: red; font-weight: bold;'>"+(data.probability*100)+" % !"+"</span>";
            load2.hidden = true;
          })
        }else{
          alert("You didn't write a name !")
        }
        
        }


        function nationality() {
        
          let value = document.getElementById("name2").value;
          if(value!==''){
            load3.hidden = false;
            fetch('https://api.nationalize.io/?name='+value).then(async (res) => {
              let data = await res.json();
              console.log(data);
              let text='';
              for(let i=0; i<data.country.length; i++){
                text+="<tr><td><span style='font-weight: bold;'>"+data.country[i].country_id+"</span></td><td>"+(data.country[i].probability*100)+" %</td></tr>";
              }
              
              resNat.innerHTML=text;
              
              load3.hidden = true;
            })
          }else{
            alert("You didn't write a name !")
          }
          
          }


          function universities(){

            let value = document.getElementById('name3').value;
            if(value!==''){
            fetch('http://universities.hipolabs.com/search?country='+value).then(async (res) => {
              load4.hidden=false;
              let data = await res.json();
              console.log(data);
              let text='';
              for(let i=0; i<data.length; i++){
                text+="<div class='grid-item'><p><span style='font-weight: bold;'>"+data[i].name+"</span></p><p>"+data[i].country+"-"+data[i].alpha_two_code+"</p><a href="+data[i].web_pages[0]+">"+data[i].web_pages[0]+"</a></div>";
              }
              
              resGrid.innerHTML=text;
              
              load4.hidden = true;
            })
          }else{
            alert('No country entered')
          }

          }


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

      
    
load.hidden = true;
load2.hidden = true;
load3.hidden = true;
load4.hidden = true;
load5.hidden = true;
tabAc.hidden = true;