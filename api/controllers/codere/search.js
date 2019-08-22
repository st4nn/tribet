const 
  axios = require("axios"),
  merger = require("../all/merge");

const urlBase = 'https://m.codere.com.co/csbgonline/NoSessionTimeout/GetHomeLiveEvents?languageCode=es-co&includeLiveCount=true';

exports.find = ({forAll = false, prevArr = {}})=>{
    return new Promise((resolve, reject)=>{
        axios.get(urlBase)
        .then((res)=>{
            const 
                {events = {}} = res.data;

            try {
                const
                    _events = events[0].Events,
                    _ans = [];

                
                for (var idx in _events){
                    const 
                        _event = _events[idx],
                        {liveData = {}} = _event;

                    _ans.push({
                        league: _event.LeagueName,
                        match : `${liveData.ParticipantHome} vs. ${liveData.ParticipantAway}`,
                        currentScore: `${liveData.ResultHome}:${liveData.ResultHome}`,
                        time: liveData.MatchTime,
                        choices : [],
                        StatisticsId : _event.StatisticsId
                    });

                    const 
                        {DefaultGame = {}} = _event,
                        {Results = []} = DefaultGame;
                    
                    Results.forEach((result)=>{
                        _ans[idx].choices.push({
                            name : result.Name,
                            price : result.Odd
                        })
                    });
                }

                if (forAll){
                    prevArr = merger.merge(_ans, prevArr, "codere");
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
