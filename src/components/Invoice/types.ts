export interface InvoiceItem {
    id: string;
    name: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface InvoiceData {
    companyName: string;
    companyAddress: string;
    companyCity: string;
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;

    billToName: string;
    billToAddress: string;
    billToCity: string;

    shipToName: string;
    shipToAddress: string;
    shipToCity: string;

    invoiceNumber: string;
    invoiceDate: string;
    terms: string;
    dueDate: string;

    items: InvoiceItem[];

    customerMessage: string;
    gst: number;
    shipping: number;
}
