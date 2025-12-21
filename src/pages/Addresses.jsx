import React from 'react';
import { ArrowLeft, MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Addresses = () => {
    const navigate = useNavigate();

    const addresses = [
        {
            id: 1,
            label: "Home",
            address: "House 123, Street 4, Sector Y, DHA Phase 3, Lahore",
            isDefault: true
        },
        {
            id: 2,
            label: "Office",
            address: "Office 404, Arfa Tower, Ferozepur Road, Lahore",
            isDefault: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white px-6 py-6 sticky top-0 z-40 shadow-sm flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-gray-800">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Addresses</h1>
            </div>

            <div className="p-6 space-y-4 flex-1">
                {addresses.map(addr => (
                    <div key={addr.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative group">
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${addr.isDefault ? 'bg-brand-pink text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <MapPin size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-gray-900">{addr.label}</h3>
                                    {addr.isDefault && <span className="text-[10px] bg-brand-light text-brand-pink px-2 py-1 rounded-full font-bold">DEFAULT</span>}
                                </div>
                                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{addr.address}</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-50">
                            <button className="text-sm font-medium text-gray-500 hover:text-brand-pink flex items-center gap-1">
                                <Edit2 size={14} /> Edit
                            </button>
                            {!addr.isDefault && (
                                <button className="text-sm font-medium text-red-400 hover:text-red-500 flex items-center gap-1">
                                    <Trash2 size={14} /> Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sticky bottom-0">
                <Button className="w-full h-12 text-base shadow-lg shadow-brand-pink/30 flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add New Address
                </Button>
            </div>
        </div>
    );
};

export default Addresses;
