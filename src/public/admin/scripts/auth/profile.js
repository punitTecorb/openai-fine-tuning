function profiledetails() {
    $.ajax({
        url: host + '/api/v1/admin/profile/details',
        type: 'Get',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json'
        // success: function (data, status) {}
    }).done(function (data) {
        if (data.code == 200) {
            document.getElementById('image').src = 'v1670999902/hvo6txfa4gf5cg16qqzj.jpg'
            document.getElementById('email').innerHTML = data.data.email
            document.getElementById('name').innerHTML = ''
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal({
            title: "Error!",
            text: `${jqXHR.responseJSON.error}`
        });
    })
}