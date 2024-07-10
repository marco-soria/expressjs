const log = (req, res, next) => {
    console.log('Logging...');
    next();
}

export { log };