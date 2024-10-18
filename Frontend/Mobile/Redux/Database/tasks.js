const tasks = [
    {
        id: "1a2b3c4d",
        title: "Prepare marketing strategy",
        dueDate: new Date('2024-10-30T10:00:00Z'),
        label: ["marketing", "strategy", "Q4"],
        recurrence: "weekly",
        comment: ["Discuss with the team", "Get feedback from stakeholders"],
        fileUri: "https://example.com/marketing_plan.pdf",
        filenames: ["marketing_plan.pdf", "strategy_overview.pdf"],
        fileDatas: [
            { name: "marketing_plan.pdf", data: "base64encodeddata" },
            { name: "strategy_overview.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "todo"
    },
    {
        id: "5e6f7g8h",
        title: "Client follow-up call",
        dueDate: new Date('2024-11-02T14:00:00Z'),
        label: ["client", "call", "Q3"],
        recurrence: null,
        comment: ["Prepare client notes", "Confirm meeting agenda"],
        filenames: [],
        fileDatas: [],
        dateSet: true,
        status: "tobeapproved"
    },
    {
        id: "9i0j1k2l",
        title: "Design website mockups",
        dueDate: new Date('2024-10-25T09:00:00Z'),
        label: ["design", "website", "UI/UX"],
        recurrence: null,
        comment: ["Draft mobile layout", "Review desktop version"],
        fileUri: "https://example.com/website_mockups.png",
        filenames: ["website_mockups.png"],
        fileDatas: [
            { name: "website_mockups.png", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "todo"
    },
    {
        id: "3m4n5o6p",
        title: "Review legal contract",
        dueDate: new Date('2024-10-22T16:00:00Z'),
        label: ["legal", "review", "contract"],
        recurrence: null,
        comment: ["Consult with legal team", "Finalize terms"],
        filenames: ["contract_draft.docx"],
        fileDatas: [
            { name: "contract_draft.docx", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "done"
    },
    {
        id: "7q8r9s0t",
        title: "Organize team building event",
        dueDate: new Date('2024-11-15T12:00:00Z'),
        label: ["event", "team building"],
        recurrence: "monthly",
        comment: ["Select venue", "Prepare activity list"],
        fileUri: "https://example.com/event_details.pdf",
        filenames: ["event_details.pdf"],
        fileDatas: [
            { name: "event_details.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "todo"
    },
    {
        id: "u1v2w3x4",
        title: "Submit quarterly financial report",
        dueDate: new Date('2024-12-05T17:00:00Z'),
        label: ["finance", "report", "Q3"],
        recurrence: "quarterly",
        comment: ["Double-check revenue numbers", "Get manager approval"],
        fileUri: "https://example.com/q3_report.xlsx",
        filenames: ["q3_report.xlsx"],
        fileDatas: [
            { name: "q3_report.xlsx", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "tobeapproved"
    },
    {
        id: "5y6z7a8b",
        title: "Update social media content",
        dueDate: new Date('2024-10-28T10:00:00Z'),
        label: ["social media", "content", "update"],
        recurrence: "bi-weekly",
        comment: ["Create posts for Facebook, Instagram", "Schedule tweets"],
        filenames: ["social_media_plan.pdf"],
        fileDatas: [
            { name: "social_media_plan.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "todo"
    },
    {
        id: "9c0d1e2f",
        title: "Plan company retreat",
        dueDate: new Date('2024-12-01T11:00:00Z'),
        label: ["retreat", "planning", "HR"],
        recurrence: null,
        comment: ["Contact venues", "Prepare retreat itinerary"],
        filenames: ["retreat_ideas.pdf"],
        fileDatas: [
            { name: "retreat_ideas.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "todo"
    },
    {
        id: "3g4h5i6j",
        title: "Prepare product demo",
        dueDate: new Date('2024-11-10T15:00:00Z'),
        label: ["product", "demo", "sales"],
        recurrence: null,
        comment: ["Create slide deck", "Prepare live demo"],
        filenames: ["demo_presentation.pptx"],
        fileDatas: [
            { name: "demo_presentation.pptx", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "tobeapproved"
    },
    {
        id: "7k8l9m0n",
        title: "Send out newsletter",
        dueDate: new Date('2024-10-20T08:00:00Z'),
        label: ["newsletter", "email", "marketing"],
        recurrence: "monthly",
        comment: ["Write new content", "Update mailing list"],
        filenames: ["newsletter_october.pdf"],
        fileDatas: [
            { name: "newsletter_october.pdf", data: "base64encodeddata" }
        ],
        dateSet: true,
        status: "todo"
    }
];

export default tasks;
