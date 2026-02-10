import { create } from 'zustand';
import { MARKET_ITEMS } from '@constant';

export interface MarketItem {
    id: number;
    title: string;
    location: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    availableTimes?: string[];
    trainer?: {
        name: string;
        title: string;
        image: string;
    };
}

interface MarketState {
    items: MarketItem[];
    addItem: (item: Omit<MarketItem, 'id'>) => void;
    updateItem: (id: number, item: Partial<MarketItem>) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
    items: MARKET_ITEMS.map(item => ({
        ...item,
        description: "개인별 맞춤형 프로그램을 제공합니다.",
        availableTimes: ["09:00", "10:00", "14:00", "15:00"],
        trainer: {
            name: "김철수 트레이너",
            title: "전문 퍼스널 트레이너",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
        }
    })),
    addItem: (item) => set((state) => ({
        items: [
            ...state.items,
            {
                ...item,
                id: state.items.length > 0 ? Math.max(...state.items.map(i => i.id)) + 1 : 1
            }
        ]
    })),
    updateItem: (id, updatedItem) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, ...updatedItem } : item)
    })),
}));
