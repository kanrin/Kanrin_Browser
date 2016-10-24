var a      = 1;
var b      = 1;

// name值获取
function GetName(dbid, srvid) {
    if ( $("#" + dbid).val().toLowerCase().split('cquser')[1].split(/s.+h/)[1] != null ) {
        return '0';
    }else if ( $("#" + dbid).val().toLowerCase().split('cquser')[1].split('s')[1] == null ) {
        return '0';
    }else {
        return srvid;
    }
}

// combine模块生成添加
function add() {
    var olddb       = $("#olddb").val().split(" ", 1);
    var slave_db    = $("#slave_db").val().split(" ", 1);
    var newdb       = $("#newdb").val().split(" ", 1);
    var master_id   = $("#master_id").val().split(" ", 1);
    var slave_id    = $("#slave_id").val().split(" ", 1);
    if (olddb == "" || slave_db == "" || newdb == "" || master_id == "" || slave_id == "") {
        $('#msg').modal('show');
    } else {
        // 主体写入
        var master_name = GetName("olddb", master_id);
        var slave_name  = GetName("slave_db", slave_id);
        // - [cquser_1_s712, '521', '521', cquser_1_s720, '527', '527', cquser_1_s712_h1]
        add_div("- [" + olddb    + ",'" + master_name + "','" + master_id + "',"+ slave_db + ",'" + slave_name  + "','" + slave_id  + "'," + newdb + ']')
        if (document.getElementById("main").style.display = "none") {
            document.getElementById("main").style.display = "block";
        }
        // 新增信息模块
        del_div('main_tmp');
        add_tmp('main_tmp', "ttt1", "- [" + olddb    + ",'" + master_name + "','" + master_id + "',"+ slave_db + ",'" + slave_name  + "','" + slave_id  + "'," + newdb + ']')
        if (document.getElementById("main_tmp").style.display = "none") {
            document.getElementById("main_tmp").style.display = "block";
        }
    }
}

// 新增模块a
function add_div(data) {
    var parent = document.getElementById("out");
    var div    = document.createElement("div");
    div.setAttribute("id", "info" + a);
    div.innerHTML = data;
    parent.appendChild(div);
    a++;
}

// 删除模块
function del_div(boxid) {
    if (boxid == "main") {
        for (var i = 1; i < a; i++) {
            var my = document.getElementById("info" + i);
            my.parentNode.removeChild(my);
        }
        var list = new Array('slave_db',
                             'olddb',
                             'newdb',
                             'master_id',
                             'slave_id')
        for (var i = 0; i < list.length; i++) {
            $("#" + list[i]).val("");
        }
        document.getElementById("main_tmp").style.display = "none"
        a = 1;
    } else if (boxid == "outinfo") {
        for (var i = 1; i < b; i++) {
            var my = document.getElementById("ooo" + i);
            my.parentNode.removeChild(my);
        }
        var list = new Array('combine_infos', 'combine_out')
        for (var i = 0; i < list.length; i++) {
            $("#" + list[i]).val("");
        }
        document.getElementById("outinfo_tmp").style.display = "none"
        b = 1;
    } else if (boxid == "main_tmp") {
        while (1) {
            var my = document.getElementById("ttt1");
            if (my == null) {
                break;
            } else {
                my.parentNode.removeChild(my);
            }
        }
    } else if (boxid == "outinfo_tmp") {
        while (1) {
            var my = document.getElementById("ttt2");
            if (my == null) {
                break;
            } else {
                my.parentNode.removeChild(my);
            }
        }
    }
    if (document.getElementById(boxid).style.display = "block") {
        document.getElementById(boxid).style.display = "none";
    }
}

// 删除a
function del_out() {
    if (a == 1) {
        $('#nodel').modal()
    } else {
        var start = a - 1;
        for (var i = start; i < a; i++) {
            var my = document.getElementById("info" + i);
            if (my != null) {
                my.parentNode.removeChild(my);
            }
        }
        a = start;
    }
}

// 输出b
function add_out(data) {
    var parent = document.getElementById("out2");
    var div    = document.createElement("div");
    div.setAttribute("id", "ooo" + b);
    div.innerHTML = data;
    parent.appendChild(div);
    b++;
}

// 增加b
function add_info() {
    var combine_infos = $("#combine_infos").val().split("\n");
    var combine_out   = $("#combine_out").val();
    var commmm;
    if (combine_infos == "" || combine_out == "") {
        $('#msg').modal()
    } else {
        for (var i = 0; i < combine_infos.length; i++) {
            if (commmm == undefined) {
                commmm = combine_infos[i].split(" ", 1);
            } else {
                if (combine_infos[i] != "") {
                    commmm = commmm + ',' + combine_infos[i].split(" ", 1);
                }
            }
        }
        // 1_s236_h3: [1_s236_h2, 1_s458_h2]
        add_out(combine_out + ': [' + commmm + '],');
        del_div('outinfo_tmp');
        add_tmp('outinfo_tmp', 'ttt2', combine_out + ': [' + commmm + ']')
        if (document.getElementById("outinfo").style.display = "none") {
            document.getElementById("outinfo").style.display = "block";
        }
        if (document.getElementById("outinfo_tmp").style.display = "none") {
            document.getElementById("outinfo_tmp").style.display = "block";
        }
    }
}

// 删除b
function del_info() {
    if (b == 1) {
        $('#nodel').modal()
    } else {
        var start   = b - 1;
        for (var i  = start; i < b; i++) {
            var my  = document.getElementById("ooo" + i);
            if (my != null) {
                my.parentNode.removeChild(my);
            }
        }
        b = start;
    }

}

// 增加b
function add_tmp(id, id2, data) {
    var parent = document.getElementById(id);
    var div    = document.createElement("div");
    div.setAttribute("id", id2);
    div.innerHTML = data;
    parent.appendChild(div);
}

// 隐藏小窗口
function hide(id) {
    if (document.getElementById(id).style.display = "block") {
        document.getElementById(id).style.display = "none";
    }
}
