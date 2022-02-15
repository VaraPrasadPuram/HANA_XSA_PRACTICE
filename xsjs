------------------------------------------Simple XSJS file to perform the calcultaion multiplication---------------------------------------------
function calculatemult(val1, val2)
{
	return val1*val2;
	
}

var result = calculatemult(5,3);

$.response.setBody(result.toString());

calling the xsjs file in the web broser:https://hxehost:51056/xsjs/calculate.xsjs
Output:- 15

----------------------------------------XSJS file to perform the calcultaion multiplication with user input values-------------------------------

function calculatemult(val1, val2)
{
	return val1*val2;
}

var  num1 = $.request.parameters.get('valueone');

var num2 = $.request.parameters.get('valuetwo');

}
$.response.setBody(result.toString());
}
else
{
	$.response.setBody("Please correct your input");
}

calling the XSJS file in the web browser : https://hxehost:51056/xsjs/CalculatWithParameters.xsjs?valueone=10&valuetwo=20

-------------XSJS file to perform the calcultaion multiplication with user input values with the switch to perform based on the operation selection---------------

function calculatemult(val1, val2)
{
	return val1*val2;
}

function calculatesum(val1, val2)
{
	return parseInt(val1)+parseInt(val2);
}
var  num1 = $.request.parameters.get('valueone');

var num2 = $.request.parameters.get('valuetwo');

var opr =  $.request.parameters.get('opr');

var result =0;

if(num1 && num2)
{
switch(opr){
	case "mul":
		result = calculatemult(num1,num2);
		break;
	case "sum":
		result = calculatesum(num1,num2);
		break;
}
$.response.setBody(result.toString());
}
else
{
	$.response.setBody("Please correct your input");
}

calling the xsjs file in the web broswer :https://hxehost:51056/xsjs/CalculatWithParameters.xsjs?valueone=10&valuetwo=20&opr=sum






















