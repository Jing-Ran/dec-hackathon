/**
 * Created by lenafaure on 11/12/2016.
 */

/* Subscribe button animation */

var subscribeElement = document.querySelector(".lf-subscribe");
var sideForm = document.querySelector('.lf-side-form');
var element1 = document.getElementById('lf-subscribe__element-teaser');
var element2 = document.getElementById('lf-subscribe__element-email');
var element3 = document.getElementById('lf-subscribe__element-firstname');
var element4 =  document.getElementById('lf-subscribe__element-title');
var footerNameInput = document.getElementById('footer-name');
var footerEmailInput = document.getElementById('footer-email');
var closeElement = document.getElementById('lf-subscribe-close');
var thanksElement = document.getElementById('lf-subscribe__element-thanks');

// console.dir(subscribeElement);
// document.addEventListener("click", function () {
//     console.dir(document.documentElement.scrollHeight);
// });

function openSubscribe() {
    tl = new TimelineMax({delay:0.05});
    tl.to(element1,0.7, {ease:Back.easeOut, rotation: -90, x:-55, y:25, transformOrigin: "140% -200%"})
        .to(element2, 0.6, {ease:Back.easeOut, rotation: -90, x:-110,y:73, transformOrigin: "140% -200%"}, "-=0.6")
        .to(element3, 0.5, {ease:Back.easeOut, rotation: -90, x:-160,y:117, transformOrigin: "140% -200%"}, "-=0.5")
        .to(element4, 0.4, {ease:Back.easeOut, rotation: -90, x:-130,y:120, transformOrigin: "126% -250%"}, "-=0.4");

    TweenLite.to(thanksElement, 0, {
        rotation: -90, x:-200, y:200, transformOrigin: "140% -200%"
    });

    element1.className = "lf-subscribe__item lf-subscribe__item__open";
    element1.removeAttribute("onclick");
    element1.setAttribute("onclick", "hideSubscribe()");
}

function closeSubscribe(callback){

    var reverseSubscribe = function(){
        tl.reverse(-0.2, true);

        if(callback){
            callback();
        }
    };

    TweenLite.to(closeElement, 0.7, {
        ease: Back.easeIn,
        rotation: 360,
        delay: 0,
        onComplete: reverseSubscribe
    });

    TweenLite.set(closeElement, {rotation:0});

    element1.removeAttribute("onclick");
    element1.setAttribute("onclick", "openSubscribe()")

    return false;
}

function hideSubscribe(){
    if(!validateSideForm()) {
        return false;
    }

    closeSubscribe(function(){
        thanksElement.style.left = "-150";
        tl2 = new TimelineMax({delay:0.05});

        tl2.to(element1, 0.5, {ease:Power1.easeInOut, y: -150, delay:1})
            .to(thanksElement, 1, {x: -250, opacity:1, ease:Power1.easeInOut})
            .to(thanksElement, 0.5, {opacity:0, ease:Power1.easeInOut, delay:3})
        ;

    });
}
/* End Subscribe button animation */

/*Validation rules*/

function validateSideForm() {
    var nameError = document.querySelector('.lf-side__empty-name');
    var emailError = document.querySelector('.lf-side__empty-email');
    var nameVal = element3.childNodes[1].value;
    var emailVal = element2.childNodes[1].value;

    nameError.innerHTML = '';
    emailError.innerHTML = '';

    return displayErrors(nameError, emailError, nameVal, emailVal);
}

function validateFooterForm() {
    var nameError = document.querySelector('.lf-footer__empty-name');
    var emailError = document.querySelector('.lf-footer__empty-email');
    var nameVal = footerNameInput.value;
    var emailVal = footerEmailInput.value;

    nameError.innerHTML = '';
    emailError.innerHTML = '';

    return displayErrors(nameError, emailError, nameVal, emailVal);
}

function displayErrors(nameError, emailError, nameVal, emailVal) {

    if(isEmpty(nameVal) && isEmpty(emailVal)) {
        nameError.innerHTML = 'Required';
        emailError.innerHTML = 'Required';
        return false;   
    } 

    if (isEmpty (nameVal) && !isEmail(emailVal)) {
        nameError.innerHTML = 'Required';
        emailError.innerHTML = 'Not a valid email';
        return false;
    }

    if (isEmpty(nameVal)) {
        nameError.innerHTML = 'Required';
        return false
    }

    if (isEmpty(nameVal)) {
        nameError.innerHTML = 'Required';
        return false;
    }

    if (isEmpty(emailVal)) {
        emailError.innerHTML = 'Required';
        return false;
    }

    if (!isEmail(emailVal)) {
        emailError.innerHTML = 'Not a valid email';
        return false;

    }

    return true;
}

function isEmail(input) {
        var split = input.split("@"),
            domain = split[1];

        if (input.indexOf("@") === -1) return false // "Not a valid email address";
        if (domain.split(".").length > 2) return false // "Not a valid domain";
        if (domain.indexOf(".") <= 0) return false // "Not a valid domain"; - One period must exist and it cannot be the first character
        if (domain.indexOf(".") > domain.length - 3) return false // "Not a valid domain"; - TLD must be at least two characters

        return true;
    };

function isEmpty(input) {
        if (typeof input !== "string") return false;
        if (input === "") return true;

        var inputArr = input.split("");
        for (var i = 0; i < inputArr.length; i++) {
            if (inputArr[i] !== " ") return false;
        }

        return true;
};