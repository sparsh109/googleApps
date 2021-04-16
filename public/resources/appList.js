const appListModel = {

    googleApps: ko.observableArray(),

    getAppListing: () => {
        $.get('/apps',{}).then((result)=>{
            if(result && result.status == 1){
                appListModel.googleApps($.map(result.data, (app)=>{
                    return new appModel(app);
                }))
            }
        },(err)=>{
            window.location.href = '/404';
        })
    }
}

function appModel(app){
    this._id = ko.observable(app._id);
    this.appId = ko.observable(app.appId);
    this.developer = ko.observable(app.developer);
    this.icon = ko.observable(app.icon);
    this.score = ko.observable(app.score);
    this.title = ko.observable(app.title);
}
appListModel.getAppListing()
ko.applyBindings(appListModel, $('#mainBody')[0]);