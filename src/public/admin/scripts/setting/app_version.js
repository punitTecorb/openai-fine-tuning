function details() {
    $.ajax({
        url: host + '/api/v1/admin/setting/detail',
        type: 'GET',
        // contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json'
    }).done(function (data) {
        if (data.code == 200) {
            document.getElementById('andriodUserAppUrl').value = data.data.andriodUserAppUrl
            document.getElementById('andriodUserVersion').value = data.data.andriodUserVersion
            document.getElementById('andriodUserUpdate').value = data.data.andriodUserUpdateType
            document.getElementById('iosUserAppUrl').value = data.data.iosUserAppUrl
            document.getElementById('iosUserVersion').value = data.data.iosUserVersion
            document.getElementById('iosUserUpdate').value = data.data.iosUserUpdateType
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // swal({
        //     title: "Error!",
        //     text: `${jqXHR.responseJSON.error}`
        // });
    })
}

function update_setting() {
    const obj = {
        andriodUserAppUrl: document.getElementById('andriodUserAppUrl').value,
        andriodUserVersion: document.getElementById('andriodUserVersion').value,
        andriodUserUpdateType: document.getElementById('andriodUserUpdate').value,
        iosUserAppUrl: document.getElementById('iosUserAppUrl').value,
        iosUserVersion: document.getElementById('iosUserVersion').value,
        iosUserUpdateType: document.getElementById('iosUserUpdate').value
    }
    $.ajax({
        url: host + '/api/v1/admin/setting/edit',
        type: 'Put',
        data: obj,
        // contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json'
    }).done(function (data) {
        swal({
            title: "Success",
            text: "You have Updated  Successfully",
            type: "success"
        })
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal({
            title: "Error!",
            text: `${jqXHR.responseJSON.error}`
        });
    })
}
