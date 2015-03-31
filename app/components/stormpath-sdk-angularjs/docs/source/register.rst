.. _register:

Create the Registration Form
===================

We want our users to sign up for our service, so we need to provide a Registration
form.  The Stormpath Angular SDK provides a pre-built registration form, we're
going to show you how to use it.  When a user submits this form, it will create a new
account for them in the Stormpath Directory that is associated with the Stormpath Application
that you created in the :ref:`create_tenant` section

Generate the /register route
--------------------------------

When you want to create a new route and view in an Angular application, there
are a handful of files that you have to make.  Thankfully the generator
is going to help us with this.

Stop the server and run this command in your project folder::

    $ yo angular-fullstack:route register

It will ask you some questions, just hit enter to choose the defaults for all of them.  It is going to tell you that it has created these files for you::

    ? Where would you like to create this route? client/app/
    ? What will the url of your route be? /register
       create client/app/register/register.js
       create client/app/register/register.controller.js
       create client/app/register/register.controller.spec.js
       create client/app/register/register.css
       create client/app/register/register.html

Start the server and then manually type in the URL to ``/register``
in your browser, you will see the default view that was created:


.. image:: _static/default-register-view.png

Use the Registration Form Directive
-----------------------------------

We're going to take advantage of the default registration form
that is available to you in the Stormpath Angular SDK

Open the file ``client/app/register/register.html`` and then replace
it's contents with this::

    <div ng-include="'components/navbar/navbar.html'"></div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <h3>Registration</h3>
          <hr>
        </div>
      </div>
      <div sp-registration-form post-login-state="main"></div>
    </div>

This is a small bit of HTML markup which does the following:

* Includes the common menu bar for the application (we will customize it the next section)
* Sets up some Bootstrap classes so that the page flows nicely
* Inserts the default registration form, via the ``sp-registration-form`` directive
* Declares (on the directive) that we want to send the user to the main page after they register

Save that file and the browser should auto reload, you should now
see the registration route like this:

.. image:: _static/registration_form.png

If you want to further customize the look and behaviour of the form,
please see the API documentation of for
`sp-registration-frorm <https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.spRegistrationForm:sp-registration-form>`_.
The most useful feature is the ability to specify your own template.

Generate the /register/verify route
--------------------------------

The `Stormpath Email Verification`_ feature will allow you to confirm a user's
identity by sending them a link that they must click on.
We handle all the email and links for you!  (If you don't want to use this
feature, you can skip this section).

However we must decide where the user should go when they click on that
link in their email.  We will implement a default view for this in our application
and configure the Stormpath Directory accordingly.

The first thing is to generate another route.  In this situation we will
call the controller ``emailVerification`` but use the URL of ``/register/verify``
::

  $ yo angular-fullstack:route verification
  ? Where would you like to create this route? client/app/
  ? What will the url of your route be? /register/verify
     create client/app/verification/verification.js
     create client/app/verification/verification.controller.js
     create client/app/verification/verification.controller.spec.js
     create client/app/verification/verification.css


Add the sptoken parameter
--------------------------------

When the user clicks on the link in their email, they will be sent to your
application with a url parameter called ``sptoken`` - we need to let the UI
router know about this.  Open the file
``client/app/emailVerification/emailVerification.js`` and modify the ``url``
string to include this parameter:
::
    url: '/register/verify?sptoken',


Use the Email Verification Directive
------------------------------------

We have a pre-built view that shows the necessary informational
messages when someome is trying to complete the email verification process.
It will:

* Show a success message and prompt them to login
* Allow them to request anotheer email if the links has expired

Open the file ``client/app/emailVerification/emailVerification.html`` and
replace it's contents with the following::

    <div ng-include="'components/navbar/navbar.html'"></div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <h3>Verify Your Account</h3>
          <hr>
        </div>
      </div>
      <div sp-email-verification></div>
    </div>

Configure the Directory
------------------------------------

In order to use the email verification feature you will need to enable it
on the Directory that this account will be created in.  Login to the
`Stormpath Admin Console`_ and find the Directories tab.  You will see the
Directory that was automatically created for the Application.  Click into it,
find the Workflows tab, and then enable the email verification workflow.

You should also modify the **Link Base URL** to point
to your application.  At the moment that URL will be::

    http://localhost:9000/register/verify

Don't forget to press save!

Here is what that screen looks like:

.. image:: _static/directory_email_verification.png

Try it, register for an account!
--------------------------------

That's it, really!  Give the form a try.  Once you register for an
account you will be automatically redirected back to the main page.
You will also be logged in automatically, and you will start seeing
the list of things again - remember how we locked it down?  Now that
you are authenticated you are allowed to access that part of the API
again

.. _Stormpath Email Verification: http://docs.stormpath.com/rest/product-guide/#verify-an-email-address

.. _Stormpath Admin Console: https://api.stormpath.com/login