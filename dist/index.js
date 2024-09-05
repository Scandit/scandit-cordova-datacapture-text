var scanditCordovaDatacaptureCore = require('scandit-cordova-datacapture-core.Core');
var scanditDatacaptureFrameworksCore = require('scandit-cordova-datacapture-core.Core');

const defaultsFromJSON = (json) => {
    return {
        TextCapture: {
            TextCaptureOverlay: {
                DefaultBrush: {
                    fillColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(json.TextCapture.TextCaptureOverlay.Brush.fillColor),
                    strokeColor: scanditDatacaptureFrameworksCore.Color
                        .fromJSON(json.TextCapture.TextCaptureOverlay.Brush.strokeColor),
                    strokeWidth: json.TextCapture.TextCaptureOverlay.Brush.strokeWidth,
                },
            },
            TextCaptureSettings: {
                recognitionDirection: json.TextCapture.TextCaptureSettings.recognitionDirection,
                duplicateFilter: json.TextCapture.TextCaptureSettings.duplicateFilter,
            },
            RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings
                .fromJSON(json.TextCapture.RecommendedCameraSettings),
        },
    };
};

// tslint:disable-next-line:variable-name
const Cordova = {
    pluginName: 'ScanditTextCapture',
    defaults: {},
    exec: (success, error, functionName, args) => scanditCordovaDatacaptureCore.cordovaExec(success, error, Cordova.pluginName, functionName, args),
};
function getDefaults() {
    return new Promise((resolve, reject) => {
        Cordova.exec((defaultsJSON) => {
            Cordova.defaults = defaultsFromJSON(defaultsJSON);
            resolve();
        }, reject, 'getDefaults', null);
    });
}
function initializeCordovaText() {
    scanditCordovaDatacaptureCore.initializePlugin(Cordova.pluginName, getDefaults);
}
var CordovaFunction;
(function (CordovaFunction) {
    CordovaFunction["SubscribeTextCaptureListener"] = "subscribeTextCaptureListener";
    CordovaFunction["UpdateTextCaptureMode"] = "updateTextCaptureMode";
    CordovaFunction["ApplyTextCaptureModeSettings"] = "applyTextCaptureModeSettings";
    CordovaFunction["UpdateTextCaptureOverlay"] = "updateTextCaptureOverlay";
    CordovaFunction["SetModeEnabledState"] = "setModeEnabledState";
    CordovaFunction["FinishCallback"] = "finishCallback";
})(CordovaFunction || (CordovaFunction = {}));

/**
 * @deprecated Text Capture mode is deprecated.
 */
