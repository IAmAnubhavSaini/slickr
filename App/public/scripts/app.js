'use strict';

/* eslint no-undef: 0 */

Slickr.createElements = function() {
  Slickr.utils.log('createElements', []);
  /* eslint-disable no-undef */
  var imageContainer = document.createElement('div');
  var imageTitle = document.createElement('div');
  var imageElement = document.createElement('img');
  var anchorElement = document.createElement('a');
  /* eslint-enable no-undef */

  return {
    imageContainer: imageContainer,
    imageTitle: imageTitle,
    imageElement: imageElement,
    anchorElement: anchorElement
  };
};

Slickr.createImage = function(photo, imageElement) {
  Slickr.utils.log('createImage', ['photo', photo]);
  var image = imageElement;
  image.src = Slickr.makePhotoUrl(photo);
  image.title = photo.title;
  image.alt = photo.title;
  image.height = Slickr.env.imageProperties.height;
  return image;
};

Slickr.createImageContainer = function(imageContainer) {
  Slickr.utils.log('createImageContainer', ['imageContainer', imageContainer]);
  imageContainer.className += 'image';
  return imageContainer;
};

Slickr.createImageTitle = function(title, element) {
  Slickr.utils.log('createImageTitle', ['title', title]);
  var imageTitle = element;
  imageTitle.className += 'image-title';
  imageTitle.innerText = title;
  return imageTitle;
};

Slickr.getContainer = function() {
  Slickr.utils.log('getContainer', []);
  return document.getElementById(Slickr.env.imageProperties.containerId);
};

Slickr.appendImageToContainer = function(photo) {
  Slickr.utils.log('appendImageToContainer', ['photo', photo]);
  var createdElements = Slickr.createElements();
  var img = Slickr.createImage(photo, createdElements.imageElement);
  var a = Slickr.createAnchor(photo, createdElements.anchorElement);
  var imageContainerElement = createdElements.imageContainer;
  var title = photo.title;
  var anchoredImage = Slickr.appendImageToAnchor(img, a);
  var imageTitle = Slickr.createImageTitle(title, createdElements.imageTitle);
  var imageContainer = Slickr.createImageContainer(imageContainerElement); 
  imageContainer.appendChild(anchoredImage);
  imageContainer.appendChild(imageTitle);
  Slickr.getContainer().appendChild(imageContainer);
  return imageContainer;
};

Slickr.createAnchor = function(photo, anchorElement) {
  Slickr.utils.log('createAnchor', ['photo', photo]);
  anchorElement.href = Slickr.makeLinkUrl(photo);
  return anchorElement;
};

Slickr.makePhotoUrl = function(photo) {
  Slickr.utils.log('makePhotoUrl', ['photo', photo]);
  return "http://farm" + photo.farm + ".static.flickr.com/" +
    photo.server + "/" + photo.id + "_" + photo.secret + "_t.jpg";
};

Slickr.appendImageToAnchor = function(image, anchor) {
  Slickr.utils.log('appendImageToAnchor', ['image', image, 'anchor', anchor]);
  anchor.appendChild(image);
  return anchor;
};

Slickr.makeLinkUrl = function(photo) {
  Slickr.utils.log('makeLinkUrl', ['photo', photo]);
  return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
};

Slickr.onResponseFromFlickrApi = function(res) {
  Slickr.utils.log('onResponseFromFlickrApi', ['res', res]);
  var photos = [];
  var photo;
  for (var i = 0, len = res.photos.photo.length; i < len; i++) {
    photo = res.photos.photo[i];
    photos.push(Slickr.appendImageToContainer(photo));
  }
  return photos;
};

/* eslint-disable no-unused-vars */
/**
 * Flickr API callbacks this function by default.
 * @param {object} res - object containing data.
 * @return {object} res - same object that it receives for verifiability.
 */
function jsonFlickrApi(res) {
  Slickr.utils.log('jsonFlickrApi', ['res', res]);
  Slickr.onResponseFromFlickrApi(res);
  return res;
}

/* eslint-enable no-unused-vars */
Slickr.createFlickrUrl = function(options) {
  Slickr.utils.log('createFlickrUrl', [
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
    '&extras=date_upload%2C+tags%2C+owner_name',
    '&per_page=', ipp,
    '&page=', pc,
    '&format=', fmt
  ].join('');
};

(function intializeSlickr() {
  Slickr.env.setToDev();
  Slickr.utils.log('intializeSlickr');
  /* eslint-disable no-undef */
  var script = document.createElement('script');
  /* eslint-enable no-undef */
  var options = {
    method: 'flickr.photos.getRecent',
    apiKey: '84bf9b29bce8db001d1e58dbec8a5770',
    format: 'json',
    pageCount: '4',
    imagesPerPage: '500'
  };
  script.src = Slickr.createFlickrUrl(options);
  /* eslint-disable no-undef */
  document.getElementById('scripts').appendChild(script);
  /* eslint-enable no-undef */
})();
