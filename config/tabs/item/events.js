export const EventsTabConfig = {
    config: {
        initialTab: 0
    },
    tabs: [
        {
            label: "Overview",
            tabData: [
                {
                    label: "Summary:",
                    dataKey: "item_info"
                },
                {
                    label: "Date:",
                    dataKey: "item_start_date"
                },
                {
                    label: "Price:",
                    dataKey: "item_price"
                },
            ]
        },
        // {
        //     label: "Images",
        //     tabData: [
        //         {
        //             label: "",
        //             image: true,
        //             dataKey: "item_default_image"
        //         }
        //     ]
        // },
    ]
}