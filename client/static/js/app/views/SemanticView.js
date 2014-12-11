define([
    "core/EventBus",
    "core/Utils",
    "views/InterfaceViewBase"
], function(EventBus, Utils, InterfaceViewBase) {

    return InterfaceViewBase.extend({

        className: "semantic-view-wrapper",
        template: nom.templates.RecipeSemantic,
        ingredientTemplate: nom.templates.IngredientSemantic,

        instructionSummaryTemplate: nom.templates.InstructionSemanticSummary,
        instructionDetailsTemplate: nom.templates.InstructionSemanticDetails,

        events: {
            'click .instruction': 'instructionClicked'
            ,"click #done": 'recipeComplete'
        },

        viewPreLookup: [],
        viewDetailsLookup: [],
        viewPostLookup: [],

        maxInstructionHeight: 0,

        iViewportHeight: 0,
        iContentHeight: 0,

        suppressScroll: false,
        animationSupported: false,

        initialize: function(params){
            this.appData = params.appData;
            this.initStats();
            this.initInteraction();
        },

        initStats: function(){
            console.log("SemanticView.initialize");
            _.bindAll(this, 'keyAction');
            $(document).bind('keyup', this.keyAction);
            this.updateLog("startClick", true);
        },

        die: function(){
            $(document).unbind('keyup', this.keyAction);
            this.undelegateEvents();
            this.remove();
        },

        render: function(){
            console.log("SemanticView.render");
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
            //this.selectInstruction();
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
                $ingredient.removeClass("highlight-ingredient");
                $ingredient.addClass("mute-ingredient");
            }
            for(var j=-1;++j<ingredientIndexes.length;){
                var iIndex = ingredientIndexes[j];
                $ingredient = ingredientContainer.find("#ingredient_"+iIndex);
                $ingredient.addClass("highlight-ingredient");
                $ingredient.removeClass("mute-ingredient");
            }
        },

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
        },

        /**
         * Most of the interesting interaction code...
         */

        // https://developer.mozilla.org/en-US/docs/Web/API/window.scrollY?redirectlocale=en-US&redirectslug=DOM/window.scrollY
        getPageYOffset: function(){
            var supportPageOffset = window.pageYOffset !== undefined;
            var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
            return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
            /*
            if(Modernizr.prefixed("pageYOffset", window)){
                return window.pageYOffset;
            } else if(Modernizr.prefixed("scrollTop", document.scrollTop)){
                return document.scrollTop;
            } else {
                return $(window).scrollTop();
            }
            */
        },

        isMouseDown: false,

        initInteraction: function(){
            var $window = $(window);
            $window.scroll(_.bind(this.onScroll, this));
            $window.resize(_.bind(this.onResize, this));

            // Wanted to get a sort of "snap to nearest" effect when
            var $document = $(document);
            if(Modernizr.touch && false){
                $document.bind('touchstart', _.bind(this.touchStart, this));
                $document.bind('touchmove', _.bind(this.touchMove, this));
                $document.bind('touchend', _.bind(this.touchEnd, this));
                $document.bind('touchcancel', _.bind(this.touchCancel, this));
            } else {
                $window.bind('mousedown', _.bind(function(){
                    this.isMouseDown = true;
                }, this));
                $window.bind('mousemove', _.bind(function(){
                    //console.log('this.isMouseDown', this.isMouseDown);
                    if(this.isMouseDown || true){
                        this.updateNearestIndex();
                        this.updatePositions();
                    }
                }, this));
                $window.bind('mouseup', _.bind(function(){
                    this.isMouseDown = false;
                }, this));
            }

            try {
                this.animationSupported = Modernizr.prefixed('requestAnimationFrame', window);
            } catch(e){
                this.animationSupported = false;
            }

            //this.animationSupported = false;

            //throttle handlers
            var rate = 100;
            this._throttledUpdateNearestIndex = _.throttle(_.bind(this._updateNearestIndex, this), rate);
            this._throttledUpdatePositions = _.throttle(_.bind(this._updatePositions, this), 1);
            //this._throttledUpdatePositions = this._updatePositions;

        },

        mouseDown: function(event){
            //console.log('mouseDown');
        },

        mouseUp: function(event){
            //console.log("mouseup", event);
            //console.log('mouseUp');
            //this.snapToNearest();
        },

        touchStart: function(event) {
            this.updateNearestIndex();
            this.updatePositions();
            //console.log(event);
        },

        touchMove: function(event) {
            this.updateNearestIndex();
            this.updatePositions();
            //console.log(event);
        },

        touchEnd: function(event) {
            this.updateNearestIndex();
            this.updatePositions();
            //this.snapToNearest();
        },

        touchCancel: function(event) {
            this.updateNearestIndex();
            this.updatePositions();
            //console.log(event);
        },

        snapToNearest: function() {
            var discreteIndex = this._updateNearestIndex();
            this.setItemByIndex(discreteIndex);
        },

        updateNearestIndex: function() {
            this._throttledUpdateNearestIndex();
            //this._updateNearestIndex();
        },

        _updateNearestIndex: function(){
            var scrollNormal = this.getScrollNormal();
            var iScrollPosition = scrollNormal * (this.iContentHeight - this.iViewportHeight);
            var approxIndex = iScrollPosition / this.iViewportHeight;
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
            this.highlightIngredients();
            console.log('setItemByIndex', index);
            var nrmlPos = index / (this.viewDetailsLookup.length-1);
            var wcontentHeight = this.$el.height();
            var iPosition = nrmlPos*(wcontentHeight-this.$window.height());
            this.$window.scrollTop(iPosition);
            this.updatePositions();
        },

        onResize: function(event){
            try{
                var targetIndex = this.stepIndex;
                this.computeDimensions();
                setTimeout(_.bind(function(){
                    console.log("setTimeout");
                    this.setItemByIndex(targetIndex);
                }, this), 300);
            }catch(e){

            }
            //this.updateNearestIndex();
        },

        onScroll: function(event){
            if(this.suppressScroll){
                this.suppressScroll = false;
                this.snapToNearest();
                return;
            }
            this.updateNearestIndex();
            this.updatePositions();
            //console.log('onScroll', event);
        },

        /**
         * Render-loop related
         */
        renderOk: false,

        $window: null,
        $semanticContainer: null,
        $instructionViewport: null,
        $instructionContainer: null,
        $preViewport: null,
        $preContainer: null,
        $postViewport: null,
        $postContainer: null,

        $instructionList: null,
        $ingredientsContainer: null,

        targetInstructionPosition: null,
        currentInstructionPosition: null,
        targetPreHeight: null,
        currentPreHeight: null,
        targetPreScaleY: null,
        currentPreScaleY: null,
        targetPostScaleY: null,
        currentPostScaleY: null,
        targetPostPosition: null,
        currentPostPosition: null,

        currentListY: null,
        targetListY: null,
        currentIngrY: null,
        targetIngrY: null,

        updatePositions: function(){
            this._throttledUpdatePositions();
            //this._updatePositions();
        },

        _updatePositions: function(){
            this.computeGeom();

            if(this.animationSupported){
                this.renderLoop();
            } else {
                this.setPositions();
                //setInterval(_.bind(this.renderLoop, this), 10);
            }
        },

        setTransform: function($target, value){
            $target.css({
                "transform": value, /* Firefox */
                "-ms-transform": value, /* IE 9 */
                "-webkit-transform": value /* Chrome, Safari, Opera */
            });
        },

        renderLoop: function(){
            if(!this.renderOk){
                return;
            }

            var factor = 0.2;
            var delta = 0;
            var maxDelta = 0.4;
            var rendering = false;

            //mid
            delta = factor*(this.targetInstructionPosition-this.currentInstructionPosition);
            if(Math.abs(delta) > maxDelta){
                this.currentInstructionPosition += delta;
                //this.$instructionContainer.css("top", this.currentInstructionPosition);
                this.setTransform(this.$instructionContainer, "translateY("+this.currentInstructionPosition+"px)");
                rendering = true;
            }

            //pre
            delta = factor*(this.targetPreHeight-this.currentPreHeight);
            if(Math.abs(delta) > maxDelta){
                this.currentPreHeight += delta;
                this.currentPreScaleY += factor*(this.targetPreScaleY-this.currentPreScaleY);
                this.$preViewport.height(this.currentPreHeight);
                //this.$preViewport.css("transform", "scaleY("+this.currentPreScaleY+")");
                rendering = true;
            }

            //post
            delta = factor*(this.targetPostHeight-this.currentPostHeight);
            if(Math.abs(delta) > maxDelta) {
                this.currentPostHeight += delta;
                this.currentPostScaleY += factor*(this.targetPostScaleY - this.currentPostScaleY);
                //this.$postViewport.css("transform", "scaleY("+this.currentPostScaleY+")");
                this.$postViewport.height(this.currentPostHeight);
                rendering = true;
            }

            delta = factor*(this.targetPostPosition-this.currentPostPosition);
            if(Math.abs(delta) > maxDelta) {
                this.currentPostPosition += delta;
                //this.$postContainer.css("top", this.currentPostPosition);
                this.setTransform(this.$postContainer, "translateY("+this.currentPostPosition+"px)");
                rendering = true;
            }

            delta = factor*(this.targetListY-this.currentListY);
            if(Math.abs(delta) > maxDelta) {
                this.currentListY += delta;
                this.setTransform(this.$instructionList, "translateY(" + this.currentListY + "px)");
                rendering = true;
            }

            delta = factor*(this.targetIngrY-this.currentIngrY);
            if(Math.abs(delta) > maxDelta) {
                this.currentIngrY += delta;
                this.setTransform(this.$ingredientsContainer, "translateY(" + this.currentIngrY + "px)");
                rendering = true;
            }

            if(rendering){
                window.requestAnimationFrame(_.bind(this.renderLoop, this));
            }
        },

        setPositions: function(){
            this.currentInstructionPosition = this.targetInstructionPosition;
            this.currentPreHeight = this.targetPreHeight;
            this.currentPostHeight = this.targetPostHeight;
            this.currentPostPosition = this.targetPostPosition;
            this.currentListY = this.targetListY;
            this.currentIngrY = this.targetIngrY;

            if(this.animationSupported){
                this.setTransform(this.$instructionContainer, "translateY("+this.currentInstructionPosition+"px)");
                this.$preViewport.height(this.currentPreHeight);
                this.$postViewport.height(this.currentPostHeight);
                this.setTransform(this.$postContainer, "translateY("+this.currentPostPosition+"px)");
                this.setTransform(this.$instructionList, "translateY("+this.currentListY+"px)");
                this.setTransform(this.$ingredientsContainer, "translateY("+this.currentIngrY+"px)");
            } else {
                this.$instructionContainer.css("top", this.currentInstructionPosition);
                this.$preViewport.height(this.currentPreHeight);
                this.$postViewport.height(this.currentPostHeight);
                this.$postContainer.css("top", this.currentPostPosition);
                this.$instructionList.css("top", this.currentListY);
                this.$ingredientsContainer.css("top", this.currentIngrY);
            }
        },

        /**
         * Inital Render...
         */

        renderInstructions: function() {
            this.$window = $(window);
            this.$semanticContainer = this.$el.find("#semantic-container");
            this.$instructionViewport = this.$el.find("#instruction-viewport");
            this.$instructionContainer = this.$el.find("#instruction-container");

            this.$preViewport = this.$el.find("#pre-instruction-viewport");
            this.$preContainer = this.$el.find("#pre-instruction-container");
            this.$postViewport = this.$el.find("#post-instruction-viewport");
            this.$postContainer = this.$el.find("#post-instruction-container");

            this.$instructionList = this.$el.find("#instruction-list");
            this.$ingredientsContainer = this.$el.find("#ingredients-container");

            this.renderDetailedInstructions();
            this.computeDimensions();
            this.renderPreSummaryInstructions();
            this.renderPostSummaryInstructions();

            this.$semanticContainer.affix({
                offset: {
                    top: -10
                    /*
                     , bottom: function () {
                     return 0;
                     }
                     */
                },
                target: window
            });

            // figure out what's going on here...
            this.computeGeom();
            this.setPositions();
            this.snapToNearest();
            this.setPositions();

            this.renderOk = true;
            this.$semanticContainer.removeClass("invisible");
        },

        renderDetailedInstructions: function(){
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            for (var i = -1; ++i < instructions.length;) {
                var instruction = instructions[i];
                instruction.stepIndex = i+1;
                var compiledTemplate = this.instructionDetailsTemplate(instructions[i]);
                this.viewDetailsLookup.push(compiledTemplate);
                this.$instructionContainer.append(compiledTemplate);
            }
        },

        renderPreSummaryInstructions: function(){
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            for (var i = -1; ++i < instructions.length;) {
                var compiledTemplate = this.instructionSummaryTemplate(instructions[i]);
                this.viewPreLookup.push(compiledTemplate);
                this.$preContainer.append(compiledTemplate);
            }
        },

        renderPostSummaryInstructions: function(){
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            for (var i = -1; ++i < instructions.length;) {
                var compiledTemplate = this.instructionSummaryTemplate(instructions[i]);
                this.viewPostLookup.push(compiledTemplate);
                this.$postContainer.append(compiledTemplate);
            }
        },

        /**
         * Compute target geometry
         */

        computeGeom: function(){
            this.computeDetailInstructions();
            this.computePreInstructions();
            this.computePostInstructions();
            this.computeInstructionList();
            this.computeIngrContainer();
        },

        computeDimensions: function(){
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;

            this.maxInstructionHeight = 0;
            var instructionHeight;
            for (var i = -1; ++i < instructions.length;) {
                instructionHeight = this.$instructionContainer.find("#instruction_" + (i+1)).height();
                this.maxInstructionHeight = Math.max(this.maxInstructionHeight, instructionHeight);
            }

            for (var j = -1; ++j < this.viewDetailsLookup.length;) {
                var $instructionEl = this.$instructionContainer.find("#instruction_" + (j+1));
                $instructionEl.height(this.maxInstructionHeight);
            }

            var iSample = this.$instructionContainer.find("#instruction_1");
            var iMargins = parseInt(iSample.css("marginTop")) + parseInt(iSample.css("marginBottom"))/2;
            var iPaddings = parseInt(iSample.css("paddingTop")) + parseInt(iSample.css("paddingBottom"));
            var ivpHeight = iMargins + iPaddings + this.maxInstructionHeight;
            this.iViewportHeight = ivpHeight;

            var wvpHeight = this.$window.height();

            this.$instructionViewport.height(this.iViewportHeight);
            this.iContentHeight = this.$instructionContainer.height(); // - parseInt(iSample.css("paddingBottom")) - parseInt(iSample.css("marginBottom"));

            var factor = 0.5;
            var wcontentHeight = factor*wvpHeight*(this.iContentHeight/this.iViewportHeight);
            this.$el.height(wcontentHeight);

            //compute recipe details top
            var $recipeDetails = this.$el.find("#recipe-details");
            var recMid = (this.$window.height() - $recipeDetails.height())/2;
            $recipeDetails.css("marginTop", recMid);

        },

        getSummaryItemHeight: function(){
            var iSample = this.$preContainer.find("#summary_instruction_1");
            var iMargins = parseInt(iSample.css("marginTop")) + parseInt(iSample.css("marginBottom"))/2;
            var iPaddings = parseInt(iSample.css("paddingTop")) + parseInt(iSample.css("paddingBottom"));
            var iHeight = iSample.height();
            return iMargins + iPaddings + iHeight;
        },

        getScrollNormal: function(){
            var wscrollPosition = this.getPageYOffset();
            var wvpHeight = this.$window.height();
            var wcontentHeight = this.$el.height();
            return wscrollPosition/(wcontentHeight - wvpHeight);
        },

        computeDetailInstructions: function(){
            var scrollNormal = this.getScrollNormal();
            this.targetInstructionPosition = -scrollNormal*(this.iContentHeight - this.iViewportHeight);
        },

        computePreInstructions: function(){
            var itemHeight = this.getSummaryItemHeight();
            var numItems = this.viewPreLookup.length;
            var maxHeight = itemHeight*(numItems-1);
            var scrollNormal = this.getScrollNormal();
            this.targetPreScaleY = scrollNormal;
            this.targetPreHeight = maxHeight*this.targetPreScaleY;
        },

        computePostInstructions: function(){
            var itemHeight = this.getSummaryItemHeight();
            var numItems = this.viewPostLookup.length;
            var maxHeight = itemHeight*(numItems-1);
            var scrollNormal = this.getScrollNormal();
            this.targetPostPosition = -(itemHeight + scrollNormal * maxHeight);
            this.targetPostScaleY = 1 - scrollNormal;
            this.targetPostHeight = maxHeight*this.targetPostScaleY;
        },

        getVertPaddingMargin: function($t){
            return parseInt($t.css("marginTop")) + parseInt($t.css("marginBottom")) + parseInt($t.css("paddingTop")) + parseInt($t.css("paddingBottom"));
        },

        computeInstructionList: function(){
            var $window = $(window);
            var containerHeight = $window.height();
            var ivpHeight = this.$instructionViewport.height();
            var listY = containerHeight/2 - this.targetPreHeight - ivpHeight/2;
            this.targetListY = listY;
        },

        computeIngrContainer: function(){
            var scrollNormal = this.getScrollNormal();
            var ivpHeight = this.$instructionViewport.height();
            var icHeight = this.$ingredientsContainer.height();
            var diff = icHeight - ivpHeight;
            if(diff < 0){
                this.targetIngrY = this.targetListY + this.targetPreHeight;
            } else {
                this.targetIngrY = this.targetListY + this.targetPreHeight - diff*scrollNormal;
            }
        }

    });

});
