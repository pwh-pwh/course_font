Confirm = {
    show: function (msg,callback) {
        Swal.fire({
            title: '确认删除吗?',
            text: msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '确认删除!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (callback) {
                    callback()
                }
            }
        })
    }
}