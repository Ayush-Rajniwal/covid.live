const { Readable } = require('stream');
const style = require('ansi-styles');
const frames = (data) => {
    return [
        ``,
        `${style.bgCyan.open}  COVID Updates in Console  ${style.bgCyan.close}`,
        ``,
        `Country:       ${style.bold.open}${data.Country}${style.bold.close}`,
        ``,
        `Date:          ${data.Date}`,
        ``,
        `${style.blueBright.open}Confirmed${style.blueBright.close}:     ${style.bgBlue.open} ${data.Confirmed} ${style.bgBlue.close}`,
        ``,
        `${style.yellow.open}Active${style.yellow.close}:        ${style.bgYellow.open} ${data.Active} ${style.bgYellow.close}`,
        ``,
        `${style.red.open}Deaths${style.red.close}:        ${style.bgRed.open} ${data.Deaths} ${style.bgRed.close}`,
        ``,
        `${style.green.open}Recovered${style.green.close}:     ${style.bgGreen.open} ${data.Recovered} ${style.bgGreen.close}`,
        ``,
        `Github:        ${style.underline.open}https://github.com/Ayush-Rajniwal/covid.live/${style.underline.close}`,
        ``,
        `${style.bgMagentaBright.open} Crafted By:    Ayush Rajniwal${style.bgMagentaBright.close}`
    ]
}


const renderError = async (req, res) => {
    const stream = new Readable();
    stream._read = () => { };
    stream.pipe(res);
    stream.push(`${style.red.open}No Country Found!${style.red.close}\n`);
    stream.push(null)
}

const render = async (req, res, data) => {
    const stream = new Readable();
    stream._read = () => { };
    stream.pipe(res);
    let screen = frames(data);
    for (let i = 0; i < screen.length; i++) {
        stream.push(screen[i] + '\n')

    }
    stream.push(null)
}



module.exports = {
    renderError,
    render
}