const errorDestinaiton = (err,req,res,next) => {

    if(err.code === 11000){
        return res.json({
            message : Object.keys(err.keyValue) + "için girdiğiniz" + Object.values(err.keyValue) +
            "daha önceden veritabaında olduğu için tekrar eklenemez/güncelenemez unique olmalıdır",
            erroCode: 400
        })
    }
    if(err.code === 66){
        return res.json({
            message: "Değiştirilemez bir alanı güncellemeye çalıştınız",
            errorCode : 400
        });
    }
    res.status(err.statusCode || 500);
    res.json({
        errorCode: err.statusCode || 400,
        mesaj: err.message
    })
}

module.exports = errorDestinaiton;