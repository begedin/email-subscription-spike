# README

This is an example of subscribing to a mailchimp list using the API, so single opt-in is allowed.

## Requirements

### The client uses a simple ajax call

We make a POST call using jquery, to an endpoint on the backend.

This allows us to rely on `.done` and `.fail` as callbacks for a successful or failed subscription.

### The backend is required

The way I see it, we have two choices.

#### First choice

We do not use a third party service as Mailchimp and instead just simply store a list of e-mails somewhere on the backend. We have a list, but we don't have other stuff a service like Mailchimp would offer us.

#### Second choice

We use a third party service - Mailchimp. Ideally, this would mean we can avoid using our own backend, but in practice, this isn't allowed by 3rd party services, Mailchimp included.

The reason for that is that Mailchimp doesn't allow cross-domain ajax requests, because something like that would mean our API key and thus the security of our users would be compromised. While there is a workaround, which we used on the TalkingCode website, it relies on an undocumented feature, is unsafe, and as far as I can tell, doesn't allow for single opt-ins.

Using the API allows for single opt-ins, but requires us to make the subscription request from our own backend.

## What was used

Simple `index.html` and `script.js` served from the `/public` folder of a `rails-api` application.

All actions are defined in the `ApplicationController`.

We use `Gibbon` as a wrapper for the MailChimp API. Gibbon currently relies on version 2.0 of the API, even though the current version is 3.0. However, I checked and single opt-in continues to be possible with 3.0, so I'm not expecting issues.

We use `dotenv` to use an .env file where our MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID are stored.

The `application#create` action initializes Gibbbon and sends a subscribe request. If there's an error raised, it gets rendered unmodified for now.

### Files to focus on

* `public/index.html`
* `public/script.js
* `app/controllers/application_controller.rb`
* `config/routes.rb`
* `Gemfile`

Everything else was just auto-generated and isn't important for the functionality.

## How single opt-in was achieved

By passing in a property to the `Gibbon::lists#subscribe` method:

```Ruby
gb = Gibbon::API.new(ENV["MAILCHIMP_API_KEY"])
gb.lists.subscribe({
  id: ENV["MAILCHIMP_LIST_ID"],
  email: { email: email },
  double_optin: false
})
```

This method is the equivalent of a pure MailChimp 2.0 API call to ['lists/subscribe'](https://apidocs.mailchimp.com/api/2.0/lists/subscribe.php).

In MailChimp 3.0 API, enabling single opt-in is even simpler and requires POST-ing a payload to `<server-specific-api-url>/3.0/lists/<list-id>/members/` in the form of:

```JSON
{
    "email_address": "urist.mcvankab@freddiesjokes.com",
    "status": "subscribed"
}
```

However, I was unable to find a gem wrapper for the 3.0 version of the API. Since `gibbon` is one of the bigger MailChimp gems around, I'm expecting it to support API 3.0 at some point soon, so I decided to go with it.