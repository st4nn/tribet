const 
  axios = require("axios"),
  moment = require("moment-timezone");

const urlBase = 'https://sb1capi-altenar.biahosted.com/Sportsbook/GetLiveEvents?timezoneOffset=300&langId=4&skinName=wplay&configId=1&culture=es&countryCode=CO&sportids=1&withLive=true&filterSingleNodes=2&group=Championship&period=periodall&outrightsDisplay=None';

const currentDate = moment().add(-1, 'hours').utc().format('YYYY-MM-DDTHH:mm:00.000[Z]');

const url = `${urlBase}&startDate=${currentDate}&endDate=${currentDate}`;


const onEventFound = (obj)=>{
  obj.Events.forEach(function(row, index){
    console.log("-----------------------------------------------------------------");
    console.log(`Liga: ${row.ChampName}`);
    console.log(`Encuentr: ${row.Name}`);
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

axios.get(url)
.then((res)=>{
  const {Result = {}} = res.data;
  lookForEvents(Result, 'Events', onEventFound);
})
.catch(err=>{
  console.error(err);
});