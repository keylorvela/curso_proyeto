import axios from 'axios';

//const API_BASE_URL = "https://backend-proyeto.vercel.app";

const API_BASE_URL = 'http://localhost:3000';
//


export async function sendApplication(formData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/applications`, formData, {
          headers: {
            'Accept': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error) {
        throw new Error('Failed to send application form: ' + error.message);
      }    
}


export async function downloadPaymentReceipt(idApplication) {
    try {
        const response = await axios.get(`${API_BASE_URL}/applications/file/${idApplication}`, {
            responseType: 'blob', 
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `payment_receipt_${idApplication}.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error fetching payment receipt:', error);
        return false;
    }
}


