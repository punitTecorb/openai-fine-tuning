
function changePassword() {
    var oldpassword = document.getElementById('oldpass').value;
    var newpassword = document.getElementById('password').value;
    var cpassword = document.getElementById('cpassword').value;
    if (!oldpassword) {
        swal({
            title: "Error",
            text: "Please Fill Old Password"
        });
    }
    else if (!newpassword) {
        if (newpassword.length < 4) {
            swal({
                title: "Error",
                text: "New Password length must be at least 4 characters long"
            });
        }
        swal({
            title: "Error",
            text: "Please Fill New Password"
        });
    } else if (!cpassword) {
        swal({
            title: "Error",
            text: "Please Fill Confirm Password"
        });
    } else if (newpassword !== cpassword) {
        swal({
            title: "Error",
            text: "Confirm Password should be same as new password"
        });

    }
    else {
        let obj = {
            "oldPassword": oldpassword,
            "newPassword": newpassword,
            "confirmPassword": cpassword
        }
        $.ajax({
            url: host + '/api/v1/admin/auth/changePassword',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            dataType: 'json'
            // success: function (data, status) {}
        }).done(function (data) {
            if (data.code == 200) {
                console.log(data, "eneter")
                swal({
                    title: "Success",
                    text: "You have Updated Password Successfully",
                    //! redirecting you to login page..."
                    type: "success"
                });
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseJSON.error, ";ll")
            swal({
                title: "Error!",
                text: `${jqXHR.responseJSON.error}`
            });
        })
    }
}