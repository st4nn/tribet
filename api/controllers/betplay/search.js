

const 
  axios = require("axios"),
  merger = require("../all/merge");

const urlBase = 'https://us1-api.aws.kambicdn.com/offering/v2018/bp/listView/all/all/all/all/in-play.json?lang=es_ES&market=CO&client_id=2&channel_id=1&useCombined=true';

exports.find = ({forAll = false, prevArr = {}})=>{
    return new Promise((resolve, reject)=>{
        axios.get(urlBase)
        .then((res)=>{
            const 
                {events = {}} = res.data;

            try {
                const
                    _ans = [];
                
                let idx = 0;

                events.forEach((row)=>{
                    const 
                        {event = {}, liveData = {}, betOffers = [{outcomes : []}]} = row,
                        {score = {}, matchClock={}} = liveData;

                    try {
                        if (event.sport === 'FOOTBALL'){
                            _ans.push({
                                league: event.group,
                                match : event.name.replace(/ - /gi, " vs. "),
                                currentScore: `${score.home}:${score.away}`,
                                time: matchClock.minute,
                                StatisticsId : event.id,
                                iso : '',
                                CategoryName : '',
                                choices : []
                            });
                            
                            if (betOffers[0] !== undefined){
                                if (betOffers[0].outcomes !== undefined){
                                    betOffers[0].outcomes.forEach((odd)=>{
                                        _ans[idx].choices.push({
                                            name : (odd.englishLabel === "X" ? "Empate" : odd.participant),
                                            price : (odd.odds/1000)
                                        })
                                    });
                                }
                            }

                            idx++;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    
                });


                if (forAll){
                    prevArr = merger.mergeByName(_ans, prevArr, "betplay");
                    resolve(prevArr);
                } else{
                    resolve(_ans);
                }

            } catch (error) {
                reject("NO DATA");
            }

            
            
        
        })
        .catch(err=>{
            console.error(err);
            reject(err);
        });
    });
}
