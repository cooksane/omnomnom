/* source: http://smittenkitchen.com/blog/2014/04/baked-eggs-with-spinach-and-mushrooms/ */

define(
    [
        "models/curated/CuratedModelBase",
        "core/Utils"
    ],
    function(CuratedModelBase, Utils) {

        var CuratedModel = CuratedModelBase.extend({

            localStorage: new Backbone.LocalStorage('nom.model.CuratedEggsModel'),

            summaries: [
                "Wilt, dry, and chop spinach.",
                "Cook mushroom-spinach mixture.",
                "Create indentations for eggs in mushroom-spinach bed.",
                "Crack the eggs in indentations and bake until just set.",
                "Garnish and serve immediately."
            ],

            instructions: [
                "If you’ve just washed your spinach, no need to dry it before wilting it in the pan. If it’s already dry, bring 1/2 inch water to a boil in a very large ovenproof heavy skillet, then add half of spinach and cook, turning with tongs, until wilted, about 30 seconds. Add remaining spinach and wilt in same manner, then cook, covered, over moderately high heat until spinach is tender, about 1 to 2 minutes. Drain in a colander and cool under cold running water. Gently squeeze handfuls of spinach to remove as much liquid as possible, then coarsely chop. You will have about 2 cups fairly tightly packed cooked spinach.",
                "Wipe skillet dry, then melt butter over medium-low heat. Cook onion and garlic until softened, 2 to 3 minutes. Add mushrooms and increase heat to medium-high, then cook, stirring, until mushrooms have softened, exuded liquid and that liquid has cooked off, about 5 minutes. Stir in cream, salt, pepper, nutmeg (if using), and chopped spinach and bring back a simmer. Remove skillet from heat.",
                "If baking eggs in this skillet, make 12 large indentations in mixture, each large enough to fit an egg. Otherwise, you can transfer this mixture to a 9×13-inch baking dish and do the same there. I like to use 2 teaspoons to make the wells; I press the backs of them together to “pinch” up the spinach mixture to form taller walls so that the eggs will not merge together. You can then set this aside for a few hours or up to one day in the fridge, covered.",
                "When you’re ready to bake the dish, or about 30 minutes before serving, put oven rack in upper third of oven and heat oven to 450°F. Crack an egg into each well. Bake until whites are firm and yolks are still runny. You can check this by inserting a toothpick into various parts of the eggs and seeing whether they’re runny or set, which takes anywhere from 15 to 30 minutes. The range is long due to different ovens and baking vessels. It’s better to have to check more often than to let them overcook. It is nearly impossible to get all 12 eggs to cook evenly. The ones in the center will be more runny; at the edges, they’ll be more firm.",
                "Remove dish from oven, sprinkle with additional salt and pepper, plus grated Parmesan. Serve immediately."
            ],

            recipe: {
                "Title": "Baked Eggs with Spinach and Mushrooms",
                "Description": "As good for a weeknight dinner as it is a weekend brunch dish.",
                "Category": "Sides",
                "ImageURL": "https://farm3.staticflickr.com/2880/13896452685_53557b84b0.jpg",
                "Ingredients": [
                    {
                        "DisplayIndex": 0,
                        "Name": "fresh baby spinach",
                        "Quantity": 2,
                        "DisplayQuantity": " 2 ",
                        "Unit": "pounds"
                    },
                    {
                        "IngredientID": 6790404,
                        "DisplayIndex": 1,
                        "IsHeading": false,
                        "Name": "yellow onion ",
                        "HTMLName": "Yellow <a href=\"http://www.bigoven.com/glossary/onion\" class=\"glosslink\">onion</a> ",
                        "Quantity": 1,
                        "DisplayQuantity": "1",
                        "Unit": "large",
                        "MetricQuantity": 1,
                        "MetricDisplayQuantity": "1",
                        "MetricUnit": "small",
                        "PreparationNotes": "finely chopped",
                        "IngredientInfo": {
                            "Name": "yellow onion ",
                            "Department": "Produce"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 2,
                        "Name": "garlic",
                        "Quantity": 3,
                        "DisplayQuantity": " 3 ",
                        "Unit": "small cloves"
                    },
                    {
                        "IngredientID": 6790403,
                        "DisplayIndex": 3,
                        "IsHeading": false,
                        "Name": "unsalted butter",
                        "HTMLName": "<a href=\"http://www.bigoven.com/glossary/butter\" class=\"glosslink\">butter</a>",
                        "Quantity": 4,
                        "DisplayQuantity": " 4 ",
                        "Unit": "tablespoons",
                        "IngredientInfo": {
                            "Name": "butter",
                            "Department": "Dairy"
                        },
                        "IsLinked": true
                    },
                    {
                        "DisplayIndex": 4,
                        "Name": "cremini mushrooms",
                        "Quantity": 1,
                        "DisplayQuantity": " 1 ",
                        "Unit": "pounds"
                    },
                    {
                        "DisplayIndex": 5,
                        "Name": "heavy cream",
                        "Quantity": 1,
                        "DisplayQuantity": " 1 ",
                        "Unit": "cup"
                    },
                    {
                        "DisplayIndex": 6,
                        "Name": "salt",
                        "Quantity": 0.75,
                        "DisplayQuantity": " 3/4 ",
                        "Unit": "teaspoon"
                    },
                    {
                        "DisplayIndex": 7,
                        "Name": "freshly ground black pepper",
                        "Quantity": 0.5,
                        "DisplayQuantity": " 1/2 ",
                        "Unit": "",
                        "PreparationNotes": "teaspoon"
                    },
                    {
                        "DisplayIndex": 8,
                        "Name": "cremini mushrooms",
                        "Quantity": 1.5,
                        "DisplayQuantity": " 1 1/2 ",
                        "Unit": "pounds"
                    },
                    {
                        "DisplayIndex": 9,
                        "Name": "eggs",
                        "Quantity": 12,
                        "DisplayQuantity": " 12 ",
                        "Unit": "large"
                    },
                    {
                        "DisplayIndex": 10,
                        "Name": "finely grated parmesan",
                        "Quantity": 6,
                        "DisplayQuantity": " 6 ",
                        "Unit": "tablespoons"
                    },
                    {
                        "DisplayIndex": 11,
                        "Name": "salt",
                        "Quantity": 1,
                        "DisplayQuantity": "",
                        "Unit": "",
                        "PreparationNotes": "to taste"
                    },
                    {
                        "DisplayIndex": 12,
                        "Name": "freshly ground black pepper",
                        "Quantity": 1,
                        "DisplayQuantity": "",
                        "Unit": "",
                        "PreparationNotes": "to taste"
                    },
                    {
                        "DisplayIndex": 13,
                        "Name": "grated parmesan",
                        "Quantity": 1,
                        "DisplayQuantity": "",
                        "Unit": "",
                        "PreparationNotes": "to taste"
                    }
                ],
                "YieldNumber": 12,
                "YieldUnit": "Servings",
                "TotalMinutes": 45,
                "ActiveMinutes": 30
            }

        });

        return CuratedModel;
});
