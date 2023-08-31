function InitialValues() {
    
    var inputBoxesScores = document.getElementsByClassName("scoresInput");
    var scores = [];
    for (var i = 0; i < inputBoxesScores.length; i++) {
        scores.push(parseInt(inputBoxesScores[i].value));
    }

    var inputBoxesStats = document.getElementsByClassName("chanceDistribution");
    var outcomeDistribution = [];
    for (var i = 0; i < inputBoxesStats.length; i++) {
        outcomeDistribution.push(parseInt(inputBoxesStats[i].value));
    }

    var inputBoxesStats = document.getElementsByClassName("statsInput");
    var rolledStats = [];
    for (var i = 0; i < inputBoxesStats.length; i++) {
        rolledStats.push(parseInt(inputBoxesStats[i].value));
    }
    
    return [scores, rolledStats, outcomeDistribution];
}

function DetermineLuckScore(scores, rolledStats) {
    let luckScore = 0;
    for (const i of rolledStats) {
        luckScore += scores[i - 1];
    }
    return luckScore;
}

function ScoreDistributionOneStat(scores, outcomeDistribution) {
    const chanceDistribution = {};
    for (let i = 0; i < 20; i++) {
        if (scores[i] in chanceDistribution) {
            chanceDistribution[scores[i]] += outcomeDistribution[i];
        } else {
            chanceDistribution[scores[i]] = outcomeDistribution[i];
        }
    }
    return chanceDistribution;
}

function AddTwoSetsOfRolls(setOne, setTwo) {
    const output = {};

    for (const i in setOne) {
        for (const j in setTwo) {
            const increase = setOne[i] * setTwo[j];
            const index = parseInt(i) + parseInt(j);
            if (index in output) {
                output[index] += increase;
            } else {
                output[index] = increase;
            }
        }
    }
    return output;
}

function TotalScoreDistribution(oneStat) {
    const twoStats = AddTwoSetsOfRolls(oneStat, oneStat);
    const fourStats = AddTwoSetsOfRolls(twoStats, twoStats);
    const sixStats = AddTwoSetsOfRolls(fourStats, twoStats);
    return sixStats;
}

var toPrecision = function(nbr, precision) {
    if (typeof nbr !== 'number') return 0; //???
    if (nbr === 0) return 0;
    var abs = Math.abs(nbr);
    var sign = nbr / abs;
    nbr = abs;
    var digits = Math.ceil(Math.log(nbr)/Math.LN10);
    var factor = Math.pow(10, precision - digits);
    var result = nbr * factor;
    result = Math.round(result, 0);
    return result / factor;
};

function CalculateChances(distribution, luckScore) {
    const roundPercentage = 5;
    const roundCharacters = 4;
    
    let totalPossibilities = 0;
    let chanceEqualBetter = 0;
    let chanceEqualWorse = 0;
    for (const i in distribution) {
        totalPossibilities += distribution[i];
        if (parseInt(i) >= luckScore) {
            chanceEqualBetter += distribution[i];
        }
        if (parseInt(i) <= luckScore) {
            chanceEqualWorse += distribution[i];
        }
    }

    const chancePercentageBetter = toPrecision(100 * chanceEqualBetter / totalPossibilities, roundPercentage);
    const charactersTakenBetter = toPrecision(1 / (chanceEqualBetter / totalPossibilities), roundCharacters);
    const chancePercentageWorse = toPrecision(100 * chanceEqualWorse / totalPossibilities, roundPercentage);
    const charactersTakenWorse = toPrecision(1 / (chanceEqualWorse / totalPossibilities), roundCharacters);

    return [chancePercentageBetter, charactersTakenBetter, chancePercentageWorse, charactersTakenWorse];
}

function showChances(chancePercentageBetter, charactersTakenBetter, chancePercentageWorse, charactersTakenWorse) {
    document.getElementById("outputBox").innerHTML = `
Chance of these rolls or better: ${chancePercentageBetter}% <br>
These stats or better happens about once every ${charactersTakenBetter} characters. <br>
<br>
Chance of these rolls or worse: ${chancePercentageWorse}% <br>
These stats or worse happens about once every ${charactersTakenWorse} characters. <br>
`;
}

function main() {
    const [scores, rolledStats, outcomeDistribution] = InitialValues();

    const luckScore = DetermineLuckScore(scores, rolledStats);

    const DistributionOneStat = ScoreDistributionOneStat(scores, outcomeDistribution);

    const totalScoreDistribution = TotalScoreDistribution(DistributionOneStat);

    const [
        chancePercentageBetter,
        charactersTakenBetter,
        chancePercentageWorse,
        charactersTakenWorse
    ] = CalculateChances(totalScoreDistribution, luckScore);

    showChances(chancePercentageBetter, charactersTakenBetter, chancePercentageWorse, charactersTakenWorse);
}


