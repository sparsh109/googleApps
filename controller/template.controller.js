const appList = require('../model/applist.model');
const scraper = require('google-play-scraper');

class AuthController {

    getAppListingPage(req, res) {
        var body = this.getExternalData('https://play.google.com/store/apps/collection/topselling_free');
        body.then((data) => {
            res.render('templates/appListing');
        }).catch((data) => {
            res.render('templates/404');
        });
    }

    getExternalData(){
        var promise = new Promise((resolve, reject) => {
            try {
                scraper.list({
                    collection: scraper.collection.TOP_FREE,
                    country: 'In'
                  })
                  .then(result => {
                    result.forEach((data)=>{
                        appList.findOne({
                            appId: data.appId,
                        }).exec((err,findResult)=>{
                            if(err){

                            }else{
                                if(!findResult){
                                    let app = new appList(data);
                                    app.save().then(addResult => {
                                        
                                    }, err => {
                                        throw err;
                                    });
                                }
                            }
                        })
                    })
                    resolve(true);
                }, err => {
                    throw err;
                });
            } catch (error) {
                reject(error)
            }
        })
        return promise;
    }

    appDetailsPage(req, res){
        res.render('templates/app-details');
    }

    notFound(req, res){
        res.render('templates/404');
    }

}

module.exports = AuthController;