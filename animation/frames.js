const { Readable } = require('stream');
const chalk = require('chalk');

const frames = (data) => {
    return [
        ``,
        chalk.bgCyan(`  COVID Tracker in Console  `),
        ``,
        `Country:       ${chalk.bold(data.Country)}`,
        ``,
        `Date:          ${data.Date}`,
        ``,
        `${chalk.blueBright('Confirmed')}:     ${chalk.bgBlue(' ' + data.Confirmed + ' ')}`,
        ``,
        `${chalk.yellow('Active')}:        ${chalk.bgYellow(' ' + data.Active + ' ')}`,
        ``,
        `${chalk.red('Deaths')}:        ${chalk.bgRed(' ' + data.Deaths + ' ')}`,
        ``,
        `${chalk.green('Recovered')}:     ${chalk.bgGreen(' ' + data.Recovered + ' ')}`,
        ``,
        `Github:        ${chalk.underline("https://github.com/Ayush-Rajniwal")}`,
        ``,
        `${chalk.bgMagentaBright("  Crafted By:    Ayush Rajniwal  ")}`
    ]
}


const renderError = async (req, res) => {
    const stream = new Readable();
    stream._read = () => { };
    stream.pipe(res);
    stream.push(`${chalk.bgRedBright('No Country Found\n')}`);
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