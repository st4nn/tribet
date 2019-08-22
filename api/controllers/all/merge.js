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
               choices : _choices
             };
            
        } catch (error) {
            console.error(error);
        }
    });
    return prevArr;
}