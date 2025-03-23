// Enhanced mock data with professional meeting content
export const mockMeetingData = {
    title: "Financial Job Recruitment Requirements",
    duration: "00:09:45",
    summary: "Nav is hiring a Head of Financial Reporting in Coventry, requiring at least three years of post-qualification experience (ACCA, CIMA, or ACA). The role involves managing month-end reporting, producing management accounts for multiple entities, overseeing budgets and reforecasts, and mentoring junior team members. Reporting directly to Nav, the position offers a hybrid schedule (three days in-office, two days remote) with flexible core hours and an early finish on Fridays.",
    action_points: [
        "Finalize and approve the job description (including responsibilities, qualifications, and hybrid schedule).",
        "Post and advertise the role through appropriate channels",
        "Screen candidates for strong financial reporting and management accounting backgrounds.",
        "Plan interviews focusing on both technical skills and cultural fit.",
        "Prepare onboarding materials for month-end processes, reporting routines, and mentorship responsibilities.",
    ],
    transcription: "This is a voice recording between Craig Bonham and Nav Shigari? Shigari. Shigari to discuss a job role in his team. Date is the twenty ninth, is it, of, January. January.\n\nSo, first question. So, Nav, you're looking for a role. What's the title? Title is head of financial reporting. And the location?\n\nLocation is Coventry. Uh-huh. Yep. How many kind of years experience are you looking for? I'm looking for at least three years post qualification experience.\n\nYep. Okay. And then what kind of qualifications are you looking for for the role? Qualifications, minimum, either, an ACCA, so it's an association chartered certified accountants Yep. A receiver Yeah.\n\nWhich is a management account of qualification, or an ACA. Right. But more than likely, it would I suspect it'd be somebody with an ACCA or a CEMA background. Okay. Excellent.\n\nAnd then how far are you looking for the person to travel from home? I'd at East Midlands, basically, or West Midlands, so within a 30 mile radius. Of of country. Yeah. Perfect.\n\nOkay. Yeah. And does the role offer hybrid working? Yes. It does.\n\nSo we have three days in the office, two days working from home. Okay. And what's the kind of hours for the week then? What's the Minimum is thirty eight hours per week. Yep.\n\nAnd there may be instances where they might work slightly longer, but that's subject to month end routines. Yeah. And what about the kind of what's their start and finish time? Start and finish time would slightly flexible. So, ideally, core hours are nine till five.\n\nYep. So or is it nine till four? Sorry. Core hours. I would expect people to be working whatever suits subject to any conditions.\n\nAnd finish it on Friday? Friday, potentially about 02:00, I think it is 02:30. Okay. Cool. And so what is the role you're looking for then?\n\nWhat the role? In essence so it's ahead of financial reporting. Somebody who can come in to take control of the month end reporting routine, which consists of producing management accounts up to consolidation level for the six stroke seven entities that we have. Yep. And also cascading that information down to the business heads at the month end Mhmm.\n\nRoutine part of the month end routine process, preparation of business reviews, working as part of a team of six, which ranges from accounts payable, accounts receivables, a business liaison, partnering role. We're also a junior management accountant and to work alongside the junior management accountant to train them, to support them, and mentor them with a view to also take in long term ownership of the team and managing the team. Yeah. So is the role so the role then is is creating the account at the end of the month and feeding it back to the business as such. Yeah.\n\nYeah. And but also getting involved in other aspects of the business with relation to operational matters within certain finance financial operational matters within the individual businesses. Yeah. Any analysis that needs doing outside of that, working alongside myself in terms of producing the budgets on an annual basis, but also looking at the variance analysis against the budgets on a monthly basis Yeah. But also quarterly potentially quarterly or six six monthly reforecasting of the budgets.\n\nMhmm. There's the opportunity to get involved with the the r and d's claims that we do on an annual basis, and that's collecting that information Yep. And submission then eventually through to HMRC. Mhmm. But more importantly, also to take control and lead of the accounting function in terms of the preparation of, but also the liaison with the auditors at the year end.\n\nRight. Uh-huh. And who's the the what's the org structure for the team? Where is this position? So the org the the position would be one underneath myself.\n\nMhmm. So I'm head of finance. Yep. The position would be reported into me. Uh-huh.\n\nIt's technically a position for somebody who's looking to make a step change from a management accountant or a financial accountant into a financial controller role Yep. With a view to then taking on further responsibility over twelve to eighteen months. So they're reporting to you, and will they have any direct reports into them? They will do over a period of time as they settle into the role. Mhmm.\n\nThere won't be an immediate direct report from day one, but there is the opportunity subject to how they settle into the role Yeah. To then transition and take on the management of the team over a twelve month period or sooner. Yeah. Mhmm. So there's chance of expansion in the role then and Yes.\n\nTake on more responsibility as the as you progress through the right now. As the business grows Yeah. The finance option will grow with it. There's an opportunity to delve into other areas of the business in terms of The US side of it, for example. Mhmm.\n\nSo there'll be an opportunity to be exposed to US accounting and the rules and regulations that we have to abide by over there. Yeah. But also not just number crunching here, but it's taken it right from the number come to to the presentation of board Yeah. Board packs Yeah. Or preparation of board packs.\n\nSo would it be an advantage of some understanding of the American, accountancy laws? Possibly. But, ideally, they need to be UK and international. Yeah. Yeah.\n\nBut that's that's what they need. Okay. And, so to the expansion, is there any anything else important about the role? Somebody who's a team player. Yeah.\n\nSomebody who has the initiative and the will and want to take on responsibility with a leader leading team. Yeah. Somebody who's a reliable for myself, I need a reliable number two. Yeah. That's what I'm after.\n\nSomebody who I can trust with the team. Yeah. But also, they will be the go to person Yeah. In terms of finance Yep. With with any anybody if anybody's got any queries Okay.\n\nWithin the organization. Cool. Excellent. Anything else? No.\n\nIt's a good opportunity if somebody wants to make the step change Yeah. Yeah. And the transition. Yeah. And the opportunity to be your number to a search in the team, basically.\n\nAnd as part of that, they'll be mentored into the role. Yep. They'll get full support from me Yeah. Rather than just being dropped into the role cold. Yeah.\n\nAnd it's it's a great opportunity for somebody to to advance. Perfect. Okay. That's great. Thanks, Nat.",
    speakers: ["James Wilson", "Sarah Chen", "Michael Thompson", "Emma Rodriguez"]
};
// Create a complete job data object with timestamp
export const createMockJobData = () => {
    return {
        status: "complete",
        job_id: `mock-${Date.now()}`,
        minutes: mockMeetingData,
        timestamp: new Date().toISOString()
    };
};
// Initialize localStorage with mock data - run immediately
(() => {
    try {
        console.log('Checking for existing data in localStorage...');
        const existingJobId = localStorage.getItem('lastJobId');
        const existingJobData = localStorage.getItem('lastJobData');
        // Always create fresh mock data if missing or invalid
        if (!existingJobId || !existingJobData) {
            console.log('No valid data found, initializing with mock data');
            const mockData = createMockJobData();
            localStorage.setItem('lastJobId', mockData.job_id);
            localStorage.setItem('lastJobData', JSON.stringify(mockData));
            console.log('Mock data initialized:', mockData);
        }
        else {
            console.log('Found existing data in localStorage');
        }
    }
    catch (error) {
        console.error('Error initializing mock data:', error);
    }
})();
