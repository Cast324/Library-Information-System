$(document).ready(() => {
    $('#allUsersButton').click(() => {

        $.ajax({
            url: 'admin/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                
            }
        });
    });
});