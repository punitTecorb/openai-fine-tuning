//********Date picker******/
var jqOld = jQuery.noConflict();
jqOld(function () {
    jqOld("#fromDate").datepicker({
        dateFormat: 'yy-mm-dd'
    });
})
var jqOld = jQuery.noConflict();
jqOld(function () {
    jqOld("#toDate").datepicker({
        dateFormat: 'yy-mm-dd'
    });
})

//***********City Id******************/
var currentLocation = window.location.href;
var url = new URL(currentLocation);
var cityId = url.searchParams.get("id");

//***********City Name******************/
var currentLocation = window.location.href;
var url = new URL(currentLocation);
var cityName = url.searchParams.get("name");

//*************Dynamic Page Value****************** */
function dynamicValue() {
    document.getElementById('cityName').value =" City : " + capitalize(cityName) 
}



//*********Listing Table Data**************/

function catDetails() {
    this.setTimeout(() => {
        document.getElementById('city-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'pageSize': 10,
        'search': document.getElementById('fog').value,
        'toDate': document.getElementById('toDate').value,
        'fromDate': document.getElementById('fromDate').value,
        'cityId': cityId
    }
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/area/list?search=${obj.search}&fromDate=${obj.fromDate}&toDate=${obj.toDate}&page=${obj.page}&pageSize=${obj.pageSize}&cityId=${cityId}`,
        type: 'Get',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
            }
            if (data.data.Total == 0 && data.code == 200) {
                $("#noData").addClass("show");
            }
            if (data.code == 200 && data.data.Total > 0) {
                $("#table2").removeClass("hide")
                $("#noData").removeClass("show")
                $("#page1").removeClass("hide")

                var x = data.data.Total
                $('#example-1').pagination({
                    total: x,
                    current: 1,
                    length: 10,
                    prev: 'Previous',
                    next: 'Next',
                    click: function (options, $target) {
                        let obj = {
                            'page': options.current,
                            'pageSize': options.length,
                            'search': document.getElementById('fog').value,
                            'toDate': document.getElementById('toDate').value,
                            'fromDate': document.getElementById('fromDate').value,
                            'cityId': cityId
                        }
                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/area/list?search=${obj.search}&fromDate=${obj.fromDate}&toDate=${obj.toDate}&page=${obj.page}&pageSize=${obj.pageSize}&cityId=${cityId}`,
                            type: 'Get',
                            contentType: 'application/json',
                            data: JSON.stringify(obj),
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', token);
                            },
                            dataType: 'json',
                            success: function (data, status) {
                                // auth(data.code)
                                if (data.code == 200) {
                                    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                                    $("#table").html(' ');
                                    for (var i = 0; i < data.data.response.length; i++) {

                                        if (data.data.response[i].isActive == true) {
                                            var x = 'Deactive'
                                            var y = 'Active'
                                        } else {
                                            var x = 'Active'
                                            var y = 'Deactive'
                                        }
                                        var index = i + 1 + (obj.pageSize * (obj.page - 1));
                                        document.getElementById('table').innerHTML += '<tr >' +
                                            '<td >' + index + '<td>' + capitalize(data.data.response[i].areaName) + '<td>' + formatDate(data.data.response[i].createdAt) +
                                            '<td><span class="label label-primary">' + y +
                                            '<td> <button type="button" class="btn btn-sm btn-success" id="Action_button" style="margin: 5px;"  data-target="' + data.data.response[i].isActive + '" onclick= "update(' + '\'' + data.data.response[i]._id + '\'' + ')">' + x + '</button>' +
                                            '<button type="button" class="btn btn-sm btn-danger" id="Action_button" style="margin: 5px;" onclick= del(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Delete   ' + '</button>' +
                                            '<button type="button" class="btn btn-sm btn-info" style="margin: 5px;"  data-toggle="modal" data-target="#myModal2"    onclick= View(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Edit' + '</button></tr>'
                                    }
                                }

                            }

                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                $("#table").html(' ');
                for (var i = 0; i < data.data.response.length; i++) {
                    if (data.data.response[i].isActive == true) {
                        var x = 'Deactive'
                        var y = 'Active'
                    } else {
                        var x = 'Active'
                        var y = 'Deactive'
                    }
                    var index = i + 1
                    document.getElementById('table').innerHTML += '<tr >' +
                        '<td >' + index + '<td>' + capitalize(data.data.response[i].areaName) + '<td>' + formatDate(data.data.response[i].createdAt) +
                        '<td><span class="label label-primary">' + y +
                        '<td> <button type="button" class="btn btn-sm btn-success" id="Action_button" style="margin: 5px;"  data-target="' + data.data.response[i].isActive + '" onclick= "update(' + '\'' + data.data.response[i]._id + '\'' + ')">' + x + '</button>' +
                        '<button type="button" class="btn btn-sm btn-danger" id="Action_button" style="margin: 5px;" onclick= del(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Delete   ' + '</button>' +
                        '<button type="button" class="btn btn-sm btn-info" style="margin: 5px;"  data-toggle="modal" data-target="#myModal2"    onclick= View(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Edit' + '</button></tr>'

                }
            } else {
                $("#table").html(' ');
                $("#table2").addClass("hide");
                $("#noData").addClass("show");
                $("#page1").hide();

            }
        }

    });
}

