import React from 'react';
import { ArrowLeft, CheckCircle, Clock, Truck, Home, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const TimelineItem = ({ icon: Icon, title, time, status, isLast }) => {
    // status: 'completed', 'current', 'pending'
    let colorClass, opacityClass;

    if (status === 'completed') {
        colorClass = 'text-brand-pink bg-brand-light border-brand-pink';
        opacityClass = 'opacity-100';
    } else if (status === 'current') {
        colorClass = 'text-white bg-brand-pink border-brand-pink shadow-lg shadow-brand-pink/40 scale-110';
        opacityClass = 'opacity-100';
    } else {
        colorClass = 'text-gray-300 bg-gray-50 border-gray-200';
        opacityClass = 'opacity-50';
    }

    return (
        <div className={`flex gap-4 ${isLast ? '' : 'pb-8'} relative`}>
            {!isLast && (
                <div className={`absolute left-5 top-10 bottom-0 w-[2px] ${status === 'completed' ? 'bg-brand-pink' : 'bg-gray-100'}`}></div>
            )}

            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all ${colorClass}`}>
                <Icon size={18} />
            </div>

            <div className={`pt-1 ${opacityClass}`}>
                <h4 className="font-bold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500 mt-1">{time}</p>
            </div>
        </div>
    );
};

const TrackOrder = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="bg-white px-6 py-6 sticky top-0 z-40 shadow-sm flex items-center gap-4">
                <button onClick={() => navigate('/')} className="text-gray-800">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Track Order</h1>
            </div>

            <div className="flex-1 p-6 pb-24 overflow-y-auto">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Delivery</p>
                            <h2 className="text-xl font-bold text-gray-800">25 mins</h2>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&q=80" alt="Product" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="pl-2">
                        <TimelineItem icon={CheckCircle} title="Order Placed" time="10:30 AM" status="completed" />
                        <TimelineItem icon={Clock} title="Order Confirmed" time="10:32 AM" status="completed" />
                        <TimelineItem icon={Truck} title="Rider Picked Up" time="10:45 AM" status="current" />
                        <TimelineItem icon={Home} title="Delivered" time="Estimated 11:15 AM" status="pending" isLast={true} />
                    </div>
                </div>

                {/* Rider Info */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                        <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=400&q=80" alt="Rider" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">Ali Ahmed</h4>
                        <div className="flex items-center text-xs text-gray-500">
                            <span className="text-yellow-500 mr-1">★ 4.9</span>
                            • Bike Rider
                        </div>
                    </div>
                    <button className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-pink">
                        <Phone size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
