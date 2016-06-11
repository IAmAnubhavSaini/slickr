'use strict';

var imageProperties = {
    height: 120,
    containerId: 'slick-images'
};
window.EXEC_ENV = 'DEV';
function log(functionName, paramList) {
    if(window.EXEC_ENV === 'DEV'){
        var paramString = paramList.map(function (item){
            if(typeof item === typeof ''){
                return item;
            } else {
                return JSON.stringify(item);
            }
        }).join(' ');
        console.log(functionName, 'called with', paramString);
    }
}
function appendImageToContainer(slickImage) {
    log('appendImageToContainer', [ 'slickImage', slickImage ]);
    var container = document.getElementById(imageProperties.containerId);
    container.appendChild(slickImage);
}
function createAnchor(photo) {
    log('createAnchor', [ 'photo', photo ]);
    var anchor = document.createElement('a');
    anchor.href = makeLinkUrl(photo);
    return anchor;
}
function createImage(photo, title) {
    log('createImage', [ 'photo', photo, 'title', title ]);
    var image = document.createElement('img');
    image.src = makePhotoUrl(photo);
    image.title = title;
    image.alt = title;
    image.height = imageProperties.height;
    return image;
}
function appendImageToAnchor(image, anchor) {
    log('appendImageToAnchor', [ 'image', image, 'anchor', anchor ]);
    anchor.appendChild(image);
    return anchor;
}
function makePhotoUrl(photo){
    log('makePhotoUrl',[ 'photo', photo ]);
    return "http://farm" + photo.farm + ".static.flickr.com/" +
        photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
}
function makeLinkUrl(photo){
    log('makeLinkUrl',[ 'photo', photo ]);
    return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
}
function onResponseFromFlickrApi(res){
    log('onResponseFromFlickrApi', [ 'res', res ]);
    var photos = [];
    var photo, anchoredImage;
    for (var i = 0, len = res.photos.photo.length; i < len; i++) {
        photo = res.photos.photo[i];
        anchoredImage = appendImageToAnchor(createImage(photo), createAnchor(photo));
        appendImageToContainer(anchoredImage);
        photos.push(anchoredImage);
    }
    return photos;
}
function jsonFlickrApi(res){
    log('jsonFlickrApi', [ 'res', res ]);
    onResponseFromFlickrApi(res);
}
