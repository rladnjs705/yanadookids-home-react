$(function ($) {
	$('.datepicker').datepicker({
        language: "kr",
        numberOfMonths: [1, 2],
        showButtonPanel: true,
        showOtherMonths: true,
        showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
        changeYear: true, //콤보박스에서 년 선택 가능
        changeMonth: true, //콤보박스에서 월 선택 가능
        currentText: "오늘 날짜로 이동",
        closeText: "닫기",
        dateFormat: "yy-mm-dd",
        beforeShow: function () {
            setTimeout(function () {
                $(".ui-datepicker").css('z-index', 99999999);
            }, 0);
        },
        onClose: function (SelectedDate) {
            if ($(this).attr("id") == "fromdate")
                $("#todate").datepicker("option", "minDate", SelectedDate);
            else if ($(this).attr("id") == "todate")
                $("#fromdate").datepicker("option", "maxDate", SelectedDate);
        }
    });
    $('#fromdate').datepicker('setDate', '-9d'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    $('#todate').datepicker('setDate', '-3d'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)

    $("#todate").datepicker("option", "minDate", $("#fromdate").val());
    $("#fromdate").datepicker("option", "maxDate", $("#todate").val());
    		
});//ready end


function isEmpty(str){
	if(typeof str == "undefined" || str == null || str == "")
		return true;
	else
		return false;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isValidDate(from, to) {
	/*var pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
	if(!pattern.test(from) || !pattern.test(to)) {
		return false;
	}*/
	     
    var fromDate = new Date(from);
    var toDate = new Date(to);
    
    if(fromDate > toDate) {
	    return false;
    } else {
    	return true;
    }
}

function goMainPage(accesskey) {
	location.href = "/analytics/"+ accesskey;
}