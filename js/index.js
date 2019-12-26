$(document).ready(function() {
  $('#signup-btn').click(function(event) {
      resetSignupForm();
      $("#signup-modal").modal();
  });

  $(".singup").click(function(event) {
    var firstName = $("#firstName");
    var lastName = $("#lastName");
    var email = $("#signupemail");
    var password = $("#signup-password");
    var confirmPassword = $("#signup-confirm-password");
    var errorMessageId = "#signup-error-message";
    if(firstName.val().trim() === "") {
        setErrorMessage("Please enter first name.", errorMessageId, firstName);
        event.preventDefault();
        return false;
    } else if(lastName.val().trim() === "") {
        setErrorMessage("Please enter last name.", errorMessageId, lastName);
        event.preventDefault();
        return false;
    } else if(email.val().trim() === "") {
        setErrorMessage("Please enter email address.", errorMessageId, email);
        event.preventDefault();
        return false;
    } else if(!validateEmail(email, errorMessageId)) {
      return false;
    } else if(password.val() === "") {
        setErrorMessage("Please enter password.", errorMessageId, password);
        event.preventDefault();
        return false;
    } else if(password.val().trim() === "") {
        setErrorMessage("Space not allowed in password.", errorMessageId, password);
        event.preventDefault();
        return false;
    } else if(confirmPassword.val() === "") {
        setErrorMessage("Please enter confirm password.", errorMessageId, confirmPassword);
        event.preventDefault();
        return false;
    } else if(confirmPassword.val().trim() === "") {
        setErrorMessage("Space not allowed in confirm password.", errorMessageId, confirmPassword);
        event.preventDefault();
        return false;
    } else if(password.val() !== confirmPassword.val()) {
        setErrorMessage("Password and confirm password should match.", errorMessageId, password);
        event.preventDefault();
        return false;
    }
    $("#success").removeClass("hide");
    $("#modal-container").addClass("hide");
    sessionStorage.setItem("firstName", firstName.val().trim());
    sessionStorage.setItem("lastName", lastName.val().trim());
    sessionStorage.setItem("userName", email.val().trim());
    sessionStorage.setItem("password", password.val().trim());
    event.preventDefault();
  });

  $(".singup-close").click(function() {
      resetSignupForm();
  });

  $('#login-btn').click(function(event) {
      resetLoginForm();
      $("#login-modal").modal();
  });

  $(".login-form").click(function(event) {
    sessionStorage.setItem("SuccessfulLogin", "false");
    var password = $("#login-password");
    var email = $("#login-email");
    var errorMessageId = "#login-error-message";

    if(email.val() === "") {
      setErrorMessage("Please enter username.", errorMessageId, email);
      return false;
    }

    if(!validateEmail(email, errorMessageId)) {
      return false;
    }

    if(password.val() === "") {
      setErrorMessage("Please enter password.", errorMessageId, password);
      return false;
    }

    if(sessionStorage.getItem("userName") == null) {
      setErrorMessage("Please Sign up first.", errorMessageId, "");
      return false;
   }
     if(!(email.val().toLowerCase() === sessionStorage.getItem("userName") && password.val() ===  sessionStorage.getItem("password"))) {
       setErrorMessage("Invalid username and password.", errorMessageId, "");
       return false;
    }

    sessionStorage.setItem("SuccessfulLogin", "true");
    

  });

  $(".login-close").click(function() {
    resetLoginForm();
  });

  function resetLoginForm() {
    $("#login-error-message").text("");
    $("#login-error-message").removeClass("hide");
    $("#login-password").val("");
    $("#login-email").val("");
  }

  function resetSignupForm() {
    $("#signup-error-message").text("");
    $("#signup-error-message").removeClass("hide");
    $("#modal-container").removeClass("hide");
    $("#success").addClass("hide");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#signupemail").val("");
    $("#signup-password").val("");
    $("#signup-confirm-password").val("");
  }

  function setErrorMessage(message, errorMessageselector, focusSelector) {
    var errorMessage = $(errorMessageselector);
    errorMessage.removeClass("hide");
    errorMessage.show();
    errorMessage.text(message);
    if(focusSelector !== undefined && focusSelector.length > 0) {
      focusSelector.focus();
    }
  }

  function validateEmail(inputText, errorMessageselector) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!($(inputText).val().match(mailformat))) {
      setErrorMessage("You have entered an invalid email address.", errorMessageselector, inputText);
      return false;
    }

    return true;
  }
});
