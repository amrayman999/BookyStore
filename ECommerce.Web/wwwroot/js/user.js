var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "pageLength": 5,
        "ajax": { url: '/admin/user/getall' },
        "columns": [
            { data: 'name', "width": "15%" },
            { data: 'email', "width": "15%" },
            { data: 'phoneNumber', "width": "15%" },
            { data: 'company.name', "width": "15%" },
            { data: 'role', "width": "15%" },
            {
                data: { id: 'id', lockoutEnd: 'lockoutEnd' },
                "render": function (data) {
                    var today = new Date().getTime();
                    var lockout = new Date(data.lockoutEnd).getTime();

                    if (lockout > today) {
                        return `<div class="w-75 btn-group" role="group">
                                   <a onclick="LockUnlock('${data.id}')" class="btn btn-danger mx-2" style="cursor:pointer; width:100px;">
                                      <i class="bi bi-lock-fill"></i> Lock
                                   </a>
                                   <a href="/admin/user/RoleManagement?userId=${data.id}" class="btn btn-primary mx-2" style="cursor:pointer; width:100px;">
                                      <i class="bi bi-pencil-square"></i> Permission
                                   </a>
                                </div>`;
                    } else {
                        return `<div class="w-75 btn-group" role="group">
                                   <a onclick="LockUnlock('${data.id}')" class="btn btn-primary mx-2" style="cursor:pointer; width:100px;">
                                      <i class="bi bi-unlock-fill"></i> Unlock
                                   </a>
                                   <a href="/admin/user/RoleManagement?userId=${data.id}" class="btn btn-primary mx-2" style="cursor:pointer; width:100px;">
                                      <i class="bi bi-pencil-square"></i> Permission
                                   </a>
                                </div>`;
                    }
                },
                "width": "15%"
            }
        ]
    });
}

function LockUnlock(id) {
    $.ajax({
        type: "POST",
        url: '/Admin/User/LockUnlock',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            toastr.success(data.message);
            dataTable.ajax.reload(); 
        }
    });
}
 

