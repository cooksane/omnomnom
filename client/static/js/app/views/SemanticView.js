define([
    "core/EventBus",
    "core/Utils",
    "views/InterfaceViewBase"
], function(EventBus, Utils, InterfaceViewBase) {

    return InterfaceViewBase.extend({

        className: "semantic-view-wrapper",
        template: nom.templates.RecipeSemantic,
        ingredientTemplate: nom.templates.Ingredient,

        instructionSummaryTemplate: nom.templates.InstructionSemanticSummary,
        instructionDetailsTemplate: nom.templates.InstructionSemanticDetails,

        events: {
            'mouseup .instruction': 'instructionClicked'
            ,"click #done": 'recipeComplete'

            ,'mouseup': 'mouseUp'
            ,'mousedown': 'mouseDown'
            //,'scroll': 'onScroll'

            //,"click": "onClick"
        },

        viewPreLookup: [],
        viewDetailsLookup: [],
        viewPostLookup: [],

        maxInstructionHeight: 0,

        iViewportHeight: 0,
        iContentHeight: 0,

        suppressScroll: false,

        initialize: function(params){
            this.appData = params.appData;
            this.initStats();
            this.initInteraction();
        },

        initStats: function(){
            console.log("ResponsiveView.initialize");
            _.bindAll(this, 'keyAction');
            $(document).bind('keyup', this.keyAction);
            this.updateLog("startClick", true);
            setInterval(_.bind(this.renderLoop, this), 10);
        },

        die: function(){
            $(document).unbind('keyup', this.keyAction);
            this.undelegateEvents();
            this.remove();
        },

        render: function(){
            console.log("ResponsiveView.render");
            this.renderTemplate();
            this.renderModel();
        },

        renderTemplate: function(){
            var recipe = this.model.attributes;
            var compiledTemplate = this.template(recipe);
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        },

        renderModel: function(){
            this.renderIngredients();
            this.renderInstructions();
            this.selectInstruction();
        },

        renderIngredients: function(){
            var result = this.model.attributes;
            var ingredients = result.Ingredients;
            var ingredientContainer = this.$el.find("#ingredients-container");
            for(var i=-1;++i<ingredients.length;){
                var ingredient = ingredients[i];
                var compiledTemplate = this.ingredientTemplate(ingredient);
                ingredientContainer.append(compiledTemplate);
            }
        },

        keyAction: function(e) {
            var code = e.keyCode || e.which;
            if (code == 38) { // up arrow
             e.stopImmediatePropagation();
             this.updateLog("upKey", this.prev());
            } else if (code == 40) {  // down arrow
             e.stopImmediatePropagation();
             this.updateLog("downKey", this.next());
            /*
             } else if (code == 39) { // right arrow
             } else if (code == 37) {  // left arrow
             */
            } else {
                this.onKey(e);
            }
        },

        highlightIngredients: function(){
            if(!this.appData.inghi){return;}

            var instructions = this.model.get("CuratedInstructions");
            var instruction = instructions[this.stepIndex];
            var ingredientIndexes = instruction.ingredientIndexes;

            var ingredients = this.model.get("Ingredients");
            var ingredientContainer = this.$el.find("#ingredients-container");

            var $ingredient;
            for(var i=-1;++i<ingredients.length;){
                var ingredient = ingredients[i];
                $ingredient = ingredientContainer.find("#ingredient_"+ingredient.DisplayIndex);
                //$ingredient.removeClass("ingredient");
                $ingredient.removeClass("highlight-text");
                //$ingredient.addClass("text-muted");
                $ingredient.addClass("ingredient");
            }
            for(var j=-1;++j<ingredientIndexes.length;){
                var iIndex = ingredientIndexes[j];
                $ingredient = ingredientContainer.find("#ingredient_"+iIndex);
                $ingredient.removeClass("ingredient");
                $ingredient.addClass("highlight-text");
                //$ingredient.removeClass("text-muted");
                //$ingredient.addClass("ingredient");
            }
        },

        /*
         */
        instructionClicked: function(event) {
            event.stopImmediatePropagation();
            var index = $(event.currentTarget).data('index') - 1;
            console.log('instructionClicked', index, event);
            if (this.stepIndex != index) {
                this.lastIndex = this.stepIndex;
                this.stepIndex = index;
                this.selectInstruction();
                this.updateLog("instructionClick", true);
            } else {
                this.snapToNearest();
                this.updateLog("instructionClick", false);
            }
        },


        prev: function(){
            var instructions = this.model.get("CuratedInstructions");
            if (this.stepIndex > 0){
                this.lastIndex = this.stepIndex;
                this.stepIndex -= 1;
                this.selectInstruction();
                return true;
            }
            return false;
        },

        next: function(){
            var instructions = this.model.get("CuratedInstructions");
            if (this.stepIndex < instructions.length-1){
                this.lastIndex = this.stepIndex;
                this.stepIndex += 1;
                this.selectInstruction();
                return true;
            }
            return false;
        },


        selectInstruction: function(){
            this.suppressScroll = true;
            this.setItemByIndex(this.stepIndex);
            this.highlightIngredients();
        },

        /**
         * Most of the interesting interaction code...
         */

        initInteraction: function(){
            var $window = $(window);
            $window.scroll(_.bind(this.onScroll, this));
            $window.resize(_.bind(this.onResize, this));
            /*
            $window.bind('mousedown', _.bind(this.mouseDown, this));
            $window.bind('mouseup', _.bind(this.mouseUp, this));
             */

            var $document = $(document);
            //$document.bind('touchstart', _.bind(this.touchStart, this));
            //$document.bind('touchmove', _.bind(this.touchMove, this));
            $document.bind('touchend', _.bind(this.touchEnd, this));
            //$document.bind('touchcancel', _.bind(this.touchCancel, this));
        },

        mouseDown: function(event){
            //console.log('mouseDown');
        },

        mouseUp: function(event){
            //console.log("mouseup", event);
            //console.log('mouseUp');
            this.snapToNearest();
        },

        touchStart: function(event) {console.log(event);},
        touchMove: function(event) {console.log(event);},
        touchCancel: function(event) {console.log(event);},

        touchEnd: function(event) {
            this.snapToNearest();
        },

        snapToNearest: function() {
            var discreteIndex = this.updateNearestIndex();
            this.setItemByIndex(discreteIndex);
        },

        updateNearestIndex: function() {
            var $window = $(window);
            var $container = this.$el.find("#instruction-container");
            var $instructionViewport = this.$el.find("#instruction-viewport");


            var wvpHeight = $window.height();
            var wcontentHeight = this.$el.height();

            var wscrollPosition = $window.scrollTop();
            var iscrollPosition = wscrollPosition / wcontentHeight * this.iContentHeight;

            var approxIndex = iscrollPosition / this.iViewportHeight;

            var discreteIndex = Math.round(approxIndex);
            if(discreteIndex != this.stepIndex){
                console.log('updateNearest', this.stepIndex, discreteIndex);
                this.lastIndex = this.stepIndex;
                this.stepIndex = discreteIndex;
                this.highlightIngredients();
            }
            return discreteIndex;
        },

        setItemByIndex: function(index){
            console.log('setItemByIndex', index);
            var $window = $(window);
            var wcontentHeight = this.$el.height();
            var iPosition = index*this.iViewportHeight;
            var wPosition = iPosition/this.iContentHeight*wcontentHeight;
            //this.suppressScroll = true;
            $window.scrollTop(wPosition);

            this.computeDetailInstructions();
            this.computePreInstructions();
            this.computePostInstructions();
        },

        onResize: function(event){
            var targetIndex = this.stepIndex;
            this.computeDimensions();
            this.computeDetailInstructions();
            this.computePreInstructions();
            this.computePostInstructions();
            setTimeout(_.bind(function(){
                console.log("setTimeout");
                this.setItemByIndex(targetIndex);
            }, this), 300);
            //this.updateNearestIndex();
        },

        onScroll: function(event){
            if(this.suppressScroll){
                this.suppressScroll = false;
                this.snapToNearest();
                return;
            }
            this.computeDetailInstructions();
            this.computePreInstructions();
            this.computePostInstructions();
            this.updateNearestIndex();
            //console.log('onScroll', event);
        },

        /**
         * Render-loop related
         */
        renderOk: false,
        $instructionContainer: null,
        $preViewport: null,
        $postViewport: null,
        $postContainer: null,
        targetInstructionPosition: null,
        currentInstructionPosition: null,
        targetPreHeight: null,
        currentPreHeight: null,
        targetPostHeight: null,
        currentPostHeight: null,
        targetPostPosition: null,
        currentPostPosition: null,

        renderLoop: function(){
            if(!this.renderOk){
                return;
            }

            var factor = 0.3;
            var delta = 0;
            var maxDelta = 0.01;
            //mid
            delta = factor*(this.targetInstructionPosition-this.currentInstructionPosition);
            if(Math.abs(delta) > maxDelta){
                this.currentInstructionPosition += delta;
                //this.currentInstructionPosition = this.targetInstructionPosition;
                this.$instructionContainer.css("top", this.currentInstructionPosition);
            }

            //pre
            delta = factor*(this.targetPreHeight-this.currentPreHeight);
            if(Math.abs(delta) > maxDelta){
                //this.currentPreHeight = this.targetPreHeight;
                this.currentPreHeight += delta;
                this.$preViewport.height(this.currentPreHeight);
            }

            //post
            delta = factor*(this.targetPostHeight-this.currentPostHeight);
            if(Math.abs(delta) > maxDelta) {
                this.currentPostHeight += delta;
                //this.currentPostHeight = this.targetPostHeight;
                this.$postViewport.height(this.currentPostHeight);
            }

            delta = factor*(this.targetPostPosition-this.currentPostPosition);
            if(Math.abs(delta) > maxDelta) {
                this.currentPostPosition += delta;
                //this.currentPostPosition = this.targetPostPosition;
                this.$postContainer.css("top", this.currentPostPosition);

            }
        },

        renderInstructions: function() {
            this.renderDetailedInstructions();
            this.renderPreSummaryInstructions();
            this.renderPostSummaryInstructions();

            this.$instructionContainer = this.$el.find("#instruction-container");
            this.$preViewport = this.$el.find("#pre-instruction-viewport");
            this.$postViewport = this.$el.find("#post-instruction-viewport");
            this.$postContainer = this.$el.find("#post-instruction-container");
            this.renderOk = true;
        },

        renderDetailedInstructions: function(){
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            var $container = this.$el.find("#instruction-container");

            for (var i = -1; ++i < instructions.length;) {
                var compiledTemplate = this.instructionDetailsTemplate(instructions[i]);
                this.viewDetailsLookup.push(compiledTemplate);
                $container.append(compiledTemplate);
            }

            this.computeDimensions();
            this.computeDetailInstructions();
            this.currentInstructionPosition = this.targetInstructionPosition;
        },

        computeDimensions: function(){
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            var $container = this.$el.find("#instruction-container");
            var $instructionViewport = this.$el.find("#instruction-viewport");

            this.maxInstructionHeight = 0;
            var instructionHeight;
            for (var i = -1; ++i < instructions.length;) {
                instructionHeight = this.$el.find("#instruction_" + (i+1)).height();
                this.maxInstructionHeight = Math.max(this.maxInstructionHeight, instructionHeight);
            }

            for (var j = -1; ++j < this.viewDetailsLookup.length;) {
                var $instructionEl = this.$el.find("#instruction_" + (j+1));
                $instructionEl.height(this.maxInstructionHeight);
            }

            $container.removeClass("invisible");

            var iSample = this.$el.find("#instruction_1");
            var iMargins = parseInt(iSample.css("marginTop")) + parseInt(iSample.css("marginBottom"))/2;
            var iPaddings = parseInt(iSample.css("paddingTop")) + parseInt(iSample.css("paddingBottom"));
            var ivpHeight = iMargins + iPaddings + this.maxInstructionHeight;

            $instructionViewport.height(ivpHeight);

            var $window = $(window);

            var wvpHeight = $window.height();

            this.iViewportHeight = $instructionViewport.height();
            this.iContentHeight = $container.height() + parseInt(iSample.css("marginTop"));

            var wcontentHeight = wvpHeight*(this.iContentHeight/this.iViewportHeight);

            //console.log(this.iViewportHeight, this.iContentHeight);
            //console.log(wvpHeight, wcontentHeight);

            this.$el.height(wcontentHeight);

        },

        renderPreSummaryInstructions: function(){

            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            var $container = this.$el.find("#pre-instruction-container");
            var $instructionViewport = this.$el.find("#pre-instruction-viewport");

            for (var i = -1; ++i < instructions.length;) {
                var compiledTemplate = this.instructionSummaryTemplate(instructions[i]);
                this.viewPreLookup.push(compiledTemplate);
                $container.append(compiledTemplate);
            }

            this.computePreInstructions();
            this.currentPreHeight = this.targetPreHeight;

        },

        renderPostSummaryInstructions: function(){

            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            var $container = this.$el.find("#post-instruction-container");
            var $instructionViewport = this.$el.find("#post-instruction-viewport");

            for (var i = -1; ++i < instructions.length;) {
                var compiledTemplate = this.instructionSummaryTemplate(instructions[i]);
                this.viewPostLookup.push(compiledTemplate);
                $container.append(compiledTemplate);
            }

            this.computePostInstructions();
            this.currentPostHeight = this.targetPostHeight;
            this.currentPostPosition = this.targetPostPosition;

        },

        computeDetailInstructions: function(){
            var $window = $(window);
            var $container = this.$el.find("#instruction-container");
            var $instructionViewport = this.$el.find("#instruction-viewport");

            var wvpHeight = $window.height();
            var wcontentHeight = this.$el.height();


            var wscrollPosition = $window.scrollTop();
            var iscrollPosition = wscrollPosition/wcontentHeight*this.iContentHeight;
            this.targetInstructionPosition = -iscrollPosition;
            //console.log(wscrollPosition);
        },

        computePreInstructions: function(){
            var $window = $(window);
            var $container = this.$el.find("#pre-instruction-container");
            var $instructionViewport = this.$el.find("#pre-instruction-viewport");

            var iSample = this.$el.find("#summary_instruction_1");
            var iMargins = parseInt(iSample.css("marginTop")) + parseInt(iSample.css("marginBottom"))/2;
            var iPaddings = parseInt(iSample.css("paddingTop")) + parseInt(iSample.css("paddingBottom"));
            var iHeight = iSample.height();
            var itemHeight = iMargins + iPaddings + iHeight;
            var numItems = this.viewPreLookup.length;

            //compute position
            var wscrollPosition = $window.scrollTop();
            var wvpHeight = $window.height();
            var wcontentHeight = this.$el.height();

            var maxHeight = itemHeight*(numItems-1);
            this.targetPreHeight = maxHeight*wscrollPosition/(wcontentHeight-wvpHeight);
        },

        computePostInstructions: function(){
            var $window = $(window);
            var $container = this.$el.find("#post-instruction-container");
            var $instructionViewport = this.$el.find("#post-instruction-viewport");

            var iSample = this.$el.find("#summary_instruction_1");
            var iMargins = parseInt(iSample.css("marginTop")) + parseInt(iSample.css("marginBottom"))/2;
            var iPaddings = parseInt(iSample.css("paddingTop")) + parseInt(iSample.css("paddingBottom"));
            var iHeight = iSample.height();
            var itemHeight = iMargins + iPaddings + iHeight;
            var numItems = this.viewPostLookup.length;

            //compute position
            var wscrollPosition = $window.scrollTop();
            var wvpHeight = $window.height();
            var wcontentHeight = this.$el.height();

            var maxHeight = itemHeight*(numItems);
            var targetHeight = maxHeight - maxHeight*wscrollPosition/(wcontentHeight-wvpHeight);
            var targetPosition = -(itemHeight - iPaddings + maxHeight*wscrollPosition/wcontentHeight);

            this.targetPostHeight = targetHeight;
            this.targetPostPosition = targetPosition;
        }

    });

});
