module.exports = function backtracker(config) {
    console.time('backtracking');
    const solutions = [];
    const solution = config.getSolutionStructure();

    let i = 0;

    let universe = config.universe;
    while (true) {
        if (i === -1) {
            if (config.strategy === 'find-all') {
                console.log('Solutions found: ', solutions.length);
                break;
            }
            throw new Error('it seems that the backtracking cannot find a solution.');
        }

        const possibilities = config.getPossibilities(universe, i);

        if (possibilities.length === 0) {
            config.resetSolution(solution, i);
            config.resetPossibilities(possibilities);
            i--;
            continue;
        }

        let n = config.pop(possibilities);
        config.setSolution(solution, i, n);

        const status = config.checkSolution(solution, i);
        if (status) {
            i++;
        } else {
            continue;
        }
        if (i === config.length) {
            if (config.strategy === 'find-first') {
                break;
            }
            if (config.strategy === 'find-all') {
                const s = JSON.parse(JSON.stringify(solution));
                solutions.push(s);
                if (solutions.length >= config.max) {
                    break;
                }
                console.log('keep going');
                i--;
                continue;
            }

        }
    }
    console.timeEnd('backtracking');
    if (config.strategy === 'find-first') {
        return solution;
    }
    if (config.strategy === 'find-all') {
        return solutions;
    }
}