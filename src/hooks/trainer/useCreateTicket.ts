import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EXERCISE_CATEGORIES } from "@constant";

export const useCreateTicket = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [timeInput, setTimeInput] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
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

    const isSubmitDisabled =
        !formData.title ||
        !formData.price ||
        !formData.description ||
        formData.availableTimes.length === 0;

    return {
        formData,
        timeInput,
        setTimeInput,
        imagePreview,
        fileInputRef,
        handleChange,
        handleImageChange,
        triggerFileInput,
        addTimeTag,
        removeTimeTag,
        handleKeyPress,
        handleSubmit,
        isSubmitDisabled
    };
};
