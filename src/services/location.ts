
// Mock Service for Location

export const getUserLocation = async () => {
    // Mock API Call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return null or a mock location
    // For now, we simulate "not registered" if not found in local storage (handled by zustand persist mainly),
    // but this API would return the DB state.
    // We'll return null to let the flow work as "new user" by default unless set.
    return null;
};

export const registerLocation = async (coords: { lat: number; lng: number; address: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Mock API: Location Registered", coords);
    return { success: true, ...coords };
};
