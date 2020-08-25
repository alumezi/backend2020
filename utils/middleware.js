
const morgan = require('morgan')
// app.use(morgan('tiny'));
morgan.token('returnData', (request) => request.body)

const morganLogger = morgan((tokens, req, res) =>
    [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        JSON.stringify(tokens.returnData(req)),
    ].join(' ')
)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    return next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    morganLogger
} 
