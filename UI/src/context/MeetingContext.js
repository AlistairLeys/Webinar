import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getSocket } from '../api/socketService';
// Create context with default values
const MeetingContext = createContext({
    meetingData: null,
    setMeetingData: () => { },
    activeJobId: null,
    setActiveJobId: () => { },
    loading: false,
    setLoading: () => { },
    error: null,
    setError: () => { },
});
// Create provider component
export const MeetingProvider = ({ children }) => {
    const [meetingData, setMeetingData] = useState(null);
    const [activeJobId, setActiveJobId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Load from localStorage on initial render
    React.useEffect(() => {
        try {
            const storedJobId = localStorage.getItem('lastJobId');
            const storedJobData = localStorage.getItem('lastJobData');
            if (storedJobData && storedJobId) {
                const parsedData = JSON.parse(storedJobData);
                if (parsedData.minutes) {
                    setMeetingData(parsedData.minutes);
                    setActiveJobId(storedJobId);
                }
            }
        }
        catch (e) {
            console.error('Error loading meeting data from localStorage:', e);
        }
    }, []);
    // Save to localStorage whenever data changes
    React.useEffect(() => {
        if (meetingData && activeJobId) {
            try {
                localStorage.setItem('lastJobData', JSON.stringify({
                    job_id: activeJobId,
                    minutes: meetingData
                }));
                localStorage.setItem('lastJobId', activeJobId);
            }
            catch (e) {
                console.error('Error saving meeting data to localStorage:', e);
            }
        }
    }, [meetingData, activeJobId]);
    const connectToSocket = useCallback(() => {
        const s = getSocket(); // Add type assertion
        if (!s) {
            console.error("Failed to connect to socket");
            return;
        }
        // Set up socket event handlers
        s.on('processing_complete', (data) => {
            if (data && data.minutes) {
                setMeetingData(data.minutes);
                setActiveJobId(data.job_id);
            }
        });
        return () => {
            const currentSocket = getSocket(); // Add type assertion
            if (currentSocket) {
                currentSocket.off('processing_complete');
            }
        };
    }, [setMeetingData, setActiveJobId]);
    useEffect(() => {
        const cleanup = connectToSocket();
        return cleanup;
    }, [connectToSocket]);
    return (_jsx(MeetingContext.Provider, { value: {
            meetingData,
            setMeetingData,
            activeJobId,
            setActiveJobId,
            loading,
            setLoading,
            error,
            setError
        }, children: children }));
};
// Custom hook for using the context
export const useMeetingContext = () => useContext(MeetingContext);
export default MeetingContext;
