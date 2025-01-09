import { Warrant } from '@/model/user/warrantModel';
import { generatePDF } from '@/utils/pdfUtils';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const warrant = await Warrant.findById(id);
        console.log("Warrant Found for download" , warrant) ;
        if (!warrant) {
            return new Response(JSON.stringify({ error: 'Warrant not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const pdfBuffer = await generatePDF(warrant);
        console.log("PDF Buffer recieved inside download API" , pdfBuffer) ;
        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=FIR_${id}.pdf`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
