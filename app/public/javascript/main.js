$(document).ready(function() {
  $('.carousel').carousel();
  $(".btn-select").each(function (e) {
    var value = $(this).find("ul li.selected").html();
      if (value != undefined) {
        $(this).find(".btn-select-input").val(value);
        $(this).find(".btn-select-value").html(value);
      }
  });
//************************************************************************************
  $(window).resize(function(){
    $(".tooltip").css( "display", "none" );
  });
//************************************************************************************  
$('#modal-signup').on('hidden.bs.modal', function () {
  ClearSignupForm();
});
//************************************************************************************  
$('input[name=txtfname]').attr("autocomplete", "off");
$('input[name=txtlname]').attr("autocomplete", "off");
$("#test0").attr("autocomplete", "off");
//************************************************************************************ 
$("#test0").keyup(function(){
        $.post("/findemail", {
          email : $('#test0').val()
        },function(success){
          $('#test1').val(success)
        });
    });
//************************************************************************************ 
jQuery.validator.addMethod("emailexist", function(value, element){
    if (element.value == $('#test1').val()){
     return false
    }else return true 
}, "Email address already use."); 
//************************************************************************************ 


  $("#signupform").validate({
    rules: {
      txtfname: {
        minlength: 3,
        maxlength: 15,
        required: true
      },
      txtlname: {
        minlength: 3,
        maxlength: 15,
        required: true
      },
      txtemail: {
        emailexist : true,
        email: true,
        required: true,
      },
      txtpass: { 
        minlength: 3,
        maxlength: 15,
        required: true
      }, 
      txtcpass: { 
        equalTo: "#txtpass",
        minlength: 3,
        maxlength: 15,
        required: true
      },
      slctskill: {
        required: true,
      },
      slctgender: {
        required: true,
      }
    },
    messages: {
      slctskill: "Invalid skill, kindly select one.",
      slctgender: "Invalid gender, kindly select one."
    },
    highlight: function(element) {
      $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      $(element).closest('.form-group').find('[class^="glyphicon"]').remove();
      $(element).closest('.form-group').append('<span class="glyphicon glyphicon-remove form-control-feedback" style="margin: 0 15px 0 0">' );
      $(".tooltip").css({"max-width": "none","white-space": "nowrap"});
      $(".tooltip-arrow").css( "top", "50%" );
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');   
      $(element).closest('.form-group').find('[class^="glyphicon"]').remove();
      $(element).closest('.form-group').append('<span class="glyphicon glyphicon-ok form-control-feedback" style="margin: 0 15px 0 0">' );   
      $(".tooltip").css({"max-width": "none","white-space": "nowrap"});
      $(".tooltip-arrow").css( "top", "50%" );
    },
    submitHandler: function(form) {
      var SignupData = {
        'txtfname'    : $('input[name=txtfname]').val(),
        'txtlname'    : $('input[name=txtlname]').val(),
        'txtemail'    : $('input[name=txtemail]').val(),
        'txtpass'     : $('input[name=txtpass]').val(),
        'slctskill'   : $('select[name=slctskill]').val(),
        'slctgender'  : $('select[name=slctgender]').val()
      };

      $.ajax({
        url: '/sign-up',  
        type: 'POST',
        data: JSON.stringify(SignupData),
        contentType: 'application/json',
          success: function(success) {
            $.ajax({
                  type: "POST",
                  dataType: 'json',
                  data: { "email": $('input[name=txtemail]').val(), "password": $('input[name=txtpass]').val() },
                  success: function (data) {
                      window.location.href = "/email-varification";
                  }
              });
              setTimeout(function() {
                ClearSignupForm();
            }, 2000);
          }
      });
    }
  });

});

//*************************************FUNCTION***********************************************  
function ClearSignupForm(){
  $("#signupform").find('.has-error').removeClass("has-error");
  $("#signupform").find('.has-success').removeClass("has-success");
  $('.div-txtfname').find('.form-control-feedback').remove();
  $('.div-txtlname').find('.form-control-feedback').remove();
  $('.div-txtemail').find('.form-control-feedback').remove();
  $('.div-txtpass').find('.form-control-feedback').remove();
  $('.div-cpass').find('.form-control-feedback').remove();
  $('.div-slctskill').find('[class^="glyphicon"]').removeClass("glyphicon-ok").removeClass("glyphicon-remove").addClass("glyphicon-triangle-bottom");
  $('.div-slctgender').find('[class^="glyphicon"]').removeClass("glyphicon-ok").removeClass("glyphicon-remove").addClass("glyphicon-triangle-bottom");
  $(".tooltip").css( "display", "none" );
  document.getElementById("signupform").reset();
}

