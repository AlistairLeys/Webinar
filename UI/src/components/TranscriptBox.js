import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import CollapseExpandButton from "./CollapseExpandButton";
import styles from "./TranscriptBox.module.css";
import { getJobStatus, getLastJobData } from "../api/apiService"; // Import the API functions
import { useMeetingContext } from "../context/MeetingContext"; // NEW
const TranscriptBox = ({ className = "", property1 = "Expanded", transcription = "", speakers = [], jobId = null }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [transcript, setTranscript] = useState(transcription);
    const [speakerList, setSpeakerList] = useState(speakers);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const hasLogged = useRef(false);
    const { meetingData, setMeetingData } = useMeetingContext(); // NEW
    // At the beginning of your TranscriptBox component, add these logs:
    console.log("PROPS TRANSCRIPTION:", JSON.stringify(transcription).substring(0, 100));
    console.log("CONTEXT TRANSCRIPTION:", (meetingData === null || meetingData === void 0 ? void 0 : meetingData.transcription) ?
        JSON.stringify(meetingData.transcription).substring(0, 100) : "null");
    // New effect: update transcript from meeting context when available
    useEffect(() => {
        if (meetingData && meetingData.transcription && meetingData.transcription.trim() !== "") {
            console.log("TranscriptBox: Updating transcript from MeetingContext");
            setTranscript(meetingData.transcription);
            if (meetingData.speakers && meetingData.speakers.length > 0) {
                setSpeakerList(meetingData.speakers);
            }
        }
    }, [meetingData]);
    // First, clear localStorage in a useEffect with empty dependencies to ensure it runs once on mount
    useEffect(() => {
        console.log("Clearing localStorage cache on mount");
        localStorage.removeItem('lastJobData');
        localStorage.removeItem('lastJobId');
    }, []);
    // Enhanced useEffect for better error handling
    useEffect(() => {
        // If we have valid transcription from props, use it and don't attempt to fetch or use localStorage
        if (transcription && transcription.trim() !== '') {
            console.log("TranscriptBox: Using transcription directly from props");
            setTranscript(transcription);
            return; // Exit early - don't fetch or use localStorage
        }
        if (jobId) {
            let pollInterval;
            const fetchTranscript = async () => {
                try {
                    setIsLoading(true);
                    setLoadError(null);
                    console.log(`TranscriptBox: Fetching data for job ${jobId}`);
                    const result = await getJobStatus(jobId);
                    console.log("TranscriptBox: Received result", result);
                    if (result.status === 'completed' &&
                        result.minutes &&
                        result.minutes.transcription &&
                        result.minutes.transcription.trim().length > 0) {
                        setTranscript(result.minutes.transcription);
                        if (result.minutes.speakers && result.minutes.speakers.length > 0) {
                            setSpeakerList(result.minutes.speakers);
                        }
                        setMeetingData(result.minutes);
                        clearInterval(pollInterval);
                    }
                    else {
                        // ONLY use localStorage if we don't already have a valid transcript
                        if (!transcript || transcript.trim() === '') {
                            const localData = getLastJobData();
                            if (localData.jobId === jobId &&
                                localData.jobData &&
                                localData.jobData.minutes &&
                                localData.jobData.minutes.transcription &&
                                localData.jobData.minutes.transcription.trim().length > 0) {
                                console.log(`TranscriptBox: Using transcript from localStorage for job ${jobId}`);
                                setTranscript(localData.jobData.minutes.transcription);
                                setLoadError(null);
                            }
                            else {
                                setLoadError('Job is still processing. Please wait...');
                            }
                        }
                    }
                }
                catch (error) {
                    console.error("Failed to fetch transcript data:", error);
                    // If we have valid transcription from props, use it and don't use localStorage
                    if (transcription && transcription.trim() !== '') {
                        console.log("TranscriptBox: Using provided transcription from props after fetch error");
                        setTranscript(transcription);
                        setLoadError(null);
                    }
                    else {
                        setLoadError('Failed to load the transcript. Please try again.');
                    }
                }
                finally {
                    setIsLoading(false);
                }
            };
            // Only fetch if we don't have a transcript already
            if (!transcript || transcript.trim() === '') {
                fetchTranscript();
                pollInterval = setInterval(fetchTranscript, 10000);
            }
            return () => clearInterval(pollInterval);
        }
    }, [jobId, transcription]); // Add transcription as dependency
    // Compute transcript to display: from context if available, else local state
    const displayTranscript = meetingData && meetingData.transcription && meetingData.transcription.trim() !== ""
        ? meetingData.transcription
        : transcript;
    // Right after your displayTranscript calculation, add:
    console.log("FINAL DISPLAY TRANSCRIPTION:", displayTranscript ? JSON.stringify(displayTranscript).substring(0, 100) : "null");
    console.log("TranscriptBox rendering with transcript:", displayTranscript ? displayTranscript.substring(0, 50) + "..." : "none");
    return (_jsx("div", { className: [styles.transcriptBox, className].join(" "), "data-property1": property1, children: _jsxs("div", { className: styles.transcriptFrame, children: [_jsxs("div", { className: styles.header, children: [_jsx("div", { className: styles.chatTitle1, children: _jsx("span", { className: styles.chatTitle, children: "Transcript" }) }), _jsx("div", { className: styles.buttonCollapseContainer, children: _jsx(CollapseExpandButton, { onClick: () => setCollapsed(!collapsed), isCollapsed: collapsed }) })] }), _jsx("div", { className: [styles.transcript, collapsed ? styles.collapsed : ''].join(" "), "data-acc-group": true, children: _jsx(CSSTransition, { in: !collapsed, timeout: 300, classNames: {
                            enter: styles.collapseEnter,
                            enterActive: styles.collapseEnterActive,
                            exit: styles.collapseExit,
                            exitActive: styles.collapseExitActive,
                        }, unmountOnExit: true, children: _jsxs("div", { className: styles.collapsibleContent, children: [_jsx("div", { className: styles.searchBox, children: _jsxs("div", { className: styles.searchText, children: [_jsx("div", { className: styles.symbolSearchSmall, children: _jsx("svg", { width: "34", height: "34", viewBox: "0 0 34 34", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M24.5182 22.7084L30 28.1889L28.1889 30L22.7084 24.5182C20.6692 26.1529 18.1327 27.042 15.5191 27.0383C9.16058 27.0383 4 21.8777 4 15.5191C4 9.16058 9.16058 4 15.5191 4C21.8777 4 27.0383 9.16058 27.0383 15.5191C27.042 18.1327 26.1529 20.6692 24.5182 22.7084ZM21.9507 21.7587C23.5747 20.088 24.4817 17.849 24.4785 15.5191C24.4785 10.5698 20.4685 6.55981 15.5191 6.55981C10.5698 6.55981 6.55981 10.5698 6.55981 15.5191C6.55981 20.4685 10.5698 24.4785 15.5191 24.4785C17.849 24.4817 20.088 23.5747 21.7587 21.9507L21.9507 21.7587Z", fill: "#A4A4A4" }) }) }), _jsx("input", { className: styles.search, placeholder: "Search..." })] }) }), _jsx("div", { className: styles.replyBox, style: { height: 'auto' }, children: _jsx("div", { className: styles.questionText, children: isLoading ? (_jsx("div", { className: styles.loadingIndicator, children: "Loading transcript..." })) : loadError ? (_jsx("div", { className: styles.errorMessage, children: loadError })) : (_jsx("div", { className: styles.transcriptBody, style: { height: 'auto', overflow: 'visible' }, children: displayTranscript ? (_jsx("pre", { className: styles.transcriptText, children: displayTranscript })) : (_jsx("div", { className: styles.noTranscript, children: "No transcript available" })) })) }) })] }) }) })] }) }));
};
export default TranscriptBox;
