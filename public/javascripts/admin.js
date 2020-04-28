$(document).ready(() => {
    $('.accountInfo').click((event) => {
        $.ajax ({
        url: 'account/'+event.target.dataset.account+'/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          $('.modal-body #firstNameUpdate').val(data[0].firstName);
          $('.modal-body #lastNameUpdate').val(data[0].lastName);
          $('.modal-body #emailUpdate').val(data[0].email);
          $('.modal-body #addressUpdate').val(data[0].address);
          $('.modal-body #passwordUpdate').val(data[0].password);
          if (data[0].isAdmin == 1) {
            $('.modal-body #isAdminRadio-1').prop('checked', true);
          }
          else {
            $('.modal-body #isAdminRadio-0').prop('checked', true);
          }
          $('#account-update').attr('action', 'account/'+event.target.dataset.account+'/?_method=PUT');
          $('#accountModal').modal('show');
          console.log('ajax success', data);
          console.log(data[0].firstName);
        }

      });
      });

    $('.deleteAccount').click((event) => { 
      $.ajax ({
        url:'account/'+event.target.dataset.account+'/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          $('.modal-body #firstNameDelete').val(data[0].firstName);
          $('.modal-body #lastNameDelete').val(data[0].lastName);
          $('.modal-body #emailDelete').val(data[0].email);
          $('.modal-body #addressDelete').val(data[0].address);
          $('.modal-body #passwordDelete').val(data[0].password);
          if (data[0].isAdmin == 1) {
            $('.modal-body #isAdminRadioDelete-1').prop('checked', true);
          }
          else {
            $('.modal-body #isAdminRadioDelete-0').prop('checked', true);
          }
          $('#account-delete').attr('action', 'account/delete/'+event.target.dataset.account+'/?_method=DELETE');
          $('#accountDeleteModal').modal('show');
        }
      });
    });

  });