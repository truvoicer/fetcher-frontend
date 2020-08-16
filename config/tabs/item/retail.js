export const RetailTabConfig = {
    config: {
        initialTab: 0
    },
    tabs: [
        {
            label: "Overview",
            tabData: [
                {
                    label: "Summary:",
                    dataKey: "item_description"
                },
                {
                    label: "Price:",
                    dataKey: [
                        "item_currency",
                        "item_price"
                    ]
                },
            ]
        },
        {
            label: "Images",
            tabData: [
                {
                    label: "",
                    image: true,
                    dataKey: "item_image_url"
                }
            ]
        },
    ]
}