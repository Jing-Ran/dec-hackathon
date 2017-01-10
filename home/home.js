var readmore = document.querySelectorAll(".jt-article-preview__more");
var readMoreArray = [].slice.call(readmore);

var gotoBtn = document.querySelectorAll(".jt-article-preview__goto");

var compress = document.querySelectorAll(".jt-article-preview__btn-compress");
var compressArray = [].slice.call(compress);

var close = document.querySelectorAll(".jt-article-preview__btn-close");
var closeArray = [].slice.call(close);

var content = document.querySelectorAll(".jt-article-preview__content");
var contentWrap = document.querySelectorAll(".jt-article-preview__content-wrap");
var blurbContainer = document.querySelectorAll('.jt-article-preview');
var bg = document.querySelectorAll('.jt-article-preview__bg-wrap');
var pagination = document.querySelector('.jt-pagination');

var header = document.querySelector('header');
var footer = document.querySelector('footer');
var search = document.querySelector('.search-wrap');

for (var i = 0; i < readmore.length; i++) {
  addExpandClickHandler(readmore[i]);
}

function addExpandClickHandler(button) {
  //Get the index of the current button
  var index = readMoreArray.indexOf(button);

  button.addEventListener('click', function() {
    expandArticle(index)
  });
}

for (var j = 0; j < compress.length; j++) {
  addCompressClickHandler(compress[j]);
}

function addCompressClickHandler(button) {
  //Get the index of the current button
  var index = compressArray.indexOf(button);

  button.addEventListener('click', function() {
    closeArticle(index);
  })
}

for (var k = 0; k < close.length; k++) {
  addCloseClickHandler(close[k]);
}

function addCloseClickHandler(button) {
  //Get the index of the current button
  var index = closeArray.indexOf(button);

  button.addEventListener('click', function() {
    closeArticle(index);
  })
}


function hideRest(index) {
  header.style.visibility = "hidden";
  footer.style.opacity = 0;
  search.style.display = "none";
  pagination.style.display = "none";

  for (var i = 0; i < readMoreArray.length; i++) {
    if (index !== i) {
      blurbContainer[i].style.display = "none";
    }
  }
}

function displayAll(index) {
  header.style.visibility = "visible";
  footer.style.opacity = 1;
  search.style.display = "block";
  pagination.style.display = "block";

  for (var i = 0; i < readMoreArray.length; i++) {
    if (index !== i) {
      blurbContainer[i].style.display = "block";
    }
  }
}

var tl = new TimelineMax();

function expandArticle(index) {
  //Hide all other elements
  hideRest(index);

  //Smooth scroll to top
  TweenLite.to(window, 0, {
    scrollTo: 0,
    // delay: 0.1
  });

  //Scale background image
  TweenMax.set(bg[index], {
    transformOrigin: "50% 50% 0",
    scale: 1
  });

  TweenMax.to(bg[index], 1, {
    scale: 1.26,
    bottom: '35vh',
    ease: Expo.easeOut
  });

  //Bring selected article to front
  TweenMax.set(blurbContainer, {
    css: {
      'z-index': '300'
    }
  });

  //Bring content up a bit
  TweenMax.to(contentWrap[index], 1, {
    top: -350,
    ease: Expo.easeOut
  });

  //Expand content
  content[index].style.height = "auto";

  TweenMax.from(content[index], 1.7, {
    height: 350,
    ease: Expo.easeIn,
    delay: -0.5
  });

  //Hide readmore button
  TweenMax.to(readmore[index], 0.2, {
    css: {
      opacity: 0
    }
  });
  setTimeout(function() {
    readmore[index].style.visibility = 'hidden';
  }, 500);

  TweenMax.to(gotoBtn[index], 0.2, {
    css: {
      opacity: 0
    }
  });
  setTimeout(function() {
    gotoBtn[index].style.visibility = 'hidden';
  }, 500);

  //Reveal compress article button
  // compress[index].style.display = 'block';
  // TweenMax.to(compress[index], 0.5, {
  //   css: {
  //     opacity: 1
  //   }
  // });
  //Reveal close article button
  TweenMax.to(close[index], 0.5, {
    css: {
      opacity: 1
    }
  });
}

function closeArticle(index) {
  //Hide all other elements
  displayAll(index);

  //Maintain Scroll
  window.scrollTo(0, blurbContainer[index].offsetTop);

  //Scale background image
  TweenMax.to(bg[index], 0.8, {
    scale: 1,
    bottom: 0,
    ease: Expo.easeOut
  });

  //Reset z-index
  TweenMax.set(blurbContainer, {
    css: {
      'z-index': '0'
    }
  });

  //Bring content down a bit
  TweenMax.to(contentWrap[index], 0.8, {
    top: 0,
    ease: Expo.easeOut
  });

  //Compress content
  TweenMax.to(content[index], 0.5, {
    height: 350,
    ease: Expo.easeOut
  });

  //Show readmore button
  TweenMax.to(readmore[index], 0.5, {
    css: {
      opacity: 1
    }
  });
  readmore[index].style.visibility = 'visible';

  TweenMax.to(gotoBtn[index], 0.5, {
    css: {
      opacity: 1
    }
  });
  gotoBtn[index].style.visibility = 'visible';

  //Hide compress article button
  compress[index].style.display = 'none';
  //Hide close article button
  TweenMax.to(close[index], 0.5, {
    css: {
      opacity: 0
    }
  });
}
