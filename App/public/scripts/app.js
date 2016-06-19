'use strict';

/* eslint no-undef: 0 */

Slickr.createElements = function() {
  Slickr.utils.log('createElements', []);
  var imageContainer = $('<div></div>').addClass('image');
  var imageTitle = $('<div></div>');
  var imageElement = $('<img/>');
  var anchorElement = $('<a></a>');
  var ownerName = $('<div></div>');
  var tags = $('<div class="tags"></div>');

  return {
    imageContainer: imageContainer,
    imageTitle: imageTitle,
    imageElement: imageElement,
    anchorElement: anchorElement,
    ownerName: ownerName,
    tags: tags
  };
};

Slickr.createImage = function(photo, imageElement) {
  Slickr.utils.log('createImage', ['photo', photo]);
  imageElement
    .attr('src', Slickr.makePhotoUrl(photo))
    .attr('title', photo.title)
    .attr('alt', photo.title)
    .attr('height', Slickr.env.imageProperties.height);
  return imageElement;
};

Slickr.createImageTitle = function(title, element) {
  Slickr.utils.log('createImageTitle', ['title', title]);
  var imageTitle = element;
  imageTitle.addClass('image-title');
  imageTitle.text(title);
  return imageTitle;
};

Slickr.getContainer = function() {
  Slickr.utils.log('getContainer', []);
  return $('#' + Slickr.env.imageProperties.containerId);
};

Slickr.createOwnerName = function(photo, element) {
  Slickr.utils.log('createOwnerName', ['photo', photo, 'element', element]);
  element.text(photo.ownername);
  element.addClass('owner-name');
  return element;
};

Slickr.appendImageToContainer = function(photo) {
  Slickr.utils.log('appendImageToContainer', ['photo', photo]);
  var createdElements = Slickr.createElements();
  var ownerName = Slickr.createOwnerName(photo, createdElements.ownerName);
  var img = Slickr.createImage(photo, createdElements.imageElement);
  var a = Slickr.createAnchor(photo, createdElements.anchorElement);
  var imageContainer = createdElements.imageContainer;
  var title = photo.title;
  var anchoredImage = Slickr.appendImageToAnchor(img, a);
  var imageTitle = Slickr.createImageTitle(title, createdElements.imageTitle);
  var tags = createdElements.tags;
  tags.text(photo.tags);
  imageContainer.append(anchoredImage);
  imageContainer.append(ownerName);
  imageContainer.append(imageTitle);
  imageContainer.append(tags);
  Slickr.getContainer().append(imageContainer);
  return imageContainer;
};

Slickr.createAnchor = function(photo, anchorElement) {
  Slickr.utils.log('createAnchor', ['photo', photo]);
  anchorElement.attr('href', Slickr.makeLinkUrl(photo));
  return anchorElement;
};

Slickr.makePhotoUrl = function(photo) {
  Slickr.utils.log('makePhotoUrl', ['photo', photo]);
  return "http://farm" + photo.farm + ".static.flickr.com/" +
    photo.server + "/" + photo.id + "_" + photo.secret + "_t.jpg";
};

Slickr.appendImageToAnchor = function(image, anchor) {
  Slickr.utils.log('appendImageToAnchor', ['image', image, 'anchor', anchor]);
  anchor.append(image);
  return anchor;
};

Slickr.makeLinkUrl = function(photo) {
  Slickr.utils.log('makeLinkUrl', ['photo', photo]);
  return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
};

Slickr.appendImages = function(photos) {
  Slickr.utils.log('appendImages', ['photos', photos]);
  for (var i = 0, len = photos.length; i < len; i++) {
    Slickr.appendImageToContainer(photos[i]);
  }
};

Slickr.tagCloud = {
  wordFrequency: function(tokensArray) {
    Slickr.utils.log('wordFrequency', ['tokensArray', tokensArray]);
    var frequency = {};
    for (var i = 0, len = tokensArray.length; i < len; i++) {
      var tokens = Slickr.utils.split(tokensArray[i]);
      for (var j = 0; j < tokensArray.length; j++) {
        if (frequency[tokens[j]] >= 1) {
          frequency[tokens[j]] += 1;
        } else {
          frequency[tokens[j]] = 1;
        }
      }
    }
    return frequency;
  }
};

Slickr.titles = {
  splittedTitles: function(titles) {
    Slickr.utils.log('splittedTitles', ['titles', titles]);
    var splittedTitles = Slickr.tagCloud.wordFrequency(titles);
    return splittedTitles;
  },
  appendTitles: function(titles) {
    Slickr.utils.log('appendTitles', ['titles', titles]);
    var titlesContainer = $('section.titles.tag-cloud');
    var titleCloudData = Slickr.titles.splittedTitles(titles);
    for (var title in titleCloudData) {
      if (titleCloudData.hasOwnProperty(title)) {
        var element = $('<span class="title"></span>');
        element
          .text(title)
          .attr('data-count', titleCloudData[title]);
        titlesContainer.append(element);
      }
    }
  }
};

Slickr.tags = {
  splittedTags: function(tags) {
    Slickr.utils.log('splittedTags', ['tags', tags]);
    var splittedTags = Slickr.tagCloud.wordFrequency(tags);
    return splittedTags;
  },
  appendTags: function(tags) {
    Slickr.utils.log('appendTags', ['tags', tags]);
    var tagsContainer = $('section.tags.tag-cloud');
    var tagCloudData = Slickr.tags.splittedTags(tags);
    for (var tag in tagCloudData) {
      if (tagCloudData.hasOwnProperty(tag)) {
        var element = $('<span class="tag"></span>');
        element
          .text(tag)
          .attr('data-count', tagCloudData[tag]);
        tagsContainer.append(element);
      }
    }
  }
};

Slickr.onResponseFromFlickrApi = function(res) {
  Slickr.utils.log('onResponseFromFlickrApi', ['res', res]);
  var photos = [];
  var titles = [];
  var tags = [];
  var photo;
  for (var i = 0, len = res.photos.photo.length; i < len; i++) {
    photo = res.photos.photo[i];
    photos.push(photo);
    titles.push(photo.title.toLowerCase());
    tags.push(photo.tags.toLowerCase());
  }
  Slickr.titles.appendTitles(titles);
  Slickr.tags.appendTags(tags);
  Slickr.appendImages(photos);
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
    pageCount: '1',
    imagesPerPage: '100'
  };
  script.src = Slickr.createFlickrUrl(options);
  /* eslint-disable no-undef */
  document.getElementById('scripts').appendChild(script);
  /* eslint-enable no-undef */
})();

$(function() {
  $('#titlesToggleBtn').on('click', function() {
    $('.titles.tag-cloud').toggleClass('display');
  });
  $('#tagsToggleBtn').on('click', function() {
    $('.tags.tag-cloud').toggleClass('display');
  });
});
