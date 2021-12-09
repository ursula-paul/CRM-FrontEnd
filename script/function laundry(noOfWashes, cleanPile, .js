    function laundry(noOfWashes, cleanPile, dirtyPile){
    let cleanPileObj = {}
    let dirtyPileObj = {}
    let numberOfCleanPairs = 0
    
    for(let pile of cleanPile){
        if(cleanPileObj[pile]){
            cleanPileObj[pile]++
            if(cleanPileObj[pile] === 2) {
                numberOfCleanPairs++
                cleanPileObj[pile] = 0
            }
        }else{
            cleanPileObj[pile] = 1
        }
    }

    for(let pile of dirtyPile){
        if(dirtyPileObj[pile]){
            dirtyPileObj[pile]++
        }else dirtyPileObj[pile] = 1
    }

    var timesWashed = 0
    for(let timesToWash = 0; timesToWash < noOfWashes; timesToWash++){
        if(Object.keys(cleanPileObj).length > 0){
            for(let cleanSocks in cleanPileObj){
                if(dirtyPileObj[cleanSocks]){
                    dirtyPileObj[cleanSocks]--
                    numberOfCleanPairs++
                    if(dirtyPileObj[cleanSocks] === 0) delete dirtyPileObj[cleanSocks]
                    delete cleanPileObj[cleanSocks]
                    break
                }
                else delete cleanPileObj[cleanSocks]
            }
        } else {
            timesWashed = timesToWash
            break
        }
    }
    for(let dirtySocks in dirtyPileObj){
        while(dirtyPileObj[dirtySocks] >= 2 && noOfWashes - timesWashed >= 2){
            dirtyPileObj[dirtySocks] -= 2
            numberOfCleanPairs++
            timesWashed += 2
        }
    }

    return numberOfCleanPairs
}

console.log(laundry(11, [1, 2, 1, 1,], [1, 4, 3, 2, 4, 4, 5, 5, 5, 5, 5, 5, 4]))
// []=>[  3, ]
// {
//     3: 1,
//     4: 2
// }
// [1, 2]

// [2]
//[]
// timesToWash = 6
//left=2

// shift command el 