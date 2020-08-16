export const EventsTabConfig = {
    config: {
        initialTab: 0
    },
    tabs: [
        {
            label: "Overview",
            tabData: [
                {
                    label: "Event Name:",
                    dataKey: "item_name"
                },
                {
                    label: "Event Start Date:",
                    dataKey: "item_start_date"
                },
                {
                    label: "Event End Date:",
                    dataKey: "item_stop_date"
                },
                {
                    label: "Price:",
                    dataKey: "item_price"
                },
            ]
        },
        {
            label: "Description",
            tabData: [
                {
                    label: "Description",
                    dataKey: "item_description"
                }
            ]
        },
        {
            label: "Location",
            tabData: [
                {
                    label: "Location",
                    dataKey: [
                        "item_location",
                        "item_city",
                        "item_country",
                        "item_country_abbr",
                    ]
                }
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