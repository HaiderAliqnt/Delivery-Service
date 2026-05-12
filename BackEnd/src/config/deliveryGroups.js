// config/deliveryGroups.js

const deliveryGroups = {

    GROUP_A: {

        // ALL BUILDINGS INSIDE THIS GROUP
        buildings: [
            "H10",
            "H9",
            "H1",
            "H2"
        ],

        // DELIVERY ORDER / ROUTE
        routeOrder: [
            "H1",
            "H9",
            "H2",
            "H10"
        ]
    },


    GROUP_B: {

        buildings: [
            "H6",
            "H5",
            "H4",
            "H3",
            "H8"
        ],

        routeOrder: [
            "H8",
            "H5",
            "H4",
            "H3",
            "H6"
        ]
    },


    GROUP_C: {

        buildings: [
            "BB",
            "GH",
            "Library",
            "ACB"
        ],

        routeOrder: [
            "BB",
            "GH",
            "Library",
            "ACB"
        ]
    }
};

export default deliveryGroups;