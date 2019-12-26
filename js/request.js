$(document).ready(function() {
  $('.new-request-btn').click(function(event) {
      resetRequestForm()
      $("#new-request-modal").modal();
  });

  $('.add-request-btn').click(function(event) {
    var subject = $("#subject");
    var priority = $("#priority");
    var name = $("#name");
    var contactNumber = $("#contactNumber");
    var description = $("#description");
    var errorMessageId = "#request-error-message";
    var phonenoPattern = /^\d{10}$/;

    if(subject.val().trim() === "") {
        setErrorMessage("Please enter subject name.", errorMessageId, subject);
        event.preventDefault();
        return false;
    } else if(priority.val().trim() === "") {
        setErrorMessage("Please select priority.", errorMessageId, priority);
        event.preventDefault();
        return false;
    } else if(name.val().trim() === "") {
        setErrorMessage("Please enter name.", errorMessageId, name);
        event.preventDefault();
        return false;
    } else if(contactNumber.val().trim() === "") {
        setErrorMessage("Please enter contact number.", errorMessageId, contactNumber);
        event.preventDefault();
        return false;
    }  else if(contactNumber.val().length < 10) {
        setErrorMessage("Contact number should be 10 digit.", errorMessageId, contactNumber);
        event.preventDefault();
        return false;
    } else if(!contactNumber.val().match(phonenoPattern)) {
        setErrorMessage("Contact number should be digit.", errorMessageId, contactNumber);
        event.preventDefault();
        return false;
    } else if(description.val().trim() === "") {
        setErrorMessage("Please enter description.", errorMessageId, description);
        event.preventDefault();
        return false;
    }

    $(".request-table").removeClass("hide");
    var date = new Date();
    var currentdate = date.getDate() +"/"+ date.getMonth() +"/"+ date.getFullYear();
    var duedate = date.getDate()  +"/"+ date.getMonth() +"/"+ date.getFullYear();
    var markup = "<tr><td> " + subject.val() + "</td><td>"+ currentdate  + "</td><td>" + duedate + "</td><td>"+ name.val()+"</td><td>Active</td></tr>";
    $(".request-table tbody").append(markup);
    $("#new-request-modal").modal('hide')
  });

  $(".request-close").click(function() {
    resetRequestForm();
  });

  function setErrorMessage(message, errorMessageselector, focusSelector) {
    var errorMessage = $(errorMessageselector);
    errorMessage.removeClass("hide");
    errorMessage.show();
    errorMessage.text(message);
    if(focusSelector !== undefined && focusSelector.length > 0) {
      focusSelector.focus();
    }
  }

  function resetRequestForm() {
    $("#request-error-message").text("");
    $("#request-error-message").removeClass("hide");
    $("#subject").val("");
    $("#priority").val("");
    $("#name").val("");
    $("#contactNumber").val("");
    $("#description").val("");
  }

function RedirectifUserNameNull()
{
  if(sessionStorage.getItem("firstName").val() == null)
  {
    window.location.href = '/index.html';
  }
}


  $("#detail-tab").click(function () {
    $("#detailtab").removeClass("hide");
    $("#home").addClass("hide");
    $("#NewRequestButton").addClass("hide");
    $("#home-tab-li").removeClass("active");
    $("#detail-tab-li").addClass("active");
    if($("#detailsTable tr").length == 1) {
      markup = "<tr><td> " + sessionStorage.getItem("firstName") + "</td><td>"+ sessionStorage.getItem("lastName")  + "</td><td>" + sessionStorage.getItem("userName") + "</td></tr>";
      tableBody = $("#detailsTable tbody");
      tableBody.append(markup);
    }  
  });

  $("#home-tab").click(function () {
      $("#detailtab").addClass("hide");
      $("#home").removeClass("hide");
      $("#home-tab-li").addClass("active");
      $("#detail-tab-li").removeClass("active");
      $("#NewRequestButton").removeClass("hide");
  });

});
