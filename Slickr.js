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
            if(typeof item === typeof 'string'){
                return item;
            } else {
                return JSON.stringify(item);
            }
        }).join(' ');
        console.log(functionName, 'called with', paramString);
    }
};

Slickr.appendImageToContainer = function (photo) {
    Slickr.log('appendImageToContainer', [ 'photo', photo ]);
    var img = Slickr.createImage(photo);
    var a = Slickr.createAnchor(photo);
    var title = photo.title;
    var anchoredImage = Slickr.appendImageToAnchor(img, a);
    var container = document.getElementById(Slickr.imageProperties.containerId);
    var imageContainer = document.createElement('div');
    imageContainer.className += 'image';
    imageContainer.appendChild(anchoredImage);
    var imageTitle = document.createElement('div');
    imageTitle.className += 'image-title';
    imageTitle.innerText = title;
    imageContainer.appendChild(imageTitle);
    container.appendChild(imageContainer);
    return imageContainer;
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
    var photo;
    for (var i = 0, len = res.photos.photo.length; i < len; i++) {
        photo = res.photos.photo[i];
        photos.push(Slickr.appendImageToContainer(photo));
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
        imagesPerPage: '20'
    };
    script.src = Slickr.createFlickrUrl(options);
    document.getElementById('scripts').appendChild(script);
})();
