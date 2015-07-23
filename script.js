$(document).ready(function() {
  var $subscriptionForm = $('#subscription-form');

  $subscriptionForm.submit(function(event) {
    event.preventDefault();
    var formData = serializeFormDataIntoObject($subscriptionForm);
    subscribeWithMailChimpAPI(formData.email);
  });

  function serializeFormDataIntoObject($form) {
    return $form.serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
  }

  function subscribeWithMailChimpAPI(email) {
    var apiEndpoint = 'https://us2.api.mailchimp.com/3.0/';
    var listID = '755721';
    var apiKey = 'fcf1fe7877d9d22f04c9650215438e74-us2';
    var crossDomainFlag = '?c=?';
    var listEndpoint = apiEndpoint + 'lists/' + listID + '/members/';// + crossDomainFlag;

    $.post(listEndpoint, {
      data: {
        username: 'subscribe-form-spike',
        password: apiKey,
        email_address: email,
        status: 'subscribed'
      },
      crossDomain: true,
      dataType: 'json'
    }).done(onSuccessfulSubscription).fail(onFailedSubscription);
  }

  function onSuccessfulSubscription() {
    var i = 0;
  }

  function onFailedSubscription() {
    var i = 0;
  }
});
