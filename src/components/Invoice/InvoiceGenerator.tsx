"use client";

import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
    Plus,
    Trash2,
    Printer,
    Download,
    Mail,
    Phone,
    Globe,
    Building2,
    Image as ImageIcon
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { InvoiceData, InvoiceItem } from "./types";
import { motion, AnimatePresence } from "framer-motion";

const initialData: InvoiceData = {
    companyName: "Brandship",
    companyAddress: "Warehouse Tejpal Singh Market",
    companyCity: "Badalpur, G.B Nagar-203207 Uttar Pradesh, India",
    companyPhone: "9891140081",
    companyEmail: "brandship00@gmail.com",
    companyWebsite: "www.brandshipwater.com",
    billToName: "",
    billToAddress: "",
    billToCity: "",
    shipToName: "",
    shipToAddress: "",
    shipToCity: "",
    invoiceNumber: "",
    invoiceDate: "",
    terms: "",
    dueDate: "",
    items: [
        {
            id: "1",
            name: "",
            description: "",
            quantity: 0,
            rate: 0,
            amount: 0,
        },
    ],
    customerMessage: "Hello!\n\nThank you for your purchase. Please return this invoice with payment.\n\nThanks!",
    gst: 0,
    shipping: 0,
    discount: 0,
};

export default function InvoiceGenerator() {
    const [data, setData] = useState<InvoiceData>(initialData);
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Invoice_${data.invoiceNumber}`,
    });

    const updateData = (field: keyof InvoiceData, value: any) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        setData((prev) => {
            const newItems = prev.items.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    if (field === "quantity" || field === "rate") {
                        updatedItem.amount = updatedItem.quantity * updatedItem.rate;
                    }
                    return updatedItem;
                }
                return item;
            });
            return { ...prev, items: newItems };
        });
    };

    const addItem = () => {
        const newItem: InvoiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: "",
            description: "",
            quantity: 0,
            rate: 0,
            amount: 0,
        };
        setData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    };

    const removeItem = (id: string) => {
        if (data.items.length === 1) return;
        setData((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
        }));
    };

    const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + (subtotal * (data.gst / 100)) + data.shipping - data.discount;

    const handleSend = () => {
        const subject = encodeURIComponent(`Invoice ${data.invoiceNumber} from ${data.companyName}`);
        const body = encodeURIComponent(
            `Hello ${data.billToName},\n\nPlease find the invoice details below:\n\n` +
            `Invoice #: ${data.invoiceNumber}\n` +
            `Total Amount: ${formatCurrency(total)}\n` +
            `Due Date: ${data.dueDate}\n\n` +
            `Thank you for your business!`
        );
        window.location.href = `mailto:${data.companyEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Invoice Generator</h1>
                    <p className="text-slate-500 mt-1">Create and print professional invoices instantly.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handlePrint()}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Printer className="w-4 h-4" />
                        Print / Save PDF
                    </button>
                    <button
                        onClick={handleSend}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Mail className="w-4 h-4" />
                        Send Invoice
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200"
            >
                <div ref={componentRef} className="p-12 print:p-8 bg-white text-slate-900 min-h-[1100px] flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-12">
                        <div className="space-y-4">
                            <div className="w-42 h-42 rounded-xl flex flex-col items-center justify-center  relative group cursor-pointer transition-colors">
                                <img src="/image.png" alt="" />
                            </div>
                            <div className="space-y-1">
                                <input
                                    value={data.companyName}
                                    onChange={(e) => updateData("companyName", e.target.value)}
                                    className="text-2xl font-bold block w-full outline-none focus:bg-slate-50 rounded px-1 -ml-1"
                                />
                                <input
                                    value={data.companyAddress}
                                    onChange={(e) => updateData("companyAddress", e.target.value)}
                                    className="text-slate-500 block w-full outline-none focus:bg-slate-50 rounded px-1 -ml-1"
                                />
                                <input
                                    value={data.companyCity}
                                    onChange={(e) => updateData("companyCity", e.target.value)}
                                    className="text-slate-500 block w-full outline-none focus:bg-slate-50 rounded px-1 -ml-1"
                                />
                            </div>
                        </div>

                        <div className="text-right space-y-6">
                            <h2 className="text-5xl font-light text-slate-400 tracking-tight">Invoicing</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-end gap-2 text-slate-600">
                                    <span className="font-semibold text-slate-900">Phone #</span>
                                    <input
                                        value={data.companyPhone}
                                        onChange={(e) => updateData("companyPhone", e.target.value)}
                                        className="text-right outline-none focus:bg-slate-50 rounded px-1"
                                    />
                                    <Phone className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex items-center justify-end gap-2 text-slate-600">
                                    <span className="font-semibold text-slate-900">Email</span>
                                    <input
                                        value={data.companyEmail}
                                        onChange={(e) => updateData("companyEmail", e.target.value)}
                                        className="text-right outline-none focus:bg-slate-50 rounded px-1"
                                    />
                                    <Mail className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex items-center justify-end gap-2 text-slate-600">
                                    <span className="font-semibold text-slate-900">Website</span>
                                    <input
                                        value={data.companyWebsite}
                                        onChange={(e) => updateData("companyWebsite", e.target.value)}
                                        className="text-right outline-none focus:bg-slate-50 rounded px-1"
                                    />
                                    <Globe className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex items-center justify-end gap-2 text-slate-600">
                                    <span className="font-semibold text-slate-900 uppercase">GSTIN</span>
                                    <input
                                        placeholder="Add GSTIN"
                                        className="text-right outline-none focus:bg-slate-50 rounded px-1"
                                    />
                                    <Building2 className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-12 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                        <div>
                            <h3 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">Bill to</h3>
                            <div className="space-y-1">
                                <input
                                    value={data.billToName}
                                    onChange={(e) => updateData("billToName", e.target.value)}
                                    placeholder="Client name"
                                    className="font-semibold block w-full outline-none bg-transparent focus:bg-white rounded px-1 -ml-1"
                                />
                                <input
                                    value={data.billToAddress}
                                    onChange={(e) => updateData("billToAddress", e.target.value)}
                                    placeholder="Street address"
                                    className="text-slate-600 block w-full outline-none bg-transparent focus:bg-white rounded px-1 -ml-1"
                                />
                                <input
                                    value={data.billToCity}
                                    onChange={(e) => updateData("billToCity", e.target.value)}
                                    placeholder="City, State, Zip code"
                                    className="text-slate-600 block w-full outline-none bg-transparent focus:bg-white rounded px-1 -ml-1"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">Ship to</h3>
                            <div className="space-y-1">
                                <input
                                    value={data.shipToName}
                                    onChange={(e) => updateData("shipToName", e.target.value)}
                                    placeholder="Client name"
                                    className="font-semibold block w-full outline-none bg-transparent focus:bg-white rounded px-1 -ml-1"
                                />
                                <input
                                    value={data.shipToAddress}
                                    onChange={(e) => updateData("shipToAddress", e.target.value)}
                                    placeholder="Street address"
                                    className="text-slate-600 block w-full outline-none bg-transparent focus:bg-white rounded px-1 -ml-1"
                                />
                                <input
                                    value={data.shipToCity}
                                    onChange={(e) => updateData("shipToCity", e.target.value)}
                                    placeholder="City, State, Zip code"
                                    className="text-slate-600 block w-full outline-none bg-transparent focus:bg-white rounded px-1 -ml-1"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">Details</h3>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Invoice #</span>
                                <input
                                    value={data.invoiceNumber}
                                    onChange={(e) => updateData("invoiceNumber", e.target.value)}
                                    placeholder="12345"
                                    className="text-right outline-none bg-transparent focus:bg-white rounded px-1"
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Invoice date</span>
                                <input
                                    value={data.invoiceDate}
                                    onChange={(e) => updateData("invoiceDate", e.target.value)}
                                    placeholder="mm/dd/yyyy"
                                    className="text-right outline-none bg-transparent focus:bg-white rounded px-1"
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Terms</span>
                                <input
                                    value={data.terms}
                                    onChange={(e) => updateData("terms", e.target.value)}
                                    placeholder="Net 30"
                                    className="text-right outline-none bg-transparent focus:bg-white rounded px-1"
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Due date</span>
                                <input
                                    value={data.dueDate}
                                    onChange={(e) => updateData("dueDate", e.target.value)}
                                    placeholder="mm/dd/yyyy"
                                    className="text-right outline-none bg-transparent focus:bg-white rounded px-1 font-semibold text-indigo-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-grow">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="text-left py-3 px-2 text-xs uppercase font-bold text-slate-400 tracking-wider w-1/4">Product/ service</th>
                                    <th className="text-left py-3 px-2 text-xs uppercase font-bold text-slate-400 tracking-wider">Description</th>
                                    <th className="text-right py-3 px-2 text-xs uppercase font-bold text-slate-400 tracking-wider w-32">Quantity/ hrs</th>
                                    <th className="text-right py-3 px-2 text-xs uppercase font-bold text-slate-400 tracking-wider w-32">Rate</th>
                                    <th className="text-right py-3 px-2 text-xs uppercase font-bold text-slate-400 tracking-wider w-32">Amount</th>
                                    <th className="w-10 print:hidden"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false}>
                                    {data.items.map((item, index) => (
                                        <motion.tr
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="border-b border-slate-100 group"
                                        >
                                            <td className="py-4 px-2 align-top">
                                                <input
                                                    value={item.name}
                                                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                                                    placeholder="Product or service"
                                                    className="w-full font-semibold outline-none focus:bg-slate-50 rounded px-1 -ml-1"
                                                />
                                            </td>
                                            <td className="py-4 px-2 align-top">
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                                    placeholder="Description of product or service"
                                                    className="w-full text-slate-500 text-sm outline-none focus:bg-slate-50 rounded px-1 -ml-1 resize-none"
                                                    rows={2}
                                                />
                                            </td>
                                            <td className="py-4 px-2 align-top text-right">
                                                <input
                                                    type="number"
                                                    value={item.quantity === 0 ? "" : item.quantity}
                                                    onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                                                    onFocus={(e) => e.target.select()}
                                                    placeholder="0"
                                                    className="w-full text-right outline-none focus:bg-slate-50 rounded px-1"
                                                />
                                            </td>
                                            <td className="py-4 px-2 align-top text-right">
                                                <input
                                                    type="number"
                                                    value={item.rate === 0 ? "" : item.rate}
                                                    onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                                                    onFocus={(e) => e.target.select()}
                                                    placeholder="0.00"
                                                    className="w-full text-right outline-none focus:bg-slate-50 rounded px-1"
                                                />
                                            </td>
                                            <td className="py-4 px-2 align-top text-right font-semibold">
                                                {formatCurrency(item.amount)}
                                            </td>
                                            <td className="py-4 px-2 align-top text-right print:hidden">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        <button
                            onClick={addItem}
                            className="mt-6 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors print:hidden"
                        >
                            <Plus className="w-4 h-4" />
                            Add line item
                        </button>
                    </div>

                    {/* Footer & Totals */}
                    <div className="mt-12 grid grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">Customer message</h3>
                            <textarea
                                value={data.customerMessage}
                                onChange={(e) => updateData("customerMessage", e.target.value)}
                                className="w-full text-slate-600 outline-none focus:bg-slate-50 rounded p-2 border border-transparent focus:border-slate-200 transition-all resize-none"
                                rows={6}
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-slate-500">Subtotal</span>
                                <span className="font-semibold">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-500">GST (%)</span>
                                    <input
                                        type="number"
                                        value={data.gst === 0 ? "" : data.gst}
                                        onChange={(e) => updateData("gst", parseFloat(e.target.value) || 0)}
                                        onFocus={(e) => e.target.select()}
                                        placeholder="0"
                                        className="w-16 text-right outline-none bg-slate-50 rounded px-1 text-xs"
                                    />
                                </div>
                                <span className="font-semibold">{formatCurrency(subtotal * (data.gst / 100))}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-slate-500">Shipping</span>
                                <input
                                    type="number"
                                    value={data.shipping === 0 ? "" : data.shipping}
                                    onChange={(e) => updateData("shipping", parseFloat(e.target.value) || 0)}
                                    onFocus={(e) => e.target.select()}
                                    placeholder="0.00"
                                    className="w-24 text-right outline-none bg-slate-50 rounded px-1 text-sm font-semibold"
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-slate-500">Discount</span>
                                <input
                                    type="number"
                                    value={data.discount === 0 ? "" : data.discount}
                                    onChange={(e) => updateData("discount", parseFloat(e.target.value) || 0)}
                                    onFocus={(e) => e.target.select()}
                                    placeholder="0.00"
                                    className="w-24 text-right outline-none bg-slate-50 rounded px-1 text-sm font-semibold"
                                />
                            </div>
                            <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-end">
                                <span className="text-xl font-bold">Total</span>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-indigo-600 leading-none">{formatCurrency(total)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <footer className="max-w-5xl mx-auto mt-12 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Invoice Generator. All rights reserved.</p>
            </footer>
        </div>
    );
}
