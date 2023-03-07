const scroller = document.getElementById("scroller");
var txt = "";

function getInfos(page,limit) {
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${limit}`).then(async (res) => {
        
        let data = await res.json();
        console.log(data);
        return data;
      })
    }


function appInfos(page,limit){
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${limit}`).then(async (res) => {
        
        let dat = await res.json();
        console.log(dat);

        txt=document.innerHTML;

        
        for(let i=0; i<dat.data.length; i++){
            txt+="<div class='flight'><p>"+dat.data[i].airline[0].name+" - "+dat.data[i].airline[0].country+"</p><p>"+dat.data[i].name+"</p></div>";
        }

        scroller.innerHTML=txt;

        txt=scroller.innerHTML;
        
      })
    
      

}



appInfos(2,15);
appInfos(3,15);



