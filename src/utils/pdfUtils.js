import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cookies } from 'next/headers';

const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generatePDF = async (warrant) => {
    try {
        const name = cookies().get('name')?.value || 'Authorized Officer';
        const formattedIssueDate = new Date(warrant.issueDate).toLocaleDateString();
        const generatedTimestamp = new Date().toLocaleString(); 

        // Gemini AI Prompt
        const prompt = `
            Format the following warrant details into a professional legal document:

            Warrant No: ${warrant.warrantNo}
            Type: ${warrant.warrantType}
            Issue Date: ${formattedIssueDate}
            Status: ${warrant.status}
            Aadhar No: ${warrant.aadharNo}
            Accused: ${warrant.accusedName}
            Address: ${warrant.address}, ${warrant.pincode}
            Details: ${warrant.details}

            Provide the response in proper legal report format. Do not send back any text in bold, also do not respond with placeholders for any officers' names, and never wrap anything in brackets []. 
            At the top add "Authorised Copy of Warrant Issued Against ${warrant.accusedName}" with proper alignment and spacing.  
            If the details section is meaningful, you are free to add more description to it which makes sense and makes the document more legible to the public.
            Ensure line breaks (\n) so that content does not overflow.  
            At the bottom, add a note about "The Legacy of Indian Judiciary" to reflect its historical importance.
        `;

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const refinedText = result.response.text().trim().replace(/\*\*/g, ''); 

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

        const { width, height } = page.getSize();
        let yPosition = height - 50;

        page.drawText(`Authorised Copy of Warrant Issued Against ${warrant.accusedName}`, {
            x: 50,
            y: yPosition,
            size: 16,
            font: fontBold,
            color: rgb(0, 0, 0),
        });

        yPosition -= 40; 

        const writeKeyValue = (key, value, y) => {
            page.drawText(key, { x: 50, y, size: 12, font: fontBold, color: rgb(0, 0, 0) });
            page.drawText(value, { x: 200, y, size: 12, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
        };

        writeKeyValue('Warrant No:', String(warrant.warrantNo), yPosition);
        writeKeyValue('Type:', String(warrant.warrantType), yPosition - 20);
        writeKeyValue('Issue Date:', formattedIssueDate, yPosition - 40);
        writeKeyValue('Status:', String(warrant.status), yPosition - 60);
        writeKeyValue('Aadhar No:', String(warrant.aadharNo), yPosition - 80);
        writeKeyValue('Accused:', String(warrant.accusedName), yPosition - 100);
        writeKeyValue('Address:', `${warrant.address}, ${warrant.pincode}`, yPosition - 120);
        writeKeyValue('Details:', String(warrant.details), yPosition - 140);

        yPosition -= 180;

        const legacyText = "The Indian judiciary, one of the world's oldest legal systems, has evolved from ancient texts like the Manusmriti and Arthashastra to a structured framework influenced by Mughal and British rule. Today, it operates as a three-tiered system comprising the Supreme Court, 25 High Courts, and over 19,000 lower courts, serving 1.4 billion people. Landmark judgments such as Kesavananda Bharati v. State of Kerala (1973) upheld the Basic Structure Doctrine, ensuring constitutional integrity, while Vishaka v. State of Rajasthan (1997) established workplace harassment guidelines. The judiciary has also played a key role in expanding fundamental rights, as seen in Navtej Singh Johar v. Union of India (2018), which decriminalized Section 377, and K.S. Puttaswamy v. Union of India (2017), which recognized the right to privacy as a fundamental right. Despite its legacy of justice, challenges persist, with over 4.5 crore pending cases as of 2025. Judicial reforms, including digital courts, AI-driven case management, and e-filing systems, aim to enhance efficiency. The Indian judiciary remains a pillar of democracy, upholding justice, fairness, and constitutional supremacy while continuously evolving to meet the needs of a modern society.";
        const wrappedLines = wrapText(legacyText, 500, fontItalic, 11, page);

        page.drawText('The Legacy of Indian Judiciary:', {
            x: 50,
            y: yPosition,
            size: 12,
            font: fontBold,
            color: rgb(0, 0, 0),
        });

        yPosition -= 20;

        wrappedLines.forEach((line) => {
            page.drawText(line, { x: 50, y: yPosition, size: 11, font: fontItalic, color: rgb(0.2, 0.2, 0.2) });
            yPosition -= 20;
        });

        // ✅ Digital Signature
        const signatureText = `Digitally Signed by ${name}`;
        page.drawText(signatureText, { x: 200, y: 30, size: 14, font: fontItalic, color: rgb(0, 0, 1) });

        // ✅ Add Date & Time of PDF Generation Below Signature
        page.drawText(`Generated on: ${generatedTimestamp}`, { 
            x: 200, 
            y: 15, // Position below the signature
            size: 10, 
            font: fontRegular, 
            color: rgb(0.3, 0.3, 0.3) 
        });

        const pdfBytes = await pdfDoc.save();

        return pdfBytes;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Failed to generate PDF');
    }
};

// ✅ Text Wrapping Helper Function
const wrapText = (text, maxWidth, font, size, page) => {
    const words = text.split(' ');
    let line = '';
    let lines = [];
    
    words.forEach(word => {
        const newLine = line + (line ? ' ' : '') + word;
        const width = font.widthOfTextAtSize(newLine, size);
        
        if (width < maxWidth) {
            line = newLine;
        } else {
            lines.push(line);
            line = word;
        }
    });

    if (line) lines.push(line);
    return lines;
};
