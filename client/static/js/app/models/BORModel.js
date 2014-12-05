define([], function () {

    var BORModel = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('nom.model.BORModel'),
        defaults: function() {
            return {
                "Title": "Risotto Primavera",
                "Description": "There are vegetables, so it must be healthy.",
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
                "Instructions": "In a large bowl, mix together flours, baking powder, baking soda, sugar, salt, and nutmeg if using.\r\nIn a medium bowl, whisk together the buttermilk, eggs, butter, and vanilla until blended.\r\nPour the wet ingredients over the dry ingredients and whisk JUST until incorporated (don’t overmix!)\r\nHeat a non-stick griddle to 325 degrees, or place a large non-stick frying pan over medium heat. Add a little butter, if desired. Scoop pancake batter by the scant 1/2 cup full onto griddle or pan. I like to use an ice cream scoop for this!\r\nSprinkle chocolate chips over the tops of the pancakes. For me it works out to about 10 to 12 chips per pancake.\r\nCook until the pancakes begin to look a little dry around the edges and start to form bubbles, about 1 to 2 minutes. Flip and cook for another minute or so until golden brown on both sides and cooked completely through (you might want to check one in the middle to be sure it’s cooked completely. If not, flip it back over and let it cook for a bit longer).\r\nServe with butter and maple syrup; sprinkle with additional chocolate chips if desired.",
                "YieldNumber": 8,
                "YieldUnit": "Servings",
                "TotalMinutes": 55,
                "ActiveMinutes": 55
            };
        }
    });

    return BORModel;
});