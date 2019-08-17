const 
  axios = require("axios"),
  moment = require("moment-timezone");

//Url to get the raw bet data.
const urlBase = 'https://sb1capi-altenar.biahosted.com/Sportsbook/GetLiveEvents?timezoneOffset=300&langId=4&skinName=wplay&configId=1&culture=es&countryCode=CO&sportids=1&withLive=true&filterSingleNodes=2&group=Championship&period=periodall&outrightsDisplay=None';

/**
 * This Function starts the process and return a Promise for processing into a HTTP Request. Is the main function into the file.
 */
exports.find = ()=>{
  const currentDate = moment().add(-1, 'hours').utc().format('YYYY-MM-DDTHH:mm:00.000[Z]');
  const url = `${urlBase}&startDate=${currentDate}&endDate=${currentDate}`;

  return new Promise((resolve, reject)=>{
    /**
     * This function returns the raw data from bet house, the source is the same used in the webSite and its address is on urlBase.
     */
    axios.get(url)
    .then((res)=>{
      let
        _data = []; //This var will be returned when process end

      const 
        {Result = {}} = res.data,
        /**
         * This is a little callback to increase the result array when the functions find any match.
         */
        incrementCounter = (_match)=>{_data.push(_match)};
      
      //Starts the search.
      lookForEvents(Result, 'Events', onEventFound, incrementCounter);
      
      //Finishes the promise and returns the array result
      resolve(_data);
    })
    .catch(err=>{
      console.error(err);
      reject(err);
    });
  })
}

/**
 * This function iterate over an Array to find a defined keyword and execute a process when find it.
 * @param {Array} obj Array object to iterate
 * @param {String} _keyword Word to find the correct object into the  Array
 * @param {Function} onSuccess Function to execute When match any result
 * @param {Function} increment Function to add the match result to the result array
 */
const lookForEvents = (obj, _keyword, onSuccess, increment)=>{
  
  // Looks if the parameter is an object to prevent errors and don't waste time
  if (typeof obj === "object"){
    if (obj.hasOwnProperty(_keyword)){
      //If the parameter has the keyword executes the success function with the match result and the increment function.
      onSuccess(obj, increment);
    } else{ 
      for (const _id in obj ){ //If parameter hasn't the keyword starts a iteration over its children.
        lookForEvents(obj[_id], _keyword, onSuccess, increment);
      }
    }
  }
}

/**
 * This function is executed when iterator found any match result.
 * 
 * @param {JSON} obj Object that contains the match result
 * @param {Function} increment Function to add the match result to the result array
 */
const onEventFound = (obj, increment)=>{
  obj.Events.forEach(function(row){
    // Iterates over its own elements to find a second Keyword into the Array.
    lookForEvents(row, "Items", (item)=>{
      const _choices = [];
      
      for (const _id in item.Items){
        // 1x2 is the object that contains the bet choices
        if (item.Items[_id].Name === '1x2'){
          const _item = item.Items[_id].Items;
          for (const __id in _item){
            _choices.push({ name: _item[__id].Name, price: _item[__id].Price});
          }
        }
      }
      
      //Execute the increment function to add this result to the final results array.
      increment({
        league : row.ChampName,
        match : row.Name,
        currentScore : row.LiveScore,
        time : row.LiveCurrentTime,
        choices: _choices
      });
    });
  });
}