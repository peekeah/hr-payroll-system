import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  try {

    const formData = await req.formData()
    const file = formData.get('file') as File;

    if (!file) {
      throw new Error("Please upload valid file")
    }

    const fileBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(fileBuffer), {
      type: "array",
      cellDates: true
    })

    // Get sheet name if not provided
    const sheet = workbook.SheetNames[0];

    if (!sheet) {
      throw new Error("No sheets found in the uploaded file");
    }
    // Get the worksheet
    const worksheet = workbook.Sheets[sheet];

    type EmployeeCreateInput = Prisma.EmployeeCreateInput;

    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet, {
      raw: true,            // Keep raw values
      defval: null,         // Default value for empty cells
      header: 1,            // Generate headers from first row
      blankrows: false      // Skip empty rows
    }) as string[][];

    if (data.length < 2) {
      throw new Error("No valid data found in the uploaded file");
    }

    // Extract headers (first row)
    const headers = data[0];

    const jsonData = data.slice(1).map((row) =>
      headers.reduce((acc: any, key, idx) => {
        let value = row[idx] ?? null;

        // Simple date handling for dateOfBirth
        if (key === 'dateOfBirth' && value) {
          const date = new Date(value);
          value = date.toISOString();
        }

        acc[key] = value;
        return acc;
      }, {} as EmployeeCreateInput)
    );

    await prisma.employee.createMany({
      data: jsonData
    })

    return Response.json({
      status: true,
      message: "Successfully uploaded file"
    })

  } catch (err) {
    console.log("Error", err)
    return Response.json({
      status: false,
      message: "Error while bulk upload"
    }, { status: 500 })

  }

}
