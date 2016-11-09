$(function() {
  $(window).on('load', function() {
    stickyFooter();
  });
  $(window).on('resize', function() {
    stickyFooter();
  });
  $('#signup_form .input--email, #login_form .input--email').on('keyup', function() {
    var md5_email = md5($(this).val().toLowerCase().replace(/ /g,''));
    $('.profile-img').attr('src', 'https://www.gravatar.com/avatar/' + md5_email +'?s=500&d=https://cosmicjs.com/images/logo-3.jpg');
  });
  $('#signup_form').on('submit', function() {
    var data = $(this).serializeFormJSON();
    data.full_name = data.first_name + ' ' + data.last_name;
    // Do some validation
    $('.form-control').removeClass('has-error');
    $('.error-message').addClass('hidden');
    $('.error-message--email').addClass('hidden');
    if (!data.first_name) {
      $('.input--first-name').addClass('has-error');
      $('.error-message').removeClass('hidden');
      return false;
    }
    if (!data.last_name) {
      $('.input--last-name').addClass('has-error');
      $('.error-message').removeClass('hidden');
      return false;
    }
    if (!data.email || !isValidEmail(data.email)) {
      $('.input--email').addClass('has-error');
      $('.error-message--email').removeClass('hidden');
      return false;
    }
    if (!data.password) {
      $('.input--password').addClass('has-error');
      $('.error-message').removeClass('hidden');
      return false;
    }
    $('.error-message').addClass('hidden');
    $('.success-message').addClass('hidden');
    $('.submit-btn').addClass('disabled');
    $('.submit-btn').text('Submitting...');
    $.ajax({
      url: '/users',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data)
    }).success(function(){
      $('.submit-btn').removeClass('disabled');
      $('.submit-btn').text('Submit');
      $('.success-message').removeClass('hidden');
      $('.signup-form__inputs').remove();
    }).error(function(response){
      $('.error-message').removeClass('hidden');
      $('.error-message').text(response.responseJSON.message);
      $('.submit-btn').removeClass('disabled');
      $('.submit-btn').text('Submit');
    });
    return false;
  });
  $('#login_form').on('submit', function() {
    var data = $(this).serializeFormJSON();
    // Do some validation
    $('.form-control').removeClass('has-error');
    if (!data.email || !isValidEmail(data.email)) {
      $('.input--email').addClass('has-error');
      $('.error-message--email').removeClass('hidden');
      return false;
    }
    if (!data.password) {
      $('.input--password').addClass('has-error');
      $('.error-message').removeClass('hidden');
      return false;
    }
    $('.error-message, .error-message--email').addClass('hidden');
    $('.success-message').addClass('hidden');
    $('.submit-btn').addClass('disabled');
    $('.submit-btn').text('Submitting...');
    $.ajax({
      url: '/auth',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data)
    }).success(function(){
      window.location.href = '/users';
    }).error(function(response){
      $('.error-message').removeClass('hidden');
      $('.error-message').text(response.responseJSON.message);
      $('.submit-btn').removeClass('disabled');
      $('.submit-btn').text('Submit');
    });
    return false;
  });
});
// Functions
function stickyFooter(){  
  var windowHeight = $(window).height();
  if(windowHeight > $('#footer').height() + $('#header').height() + $('#main').height()){
    $('#footer').addClass('sticky');
  } else {
    $('#footer').removeClass('sticky');
  }
  $('#footer').removeClass('invisible');
}
(function ($) {
  $.fn.serializeFormJSON = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
})(jQuery);
function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function friendlyDate(a) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = days[a.getDay()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = {
    day: day,
    date: date,
    month: month,
    year: year,
    hour: hour,
    min: min,
    sec: sec
  }
  return time;
}