const 
  axios = require("axios"),
  moment = require("moment-timezone");

const urlBase = 'https://sb1capi-altenar.biahosted.com/Sportsbook/GetLiveEvents?timezoneOffset=300&langId=4&skinName=wplay&configId=1&culture=es&countryCode=CO&sportids=1&withLive=true&filterSingleNodes=2&group=Championship&period=periodall&outrightsDisplay=None';

const currentDate = moment().add(-1, 'hours').utc().format('YYYY-MM-DDTHH:mm:00.000[Z]');

const url = `${urlBase}&startDate=${currentDate}&endDate=${currentDate}`;

axios.get(url)
.then((res)=>{
  console.log(url);
  console.log(res.data);
})
.catch(err=>{
  console.error(err);
})
 