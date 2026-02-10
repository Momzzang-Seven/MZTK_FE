import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_TICKET_TEXT, EXERCISE_CATEGORIES } from "@constant";
import TrainerHeader from "@components/trainer/TrainerHeader";
import { CommonButton } from "@components/common";

const CreateTicket = () => {
    const navigate = useNavigate();
    const [timeInput, setTimeInput] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        category: EXERCISE_CATEGORIES[1],
        price: "",
        description: "",
        availableTimes: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addTimeTag = () => {
        if (!timeInput.trim()) return;
        if (formData.availableTimes.includes(timeInput.trim())) {
            setTimeInput("");
            return;
        }
        setFormData(prev => ({
            ...prev,
            availableTimes: [...prev.availableTimes, timeInput.trim()].sort()
        }));
        setTimeInput("");
    };

    const removeTimeTag = (time: string) => {
        setFormData(prev => ({
            ...prev,
            availableTimes: prev.availableTimes.filter(t => t !== time)
        }));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTimeTag();
        }
    };

    const handleSubmit = () => {
        if (formData.availableTimes.length === 0) {
            alert("최소 하나 이상의 수업 가능 시간을 입력해주세요.");
            return;
        }

        alert("체험권이 성공적으로 등록되었습니다!");
        navigate("/trainer");
    };

    return (
        <div className="flex flex-col h-full bg-white min-h-screen">
            <TrainerHeader title={CREATE_TICKET_TEXT.TITLE} showBack />

            <div className="flex-1 px-5 py-6 flex flex-col gap-6 overflow-y-auto pb-32">
                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.TITLE}</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.TITLE}
                        className="w-full bg-grey-pale rounded-xl py-3.5 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20"
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2 border-b border-gray-50 pb-2">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.CATEGORY}</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-grey-pale rounded-xl py-3.5 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20 appearance-none bg-[url('https://cdn0.iconfinder.com/data/icons/user-interface-2062/24/arrow_drop_down-512.png')] bg-[length:24px] bg-[right_12px_center] bg-no-repeat"
                    >
                        {EXERCISE_CATEGORIES.filter(cat => cat !== "전체").map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.PRICE}</label>
                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.PRICE}
                        className="w-full bg-grey-pale rounded-xl py-3.5 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.DESC}</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.DESC}
                        className="w-full bg-grey-pale rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20 resize-none"
                    />
                </div>

                {/* Flexible Time Tag Input */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.TIMES}</label>
                    <div className="flex gap-2">
                        <input
                            value={timeInput}
                            onChange={(e) => setTimeInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.TIMES}
                            className="flex-1 bg-grey-pale rounded-xl py-3.5 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20"
                        />
                        <button
                            onClick={addTimeTag}
                            className="bg-gray-800 text-white px-5 rounded-xl text-sm font-bold active:scale-95 transition-all"
                        >
                            추가
                        </button>
                    </div>

                    {/* Tags Display */}
                    <div className="flex flex-wrap gap-2 mt-1">
                        {formData.availableTimes.map((time) => (
                            <div
                                key={time}
                                className="bg-main/10 border border-main/20 text-main flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold"
                            >
                                {time}
                                <button
                                    onClick={() => removeTimeTag(time)}
                                    className="w-4 h-4 rounded-full bg-main/20 flex items-center justify-center text-[10px] hover:bg-main/30"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Placeholder */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.IMAGE}</label>
                    <div className="w-full aspect-video bg-grey-pale rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                        <img src="/icon/camera.svg" alt="camera" className="w-8 h-8 opacity-20 mb-2" />
                        <span className="text-xs text-gray-400">이미지 업로드 (선택사항)</span>
                    </div>
                </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <CommonButton
                    label={CREATE_TICKET_TEXT.SUBMIT}
                    className="h-[56px] rounded-2xl"
                    onClick={handleSubmit}
                    disabled={!formData.title || !formData.price || !formData.description || formData.availableTimes.length === 0}
                />
            </div>
        </div>
    );
};

export default CreateTicket;
