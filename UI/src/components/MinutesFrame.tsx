import React, { FunctionComponent, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MinutesBox from "../components/MinutesBox";
import TranscriptBox from "../components/TranscriptBox";
import ChatBox from "../components/ChatBox";
import styles from "./MinutesFrame.module.css";
import { getLastJobData, joinJobRoom } from "../api/apiService";
import { createMockJobData } from "../api/mockData";
import { useNavigate } from "react-router-dom";

const MinutesFrame: FunctionComponent = () => {
  const navigate = useNavigate();
  const [leftWidth, setLeftWidth] = useState(50); // Initial width percentage for the left container
  const [isRightCollapsed, setIsRightCollapsed] = useState(true);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [jobData, setJobData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Start with loading state
  const [chatCollapsed, setChatCollapsed] = useState(true);

  // Add this function to handle new job creation
  const handleNewJobCreated = (jobId: string) => {
    setActiveJobId(jobId);
    setLoading(true);
    // Fetch data for new job or other handling as needed
  };

  // Always initialize with job data - this runs immediately on component mount
  useEffect(() => {
    console.log("MinutesFrame - Initializing component");
    
    // Get data with guaranteed mock fallback
    const { jobId, jobData: storedJobData } = getLastJobData();
    console.log('MinutesFrame - Retrieved job data:', { jobId, storedJobData });

    // Always set the data - our getLastJobData ensures we always have something
    setActiveJobId(jobId);
    setJobData(storedJobData);
    setLoading(false);
    
    // Also set up socket listeners just in case a real connection exists
    if (jobId) {
      // This won't do anything in demo mode, but doesn't hurt to call
      const cleanup = joinJobRoom(
        jobId,
        (updateData) => {
          console.log('Processing update:', updateData);
        },
        (completeData) => {
          console.log('Processing complete:', completeData);
          setJobData(completeData);
          
          try {
            localStorage.setItem('lastJobData', JSON.stringify(completeData));
          } catch (e) {
            console.error('Error storing job data in localStorage:', e);
          }
        },
        (error) => {
          console.error('Processing error:', error);
          setError('An error occurred while processing the job.');
        }
      );
      
      return cleanup;
    }
    
    return undefined;
  }, []);
  
  // If somehow we still don't have data after initialization, create it
  useEffect(() => {
    if (!loading && !jobData) {
      console.log("No job data found after initialization, creating mock data");
      const mockData = createMockJobData();
      setJobData(mockData);
      setActiveJobId(mockData.job_id);
      
      try {
        localStorage.setItem('lastJobId', mockData.job_id);
        localStorage.setItem('lastJobData', JSON.stringify(mockData));
      } catch (e) {
        console.error('Error storing mock job data in localStorage:', e);
      }
    }
  }, [loading, jobData]);

  return (
    <div className={styles.minutesFrame}>
      <NavBar onNewJobCreated={handleNewJobCreated} />
      <div className={styles.appContent}>
        <MinutesBox jobId={activeJobId} />
        <ChatBox 
          collapsed={chatCollapsed} 
          onCollapseChange={setChatCollapsed} 
        />
      </div>
    </div>
  );
};

export default MinutesFrame;
