'use strict';

exports.merge = (arr, prevArr, page)=>{
    arr.forEach((row)=>{
        try {
            if (prevArr[row.StatisticsId] === undefined){
               prevArr[row.StatisticsId] = { choices : [] };
            }

            const 
                _choices = prevArr[row.StatisticsId].choices,
                {iso, CategoryName} = row;

            _choices.push({page : page, time : row.time, odds : {...row.choices}});
     
            prevArr[row.StatisticsId] = {
               league : row.league,
               match : row.match,
               currentScore : row.currentScore,
               time : row.time,
               StatisticsId : row.StatisticsId,
               iso : iso,
               CategoryName : CategoryName,
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
                    const 
                        _choices = prevArr[index].choices || [],
                        {iso, CategoryName} = prevArr[index];
                    _choices.push({page : page, time : row.time, odds : {...row.choices}});

                    prevArr[index].iso = iso;
                    prevArr[index].CategoryName = CategoryName;
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
                    iso : row.iso,
                    CategoryName : row.CategoryName,
                    choices : [{page : page, time : row.time, odds : {...row.choices}}]
                };
            }
        } catch (error) {
            console.error(error);
        }
    });
    return prevArr;
}