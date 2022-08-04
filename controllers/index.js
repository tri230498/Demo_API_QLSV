/*
    MVC: Model View Controller
    View: Giao diện (Folder chứa các file html)
    Controllers: Thường sẽ đặt cũng tên với view đảm nhiệm các xử lý trên view đó
    Model: Nơi chứa các prototype (class lớp đối tượng), tạo khi format api yêu cầu hoặc format của giao diện
*/

//Gọi api

function getDanhSachSinhVien() {

    //Sử dụng axios
    var promise = axios({   // B1
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
        method: 'GET'
    });


    //Thành công 
    promise.then(function (result) {
        console.log(result.data);
        //Gọi hàm rendertable sau khi lấy dữ liệu từ api về
        renderTableSinhVien(result.data, 'tblSinhVien'); // B4

    })

}

/**
 * Hàm này nhận vào 1 mảng sinh viên và tiến hành in dữ liệu sinh viên lên id của tbody
 * @param {*} arrSV Mảng sinh viên [sv1,sv2,sv3,...]
 * @param {*} idBody id của tbody => <tbody id="[idBody]"></tbody>
 * 
 */
function renderTableSinhVien(arrSV, idBody) {   //B3
    var htmlContent = '';
    for (var index = 0; index < arrSV.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = arrSV[index];
        console.log(sinhVien);
        htmlContent += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.soDienThoai}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">Xoá</button>
                    <button class="btn btn-primary ml-2" onclick="suaSinhVien('${sinhVien.maSinhVien}')">Sửa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById(idBody).innerHTML = htmlContent;
}

function suaSinhVien(maSVClick) {
    //Gọi api chỉnh sửa và load lên giao diện http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=3513412
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSVClick,
        method: 'GET'
    });
    promise.then(function (result) {
        console.log(result.data);
        var sinhVien = result.data;

        document.getElementById('maSinhVien').value = sinhVien.maSinhVien;
        document.getElementById('tenSinhVien').value = sinhVien.tenSinhVien;
        document.getElementById('loaiSinhVien').value = sinhVien.loaiSinhVien;
        document.getElementById('email').value = sinhVien.email;
        document.getElementById('soDienThoai').value = sinhVien.soDienThoai;
        document.getElementById('diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.getElementById('diemToan').value = sinhVien.diemToan;
        document.getElementById('diemLy').value = sinhVien.diemLy;
        document.getElementById('diemHoa').value = sinhVien.diemHoa;

    });

    promise.catch(function (err) {
        console.log('err', err);

    })
}

// Cập nhật dữ liệu
document.getElementById('btnCapNhat').onclick = function () {
    //Lấy dữ liệu từ phía giao diện về object (format backend qui định);
    var sinhVienCapNhat = new SinhVien();
    sinhVienCapNhat.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVienCapNhat.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVienCapNhat.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVienCapNhat.email = document.querySelector('#email').value;
    sinhVienCapNhat.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVienCapNhat.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVienCapNhat.diemToan = document.querySelector('#diemToan').value;
    sinhVienCapNhat.diemLy = document.querySelector('#diemLy').value;
    sinhVienCapNhat.diemHoa = document.querySelector('#diemHoa').value;

    //Gọi api
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sinhVienCapNhat.maSinhVien,
        method: 'PUT',
        data: sinhVienCapNhat
    });

    promise.then(function (result) {
        console.log(result);
        getDanhSachSinhVien();
    })

    promise.catch(function (error) {
        console.log(error)
    })
}



//number,string,boolean, null, undefined : primitive value
//array, object: reference value

function xoaSinhVien(maSVClick) {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSVClick,
        method: 'DELETE'
    });

    promise.then(function (result) {
        console.log(result.data);
        //Load lại table khi thành công
        getDanhSachSinhVien();
    })

    promise.catch(function (err) {
        console.log(err)
    })
}



// ----------------------- Phương thức post: thêm dữ liệu -------------

document.getElementById('btnXacNhan').onclick = async function () {
    //input: sv: SinhVien
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.getElementById('maSinhVien').value;
    sinhVien.tenSinhVien = document.getElementById('tenSinhVien').value;
    sinhVien.loaiSinhVien = document.getElementById('loaiSinhVien').value;
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.soDienThoai = document.getElementById('soDienThoai').value;
    console.log(sinhVien);
    //output: thêm sinh viên thành công, thêm sinh thất bại
    //Hiển thị loading
    document.querySelector('.loading').style.display = 'block';
    var mess = '';
    try {
        //Bất kì khối nào trong try dẫn đến lỗi => đều nhảy vào khối lệnh catch
        var result = await axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
            method: 'POST',
            data: sinhVien // {}:object format backend
        });
        mess = result.data;
        // alert(mess);
        // window.location.reload(); => f5
        getDanhSachSinhVien(); //Gọi api lấy tất cả sinh về sau khi thêm thành công
        //Hiển thị loading
    }
    catch (err) {
        alert(err.response?.data);
    }
    setTimeout(function () {
        document.querySelector('.loading').style.display = 'none';
    }, 1000)


    // promise.then(function(result){
    //     console.log('result',result);
    //     mess = 'Thêm thành công !';
    // })

    // promise.catch(function (err) {
    //     console.log('err',err.response?.data)
    //     mess = 'Thêm thất bại';
    // });


}





//Khi trình load lên thì gọi    // B2
window.onload = function () {
    getDanhSachSinhVien();

}
