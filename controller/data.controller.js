const appList = require('../model/applist.model');
const scraper = require('google-play-scraper');

class dataController {

    getAllApps(req, res) {
        appList.find({}).exec((err,data)=>{
            if(err){
                res.render('templates/404');
            }else{
                res.status(200).json({
                    status: 1,
                    data:data
                })
            }
        })
    }

    appDetails(req, res){
        scraper.app({
            appId: req.query.pkg,
            country: 'In'
          })
          .then(result => {
            res.status(200).json({
                status: 1,
                data: result,
            })
        }, err => {
            res.render('templates/404');
        });
    }

}

module.exports = dataController;