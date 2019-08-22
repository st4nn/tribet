'use strict';

exports.merge = (arr, prevArr, page)=>{
    arr.forEach((row)=>{
        try {
            if (prevArr[row.StatisticsId] === undefined){
               prevArr[row.StatisticsId] = { choices : [] };
            }

            const _choices = prevArr[row.StatisticsId].choices;
            _choices.push({page : page, time : row.time, odds : {...row.choices}});
     
     
            prevArr[row.StatisticsId] = {
               league : row.league,
               match : row.match,
               currentScore : row.currentScore,
               time : row.time,
               StatisticsId : row.StatisticsId,
               choices : _choices
             };
            
        } catch (error) {
            console.error(error);
        }
    });
    return prevArr;
}

exports.mergeByName = (arr, prevArr, page)=>{
    arr.forEach((row)=>{
        try {
            let found = false;
            for (var index in prevArr){
                if (row.match.toLowerCase().trim() === prevArr[index].match.toLowerCase().trim()){
                    found = true;
                    const _choices = prevArr[index].choices || [];
                    _choices.push({page : page, time : row.time, odds : {...row.choices}});

                    prevArr[index].choices = _choices
                }
            }
            
            if (!found){
                let myIndex = row.StatisticsId;
                while(prevArr[myIndex] !== undefined){
                    myIndex = myIndex * 2;
                }

                prevArr[myIndex] = {
                    league : row.league,
                    match : row.match,
                    currentScore : row.currentScore,
                    time : row.time,
                    StatisticsId : myIndex,
                    choices : [{page : page, time : row.time, odds : {...row.choices}}]
                };
            }
        } catch (error) {
            console.error(error);
        }
    });
    return prevArr;
}