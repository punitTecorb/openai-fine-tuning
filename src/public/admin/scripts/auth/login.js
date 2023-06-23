function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    $.ajax({
        type: "POST",
        data: { email, password },
        dataType: 'json',
        url: host + '/api/v1/admin/auth/login',
    }).done(function (data) {
        // If successful
        console.log(data)
       localStorage.setItem("token", data.token);
       window.location.replace('/admin/appversion')
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)
    });
}


