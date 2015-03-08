$(document).ready(function() {

    var fs = require("fs");
    var gui = require("nw.gui");
    var mkdirp = require('mkdirp');

    var winFolder = gui.App.dataPath + "\\win";

    if (!fs.existsSync(winFolder)) {
        var csvFolder = winFolder + "\\csv";
        mkdirp.sync(csvFolder);

        fs.writeFileSync(winFolder + "\\csv_import.vbs", csvImportVBS().replace(/{{folder}}/g, csvFolder));
    }

});

function csvImportVBS() {
    return '\
	If WScript.Arguments.Count = 1 then\n\
	    Set fso = CreateObject("scripting.filesystemobject")\n\
	    fso.DeleteFile("{{folder}}\\*"), True\n\
	    \n\
	    Set EApplication = CreateObject("Excel.Application")\n\
	    Set WB = EApplication.Workbooks.Open(Wscript.Arguments.Item(0))\n\
	    \n\
	    For Each WS In WB.Sheets\n\
	        If WS.Name = "csv_data" Then\n\
	            WS.Copy\n\
	            \n\
	            EApplication.ActiveWorkbook.SaveAs "{{folder}}\\" & WS.Name & ".csv ", 6\n\
	            EApplication.ActiveWorkbook.Close False\n\
	        End If\n\
	    Next\n\
	    \n\
	    EApplication.Quit\n\
    Else WScript.Echo "No Arg Error"\n\
	End If\n\
    ';
}
