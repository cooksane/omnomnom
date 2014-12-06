/* source: http://smittenkitchen.com/blog/2010/10/mushroom-lasagna/ */

define(
    [
        "models/curated/CuratedModelBase",
        "core/Utils"
    ],
    function(CuratedModelBase, Utils) {


        var CuratedModel = CuratedModelBase.extend({

            localStorage: new Backbone.LocalStorage('nom.model.CuratedLasagnaModel'),

            ingredientIndexes: [
                [],
                [0,1,2],
                [3,4,5,6,7,8,9],
                [10,11,12,13],
                [14],
                []
            ],

            summaries: [
                "Preheat oven.",
                "Boil noodles.",
                "Prepare the béchamel.",
                "Prepare mushrooms.",
                "Assemble lasagna.",
                "Bake and finish."
            ],

            instructions: [
                "Preheat your oven to 375°F.",
                "Bring a large, wide (if you use a wide one, you can save a dish later and saute your mushrooms in the bottom of it) of water to boil with salt and a splash of oil. That will help keep your noodles from sticking together as they drain. Add the lasagna noodles and cook for 10 minutes. Drain and set aside.",
                "Bring the milk and garlic to simmer in a saucepan, or heat it in your microwave, and set it aside. Melt 8 tablespoons butter in a large saucepan. You can brown this butter if you'd like. Add the flour and cook for one minute over low heat, stirring constantly with a whisk or wooden spoon. Pour in the hot milk, a little at a time at first and stirring until combined. Once you’ve added half of it, you can add the second half all at once, along with 1 1/2 teaspoons table salt, the pepper, and nutmeg. Cook over medium-low heat, stirring or whisking frequently, for 3 to 5 minutes, or until thick. Set aside.",
                "Discard portobello mushroom stems and/or trim the ends of the cremini stems. Slice mushrooms 1/4-inch thick. Heat 2 tablespoons olive oil and 2 tablespoons butter over medium in the bottom of the large, wide pot you used to cook the noodles earlier, or in a large sauté pan. Cook half the mushrooms with a couple pinches of salt for about 5 minutes, or until they are tender and release some of their juices, tossing to make sure they cook evenly. Repeat with additional oil and butter, and remaining mushrooms.",
                "Spread some of the sauce (from step 3) in the bottom of an 8 x 12 or 9 x 13 baking dish. Arrange a layer of noodles (from step 2) on top, then more sauce (about 1/4 of what remains), 1/3 of the mushrooms (from step 4) and 1/4 cup grated parmesan. Repeat two more times then top with a final layer of noodles, your remaining sauce and last 1/4 cup of parmesan.",
                "Bake for 45 minutes, or until top is browned and the sauce is bubbly. Let sit at room temperature for 15 minutes before serving. To freeze for future use, allow it to cool completely and wrap two to three times in plastic wrap before freezing."
            ],

            recipe: {
                "Title": "Mushroom Lasagna",
                "Description": "Béchamel-based mushroomy heaven, stolen from Smitten Kitchen.",
                "Category": "Mains",
                "ImageURL": "http://farm5.static.flickr.com/4147/5055492782_550e94a078.jpg",
                "Ingredients": [
                    {
                        "DisplayIndex": 0,
                        "Name": "salt",
                        "Quantity": 3,
                        "DisplayQuantity": " 3 ",
                        "Unit": "tablespoons"
                    },
                    {
                        "DisplayIndex": 1,
                        "Name": "olive oil",
                        "Unit": "splash",
                        "DisplayQuantity": " 1 "
                    },
                    {
                        "DisplayIndex": 2,
                        "Name": "dried lasagna noodles",
                        "Unit": "pound",
                        "DisplayQuantity": " 3/4 "
                    },
                    {
                        "DisplayIndex": 3,
                        "Name": "garlic",
                        "Quantity": 1,
                        "DisplayQuantity": " 1 ",
                        "Unit": "large clove"
                    },
                    {
                        "DisplayIndex": 4,
                        "Name": "whole milk",
                        "Quantity": 4,
                        "DisplayQuantity": " 4 ",
                        "Unit": "cups"
                    },
                    {
                        "IngredientID": 6790403,
                        "DisplayIndex": 5,
                        "IsHeading": false,
                        "Name": "unsalted butter",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/butter\" class=\"glosslink\">butter</a>",
                        "Quantity": 8,
                        "DisplayQuantity": " 8 ",
                        "Unit": "tablespoons",
                        "IngredientInfo": {
                            "Name": "butter",
                            "Department": "Dairy"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 6,
                        "Name": "all-purpose flour",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 7,
                        "Name": "salt",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "teaspoons"
                    },
                    {
                        "DisplayIndex": 8,
                        "Name": "freshly ground black pepper",
                        "Quantity": 1,
                        "DisplayQuantity": " 1 ",
                        "Unit": "teaspoons"
                    },
                    {
                        "DisplayIndex": 9,
                        "Name": "ground nutmeg",
                        "Quantity": 1,
                        "DisplayQuantity": " 1 ",
                        "PreparationNotes": "or less, to taste",
                        "Unit": "teaspoons"
                    },
                    {
                        "DisplayIndex": 10,
                        "Name": "cremini or portobello mushrooms",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "pounds"
                    },
                    {
                        "DisplayIndex": 11,
                        "Name": "olive oil",
                        "Quantity": 4,
                        "DisplayQuantity": " 4 ",
                        "Unit": "tablespoons"
                    },
                    {
                        "IngredientID": 6790403,
                        "DisplayIndex": 12,
                        "IsHeading": false,
                        "Name": "unsalted butter",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/butter\" class=\"glosslink\">butter</a>",
                        "Quantity": 4,
                        "DisplayQuantity": "4",
                        "Unit": "tablespoons",
                        "IngredientInfo": {
                            "Name": "butter",
                            "Department": "Dairy"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 13,
                        "Name": "salt",
                        "DisplayQuantity": " a couple ",
                        "Unit": "pinches"
                    },
                    {
                        "DisplayIndex": 14,
                        "Name": "freshly grated parmesan",
                        "Quantity": 1,
                        "DisplayQuantity": " 1 ",
                        "Unit": "cup"
                    }
                ],
                "YieldNumber": 8,
                "YieldUnit": "Servings",
                "TotalMinutes": 100,
                "ActiveMinutes": 40
            }

        });

        return CuratedModel;
});
