
const sum = (a, b) => {
    if (!(typeof a === 'number' || typeof a === 'string') || 
        !(typeof b === 'number' || typeof b === 'string')) {
        return undefined;
    }
    return +a + +b;
}

const sub = (a, b) => {
    if (!(typeof a === 'number' || typeof a === 'string') || 
        !(typeof b === 'number' || typeof b === 'string')) {
        return undefined;
    }
    return +a - +b;
}

const mul = (a, b) => {
    if (!(typeof a === 'number' || typeof a === 'string') || 
        !(typeof b === 'number' || typeof b === 'string')) {
        return undefined;
    }
    return +a * +b;
}

const div = (a, b) => {
    if (!(typeof a === 'number' || typeof a === 'string') || 
        !(typeof b === 'number' || typeof b === 'string')) {
        return undefined;
    }
    return +b !== 0 ? +a / +b : undefined;
}

module.exports = {
    sum,
    sub,
    mul,
    div
}
