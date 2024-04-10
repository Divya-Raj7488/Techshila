const corsOptions = {
    origin : 'http://localhost:5173/',
    method:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 1000
};
module.exports = corsOptions;
