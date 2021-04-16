const appDetailsModel = {

    googleApps: ko.observableArray(),

    getAppDetail: () => {
        $.get(`/get-app-detail?pkg=${new URLSearchParams(window.location.search).get('pkg')}`,{}).then((result)=>{
            if(result && result.status == 1 && result.data){
                appDetailsModel.googleApps(new appModel(result.data));
            }
        },(err)=>{
            window.location.href = '/404';
        })
    }
}

function appModel(data){
    this.icon = ko.observable(data.icon ? data.icon : '' );
    this.developer = ko.observable(data.developer ? data.developer : "NA");
    this.genre = ko.observable(data.genre ? data.genre : "NA");
    this.screenshots = ko.observableArray(data.screenshots);
    this.size = ko.observable(data.size ? data.size : "NA");
    this.ratings = ko.observable(data.ratings ? data.ratings : "NA");
    this.installs = ko.observable(data.installs ? data.installs : "NA");
    this.title = ko.observable(data.title ? data.title : "NA");
    this.video = ko.observable(data.video ? data.video : "");
    this.androidVersionText = ko.observable(data.androidVersionText ? data.androidVersionText : "NA");
    this.version = ko.observable(data.version ? data.version : "NA")
}
if(new URLSearchParams(window.location.search).has('pkg'))
    appDetailsModel.getAppDetail()
ko.applyBindings(appDetailsModel, $('#mainBody')[0]);