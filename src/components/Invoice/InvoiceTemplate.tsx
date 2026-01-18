'use client';

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { cn, formatCurrency } from '@/lib/utils';

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

export interface InvoiceData {
    invoiceNumber: string;
    date: Date;
    dueDate: Date;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    items: InvoiceItem[];
    notes?: string;
    taxRate: number;
}

interface InvoiceTemplateProps {
    data: InvoiceData;
    className?: string;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ data, className }) => {
    const subtotal = data.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * (data.taxRate / 100);
    const total = subtotal + tax;

    return (
        <div id="invoice-template" className={cn("bg-white p-10 md:p-16 lg:p-20 shadow-2xl rounded-2xl max-w-4xl mx-auto print:shadow-none print:p-0 min-h-[1056px] flex flex-col", className)}>
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
                <div className="space-y-4">
                    <div className="relative w-48 h-24 mb-2">
                        <Image
                            src="/logo.png"
                            alt="BRANDSHIP Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    <div className="text-gray-500 text-sm leading-relaxed">
                        <p className="font-semibold text-blue-900">BRANDSHIP</p>
                        <p>(YOUR BRAND. OUR WATER)</p>
                        <p>123 Ocean Drive, Coastal City</p>
                        <p>contact@brandship.water</p>
                    </div>
                </div>

                <div className="text-right">
                    <h1 className="text-4xl font-light text-blue-950 tracking-tight mb-2 uppercase">Invoice</h1>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p><span className="font-semibold text-gray-700">Invoice #: </span>{data.invoiceNumber || 'INV-000'}</p>
                        <p><span className="font-semibold text-gray-700">Date: </span>{format(data.date, 'MMM dd, yyyy')}</p>
                        <p><span className="font-semibold text-gray-700">Due Date: </span>{format(data.dueDate, 'MMM dd, yyyy')}</p>
                    </div>
                </div>
            </div>

            <hr className="border-gray-100 mb-12" />

            {/* Client Info */}
            <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-4">Bill To</h2>
                    <div className="text-gray-600 space-y-1">
                        <p className="font-semibold text-gray-900 text-lg">{data.clientName || 'Client Name'}</p>
                        <p>{data.clientEmail || 'client@email.com'}</p>
                        <p className="whitespace-pre-line">{data.clientAddress || 'Client Address'}</p>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="flex-grow">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-50/50">
                            <th className="py-4 px-4 font-semibold text-blue-900 first:rounded-l-lg">Description</th>
                            <th className="py-4 px-4 font-semibold text-blue-900 text-center">Qty</th>
                            <th className="py-4 px-4 font-semibold text-blue-900 text-right">Price</th>
                            <th className="py-4 px-4 font-semibold text-blue-900 text-right last:rounded-r-lg">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.items.map((item) => (
                            <tr key={item.id} className="group">
                                <td className="py-4 px-4 text-gray-700">{item.description || 'Item description'}</td>
                                <td className="py-4 px-4 text-gray-600 text-center">{item.quantity}</td>
                                <td className="py-4 px-4 text-gray-600 text-right">{formatCurrency(item.price)}</td>
                                <td className="py-4 px-4 text-gray-900 font-medium text-right">{formatCurrency(item.quantity * item.price)}</td>
                            </tr>
                        ))}
                        {data.items.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-400 italic">No items added</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="mt-12 flex justify-end">
                <div className="w-full max-w-xs space-y-3">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Tax ({data.taxRate}%)</span>
                        <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-blue-900">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* Footer / Notes */}
            <div className="mt-20 pt-12 border-t border-gray-100 grid grid-cols-2 gap-8 items-end">
                <div>
                    <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Notes & Terms</h2>
                    <p className="text-xs text-gray-500 leading-normal whitespace-pre-line">
                        {data.notes || 'Thank you for choosing BRANDSHIP for your customized water solutions. Please include the invoice number in your payment transfer.'}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-blue-900 italic">"Your Brand. Our Water."</p>
                </div>
            </div>
        </div>
    );
};
