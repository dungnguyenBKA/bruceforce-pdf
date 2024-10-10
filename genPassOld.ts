import * as fs from 'fs';
import * as path from 'path';

// Function to format the date as DDMMMYYYY
function formatDate(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2); // Ensure day is two digits
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()]; // Get month name
    const year = date.getFullYear(); // Get full year as YYYY
    return `${day}${month}${year}`;
}

// Generator function to produce the date range
function* dateRange(startDate: Date, endDate: Date): Generator<Date> {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        yield new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
}

// Main function to generate the pass.txt file
function generatePassFile(fromDate: Date, toDate: Date, code: string, outputFileName: string = 'pass.txt'): void {
    const filePath = path.join(__dirname, outputFileName);
    const writeStream = fs.createWriteStream(filePath);

    for (const date of dateRange(fromDate, toDate)) {
        const formattedDate = formatDate(date);
        writeStream.write(`${formattedDate}${code}\n`); // Write each line in the format DDMMMYYYYCode
    }

    writeStream.end();
    console.log(`File '${outputFileName}' has been created.`);
}

// Example usage
const fromDate = new Date(1996, 0, 1);
const toDate = new Date(2000, 0, 1);
const code = 'B123413';

generatePassFile(fromDate, toDate, code);