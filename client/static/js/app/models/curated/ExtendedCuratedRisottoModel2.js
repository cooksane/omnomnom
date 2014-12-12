/* source: http://thepioneerwoman.com/cooking/2011/05/risotto-primavera/ */


define(
    [
        "models/curated/CuratedModelBase",
        "core/Utils"
    ],
    function(CuratedModelBase, Utils) {

        var CuratedModel = CuratedModelBase.extend({

            localStorage: new Backbone.LocalStorage('nom.model.ExtendedCuratedRisottoModel2'),

            //[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            tools: [
                {
                    name: "cutting board", 
                    quantity: 1
                },
                {
                    name: "small saucepan", 
                    quantity: 1
                },
                {
                    name: "large pan / Dutch oven", 
                    quantity: 1
                }
            ],

            ingredientIndexes: [
                [0],
                [1, 2],
                [3],
                [4],
                [5,6],
                [0,3],
                [2],
                [1, 7],
                [8, 9],
                [10],
                [11,12],
                [4],
                [13],
                [14,15],
                [],
                [16,17, 0, 1, 2, 3],
                [18]
            ],

            stageIndexes: [
                0, 0, 0,
                1,
                2,2,2,2,
                3,3,3,3,
                4,4,4,4,
                5
            ],

            stages: [
                {index: 0, name: "Chop vegetables", time: "10 min"},
                {index: 1, name: "Simmer broth", time: "1 min"},
                {index: 2, name: "Sauté vegetables", time: "5 min"},
                {index: 3, name: "Cook rice", time: "30-45 min"},
                {index: 4, name: "Add vegs + cheese", time: "5 min"},
                {index: 5, name: "Plate", time: "3 min"}
            ],

            summaries: [
                "Peel the carrots, cutting them first into sticks, and then cutting the sticks into dice.",
                "Cut the cauliflower and broccoli into bits.",
                "Dice the yellow onion.",

                "Pour chicken broth into a small saucepan. Heat to a simmer.",

                "In a large pan, heat 2 tablespoons olive oil and 2 tablespoons butter.",
                "Add diced onions and diced carrots. Stir and cook for a minute or two.",
                "Add cauliflower and cook for one minute, stirring.",
                "Add broccoli, and sprinkle in salt. Stir and cook for 30 seconds, then remove from pan and set aside on a plate. The whole point here is to barely cook the vegetables so they won’t be totally falling apart and mushy when it’s time to stir them into the rice.",

                "Add 1 tablespoons olive oil and 1 tablespoon butter to the same pan. Heat over medium-low heat.",
                "Add rice and stir, cooking for 1 minute.",
                "Add 3/4 cup wine and 1 1/2 teaspoons kosher salt. Stir and cook until liquid is absorbed.",
                "Over the next 30 to 45 minutes, add 1 cup of simmering broth at a time, stirring and cooking until each addition of broth has absorbed. The image is at about 30 minutes in--just about done.",
                "Add another 3/4 cup wine and cook until absorbed to finish it off with a great wine flavor.",

                "Add green onions and peas, stirring to combine.",
                "Taste to make sure rice is the right texture; add a bit of broth or wine if rice has too much bite to it. Also check salt content and add more salt if necessary.",
                "Remove from heat. Stir in goat cheese, Parmesan, and the sautéed vegetables until all goat cheese is combined. Add a small splash of broth if it gets overly thick/sticky.",

                "Serve on plates, and garnish each with a sprig of dill."
            ],

            imageURLs: [
                "http://farm3.static.flickr.com/2765/5701280717_8faf88a519_z.jpg",
                "http://farm3.static.flickr.com/2376/5701849782_211c56c541_z.jpg",
                "http://farm3.static.flickr.com/2247/5701849976_9b76141742_z.jpg",

                "http://farm3.static.flickr.com/2576/5701287871_74bf73d340_z.jpg",

                "http://farm6.static.flickr.com/5309/5701282411_872a72cdbd_z.jpg",
                "http://farm6.static.flickr.com/5189/5701283909_dc2b4fa07d_z.jpg",
                "http://farm6.static.flickr.com/5270/5701284605_c951ed5e2b_z.jpg",
                "http://farm6.static.flickr.com/5028/5701853972_9728897051_z.jpg",

                "http://farm3.static.flickr.com/2575/5701286185_d8712e06dd_z.jpg",
                "http://farm3.static.flickr.com/2453/5701854682_05f99b459b_z.jpg",
                "http://farm4.static.flickr.com/3211/5701288951_5d5a2a852d_z.jpg",
                "http://farm3.static.flickr.com/2578/5701857990_98eb631c39_z.jpg",

                "http://farm3.static.flickr.com/2578/5701857990_98eb631c39_z.jpg", //extra
                "http://farm4.static.flickr.com/3030/5701858360_7b8cd51e9a_z.jpg",
                "http://farm4.static.flickr.com/3030/5701858360_7b8cd51e9a_z.jpg", //extra (salt)

                "http://farm4.static.flickr.com/3456/5701859576_7258e80cc7_z.jpg",

                "http://farm3.static.flickr.com/2176/5701294093_0a54069b95_z.jpg"
            ],

            instructions: [
                "Peel the carrots, cutting them first into sticks, and then cutting the sticks into dice.", 
                "Cut the cauliflower and broccoli into bits.",
                "Dice the yellow onion.",

                "Pour chicken broth into a small saucepan. Heat to a simmer.",
            
                "In a large pan, heat 2 tablespoons olive oil and 2 tablespoons butter.",
                "Add diced onions and diced carrots. Stir and cook for a minute or two.",
                "Add cauliflower and cook for one minute, stirring.",
                "Add broccoli, and sprinkle in salt. Stir and cook for 30 seconds, then remove from pan and set aside on a plate. The whole point here is to barely cook the vegetables so they won’t be totally falling apart and mushy when it’s time to stir them into the rice.",
        
                "Add 1 tablespoons olive oil and 1 tablespoon butter to the same pan. Heat over medium-low heat.",
                "Add rice and stir, cooking for 1 minute.",
                "Add 3/4 cup wine and 1 1/2 teaspoons kosher salt. Stir and cook until liquid is absorbed.",
                "Over the next 30 to 45 minutes, add 1 cup of simmering broth at a time, stirring and cooking until each addition of broth has absorbed. The image is at about 30 minutes in--just about done.",
                "Add another 3/4 cup wine and cook until absorbed to finish it off with a great wine flavor.",
                
                "Add green onions and peas, stirring to combine.",
                "Taste to make sure rice is the right texture; add a bit of broth or wine if rice has too much bite to it. Also check salt content and add more salt if necessary.",
                "Remove from heat. Stir in goat cheese, Parmesan, and the sautéed vegetables until all goat cheese is combined. Add a small splash of broth if it gets overly thick/sticky.",
                    
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
                        "Name": "carrots",
                        "Quantity": 3,
                        "DisplayQuantity": " 3 ",
                        "Unit": "whole",
                        "PreparationNotes": "peeled and finely diced"
                    },
                    {
                        "DisplayIndex": 1,
                        "Name": "broccoli",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 2,
                        "Name": "cauliflower",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "cup"
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
                        "Name": "low sodium chicken broth",
                        "Quantity": 5,
                        "DisplayQuantity": " 5 ",
                        "Unit": "cups"
                    },
                    {
                        "DisplayIndex": 5,
                        "Name": "olive oil",
                        "Quantity": 2,
                        "DisplayQuantity": " 2 ",
                        "Unit": "tablespoon"
                    },
                    {
                        "IngredientID": 6790403,
                        "DisplayIndex": 6,
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
                        "DisplayIndex": 10,
                        "Name": "arborio rice",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 11,
                        "Name": "dry white wine",
                        "DisplayQuantity": " 3/4 ",
                        "Unit": "cup"
                    },
                    {
                        "IngredientID": 1779767,
                        "DisplayIndex": 12,
                        "IsHeading": false,
                        "Name": "salt",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/salt\" class=\"glosslink\">Salt</a>",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "teaspoon",
                        "IngredientInfo": {
                            "Name": "Salt",
                            "Department": "Baking"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 13,
                        "Name": "dry white wine",
                        "DisplayQuantity": " 3/4 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 14,
                        "Name": "green onions",
                        "Quantity": 4,
                        "DisplayQuantity": " 4 ",
                        "Unit": "whole",
                        "PreparationNotes": "thinly sliced"
                    },
                    {
                        "DisplayIndex": 15,
                        "IsHeading": false,
                        "Name": "frozen peas",
                        "Quantity": 0.5,
                        "PreparationNotes": "thawed",
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 16,
                        "IsHeading": false,
                        "Name": "goat cheese",
                        "Quantity": 4,
                        "DisplayQuantity": " 4 ",
                        "Unit": "ounces"
                    },
                    {
                        "DisplayIndex": 17,
                        "IsHeading": false,
                        "Name": "Parmesan cheese",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "PreparationNotes": "grated",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 18,
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
