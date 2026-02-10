import { useNavigate } from "react-router-dom";
import { TRAINER_DASHBOARD_TEXT } from "@constant";
import TrainerHeader from "@components/trainer/TrainerHeader";
import TrainerStats from "@components/trainer/TrainerStats";
import TrainerTicketList from "@components/trainer/TrainerTicketList";
import { CommonButton } from "@components/common";

const TrainerDashboard = () => {
    const navigate = useNavigate();

    // Dummy data for trainer's tickets
    const myTickets = [
        {
            id: 1,
            title: "1:1 집중 웨이트 트레이닝",
            price: 350,
            sales: 42,
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "기초 체력 증진 클래스",
            price: 200,
            sales: 15,
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop"
        }
    ];

    return (
        <div className="flex flex-col h-full bg-grey-pale min-h-screen pb-[100px]">
            {/* 1. Header */}
            <TrainerHeader title={TRAINER_DASHBOARD_TEXT.TITLE} />

            {/* 2. Stats Section */}
            <TrainerStats stats={TRAINER_DASHBOARD_TEXT.STATS} />

            {/* 3. Ticket List القسم */}
            <TrainerTicketList tickets={myTickets} />

            {/* 4. Bottom Floating Button */}
            <div className="fixed bottom-[100px] w-full max-w-[420px] px-5 z-40 pointer-events-none">
                <CommonButton
                    label={TRAINER_DASHBOARD_TEXT.CREATE_BUTTON}
                    className="h-[56px] rounded-2xl shadow-xl pointer-events-auto"
                    onClick={() => navigate("/trainer/create")}
                />
            </div>
        </div>
    );
};

export default TrainerDashboard;
