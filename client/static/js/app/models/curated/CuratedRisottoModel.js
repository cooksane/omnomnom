/* source: http://thepioneerwoman.com/cooking/2011/05/risotto-primavera/ */


define(
    [
        "models/curated/CuratedModelBase",
        "core/Utils"
    ],
    function(CuratedModelBase, Utils) {


        var CuratedModel = CuratedModelBase.extend({

            localStorage: new Backbone.LocalStorage('nom.model.CuratedRisottoModel'),

            summaries: [
                "Chop the vegetables.",
                "Simmer the broth.",
                "Sauté the vegetables.",
                "Cook the rice in broth and wine.",
                "Add green onions and peas.",
                "Fine-tune texture and saltiness.",
                "Stir in cheese and remaining vegetables.",
                "Plate and garnish."
            ],

            instructions: [
                "Begin by peeling the carrots, cutting them into sticks, and then cutting the sticks into dice. Cut the broccoli and cauliflower into bits, and dice the yellow onion.",
                "Pour chicken broth into a small saucepan. Heat to a simmer.",
                "In a large pan, heat 2 tablespoons olive oil and 2 tablespoons butter. Add diced onions and diced carrots. Stir and cook for a minute or two. Add cauliflower and cook for a minute. Add broccoli and cook for 30 seconds. Add squash and cook for 30 seconds. Sprinkle in salt and stir. Remove from pan and put on a plate. Set aside.",
                "Add 1 tablespoons olive oil and 1 tablespoon butter to the same pan. Heat over medium-low heat. Add rice and stir, cooking for 1 minute. Add half the wine and 1 1/2 teaspoons kosher salt. Stir and cook until liquid is absorbed. Over the next 30 to 45 minutes, add 1 cup of simmering broth at a time, stirring and cooking until each addition of broth has absorbed. Add other half of wine and cook until absorbed.",
                "Add green onions and peas, stirring to combine.",
                "Taste to make sure rice is the right texture; add another helping of broth if rice has too much bite to it. Check salt content and add more salt if necessary.",
                "Once rice is cooked, remove from heat. Stir in goat cheese, Parmesan, and vegetables until all goat cheese is combined.",
                "Serve on plates, and garnish each with a sprig of dill."
            ],

            recipe: {
                "Title": "Risotto Primavera",
                "Description": "A quick risotto packed with veggies.",
                "Category": "Mains",
                "ImageURL": "http://farm3.static.flickr.com/2176/5701294093_0a54069b95_z.jpg",
                "Ingredients": [
                    {
                        "DisplayIndex": 0,
                        "Name": "low sodium chicken broth",
                        "Quantity": 5,
                        "DisplayQuantity": " 5 ",
                        "Unit": "cups"
                    },
                    {
                        "DisplayIndex": 1,
                        "Name": "olive oil",
                        "Quantity": 2,
                        "DisplayQuantity": " 2 ",
                        "Unit": "tablespoon"
                    },
                    {
                        "IngredientID": 6790403,
                        "DisplayIndex": 2,
                        "IsHeading": false,
                        "Name": "butter",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/butter\" class=\"glosslink\">butter</a>",
                        "Quantity": 2,
                        "DisplayQuantity": "2",
                        "Unit": "tablespoons",
                        "MetricQuantity": 30,
                        "MetricDisplayQuantity": "30",
                        "MetricUnit": "ml",
                        "PreparationNotes": "melted and cooled slightly",
                        "IngredientInfo": {
                            "Name": "butter",
                            "Department": "Dairy"
                        },
                        "IsLinked": true
                    },
                    {
                        "IngredientID": 6790404,
                        "DisplayIndex": 3,
                        "IsHeading": false,
                        "Name": "yellow onion ",
                        "HTMLName": "Yellow <a href=\"http://www.bigoven.com/glossary/onion\" class=\"glosslink\">onion</a> ",
                        "Quantity": 1,
                        "DisplayQuantity": "1",
                        "Unit": "large",
                        "MetricQuantity": 1,
                        "MetricDisplayQuantity": "1",
                        "MetricUnit": "small",
                        "PreparationNotes": "finely diced",
                        "IngredientInfo": {
                            "Name": "Yellow onion ",
                            "Department": "Produce"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 4,
                        "Name": "carrot",
                        "Quantity": 3,
                        "DisplayQuantity": " 3 ",
                        "Unit": "whole",
                        "PreparationNotes": "peeled and finely diced"
                    },
                    {
                        "DisplayIndex": 5,
                        "Name": "broccoli",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 6,
                        "Name": "cauliflower",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "IngredientID": 1779767,
                        "DisplayIndex": 7,
                        "IsHeading": false,
                        "Name": "salt",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/salt\" class=\"glosslink\">Salt</a>",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "teaspoon",
                        "MetricQuantity": 2.46446079160853,
                        "MetricDisplayQuantity": "2",
                        "MetricUnit": "ml",
                        "PreparationNotes": "",
                        "IngredientInfo": {
                            "Name": "Salt",
                            "Department": "Baking"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 8,
                        "Name": "olive oil",
                        "Quantity": 1,
                        "DisplayQuantity": " 1 ",
                        "Unit": "tablespoon"
                    },
                    {
                        "IngredientID": 6790403,
                        "DisplayIndex": 9,
                        "IsHeading": false,
                        "Name": "butter",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/butter\" class=\"glosslink\">butter</a>",
                        "Quantity": 1,
                        "DisplayQuantity": "1",
                        "Unit": "tablespoon",
                        "MetricQuantity": 15,
                        "MetricDisplayQuantity": "15",
                        "MetricUnit": "ml",
                        "PreparationNotes": "melted and cooled slightly",
                        "IngredientInfo": {
                            "Name": "butter",
                            "Department": "Dairy"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 9,
                        "Name": "arborio rice",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 10,
                        "Name": "dry white wine",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "IngredientID": 1779767,
                        "DisplayIndex": 11,
                        "IsHeading": false,
                        "Name": "salt",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/salt\" class=\"glosslink\">Salt</a>",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "teaspoon",
                        "PreparationNotes": "more to taste",
                        "IngredientInfo": {
                            "Name": "Salt",
                            "Department": "Baking"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 12,
                        "Name": "green onions",
                        "Quantity": 4,
                        "DisplayQuantity": " 4 ",
                        "Unit": "whole",
                        "PreparationNotes": "thinly sliced"
                    },
                    {
                        "DisplayIndex": 13,
                        "IsHeading": false,
                        "Name": "frozen peas",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 14,
                        "IsHeading": false,
                        "Name": "parmesan cheese",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "PreparationNotes": "grated",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 15,
                        "IsHeading": false,
                        "Name": "goat cheese",
                        "Quantity": 4,
                        "DisplayQuantity": " 4 ",
                        "Unit": "ounces"
                    },
                    {
                        "DisplayIndex": 16,
                        "IsHeading": false,
                        "Name": "fresh dill",
                        "DisplayQuantity": " ",
                        "PreparationNotes": "for garnish"
                    }
                ],
                "YieldNumber": 8,
                "YieldUnit": "Servings",
                "TotalMinutes": 55,
                "ActiveMinutes": 55
            }

        });

        return CuratedModel;
});
