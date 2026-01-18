'use client';

import { useState } from 'react';
import { InvoiceTemplate, InvoiceData } from '@/components/Invoice/InvoiceTemplate';
import { InvoiceForm } from '@/components/Invoice/InvoiceForm';
import { v4 as uuidv4 } from 'uuid';

const initialData: InvoiceData = {
  invoiceNumber: 'BS-2024-001',
  date: new Date(),
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days later
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  items: [
    { id: uuidv4(), description: 'Custom Branded Water Bottles (500ml)', quantity: 500, price: 0.85 },
    { id: uuidv4(), description: 'Label Design Service', quantity: 1, price: 150.00 },
  ],
  taxRate: 5,
  notes: 'Thank you for choosing BRANDSHIP. Payment is due within 14 days of invoice date.\nPlease include BS-2024-001 as reference in your wire transfer.'
};

export default function Home() {
  const [data, setData] = useState<InvoiceData>(initialData);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-blue-100">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden print:hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-12 md:py-20">
        <header className="mb-12 print:hidden text-center md:text-left">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Financial Suite 2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 tracking-tight">
            Invoice <span className="text-blue-600">Generator</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl leading-relaxed">
            Create professional, branded invoices for BRANDSHIP clients in seconds.
            All changes are previewed in real-time.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[450px,1fr] gap-12 items-start">
          {/* Form Section */}
          <section className="print:hidden space-y-6">
            <InvoiceForm data={data} onChange={setData} />
            <div className="p-6 bg-blue-950 rounded-2xl text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Need Bulk Export?</h3>
                <p className="text-blue-200 text-sm mb-4">Integrate your CRM to automatically generate invoices from orders.</p>
                <button className="text-sm font-semibold bg-white text-blue-950 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Contact Support
                </button>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-blue-800 rounded-full blur-3xl group-hover:bg-blue-700 transition-colors duration-500" />
            </div>
          </section>

          {/* Preview Section */}
          <section className="sticky top-12">
            <div className="print:block">
              <InvoiceTemplate data={data} />
            </div>

            <div className="mt-8 print:hidden flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Draft automatically saved
              </div>
              <span>•</span>
              <div className="underline decoration-blue-200 underline-offset-4 decoration-2">
                Print Optimized Layout
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-100 text-center text-gray-400 text-sm print:hidden">
        <p>© 2024 BRANDSHIP - YOUR BRAND. OUR WATER. All rights reserved.</p>
      </footer>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          header, footer, section:first-child {
            display: none !important;
          }
          section:last-child {
            width: 100% !important;
            position: relative !important;
            top: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #invoice-template {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </main>
  );
}
