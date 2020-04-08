$( document ).ready(function() {
    $(".accountTypeSelect").change(function() {
        if ($(this).val() == "patronAccount") {
          $("#patronControls").removeClass('d-none');
          $("#materialControls").addClass('d-none');
        } else {
          $("#patronControls").addClass('d-none');
          $("#materialControls").removeClass('d-none');
        }
      });
    console.log( "ready!" );
});