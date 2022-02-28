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

-----------------------------------Reading the table data and converting the table data into JSON format------------------------------	

/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";
var conn = $.hdb.getConnection();
var query = 'SELECT "PURCHASEORDERID","PURCHASEORDERITEM","QUANTITYUNIT","DELIVERYDATE" FROM "PO.Item"';
var rs = conn.executeQuery(query);
$.response.setBody(JSON.stringify(rs));
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;

callin the XSJS file ---https://hxehost:51060/xsjs/hdb.xsjs
output data in JSON format:---  [{"PURCHASEORDERID":300000000,"PURCHASEORDERITEM":10,"QUANTITYUNIT":"EA","DELIVERYDATE":"2015-05-06T18:30:00.000Z"},
{"PURCHASEORDERID":300000000,"PURCHASEORDERITEM":20,"QUANTITYUNIT":"EA","DELIVERYDATE":"2015-09-04T18:30:00.000Z"}]

------------------------------Reading the table data record by record using the loop and Inserting the fetched data into Target table-------------------------

"use strict";
var conn = $.hdb.getConnection();
var lv_purchase_id, lv_product_id;
var lv_gross_amt = 0,lv_net_amt = 0,lv_tax_amt = 0,lv_qunatity = 0,lv_quantity_unit = 0;
var recordsIteration = {};
var i;
var lv_query = 'SELECT "PURCHASEORDERID","PRODUCTID","GROSSAMOUNT","NETAMOUNT","TAXAMOUNT","QUANTITY","QUANTITYUNIT" FROM "PO.Item" where "PURCHASEORDERID" = ?';
/*,"TAXAMOUNT","QUANTITY","QUANTITYUNIT" */
var PurchaseOrdervalue = $.request.parameters.get('Purchasevalue');

var rs = conn.executeQuery(lv_query,PurchaseOrdervalue);

for (i =0; i< rs.length; i++)
{
 recordsIteration = rs[i];
 lv_purchase_id = recordsIteration.PURCHASEORDERID;
 lv_product_id = recordsIteration.PRODUCTID;
 lv_gross_amt = recordsIteration.GROSSAMOUNT;
 lv_net_amt = recordsIteration.NETAMOUNT;
 lv_tax_amt = recordsIteration.TAXAMOUNT;
 lv_qunatity = recordsIteration.QUANTITY;
 lv_quantity_unit = recordsIteration.QUANTITYUNIT;
}

var querty = "INSERT INTO \"table_xsjs\" VALUES(?,?,?,?,?,?,?)";
rs = conn.executeUpdate(querty,lv_purchase_id,lv_product_id,lv_gross_amt,lv_net_amt,lv_tax_amt,lv_qunatity,lv_quantity_unit);

conn.commit();
conn.close();


  /*body += recordsIteration.PURCHASEORDERID + "\t" + recordsIteration.PRODUCTID + "\t" + recordsIteration.GROSSAMOUNT + "\t" + recordsIteration.NETAMOUNT + "\n";
 
 }
 $.response.setBody(body);
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;*/

--------------------------------------------Downloading table data as Execl file --------------------------------------------------------


/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";
var conn = $.hdb.getConnection();
var query = 'SELECT "PURCHASEORDERID","PURCHASEORDERITEM","QUANTITYUNIT" FROM "PO.Item"';
var rs = conn.executeQuery(query);
var i = 0;
var item ={};
var body = '';
for (i =0; i< rs.length; i++)
{
 item = rs[i];
 body += item.PURCHASEORDERID + "\t" + item.PURCHASEORDERITEM + "\t" + item.QUANTITYUNIT + "\n";

}
	$.response.setBody(body);   
    $.response.contentType = 'application/vnd.ms-excel; charset=utf-16le';
    $.response.headers.set('Content-Disposition','attachment; filename=Excel.xls');
    $.response.headers.set('access-control-allow-origin','*');
    $.response.status = $.net.http.OK;
 

------------------------------------------------Reading all the Table Column meta data from table with all the properties of table------------------------

var conn = $.hdb.getConnection();
var query = 'SELECT * FROM "PO.Item"';
var rs = conn.executeQuery(query);
var columnsMetadata = rs.metadata.columns;
var columnCount = columnsMetadata.length;
var body = "";
for(var i = 0; i < columnCount; i++) {
    body += "Column " + (i + 1) + " metadata:\n";
    body += "  Catalog name: " + columnsMetadata[i].catalogName + "\n";
    body += "  Display size: " + columnsMetadata[i].displaySize + "\n";
    body += "  Label:        " + columnsMetadata[i].label + "\n";
    body += "  Name:         " + columnsMetadata[i].name + "\n";
    body += "  Type:         " + columnsMetadata[i].type + "\n";
    body += "  Type name:    " + columnsMetadata[i].typeName + "\n";
    body += "  Precision:    " + columnsMetadata[i].precision + "\n";
    body += "  Scale:        " + columnsMetadata[i].scale + "\n";
    body += "  Table name:   " + columnsMetadata[i].tableName + "\n";
    body += "  Is nullable:  " + (columnsMetadata[i].isNullable ? "true" : "false") + "\n\n";
}
$.response.contentType = "text/plain";
$.response.setBody(body);

Output of the XSJS
Column 1 metadata:
  Catalog name: undefined
  Display size: undefined
  Label:        PURCHASEORDERID
  Name:         PURCHASEORDERID
  Type:         3
  Type name:    INTEGER
  Precision:    10
  Scale:        0
  Table name:   PO.Item
  Is nullable:  false

-----------------------------------------------------Reading the table data record by record and storing it as the JSOn format-------------------------------------

var conn = $.hdb.getConnection();

var query = 'SELECT "STATE","COUNTRY" FROM "Cust_Info"';
var i;
var rs = conn.executeQuery(query);
var data =[];

for (i =0; i< rs.length; i++)
{
var row ={};
------we can also do storing the data into variable and iterat 
var records = rs[i];
row.state = rs[i].STATE;	
row.country =rs[i].COUNTRY;

	data.push(row);	
}
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(data));


