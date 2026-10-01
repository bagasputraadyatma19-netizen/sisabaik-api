export function catatRequest(req, res, next) {
  const mulai = Date.now();

  res.on("finish", () => {
    const durasi = Date.now() - mulai;

    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${durasi}ms`
    );
  });

  next();
}