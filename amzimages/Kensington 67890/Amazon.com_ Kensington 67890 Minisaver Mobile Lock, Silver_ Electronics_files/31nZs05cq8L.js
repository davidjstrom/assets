(function(e){var h=window.AmazonUIPageJS||window.P,k=h._namespace||h.attributeErrors,b=k?k("DetailPagePreRegistrationAssets",""):h;b.guardFatal?b.guardFatal(e)(b,window):b.execute(function(){e(b,window)})})(function(e,h,k){e.when("A","jQuery","a-checkbox","a-dropdown","ExtraDataHelper").register("PreRegistration.View",function(b,c,a,g,f){return b.createClass({init:function(){this.reset()},reset:function(){this._giftingCheckbox=a("#gift-wrap");this._giftingCheckboxElement=c("#gift-wrap");this._accountLinkingCheckbox=
a("#account-linking");this._desktopQuantityDropdown=g.getSelect("#quantity");this._mobileQuantityDropdown=g.getSelect("#mobileQuantityDropDown");this._quantityAlert=c("#preregistrationQuantityAlert");this._giftingAlert=c("#preregistrationGiftingAlert");this._declaratives=c("#atc-declarative, #buyNow .a-declarative");this._forms=c("form#addToCart, form#mobile-installments, form#buyNow, form#buyNowCheckout");this._quantityAlert.length&&(this._quantityAlertFormatString=this._quantityAlert.html())},updateQuantityLimit:function(a){this._quantityAlert.length&&
this._quantityAlertFormatString&&(a=this._quantityAlertFormatString.replace("$PREREG_MAX_QUANTITY",a),this._quantityAlert.html(a))},_setDeclarativeExtraData:function(a){this._declaratives.each(function(){var d=c(this),b=d.data("action");b&&(d=d.data(b))&&d.inputs&&f.setObjectExtraData(d.inputs,a)})},_setFormExtraData:function(a){this._forms.each(function(){f.setFormExtraData(this,a)})},setAccountLinkingAttributeValue:function(a){var d={};d.isDevicePreRegistered=a;this._setDeclarativeExtraData(d);
this._setFormExtraData(d)},_isCheckboxChecked:function(a){return!a.isEmpty()&&a.isChecked()},isGiftingChecked:function(){return this._isCheckboxChecked(this._giftingCheckbox)},isAccountLinkingChecked:function(){return this._isCheckboxChecked(this._accountLinkingCheckbox)},getQuantity:function(){return this._desktopQuantityDropdown?this._desktopQuantityDropdown.val():this._mobileQuantityDropdown?this._mobileQuantityDropdown.val():1},scrollGiftingIntoView:function(){this._giftingCheckboxElement.length&&
!b.onScreen(this._giftingCheckboxElement,5)&&this._giftingCheckboxElement[0].scrollIntoView()},_hide:function(a){a.addClass("aok-hidden")},_show:function(a){a.removeClass("aok-hidden")},_isHidden:function(a){return a.hasClass("aok-hidden")},showGiftingAlert:function(){this._show(this._giftingAlert)},hideGiftingAlert:function(){this._hide(this._giftingAlert)},showQuantityAlert:function(){this._show(this._quantityAlert)},hideQuantityAlert:function(){this._hide(this._quantityAlert)},isGiftingAlertHidden:function(){return this._isHidden(this._giftingAlert)},
enableAccountLinkingCheckbox:function(a){this._accountLinkingCheckbox.enable();c("#preRegCheckboxText").removeClass("a-color-tertiary");a&&this._accountLinkingCheckbox.check()},disableAccountLinkingCheckbox:function(){this._accountLinkingCheckbox.uncheck();this._accountLinkingCheckbox.disable();c("#preRegCheckboxText").addClass("a-color-tertiary")},isAccountLinkingCheckboxEnabled:function(){return this._accountLinkingCheckbox.isEnabled()},openPopup:function(a){h.open(a,"popupWindow","width\x3d600,height\x3d400,scrollbars\x3dyes")}})});
e.when("A","PreRegistration.View","PreRegistration.Metrics").register("PreRegistration.Controller",function(b,c,a){var g=b.$,f,e=b.createClass({init:function(d){this._view=new c;this._metrics=new a;this.reset(d);this._bindEventsOnce()},reset:function(a){this._view.reset();this._bindEventsDOM();"object"===typeof a?(this._showStatus=a.showStatus,this._maxQuantityLimit=a.maxQuantity,this._defaultValue=a.defaultValue,this._status=a.status,this._asin=a.asin,this._lastAccountLinkingValue=this._defaultValue,
this._view.updateQuantityLimit(this._maxQuantityLimit),this._view.setAccountLinkingAttributeValue(this._defaultValue),this._showStatus&&this._view.isGiftingChecked()&&this._giftingCheckboxChecked(),this._checkQuantity(this._view.getQuantity()),this._showStatus?this._metrics.emitGiftingAndAccountLinkingLoadedMetric(this._asin):this._metrics.emitGiftingLoadedMetric(this._asin)):this._view.setAccountLinkingAttributeValue("false")},_checkQuantity:function(a){a>this._maxQuantityLimit&&this._isStatusAllowedConditional()?
(this._view.scrollGiftingIntoView(),this._disableAccountLinkingCheckbox(),this._metrics.emitALForceUncheckedQuantityHigh(this._asin),this._view.isGiftingAlertHidden()&&this._view.showQuantityAlert()):this._view.isGiftingChecked()||(this._enableAccountLinkingCheckbox(),this._view.hideQuantityAlert())},_giftingCheckboxChecked:function(){this._view.hideQuantityAlert();this._view.showGiftingAlert();this._view.isAccountLinkingChecked()&&this._metrics.emitALForceUncheckedGiftingSelected(this._asin);this._disableAccountLinkingCheckbox()},
_giftingCheckboxUnchecked:function(){this._view.hideGiftingAlert();this._enableAccountLinkingCheckbox();this._checkQuantity(this._view.getQuantity())},_enableAccountLinkingCheckbox:function(){if(!this._view.isAccountLinkingCheckboxEnabled()){var a=this._lastAccountLinkingValue;this._view.enableAccountLinkingCheckbox(a);this._view.setAccountLinkingAttributeValue(a?"true":"false")}},_disableAccountLinkingCheckbox:function(){this._view.isAccountLinkingCheckboxEnabled()&&(this._lastAccountLinkingValue=
this._view.isAccountLinkingChecked(),this._view.disableAccountLinkingCheckbox(),this._view.setAccountLinkingAttributeValue("false"))},_bindEventsOnce:function(){b.on("a:pageUpdate",this._handlePageUpdate.bind(this));b.on("a:dropdown:selected:quantity",this._handleQuantityChange.bind(this));b.on("a:popover:beforeSlide:preRegistration-secview",this._handlePopupClickMobile.bind(this));b.declarative("mako-gifting-declarative","click",this._handleGiftingClick.bind(this));b.declarative("mako-gifting-declarative-mobile",
"click",this._handleGiftingClick.bind(this));b.declarative("mako-preReg-declarative","click",this._handleAccountLinkingClick.bind(this));b.declarative("preReg-popup-window","click",this._handlePopupClick.bind(this));b.declarative("preReg-popup-window","mouseenter",this._handlePopupHover.bind(this))},_bindEventsDOM:function(){g("#add-to-cart-button").click(this._handleATC.bind(this,"ATC"));g("#buy-now-button").click(this._handleATC.bind(this,"BUYNOW"));g("#one-click-button").click(this._handleATC.bind(this,
"ONECLICK"))},_handlePageUpdate:function(){this._view.reset();var a=this._defaultValue;this._showStatus&&(a=this._view.isAccountLinkingChecked());this._view.setAccountLinkingAttributeValue(a?"true":"false")},_handleQuantityChange:function(a){this._checkQuantity(a.value)},_handleGiftingClick:function(a){this._isInputEvent(a)&&(this._view.isGiftingChecked()?(this._giftingCheckboxChecked(),this._metrics.emitGiftingCheckedMetric(this._asin)):(this._giftingCheckboxUnchecked(),this._metrics.emitGiftingUncheckedMetric(this._asin)))},
_handleAccountLinkingClick:function(a){this._isInputEvent(a)&&((a=this._view.isAccountLinkingChecked())?this._metrics.emitALCheckedMetric(this._asin):this._metrics.emitALUncheckedMetric(this._asin),this._lastAccountLinkingValue=a,this._view.setAccountLinkingAttributeValue(a?"true":"false"))},_handlePopupClick:function(a){a.$event.preventDefault();a=a.$target.prop("href");this._view.openPopup(a);this._metrics.emitWhyIsThisImportantClickedMetric(this._asin)},_handlePopupClickMobile:function(a){this._metrics.emitWhyIsThisImportantClickedMetric(this._asin)},
_handlePopupHover:function(a){this._metrics.emitPopupHoverMetric(this._asin)},_handleATC:function(a){this._metrics.emitATCGiftingALSelectionMetric(this._asin,a,this._view.isGiftingChecked(),this._view.isAccountLinkingChecked())},_isInputEvent:function(a){return"input"===a.targetTag.toLowerCase()},_isStatusAllowedConditional:function(){return"ALLOWED_CONDITIONAL"===this._status}});return{getInstance:function(a){f?a&&f.reset(a):f=new e(a);return f}}});e.when("A","odsRefTagUtils").register("PreRegistration.Metrics",
function(b,c){return b.createClass({emitGiftingAndAccountLinkingLoadedMetric:function(a){c.send("PREREGISTRATION_"+a+"_GIFTING_AL_LOADED")},emitGiftingLoadedMetric:function(a){c.send("PREREGISTRATION_"+a+"_ONLY_GIFTING_LOADED")},emitALForceUncheckedQuantityHigh:function(a){c.send("PREREGISTRATION_"+a+"_AL_FORCE_UNCHECKED_QUANTITYHIGH")},emitALForceUncheckedGiftingSelected:function(a){c.send("PREREGISTRATION_"+a+"_AL_FORCE_UNCHECKED_GIFTINGSELECTED")},emitGiftingCheckedMetric:function(a){c.send("PREREGISTRATION_"+
a+"_GIFTING_CHECKED")},emitGiftingUncheckedMetric:function(a){c.send("PREREGISTRATION_"+a+"_GIFTING_UNCHECKED")},emitALCheckedMetric:function(a){c.send("PREREGISTRATION_"+a+"_AL_CHECKED")},emitALUncheckedMetric:function(a){c.send("PREREGISTRATION_"+a+"_AL_UNCHECKED")},emitWhyIsThisImportantClickedMetric:function(a){c.send("PREREGISTRATION_"+a+"_WHY_IS_THIS_IMPORTANT_CLICKED")},emitPopupHoverMetric:function(a){c.send("PREREGISTRATION_"+a+"_WHY_IS_THIS_IMPORTANT_HOVER")},emitATCGiftingALSelectionMetric:function(a,
b,f,e){f?c.send("PREREGISTRATION_"+a+"_"+b+"_GIFTING_CHECKED"):c.send("PREREGISTRATION_"+a+"_"+b+"_GIFTING_UNCHECKED");e?c.send("PREREGISTRATION_"+a+"_"+b+"_AL_CHECKED"):c.send("PREREGISTRATION_"+a+"_"+b+"_AL_UNCHECKED")}})})});