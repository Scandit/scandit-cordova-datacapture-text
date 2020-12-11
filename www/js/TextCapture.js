"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-text.TextCapture"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Camera_Related_1 = require("scandit-cordova-datacapture-core.Camera+Related");
const TextCaptureListenerProxy_1 = require("scandit-cordova-datacapture-text.TextCaptureListenerProxy");
const Serializeable_1 = require("scandit-cordova-datacapture-core.Serializeable");
const TextCapture_Related_1 = require("scandit-cordova-datacapture-text.TextCapture+Related");
const Cordova_1 = require("scandit-cordova-datacapture-text.Cordova");
class TextCapture extends Serializeable_1.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.type = 'textCapture';
        this._isEnabled = true;
        this._feedback = TextCapture_Related_1.TextCaptureFeedback.default;
        this._context = null;
        this.listeners = [];
        this.listenerProxy = null;
        this.isInListenerCallback = false;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        this._isEnabled = isEnabled;
        if (!this.isInListenerCallback) {
            // If we're "in" a listener callback, we don't want to deserialize the context to update the enabled state,
            // but rather pass that back to be applied in the native callback.
            this.didChange();
        }
    }
    get context() {
        return this._context;
    }
    static get recommendedCameraSettings() {
        return new Camera_Related_1.CameraSettings(Cordova_1.Cordova.defaults.TextCapture.RecommendedCameraSettings);
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        this._feedback = feedback;
        this.didChange();
    }
    static forContext(context, settings) {
        const textCapture = new TextCapture();
        textCapture.settings = settings;
        if (context) {
            context.addMode(textCapture);
        }
        textCapture.listenerProxy = TextCaptureListenerProxy_1.TextCaptureListenerProxy.forTextCapture(textCapture);
        return textCapture;
    }
    applySettings(settings) {
        this.settings = settings;
        return this.didChange();
    }
    addListener(listener) {
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
    }
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
    didChange() {
        if (this.context) {
            return this.context.update();
        }
        else {
            return Promise.resolve();
        }
    }
}
__decorate([
    Serializeable_1.nameForSerialization('enabled')
], TextCapture.prototype, "_isEnabled", void 0);
__decorate([
    Serializeable_1.nameForSerialization('feedback')
], TextCapture.prototype, "_feedback", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], TextCapture.prototype, "_context", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], TextCapture.prototype, "listeners", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], TextCapture.prototype, "listenerProxy", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], TextCapture.prototype, "isInListenerCallback", void 0);
exports.TextCapture = TextCapture;
