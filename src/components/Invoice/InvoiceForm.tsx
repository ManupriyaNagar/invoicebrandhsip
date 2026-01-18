'use client';

import React from 'react';
import { Plus, Trash2, Download, Printer } from 'lucide-react';
import { InvoiceData, InvoiceItem } from './InvoiceTemplate';
import { v4 as uuidv4 } from 'uuid';

interface InvoiceFormProps {
    data: InvoiceData;
    onChange: (data: InvoiceData) => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ data, onChange }) => {
    const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
        const newItems = data.items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        const newItem: InvoiceItem = {
            id: uuidv4(),
            description: '',
            quantity: 1,
            price: 0,
        };
        onChange({ ...data, items: [...data.items, newItem] });
    };

    const removeItem = (id: string) => {
        onChange({ ...data, items: data.items.filter(item => item.id !== id) });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-blue-100 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-blue-950">Invoice Details</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg shadow-blue-200"
                    >
                        <Printer size={18} />
                        Print / Save PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Invoice Number</label>
                        <input
                            type="text"
                            value={data.invoiceNumber}
                            onChange={(e) => onChange({ ...data, invoiceNumber: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="INV-2024-001"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Company / Client Name</label>
                        <input
                            type="text"
                            value={data.clientName}
                            onChange={(e) => onChange({ ...data, clientName: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="Future Water Corp"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={data.clientEmail}
                            onChange={(e) => onChange({ ...data, clientEmail: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="billing@futurewater.com"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                value={data.date.toISOString().split('T')[0]}
                                onChange={(e) => onChange({ ...data, date: new Date(e.target.value) })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
                            <input
                                type="date"
                                value={data.dueDate.toISOString().split('T')[0]}
                                onChange={(e) => onChange({ ...data, dueDate: new Date(e.target.value) })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Client Address</label>
                        <textarea
                            value={data.clientAddress}
                            onChange={(e) => onChange({ ...data, clientAddress: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none h-24"
                            placeholder="Street Name, City, Country"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">Line Items</label>
                {data.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[1fr,80px,120px,50px] gap-3 items-start">
                        <input
                            placeholder="Item name"
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
                <button
                    onClick={addItem}
                    className="w-full py-3 border-2 border-dashed border-blue-100 rounded-xl text-blue-500 hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2 font-medium"
                >
                    <Plus size={20} />
                    Add New Item
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Notes / Terms</label>
                    <textarea
                        value={data.notes}
                        onChange={(e) => onChange({ ...data, notes: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                        placeholder="Payment instructions, late fees, etc."
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tax Rate (%)</label>
                    <input
                        type="number"
                        value={data.taxRate}
                        onChange={(e) => onChange({ ...data, taxRate: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>
        </div>
    );
};
