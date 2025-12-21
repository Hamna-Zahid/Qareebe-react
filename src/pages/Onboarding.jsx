import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const slides = [
    {
        id: 1,
        title: "Fashion at your doorstep",
        desc: "Discover local boutiques and get your favorite outfits delivered in minutes.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
    },
    {
        id: 2,
        title: "Try before you buy",
        desc: "Not sure about the size? Order 2 sizes and return the one that doesn't fit instantly.",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
    },
    {
        id: 3,
        title: "Support Local",
        desc: "Empower small businesses in your community by shopping from them directly.",
        image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80"
    }
];

const Onboarding = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(curr => curr + 1);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="h-screen bg-white flex flex-col relative max-w-md mx-auto shadow-2xl overflow-hidden">
            <div className="flex-1 relative">
                <img
                    src={slides[currentSlide].image}
                    alt="Onboarding"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                <h2 className="text-3xl font-bold mb-3 leading-tight">{slides[currentSlide].title}</h2>
                <p className="text-gray-200 mb-8 leading-relaxed">{slides[currentSlide].desc}</p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-brand-pink' : 'w-2 bg-white/50'}`}
                            ></div>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-14 h-14 bg-brand-pink rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-pink/30 hover:scale-105 transition-transform"
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
