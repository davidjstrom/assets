(function(){
    function getLandingPageFromQuery(){
        return getParameterByName('landingpage');
    }
    function getClickParam(){
      return (window==undefined || window.adacusAdConfiguration==undefined || window.adacusAdConfiguration.clickParam==undefined) ? 'click' : window.adacusAdConfiguration.clickParam; //Adacus ad server passes click tracking as ?click=tracking_url
    }
    function getLandingUrl(isForWidget){
        var landingPage = getLandingPageFromQuery();
        if (!isForWidget && landingPage !== '') return landingPage;
        if (!isForWidget && window.cmpDefaultLandingUrl !== undefined && window.cmpDefaultLandingUrl !== '') return window.cmpDefaultLandingUrl;
        return (window==undefined || window.adacusAdConfiguration==undefined || window.adacusAdConfiguration.landingUrl==undefined) ? '' : window.adacusAdConfiguration.landingUrl;
    }
    function getParameterByName(name) {
      'use strict';
      var striped = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'),
          regex = new RegExp('[\\?&]' + striped + '=([^&#]*)'),
          results = regex.exec(location.search);
      return results === null ?
        '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    function getClickTracker(){
        if (window.thunderClickTrackersChained === undefined || window.thunderClickTrackersChained === '') {
            var clickParam = getClickParam();
            return getParameterByName(clickParam)||'';
        } else {
            return decodeURIComponent(window.thunderClickTrackersChained);
        }
    }
    function getEncodinglevel() {
        return getParameterByName('clkencodinglevel') || '0';
    }
    function getUrl(isForWidget){
      isForWidget = isForWidget || false;
      var clickParam=getClickParam();
      var clickTracker=getParameterByName(clickParam)||'';
      var encodingLevel=getEncodinglevel();
      return clickTracker+''+encodeToLevel(getLandingUrl(isForWidget),encodingLevel);
    }
    function openLandingPage(event){
      window.open(getUrl(),'_blank');
      (event && event.preventDefault)?event.preventDefault():undefined;
    }
    function encodeToLevel(url,level){
        var levelInt = parseInt(level);
        if(!levelInt || !url) {
            return url; // if no level or level=0 or no url, no need to proceed
        }
        for (var i = 0; i < levelInt; i++) {
            url = encodeURIComponent(url);
        }
        return url;
    }
    function urlHasInternalMacros(url) {
        return url.indexOf("${THUNDER_") !== -1;
    }
    function getMacroValue(macroKey){
        var value = window.macroReplacementMap[macroKey];
        try {
            value = JSON.parse(value);
        } catch (e) {
        }
        return value;
    }
    function replaceMacros(url) {
        var macroReplacedUrl = url;
        if (urlHasInternalMacros(url) && window.macroReplacementMap) {
            var macroKeys = Object.keys(window.macroReplacementMap);
            for (var i = 0; i < macroKeys.length; i++) {
                var macroString = "${" + macroKeys[i] + "}";
                var macroValue = getMacroValue(macroKeys[i]);
                macroReplacedUrl = macroReplacedUrl.replace(macroString, macroValue);
            }
        }
        return macroReplacedUrl;
    }

    function checkFeature(feature) {
        if (feature === 'external_trackers') {
            return window.cmpDefaultLandingUrl !== undefined;
        }
    }

    window.adacusAd={
      getClickTracker:getClickTracker,
      getUrl:getUrl,
      openLandingPage:openLandingPage
    };

    function generateClickPixels() {
        if (!window.thunderClickTrackers || window.thunderClickTrackers.length === 0) {
            return;
        }

        var clickTrackerUrls = window.thunderClickTrackers.map(function(x){return x.url}).filter(function(x){return !!x});

        var pixelsContainer = document.createElement("div");
        pixelsContainer.style.width = "0px";
        pixelsContainer.style.height = "0px";
        pixelsContainer.style.visibility = "hidden";

         clickTrackerUrls.forEach(function(url) {
            var clickPixel = document.createElement("img");
            clickPixel.style.width = "0px";
            clickPixel.style.height = "0px";
            clickPixel.style.visibility = "hidden";
            clickPixel.src = url;
            pixelsContainer.appendChild(clickPixel);
        });

         document.body.appendChild(pixelsContainer);
    }

    window.addWidgetTrackerPixel = function(eventName, widgetName) {
        if (window.thunderAdEventTrackerUrl && window.thunderAdEventTrackerUrl != '') {
            var url = window.thunderAdEventTrackerUrl + '&cb=' + Date.now() + '&event=' + eventName + '&widget=' + encodeURIComponent(widgetName);
            var pixel = document.createElement('img');
            pixel.style.width = '0';
            pixel.style.height = '0';
            pixel.style.visibility = 'hidden';
            pixel.src = url;
            document.body.appendChild(pixel);
        }
    }

    window.placelocalOpenUrlWithTracker = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var widgetLandingPage = event.currentTarget.href;
        var landingPageQueryParam = getLandingPageFromQuery();

        var urlToOpen;

        if (widgetLandingPage) {
            urlToOpen = widgetLandingPage;
        } else if (landingPageQueryParam) {
            urlToOpen = landingPageQueryParam;
        } else if (checkFeature('external_trackers')) {
            urlToOpen = window.cmpDefaultLandingUrl;
        } else {
            urlToOpen = window.defaultLandingUrl;
        }

        urlToOpen = replaceMacros(urlToOpen);

        window.open(urlToOpen, '_blank');

        generateClickPixels();

        return false;
    }
  })();
