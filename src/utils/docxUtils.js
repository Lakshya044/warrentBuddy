import { Document, Packer, Paragraph, TextRun } from 'docx';

export const saveAsDocx = (warrant) => {
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Warrant Details', bold: true, size: 32 }),
                        ],
                    }),
                    new Paragraph({ text: `Warrant No: ${warrant.warrantNo}` }),
                    new Paragraph({ text: `Type: ${warrant.warrantType}` }),
                    new Paragraph({ text: `Type: ${warrant.issueDate}` }),
                    new Paragraph({ text: `Type: ${warrant.status}` }),
                    new Paragraph({ text: `Type: ${warrant.aaddharNo}` }),
                    new Paragraph({ text: `Type: ${warrant.warrantType}` }),
                    new Paragraph({ text: `Accused: ${warrant.accusedName}` }),
                    new Paragraph({ text: `Details: ${warrant.details}` }),
                    new Paragraph({ text: `Status: ${warrant.address}` }),
                    new Paragraph({ text: `Status: ${warrant.pincode}` }),
                    new Paragraph({ text: `Issued Date: ${new Date(warrant.issueDate).toLocaleDateString()}` }),
                ],
            },
        ],
    });

    return Packer.toBuffer(doc);
};
