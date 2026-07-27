import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const exportExcel = async ({ excelData, fileName, is_grouped }) => {

  // const is_grouped = true

  // const excelData = [
  //   {
  //     header: "Statement 1",
  //     data: [
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d4",
  //                 "type": "debit",
  //                 "amount": 10000,
  //                 "narration": "TRF null TO CLAN AFRICA INNOVATION LIMITED-BAM BAM COSMETICS FROM TAIWO ENOCH",
  //                 "balance": null,
  //                 "date": "2023-10-23T00:00:00.000Z",
  //                 "currency": "NGN"
  //             },
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d0",
  //                 "type": "debit",
  //                 "amount": 82000,
  //                 "narration": "POS WEB PMT PALMPAY LIMITED LA LANG",
  //                 "balance": null,
  //                 "date": "2023-10-23T00:00:00.000Z",
  //                 "currency": "NGN"
  //             },
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d1",
  //                 "type": "debit",
  //                 "amount": 50000,
  //                 "narration": "AIRTIME MTN 08102637956",
  //                 "balance": null,
  //                 "date": "2023-10-23T00:00:00.000Z",
  //                 "currency": "NGN"
  //             },
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d2",
  //                 "type": "debit",
  //                 "amount": 1002687,
  //                 "narration": "TRF FRM TAIWO ENOCH TO FOLASHADE CECILIA OLUGBENGA- 076",
  //                 "balance": null,
  //                 "date": "2023-10-23T00:00:00.000Z",
  //                 "currency": "NGN"
  //             },
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d3",
  //                 "type": "debit",
  //                 "amount": 50000,
  //                 "narration": "TRF null TO CLAN AFRICA INNOVATION LIMITED-SOJI ORIYOMI OKUNUGA FROM TAIWO ENOCH",
  //                 "balance": null,
  //                 "date": "2023-10-23T00:00:00.000Z",
  //                 "currency": "NGN"
  //             },
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d6",
  //                 "type": "debit",
  //                 "amount": 620000,
  //                 "narration": "POS WEB PMT LA 00NG",
  //                 "balance": null,
  //                 "date": "2023-10-22T00:00:00.000Z",
  //                 "currency": "NGN"
  //             },
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d7",
  //                 "type": "debit",
  //                 "amount": 181075,
  //                 "narration": "TRF FRM TAIWO ENOCH TO ISAH NUHU DANLAMI- 011",
  //                 "balance": null,
  //                 "date": "2023-10-22T00:00:00.000Z",
  //                 "currency": "NGN"
  //             },
  //             {
  //                 "id": "653e1dd7dc36e18e26a927d5",
  //                 "type": "debit",
  //                 "amount": 141075,
  //                 "narration": "TRF FRM TAIWO ENOCH TO BABATUNDE JAMIU YUSUF- 033",
  //                 "balance": null,
  //                 "date": "2023-10-22T00:00:00.000Z",
  //                 "currency": "NGN"
  //             }
  //         ]
  //       },
  //       {
  //         header: "Statement section 2",
  //         data: [
  //           {
  //                     "id": "653e1dd7dc36e18e26a927c5",
  //                     "type": "debit",
  //                     "amount": 50000,
  //                     "narration": "AIRTIME MTN 09064531611",
  //                     "balance": null,
  //                     "date": "2023-10-29T00:00:00.000Z",
  //                     "currency": "NGN"
  //                 },
  //                 {
  //                     "id": "653e1dd7dc36e18e26a927c6",
  //                     "type": "debit",
  //                     "amount": 500000,
  //                     "narration": "AIRTIME MTN 09064531611",
  //                     "balance": null,
  //                     "date": "2023-10-29T00:00:00.000Z",
  //                     "currency": "NGN"
  //                 },
  //                 {
  //                     "id": "653e1dd7dc36e18e26a927c7",
  //                     "type": "debit",
  //                     "amount": 748900,
  //                     "narration": "T696628 2TAB9ZQ7 DCIR POS LANG",
  //                     "balance": null,
  //                     "date": "2023-10-26T00:00:00.000Z",
  //                     "currency": "NGN"
  //                 },
  //                 {
  //                     "id": "653e1dd7dc36e18e26a927cc",
  //                     "type": "debit",
  //                     "amount": 101075,
  //                     "narration": "TRF FRM TAIWO ENOCH TO KAUSARA OMOWUNMI RABIU- 033",
  //                     "balance": null,
  //                     "date": "2023-10-25T00:00:00.000Z",
  //                     "currency": "NGN"
  //                 },
  //         ]
  //       },
  //       {
  //         header: "Third Statement, Department of Banking and Finance of John",
  //         data: [
  //           {
  //                     "id": "653e1dd7dc36e18e26a927cb",
  //                     "type": "debit",
  //                     "amount": 44290,
  //                     "narration": "SMS Alert Fee-24 09-23 10 2023 + VAT",
  //                     "balance": null,
  //                     "date": "2023-10-25T00:00:00.000Z",
  //                     "currency": "NGN"
  //                 },
  //                 {
  //                     "id": "653e1dd7dc36e18e26a927ca",
  //                     "type": "debit",
  //                     "amount": 201075,
  //                     "narration": "TRF FRM TAIWO ENOCH TO MFY BUY- 035",
  //                     "balance": null,
  //                     "date": "2023-10-25T00:00:00.000Z",
  //                     "currency": "NGN"
  //                 },
  //                 {
  //                     "id": "653e1dd7dc36e18e26a927c9",
  //                     "type": "debit",
  //                     "amount": 301075,
  //                     "narration": "TRF FRM TAIWO ENOCH TO ESTHER TIMOTHY- 033",
  //                     "balance": null,
  //                     "date": "2023-10-25T00:00:00.000Z",
  //                     "currency": "NGN"
  //                 },
  //         ]
  //       },
  //       {
  //         header: "DIRECTORATES OF LEGAL SERVICES",
  //         data: [
  //           {
  //             "id": "653e1dd7dc36e18e26a927c8",
  //             "type": "debit",
  //             "amount": 1502688,
  //             "narration": "TRF FRM TAIWO ENOCH TO JOHN OLUWAKAYODE ADEOYE- C03",
  //             "balance": null,
  //             "date": "2023-10-25T00:00:00.000Z",
  //             "currency": "NGN"
  //         },
  //         {
  //             "id": "653e1dd7dc36e18e26a927ce",
  //             "type": "debit",
  //             "amount": 550000,
  //             "narration": "AIRTIME MTN 09064531611",
  //             "balance": null,
  //             "date": "2023-10-24T00:00:00.000Z",
  //             "currency": "NGN"
  //         },
  //         ]
  //       }

  //     ]

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // If there's no data, return early
  if (!excelData || excelData?.length === 0) return;

  if (is_grouped) {
    // Dynamically generate headers based on the first section's data keys
    const firstSectionData = excelData?.[0]?.data;
    const headers =
      firstSectionData?.length > 0
        ? Object.keys(firstSectionData[0])?.map((header) =>
            header?.toUpperCase()
          )
        : [];

    // Start with an empty sheet and insert the headers first
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    let rowOffset = 1; // Start after the headers row

    excelData?.forEach((section) => {
      // Add a merged header row for each section (e.g., "Governor Table")
      XLSX.utils.sheet_add_aoa(ws, [[section?.header]], {
        origin: { r: rowOffset, c: 0 },
      });

      ws["!merges"] = ws["!merges"] || [];
      ws["!merges"].push({
        s: { r: rowOffset, c: 0 },
        e: { r: rowOffset, c: headers?.length - 1 },
      });

      // Apply bold style to the group header
      ws[`A${rowOffset + 1}`].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };

      rowOffset += 1;

      // Add the data rows for the group
      const dataRows = section?.data?.map((row) =>
        headers?.map((header) => row[header?.toLowerCase()] || "")
      );
      XLSX.utils.sheet_add_aoa(ws, dataRows, {
        origin: { r: rowOffset, c: 0 },
      });

      rowOffset += dataRows.length; // Move the offset after the data
    });

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
   else {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
};
