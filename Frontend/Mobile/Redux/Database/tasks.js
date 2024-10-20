const tasks = [
    {
        id: "1",
        title: "Develop content strategy",
        dueDate: new Date('2024-11-05T10:30:00Z'),
        label: ["content", "strategy", "Q1"],
        recurrence: "weekly",
        comment: ["Discuss blog ideas", "Get social media input"],
        fileUri: "https://example.com/content_strategy.pdf",
        filenames: ["content_strategy.pdf", "blog_outline.pdf"],
        fileDatas: [
            { name: "content_strategy.pdf", data: "base64encodeddata" },
            { name: "blog_outline.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "execute"
    },
    {
        id: "2",
        title: "Finalize ad campaign",
        dueDate: new Date('2024-10-25T12:00:00Z'),
        label: ["ads", "campaign", "marketing"],
        recurrence: null,
        comment: ["Review creatives", "Approve final budget"],
        filenames: ["ad_creatives_final.pdf"],
        fileDatas: [
            { name: "ad_creatives_final.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "approve"
    },
    {
        id: "3",
        title: "Prepare Q4 financial projections",
        dueDate: new Date('2024-10-30T17:00:00Z'),
        label: ["finance", "projections", "Q4"],
        recurrence: "quarterly",
        comment: ["Align with CFO", "Submit for board review"],
        fileUri: "https://example.com/financial_projections.xlsx",
        filenames: ["financial_projections.xlsx"],
        fileDatas: [
            { name: "financial_projections.xlsx", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "forApproval"
    },
    {
        id: "4",
        title: "Design branding guidelines",
        dueDate: new Date('2024-11-12T09:00:00Z'),
        label: ["branding", "design", "guidelines"],
        recurrence: null,
        comment: ["Define color schemes", "Design typography"],
        filenames: ["branding_guidelines.pdf"],
        fileDatas: [
            { name: "branding_guidelines.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "execute"
    },
    {
        id: "5",
        title: "Implement CRM system",
        dueDate: new Date('2024-12-01T11:00:00Z'),
        label: ["CRM", "software", "implementation"],
        recurrence: null,
        comment: ["Coordinate with IT", "Schedule training"],
        filenames: [],
        fileDatas: [],
        dateSet: true,
        status: "done"
    },
    {
        id: "6",
        title: "Plan year-end company party",
        dueDate: new Date('2024-12-15T18:00:00Z'),
        label: ["event", "party", "HR"],
        recurrence: null,
        comment: ["Book venue", "Send invites"],
        fileUri: "https://example.com/party_plan.pdf",
        filenames: ["party_plan.pdf"],
        fileDatas: [
            { name: "party_plan.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "forExecution"
    },
    {
        id: "7",
        title: "Redesign mobile app UI",
        dueDate: new Date('2024-11-25T09:00:00Z'),
        label: ["design", "UI/UX", "mobile"],
        recurrence: null,
        comment: ["Prepare wireframes", "Present design concepts"],
        filenames: ["app_wireframes.pdf"],
        fileDatas: [
            { name: "app_wireframes.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "forExecution"
    },
    {
        id: "8",
        title: "Submit patent application",
        dueDate: new Date('2024-12-03T14:00:00Z'),
        label: ["legal", "patent", "R&D"],
        recurrence: null,
        comment: ["Finalize claims", "Submit to patent office"],
        filenames: ["patent_application.pdf"],
        fileDatas: [
            { name: "patent_application.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "forApproval"
    },
    {
        id: "9",
        title: "Create investor pitch deck",
        dueDate: new Date('2024-10-28T16:00:00Z'),
        label: ["pitch", "investors", "presentation"],
        recurrence: null,
        comment: ["Gather financials", "Design slide deck"],
        fileUri: "https://example.com/investor_pitch.pdf",
        filenames: ["investor_pitch.pdf"],
        fileDatas: [
            { name: "investor_pitch.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "approve"
    },
    {
        id: "10",
        title: "Conduct market research survey",
        dueDate: new Date('2024-11-08T10:00:00Z'),
        label: ["market research", "survey", "Q4"],
        recurrence: null,
        comment: ["Design survey", "Analyze responses"],
        filenames: [],
        fileDatas: [],
        dateSet: true,
        status: "done"
    },
    {
        id: "11",
        title: "Organize product photoshoot",
        dueDate: new Date('2024-11-10T12:00:00Z'),
        label: ["product", "photoshoot", "marketing"],
        recurrence: null,
        comment: ["Hire photographer", "Prepare product samples"],
        filenames: [],
        fileDatas: [],
        dateSet: true,
        status: "forExecution"
    },
    {
        id: "12",
        title: "Launch new product landing page",
        dueDate: new Date('2024-11-20T09:30:00Z'),
        label: ["product", "landing page", "web development"],
        recurrence: null,
        comment: ["Create content", "Coordinate with web team"],
        filenames: ["landing_page_design.pdf"],
        fileDatas: [
            { name: "landing_page_design.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "execute"
    },
    {
        id: "13",
        title: "Write press release for new product",
        dueDate: new Date('2024-10-25T10:00:00Z'),
        label: ["PR", "product", "marketing"],
        recurrence: null,
        comment: ["Draft release", "Get CEO approval"],
        fileUri: "https://example.com/press_release.pdf",
        filenames: ["press_release.pdf"],
        fileDatas: [
            { name: "press_release.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "forApproval"
    },
    {
        id: "14",
        title: "Coordinate partnership meeting",
        dueDate: new Date('2024-11-02T14:00:00Z'),
        label: ["partnership", "meeting", "business"],
        recurrence: null,
        comment: ["Prepare agenda", "Review partnership terms"],
        filenames: ["meeting_agenda.pdf"],
        fileDatas: [
            { name: "meeting_agenda.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "forApproval"
    },
    {
        id: "15",
        title: "Review employee performance reports",
        dueDate: new Date('2024-12-01T15:00:00Z'),
        label: ["HR", "performance", "review"],
        recurrence: "yearly",
        comment: ["Collect manager feedback", "Prepare reports"],
        fileUri: "https://example.com/performance_reports.pdf",
        filenames: ["performance_reports.pdf"],
        fileDatas: [
            { name: "performance_reports.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "done"
    },
    {
        id: "16",
        title: "Prepare annual budget",
        dueDate: new Date('2024-12-10T12:00:00Z'),
        label: ["finance", "budget", "annual"],
        recurrence: "yearly",
        comment: ["Review departmental budgets", "Submit to CFO"],
        fileUri: "https://example.com/annual_budget.xlsx",
        filenames: ["annual_budget.xlsx"],
        fileDatas: [
            { name: "annual_budget.xlsx", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "forApproval"
    },
    {
        id: "17",
        title: "Design new product packaging",
        dueDate: new Date('2024-11-18T09:00:00Z'),
        label: ["product", "design", "packaging"],
        recurrence: null,
        comment: ["Create initial concepts", "Present to marketing"],
        filenames: ["packaging_design.pdf"],
        fileDatas: [
            { name: "packaging_design.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "execute"
    },
    {
        id: "18",
        title: "Plan customer feedback session",
        dueDate: new Date('2024-11-22T10:30:00Z'),
        label: ["customer", "feedback", "Q4"],
        recurrence: null,
        comment: ["Prepare questions", "Schedule session"],
        filenames: [],
        fileDatas: [],
        dateSet: true,
        status: "forExecution"
    },
    {
        id: "19",
        title: "Conduct competitor analysis",
        dueDate: new Date('2024-11-30T09:30:00Z'),
        label: ["competitor", "analysis", "research"],
        recurrence: null,
        comment: ["Gather market data", "Present findings"],
        filenames: ["competitor_analysis.pdf"],
        fileDatas: [
            { name: "competitor_analysis.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "done"
    },
    {
        id: "20",
        title: "Update company website",
        dueDate: new Date('2024-12-05T11:00:00Z'),
        label: ["website", "update", "IT"],
        recurrence: null,
        comment: ["Add new blog posts", "Update product pages"],
        filenames: ["website_changes.pdf"],
        fileDatas: [
            { name: "website_changes.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "execute"
    }
];

export default tasks;
