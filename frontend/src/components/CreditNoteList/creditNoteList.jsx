import React, { useEffect, useState } from "react";
import axios from 'axios';
import InvoiceListCreditNote from "../CreditNoteInvoice/creditNoteInvoice";
import './CreditNoteList.css'

export const CreditNoteList = () => {

    const [creditNoteInvoices, setCreditNoteInvoice] = useState([]);
    const [selectedCreditNoteInvoice, setSelectedCreditNoteInvoice] = useState(null);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA', options);
    };

    useEffect(() => {
        axios.get('http://localhost:6969/allCreditNoteDetails')
            .then(response => setCreditNoteInvoice(response.data))
            .catch(error => console.error('Error fetching credit note details:', error));
    }, []);

    const openInvoice = (creditNoteInvoices) => {
        setSelectedCreditNoteInvoice(creditNoteInvoices); 
        document.body.classList.add('Invoice-open'); 
    };

    const closeInvoice = () => {
        setSelectedCreditNoteInvoice(null);
        document.body.classList.remove('Invoice-open'); 
    };

    return (
        <>
        <h1 className='ListInvoiceH1'>Credit Note</h1>

        <div className="invoice_div">
            {creditNoteInvoices.map(creditNoteinvoice => (
                <div className='Invoice_fv' key={creditNoteinvoice.id}  onClick={() => openInvoice(creditNoteinvoice)}>
                    <h2 className='Invoice_title'>Faktura {creditNoteinvoice.CreditNote}</h2>
                    <p className='Invoice_data'>Invoice: {creditNoteinvoice.invoiceName} </p>
                    <p className='Invoice_data'>Customer Name: {creditNoteinvoice.customerName}</p>
                    <p className='Invoice_data'>Date Invoice: {formatDate(creditNoteinvoice.dataInvoice)}</p>
                    <p className='Invoice_data'>Status: {creditNoteinvoice.status}</p>
                    <p className='Invoice_data'>Seller: {creditNoteinvoice.seller}</p>
                    <p className='Invoice_data'>Date Invoice Sell: {formatDate(creditNoteinvoice.dataInvoiceSell)}</p>
                  
                </div>
              
            ))}
        </div>
            {selectedCreditNoteInvoice && <InvoiceListCreditNote creditNoteInvoice={selectedCreditNoteInvoice} onClose={closeInvoice} />}
     
        </>
    );
};