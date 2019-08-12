const 
  axios = require("axios"),
  moment = require("moment-timezone");

const urlBase = 'https://m.codere.com.co/csbgonline/NoSessionTimeout/GetHomeLiveEvents?languageCode=es-co&includeLiveCount=true';


const onEventFound = (obj)=>{
  obj.Events.forEach(function(row, index){
    console.log("-----------------------------------------------------------------");
    console.log(`Liga: ${row.ChampName}`);
    console.log(`Encuentro: ${row.Name}`);
    console.log(`Resultado Parcial: ${row.LiveScore}`);
    console.log(`Tiempo: ${row.LiveCurrentTime}`);
    console.log("---------->");
    lookForEvents(row, "Items", (item)=>{
      
      for (const _id in item.Items){
        if (item.Items[_id].Name === '1x2'){
          const _item = item.Items[_id].Items;
          for (const __id in _item){
            console.log(`${_item[__id].Name} : ${_item[__id].Price}`);
          }
          console.log("<----------");
        }
      }
      
      console.log("-----------------------------------------------------------------");
    })
  })
}

const lookForEvents = (obj, _keyword, onSuccess)=>{
  if (typeof obj === "object"){
    if (obj.hasOwnProperty(_keyword)){
      onSuccess(obj);
    } else{
  
      for (const _id in obj ){
        lookForEvents(obj[_id], _keyword, onSuccess);
      }
    }
  }
}

axios.get(urlBase)
.then((res)=>{
  const {Result = {}} = res.data;
  lookForEvents(Result, 'Events', onEventFound);
})
.catch(err=>{
  console.error(err);
});