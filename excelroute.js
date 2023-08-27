


const XLSX = require('xlsx');
const imageSize = require('image-size');
const fs = require('fs');
const path = require('path');
const ExcelJS=require('exceljs')






  

  


 
	
             
                 

  















app.use(express.static('public')); // Serve static files from a 'public' directory

app.post('/edit', async (req, res) => {
  try {
    //const workbook = new xl.Workbook();
    //const worksheet = workbook.addWorksheet('Training Attendance Sheet');

    const existingWorkbook = new ExcelJS.Workbook();
await existingWorkbook.xlsx.readFile("C:/Users/vashisht yadav/Downloads/1691536751363Employee Joining form (4).xlsx").then(()=>{

  console.log("Existing Excel file read successfully.");
//res.status(200).json(existingWorbook)
})
const existingWorksheet = existingWorkbook.getWorksheet('Sheet1');

if (!existingWorksheet) {
  console.log("Error: Existing worksheet not found.");
  res.status(500).send("Error editing Excel file: Existing worksheet not found.");
  return;
}

//create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    //workbook.xlsx.readFile('path/to/existing/file.xlsx')

    const worksheet = workbook.addWorksheet('Sheet1');

    // Set header name
    const headerName='backend developer'
    worksheet.getCell('I1').value = headerName;
    // Edit or add data to the worksheet based on user input
    //worksheet.cell(1, 1).string('hello i am come from server');

    //const filePath = '"C:/Users/vashisht yadav/Downloads/Training Records & Attandance Sheet 1.xls""';
    //workbook.write(filePath);

    let newRowNumber = 2; // Initialize the row number for the new worksheet

    existingWorksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) { // Skip the first row (header) in existing file
        // Increment the row number for the new worksheet

        const newRow = worksheet.getRow(newRowNumber); // Get the corresponding row in the new worksheet

        //const newRow = worksheet.addRow()
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          //const newCell = worksheet.getCell(colNumber, newRowNumber);
          const newCell = newRow.getCell(colNumber); // Get the corresponding cell in the new row
          
          // Copy value
          newCell.value = cell.value;
          
          // Copy style from the source cell to the target cell
          const sourceCellStyle = existingWorksheet.getCell(colNumber, rowNumber).style;
          newCell.style = sourceCellStyle;
        });
        newRowNumber++;
      }
    });
    
    



    //customize font size and boldness of font
    worksheet.getCell('H1').font = {
      size: 50, // Customize the font size
      bold: true, // Make the text bold
    };


// Customize cell padding
worksheet.getCell('H1').alignment = {
  wrapText: true, // Wrap text within the cell
  vertical: 'middle', // Vertically center the text
  horizontal: 'center', // Horizontally center the text
};

worksheet.getRow(1).height = 100; // Customize row height
worksheet.getColumn('I').width = 50; // Customize column width






const backgroundColor = { argb: 'FFFFFF' };

worksheet.eachRow((row, rowNumber) => {
  if (rowNumber === 1) {
    // Apply border style to the first row
    row.eachCell(cell => {
      if (cell.value) {
        // Cell has content, apply border
        cell.border = {
          top: { style: 'thin'   ,color:backgroundColor },
          //bottom: { style: 'thin',color:backgroundColor },
          left: { style: 'thin'  ,color:backgroundColor },
          right: { style: 'thin' ,color:backgroundColor }
        };
      } else {
        // Empty cell, no border
        cell.border = {
          top: { style: 'thin',  color: backgroundColor },
          left: {style: 'thin',  color: backgroundColor},
          right:{style: 'thin', color: backgroundColor}
          //bottom:{ color: backgroundColor},
        };
      }
    });
  } else {
    // Other rows, no border style applied
  }
});



const timestamp = new Date().getTime();
const filePath = path.join(__dirname, `output_${timestamp}.xlsx`);
    await workbook.xlsx.writeFile(filePath) .then(() => {
      console.log('Excel file edited successfully');
      res.status(200).send(filePath);
    })
    .catch(error => {
      console.error('Error writing Excel file:', error);
      res.status(500).send('Error writing Excel file.');
    });
  } catch (error) {
    console.error('Error editing Excel file:', error);
    res.status(500).send('Error editing Excel file.');
  }
});

















app.get('/emp',async(req,res)=>{


const employee=await dataModel.find();
res.status(200).json(employee)

})