//**********Satus Update***************/

function update(user_id) {
    var userId = (user_id)
    $(document).on('click', '#Action_button', function () {
        var a = ($(this).text());
        if (a === 'Active') {
            var isActive = true
        } else {
            var isActive = false
        }
        swal({
            title: "Are you sure?",
            text: "Ready to Action!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Take Action!",
            cancelButtonText: "No, leave pls!",
            closeOnConfirm: false,
            closeOnCancel: true
        },
            function (isConfirm) {
                if (isConfirm) {

                    $.ajax({
                        type: "Post",
                        data: { isActive, userId },
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', token);
                        },
                        url: `${host}/api/v1/admin/area/status`,
                    }).done(function (data) {
                        // If successful
                        // alert("Success")
                        window.location.reload('/admin/area');
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        // If fail
                        alert(jqXHR.responseJSON.error)
                    })
                } else {
                    swal("Cancelled", "Your file is safe :");
                }
            });
    })
}

//***********City Id******************/
var currentLocation = window.location.href;
var url = new URL(currentLocation);
var cityId1 = url.searchParams.get("id");
//***************Add Function */
function addNewReason() {

    var areaName = document.getElementById('areaName').value;
    var isActive = document.getElementById('status').value;
    var cityId =cityId1

    $.ajax({
        type: "POST",
        data: { areaName, isActive,cityId },
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: host + '/api/v1/admin/area/add',
    }).done(function (data) {
        // If successful
        // alert("Success")
        window.location.reload('/admin/area');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)

    })
}

//*******Edit Function*** */
function updateReason() {
    var areaName = document.getElementById('name1').value;
    var isActive = document.getElementById('status1').value;
    var userId = document.getElementById('userId').value;

    $.ajax({
        type: "PUT",
        data: { areaName, isActive },
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/area/${userId}/edit`,
    }).done(function (data) {
        // If successful
        // alert("Success")
        window.location.reload('/admin/area');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)

    })
}

//**********Delete Function******************/

function del(user_id) {
    var userId = (user_id)

    $(document).on('click', '#Action_button', function () {
        var a = $(this).attr('data-target');
        if (a == 'true') {
            var isDelete = false
        } else {
            var isDelete = true
        }
        $.ajax({
            type: "Post",
            data: { isDelete, userId },
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            url: `${host}/api/v1/admin/area/delete`,
        }).done(function (data) {
            // If successful
            alert("Success")
            window.location.reload('/admin/area');
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // If fail
            alert(jqXHR.responseJSON.error)

        })
    });
}



//************Details View functions************ */

function View(user_id) {
    var obj = {
        "userId": user_id
    }
    $.ajax({
        url: `${host}/api/v1/admin/area/detail/${user_id}`,
        type: 'get',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                document.getElementById('name1').value = data.data.areaName ? data.data.areaName : "N/A",
                    document.getElementById('status1').value = data.data.isActive;
                document.getElementById('userId').value = data.data._id
            } else {
                alert("Record Not Found")
                window.location.reload()
            }
        }

    });
}

//*********Capital title***********/
function capitalize(input) {
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

//**********Date Format**********/

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    var y = monthNames[month - 1]

    return [day, monthNames[month - 1], year].join('-');
}

// *****************Export Excel File of  Data Function*****
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8;'
    });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


function download() {
    //let type = document.getElementById('opts').value;

    $.get(host + `/api/v1/admin/area/area-excelData?cityId=${cityId}`, {


    }, function (data, status) {
        if (data) {
            var headers = {

                AreaName: "Area Name",


            };

            itemsNotFormatted = data.data;

            var fileTitle = 'areas'; // or 'my-unique-title'

            exportCSVFile(headers, itemsNotFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
        }
    })
}