class CapturedText {
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get value() {
        return this._value;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get location() {
        return this._location;
    }
    static fromJSON(json) {
        console.warn('Text Capture mode is deprecated.');
        const text = new CapturedText();
        text._value = json.value;
        text._location = scanditDatacaptureFrameworksCore.Quadrilateral.fromJSON(json.location);
        return text;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @deprecated Text Capture mode is deprecated.
 */
class TextCaptureSession {
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get newlyCapturedTexts() {
        return this._newlyCapturedTexts;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    static fromJSON(json) {
        const session = new TextCaptureSession();
        session._newlyCapturedTexts = json.newlyCapturedTexts
            .map(CapturedText.fromJSON);
        session._frameSequenceID = json.frameSequenceId;
        return session;
    }
}
/**
 * @deprecated Text Capture mode is deprecated.
 */
class TextCaptureFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        /**
         * @deprecated Text Capture mode is deprecated.
         */
        this.success = scanditDatacaptureFrameworksCore.Feedback.defaultFeedback;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    static get default() {
        console.warn('Text Capture mode is deprecated.');
        return new TextCaptureFeedback();
    }
}
/**
 * @deprecated Text Capture mode is deprecated.
 */
class TextCaptureOverlay extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    static get defaultBrush() {
        console.warn('Text Capture mode is deprecated.');
        return new scanditDatacaptureFrameworksCore.Brush(Cordova.defaults.TextCapture.TextCaptureOverlay.DefaultBrush.fillColor, Cordova.defaults.TextCapture.TextCaptureOverlay.DefaultBrush.strokeColor, Cordova.defaults.TextCapture.TextCaptureOverlay.DefaultBrush.strokeWidth);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get brush() {
        return this._brush;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    set brush(newBrush) {
        this._brush = newBrush;
        this.textCapture.listenerProxy.updateTextCaptureOverlay(this);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get viewfinder() {
        return this._viewfinder;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    set viewfinder(newViewfinder) {
        this._viewfinder = newViewfinder;
        this.textCapture.listenerProxy.updateTextCaptureOverlay(this);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    set shouldShowScanAreaGuides(shouldShow) {
        this._shouldShowScanAreaGuides = shouldShow;
        this.textCapture.listenerProxy.updateTextCaptureOverlay(this);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    static withTextCapture(textCapture) {
        return TextCaptureOverlay.withTextCaptureForView(textCapture, null);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    static withTextCaptureForView(textCapture, view) {
        const overlay = new TextCaptureOverlay();
        overlay.textCapture = textCapture;
        if (view) {
            view.addOverlay(overlay);
        }
        return overlay;
    }
    constructor() {
        super();
        this.type = 'textCapture';
        this._shouldShowScanAreaGuides = false;
        this._viewfinder = null;
        this._brush = TextCaptureOverlay.defaultBrush;
        console.warn('Text Capture mode is deprecated.');
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextCaptureOverlay.prototype, "textCapture", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextCaptureOverlay.prototype, "view", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowScanAreaGuides')
], TextCaptureOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.serializationDefault(scanditDatacaptureFrameworksCore.NoViewfinder),
    scanditDatacaptureFrameworksCore.nameForSerialization('viewfinder')
], TextCaptureOverlay.prototype, "_viewfinder", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('brush')
], TextCaptureOverlay.prototype, "_brush", void 0);

var TextCaptureListenerEvent;
(function (TextCaptureListenerEvent) {
    TextCaptureListenerEvent["DidCapture"] = "TextCaptureListener.didCaptureText";
})(TextCaptureListenerEvent || (TextCaptureListenerEvent = {}));
class TextCaptureListenerProxy {
    static forTextCapture(textCapture) {
        const proxy = new TextCaptureListenerProxy();
        proxy.textCapture = textCapture;
        proxy.initialize();
        return proxy;
    }
    initialize() {
        this.subscribeListener();
    }
    updateTextCaptureMode() {
        return new Promise((resolve, reject) => {
            TextCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateTextCaptureMode, [JSON.stringify(this.textCapture.toJSON())]);
        });
    }
    applyTextCaptureModeSettings(newSettings) {
        return new Promise((resolve, reject) => {
            TextCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ApplyTextCaptureModeSettings, [JSON.stringify(newSettings.toJSON())]);
        });
    }
    updateTextCaptureOverlay(overlay) {
        return new Promise((resolve, reject) => {
            TextCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateTextCaptureOverlay, [JSON.stringify(overlay.toJSON())]);
        });
    }
    setModeEnabledState(enabled) {
        return new Promise((resolve, reject) => {
            TextCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.SetModeEnabledState, [enabled]);
        });
    }
    subscribeListener() {
        TextCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeTextCaptureListener, null);
    }
    finishCallback() {
        return new Promise((resolve, reject) => {
            TextCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.FinishCallback, [{ 'enabled': this.textCapture.isEnabled }]);
        });
    }
    notifyListeners(event) {
        const done = () => {
            this.textCapture.isInListenerCallback = false;
            return { enabled: this.textCapture.isEnabled };
        };
        this.textCapture.isInListenerCallback = true;
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.textCapture.listeners.forEach((listener) => {
            switch (event.name) {
                case TextCaptureListenerEvent.DidCapture:
                    if (listener.didCaptureText) {
                        listener.didCaptureText(this.textCapture, TextCaptureSession
                            .fromJSON(JSON.parse(event.argument.session)));
                    }
                    this.finishCallback();
                    break;
            }
        });
        return done();
    }
}
TextCaptureListenerProxy.cordovaExec = Cordova.exec;

/**
 * @deprecated Text Capture mode is deprecated.
 */
class TextCapture extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.type = 'textCapture';
        this._isEnabled = true;
        this._feedback = TextCaptureFeedback.default;
        this._context = null;
        this.listeners = [];
        this.isInListenerCallback = false;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get isEnabled() {
        return this._isEnabled;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    set isEnabled(isEnabled) {
        var _a;
        this._isEnabled = isEnabled;
        (_a = this.listenerProxy) === null || _a === void 0 ? void 0 : _a.setModeEnabledState(isEnabled);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get context() {
        return this._context;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    static get recommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(Cordova.defaults.TextCapture.RecommendedCameraSettings);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    get feedback() {
        return this._feedback;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    set feedback(feedback) {
        this._feedback = feedback;
        this.listenerProxy.updateTextCaptureMode();
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    static forContext(context, settings) {
        console.warn('Text Capture mode is deprecated.');
        const textCapture = new TextCapture();
        textCapture.settings = settings;
        if (context) {
            context.addMode(textCapture);
        }
        textCapture.listenerProxy = TextCaptureListenerProxy.forTextCapture(textCapture);
        return textCapture;
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    applySettings(settings) {
        this.settings = settings;
        return this.listenerProxy.applyTextCaptureModeSettings(settings);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    addListener(listener) {
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
    }
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextCapture.prototype, "_isEnabled", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.nameForSerialization('feedback')
], TextCapture.prototype, "_feedback", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextCapture.prototype, "_context", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextCapture.prototype, "listeners", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextCapture.prototype, "listenerProxy", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextCapture.prototype, "isInListenerCallback", void 0);

/**
 * @deprecated Text Capture mode is deprecated.
 */
class TextCaptureSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    /**
     * @deprecated Text Capture mode is deprecated.
     */
    static fromJSON(json) {
        const settings = new TextCaptureSettings();
        Object.keys(json).forEach(key => {
            settings[key] = json[key];
        });
        return settings;
    }
    constructor() {
        super();
        /**
         * @deprecated Text Capture mode is deprecated.
         */
        this.duplicateFilter = Cordova.defaults.TextCapture.TextCaptureSettings.duplicateFilter;
        /**
         * @deprecated Text Capture mode is deprecated.
         */
        this.locationSelection = null;
        /**
         * @deprecated Text Capture mode is deprecated.
         */
        this.recognitionDirection = Cordova.defaults.TextCapture.TextCaptureSettings.recognitionDirection;
        console.warn('Text Capture mode is deprecated.');
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.serializationDefault(scanditDatacaptureFrameworksCore.NoneLocationSelection)
], TextCaptureSettings.prototype, "locationSelection", void 0);

initializeCordovaText();

exports.CapturedText = CapturedText;
exports.TextCapture = TextCapture;
exports.TextCaptureFeedback = TextCaptureFeedback;
exports.TextCaptureOverlay = TextCaptureOverlay;
exports.TextCaptureSession = TextCaptureSession;
exports.TextCaptureSettings = TextCaptureSettings;
