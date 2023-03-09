var btn1 = document.getElementById('btn1');
var aname = document.getElementById('aname');
var type = document.getElementById('type');
var partic = document.getElementById('partic');
var price = document.getElementById('price');
var link = document.getElementById('link');
var key = document.getElementById('key');
var acc = document.getElementById('acc');
var load = document.getElementById('load');

load.hidden=true;

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