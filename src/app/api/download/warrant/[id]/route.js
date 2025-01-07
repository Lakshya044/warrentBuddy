import { Warrant } from '@/model/user/warrantModel';
import { saveAsDocx } from '@/utils/docxUtils';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const warrant = await Warrant.findById(id);

        if (!warrant) {
            return new Response(JSON.stringify({ error: 'Warrant not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const docxBuffer = await saveAsDocx(warrant);
        return new Response(docxBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename=FIR_${id}.docx`,
            },
        });
    } catch (error) {
        console.error('Error generating FIR:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate FIR' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
