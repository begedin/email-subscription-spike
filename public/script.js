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
    $.post('/', {
      data: {
        email: email,
      },
    }).done(onSuccessfulSubscription).fail(onFailedSubscription);
  }

  function onSuccessfulSubscription() {
    console.log('succesfully subscribed!')
  }

  function onFailedSubscription(error) {
    console.log(error);
    showError(error.responseJSON);
  }

  function showError(errorResponse) {
    var code = errorResponse.code;
    var name = errorResponse.name;

    var $errorElement = $('.error');

    $errorElement.find('.code').html(code);
    $errorElement.find('.name').html(name);

    $errorElement.show();

    window.setTimeout(function() {
      $errorElement.hide();
    }, 2000);
  }
});
