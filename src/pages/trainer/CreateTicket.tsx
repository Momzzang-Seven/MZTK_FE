import { CREATE_TICKET_TEXT, EXERCISE_CATEGORIES } from "@constant";
import TrainerHeader from "@components/trainer/TrainerHeader";
import { CommonButton } from "@components/common";
import { useCreateTicket } from "@hooks/trainer/useCreateTicket";

/**
 * 트레이너 체험권 등록 페이지
 * @returns JSX.Element
 */
const CreateTicket = () => {
    const {
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
    } = useCreateTicket();

    return (
        <div className="flex flex-col h-full bg-white min-h-screen">
            <TrainerHeader title={CREATE_TICKET_TEXT.TITLE} showBack />

            <div className="flex-1 px-5 py-6 flex flex-col gap-6 overflow-y-auto pb-32 focus-within:pb-40 transition-all">
                {/* 1. 기본 정보 섹션 */}
                <div className="flex flex-col gap-5">
                    {/* 제목 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.TITLE}</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.TITLE}
                            className="w-full bg-grey-pale rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20"
                        />
                    </div>

                    {/* 카테고리 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.CATEGORY}</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-grey-pale rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20 appearance-none bg-[url('https://cdn0.iconfinder.com/data/icons/user-interface-2062/24/arrow_drop_down-512.png')] bg-[length:24px] bg-[right_12px_center] bg-no-repeat"
                        >
                            {EXERCISE_CATEGORIES.filter(cat => cat !== "전체").map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* 가격 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.PRICE}</label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.PRICE}
                            className="w-full bg-grey-pale rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20"
                        />
                    </div>
                </div>

                {/* 2. 상세 설명 섹션 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.DESC}</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.DESC}
                        className="w-full bg-grey-pale rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20 resize-none leading-relaxed"
                    />
                </div>

                {/* 3. 가능 시간 설정 섹션 */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.TIMES}</label>
                    <div className="flex gap-2">
                        <input
                            value={timeInput}
                            onChange={(e) => setTimeInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={CREATE_TICKET_TEXT.PLACEHOLDERS.TIMES}
                            className="flex-1 bg-grey-pale rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-main/20"
                        />
                        <button
                            onClick={addTimeTag}
                            className="bg-gray-800 text-white px-6 rounded-xl text-sm font-bold active:scale-95 transition-all"
                        >
                            추가
                        </button>
                    </div>

                    {/* 태그 리스트 */}
                    <div className="flex flex-wrap gap-2 mt-1">
                        {formData.availableTimes.map((time) => (
                            <div
                                key={time}
                                className="bg-main/10 border border-main/20 text-main flex items-center gap-2 px-3.5 py-2.5 rounded-full text-sm font-bold"
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

                {/* 4. 이미지 업로드 섹션 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">{CREATE_TICKET_TEXT.LABELS.IMAGE}</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div
                        onClick={triggerFileInput}
                        className="w-full aspect-video bg-grey-pale rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden cursor-pointer active:scale-[0.99] transition-all hover:bg-gray-50"
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <img src="/icon/camera.svg" alt="camera" className="w-8 h-8 opacity-20" />
                                <span className="text-xs text-gray-400 font-medium">이미지 업로드 (선택사항)</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 하단 고정 버튼 섹션 */}
            <div className="p-5 border-t border-gray-100 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <CommonButton
                    label={CREATE_TICKET_TEXT.SUBMIT}
                    className="h-[60px] rounded-2xl title shadow-sm active:opacity-90 transition-all font-bold"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                />
            </div>
        </div>
    );
};

export default CreateTicket;
