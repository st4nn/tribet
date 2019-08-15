const 
  axios = require("axios"),
  moment = require("moment-timezone");

const urlBase = 'https://sb1capi-altenar.biahosted.com/Sportsbook/GetLiveEvents?timezoneOffset=300&langId=4&skinName=wplay&configId=1&culture=es&countryCode=CO&sportids=1&withLive=true&filterSingleNodes=2&group=Championship&period=periodall&outrightsDisplay=None';

exports.find = ()=>{
  const currentDate = moment().add(-1, 'hours').utc().format('YYYY-MM-DDTHH:mm:00.000[Z]');
  const url = `${urlBase}&startDate=${currentDate}&endDate=${currentDate}`;

  return new Promise((resolve, reject)=>{
    axios.get(url)
    .then((res)=>{
      let
        _data = [];

      const 
        {Result = {}} = res.data,
        incrementCounter = (_match)=>{_data._match};

      lookForEvents(Result, 'Events', onEventFound, incrementCounter);
      console.log(counter);
    })
    .catch(err=>{
      console.error(err);
      reject(err);
    });
  })
}

const lookForEvents = (obj, _keyword, onSuccess, increment)=>{
  if (typeof obj === "object"){
    if (obj.hasOwnProperty(_keyword)){
      onSuccess(obj, increment);
    } else{
      for (const _id in obj ){
        lookForEvents(obj[_id], _keyword, onSuccess, increment);
      }
    }
  }
}

const onEventFound = (obj, increment)=>{
  obj.Events.forEach(function(row, index){

    
    console.log(`Liga: ${row.ChampName}`);
    console.log(`Encuentro: ${row.Name}`);
    console.log(`Resultado Parcial: ${row.LiveScore}`);
    console.log(`Tiempo: ${row.LiveCurrentTime}`);
    lookForEvents(row, "Items", (item)=>{
      
      for (const _id in item.Items){
        if (item.Items[_id].Name === '1x2'){
          const _item = item.Items[_id].Items;
          for (const __id in _item){
            console.log(`${_item[__id].Name} : ${_item[__id].Price}`);
          }
        }
      }
      console.log("--------------------333333333333---------------------------------------------");
      increment({
        ligue : row.ChampName,
        match : row.Name,
        currentScore : row.LiveScore,
        time : row.LiveCurrentTime
      });
    });
  });
}