'use strict';

var Slickr = {};

Slickr.imageProperties = {
    height: 120,
    containerId: 'slick-images'
};

Slickr.EXEC_ENV = 'DEV';
Slickr.log = function (functionName, paramList) {
    if(Slickr.EXEC_ENV === 'DEV'){
        var paramString = paramList.map(function (item){
            if(typeof item === typeof ''){
                return item;
            } else {
                return JSON.stringify(item);
            }
        }).join(' ');
        console.log(functionName, 'called with', paramString);
    }
};

Slickr.appendImageToContainer = function (slickImage) {
    Slickr.log('appendImageToContainer', [ 'slickImage', slickImage ]);
    var container = document.getElementById(Slickr.imageProperties.containerId);
    container.appendChild(slickImage);
};

Slickr.createAnchor = function (photo) {
    Slickr.log('createAnchor', [ 'photo', photo ]);
    var anchor = document.createElement('a');
    anchor.href = Slickr.makeLinkUrl(photo);
    return anchor;
};

Slickr.makePhotoUrl = function (photo){
    Slickr.log('makePhotoUrl',[ 'photo', photo ]);
    return "http://farm" + photo.farm + ".static.flickr.com/" +
    photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
};

Slickr.createImage = function (photo) {
    Slickr.log('createImage', [ 'photo', photo ]);
    var image = document.createElement('img');
    image.src = Slickr.makePhotoUrl(photo);
    image.title = photo.title;
    image.alt = photo.title;
    image.height = Slickr.imageProperties.height;
    return image;
};

Slickr.appendImageToAnchor = function (image, anchor) {
    Slickr.log('appendImageToAnchor', [ 'image', image, 'anchor', anchor ]);
    anchor.appendChild(image);
    return anchor;
};

Slickr.makeLinkUrl = function (photo){
    Slickr.log('makeLinkUrl',[ 'photo', photo ]);
    return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
};

Slickr.onResponseFromFlickrApi = function (res){
    Slickr.log('onResponseFromFlickrApi', [ 'res', res ]);
    var photos = [];
    var photo, anchoredImage;
    for (var i = 0, len = res.photos.photo.length; i < len; i++) {
        photo = res.photos.photo[i];
        anchoredImage = Slickr.appendImageToAnchor(Slickr.createImage(photo), Slickr.createAnchor(photo));
        Slickr.appendImageToContainer(anchoredImage);
        photos.push(anchoredImage);
    }
    return photos;
};

function jsonFlickrApi (res){
    Slickr.log('jsonFlickrApi', [ 'res', res ]);
    Slickr.onResponseFromFlickrApi(res);
}

Slickr.createFlickrUrl = function (options) {
    Slickr.log('createFlickrUrl', [
        'options', options
    ]);
    var m = options.method;
    var key = options.apiKey;
    var fmt = options.format;
    var pc = options.pageCount || '1';
    var ipp = options.imagesPerPage || '10';

    return [
        'https://api.flickr.com/services/rest/?method=', m,
        '&api_key=', key,
        '&per_page=', ipp,
        '&page=', pc,
        '&format=', fmt
    ].join('');
};

(function intializeSlickr(){
    var script = document.createElement('script');
    var options = {
        method: 'flickr.photos.getRecent',
        apiKey: '84bf9b29bce8db001d1e58dbec8a5770',
        format: 'json',
        pageCount: '1',
        imagesPerPage: '10'
    };
    script.src = Slickr.createFlickrUrl(options);
    document.getElementById('scripts').appendChild(script);
})();
