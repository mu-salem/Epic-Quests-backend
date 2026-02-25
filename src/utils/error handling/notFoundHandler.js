export default (req, res, next) => next(new Error("API not found!"), { cause: 404 });
