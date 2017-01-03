var readmore = document.querySelectorAll(".jt-article-preview__more"),
  readMoreArray = [].slice.call(readmore);

var compress = document.querySelectorAll(".jt-article-preview__btn-compress"),
  compressArray = [].slice.call(compress);

var content = document.querySelectorAll(".jt-article-preview__content"),
  contentWrap = document.querySelectorAll(".jt-article-preview__content-wrap"),
  blurbContainer = document.querySelectorAll('.jt-article-preview'),
  bg = document.querySelectorAll('.jt-article-preview__bg-wrap'),
  pagination = document.querySelector('.jt-pagination');

var header = document.querySelector('header'),
  footer = document.querySelector('footer');

readmore.forEach(addExpandClickHandler);

function addExpandClickHandler(button) {
  //Get the index of the current button
  var index = readMoreArray.indexOf(button);

  button.addEventListener('click', function() {
    expandArticle(index)
  });
}

compress.forEach(addCompressClickHandler);

function addCompressClickHandler(button) {
  //Get the index of the current button
  var index = compressArray.indexOf(button);

  button.addEventListener('click', function() {
    closeArticle(index);
  })
}


function hideRest(index) {
  header.style.visibility = "hidden";
  footer.style.display = "none";
  pagination.style.display = "none";

  for (var i = 0; i < readMoreArray.length; i++) {
    if (index !== i) {
      blurbContainer[i].style.display = "none";
    }
  }
}

function displayAll(index) {
  header.style.visibility = "visible";
  footer.style.display = "block";
  pagination.style.display = "block";

  for (var i = 0; i < readMoreArray.length; i++) {
    if (index !== i) {
      blurbContainer[i].style.display = "block";
    }
  }
}

function expandArticle(index) {
  //Hide all other elements
  hideRest(index);

  //Smooth scroll to top
  TweenLite.to(window, 0.5, {
    scrollTo: 0
  });

  //Scale background image
  TweenMax.set(bg[index], {
    transformOrigin: "50% 50% 0",
    scale: 1
  });

  TweenMax.to(bg[index], 0.5, {
    scale: 2,
    bottom: '35vh',
    ease: Power3.easeOut
  });

  //Bring selected article to front
  TweenMax.set(blurbContainer, {
    css: {
      'z-index': '300'
    }
  });

  //Bring content up a bit
  TweenMax.to(contentWrap[index], 0.5, {
    top: -100,
    ease: Power3.easeOut
  });

  //Expand content
  content[index].style.height = "auto";

  TweenMax.from(content[index], 0.3, {
    height: 350,
    ease: Power3.easeIn
  });

  //Hide readmore button
  TweenMax.to(readmore[index], 0.5, {
    css: {
      opacity: 0
    }
  });
  setTimeout(function() {
  	readmore[index].style.visibility = 'hidden';
  }, 500);

  //Reveal close article button
  compress[index].style.display = 'block';
  TweenMax.to(compress[index], 0.5, {
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
  TweenMax.to(bg[index], 0.5, {
    scale: 1,
    bottom: 0,
    ease: Power3.easeOut
  });

  //Reset z-index
  TweenMax.set(blurbContainer, {
    css: {
      'z-index': '0'
    }
  });

  //Bring content down a bit
  TweenMax.to(contentWrap[index], 0.5, {
    top: 0,
    ease: Power3.easeOut
  });

  //Compress content
  TweenMax.to(content[index], 0.5, {
    height: 350,
    ease: Power3.easeOut
  });

  //Show readmore button
  TweenMax.to(readmore[index], 0.5, {
    css: {
      opacity: 1
    }
  });
  readmore[index].style.visibility = 'visible';

  //Reveal close article button
  compress[index].style.display = 'none';
}
