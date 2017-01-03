/**
 * Created by lenafaure on 11/12/2016.
 */

/* Subscribe button animation */

function openSubscribe(){
    document.getElementById('lf-subscribe__element-teaser').className ='lf-subscribe__element animate-open-1';
    setTimeout(function () {
        document.getElementById('lf-subscribe__element-email').className ='lf-subscribe__element animate-open-2';
    }, 50);
    setTimeout(function () {
        document.getElementById('lf-subscribe__element-firstname').className ='lf-subscribe__element animate-open-3';
    }, 100);
    setTimeout(function () {
        document.getElementById('lf-subscribe__element-title').className ='lf-subscribe__element animate-open-4';
    }, 150);
}

function closeSubscribe(){
    document.getElementById('lf-subscribe__element-title').className ='lf-subscribe__element animate-close-4';
    setTimeout(function () {
        document.getElementById('lf-subscribe__element-firstname').className ='lf-subscribe__element animate-close-3';
    }, 50);
    setTimeout(function () {
        document.getElementById('lf-subscribe__element-email').className ='lf-subscribe__element animate-close-2';
    }, 100);
    setTimeout(function () {
        document.getElementById('lf-subscribe__element-teaser').className ='lf-subscribe__element animate-close-1';
    }, 150);
}

/* End Subscribe button animation */