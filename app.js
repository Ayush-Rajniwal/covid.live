const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;
const animation = require('./animation/frames');


const getData = async (country) => {
    const val = await axios.get(`https://api.covid19api.com/total/country/${country}`)
        .catch((err) => {

        })

    //Handle Error
    if (val === undefined)
        return undefined
    //All good return latest data
    return val.data[val.data.length - 1];
}

app.get('/', async (req, res, next) => {

    //if user is not curl render html page
    if (req.headers["user-agent"].search('curl') == -1)
        next();
    else
        await animation.renderError(req, res);

})

app.use(express.static('static'))
app.get('/:country', async (req, res, next) => {
    const data = await getData(req.params.country);
    if (data === undefined)
        await animation.renderError(req, res);
    else {
        await animation.render(req, res, data);
    }

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))