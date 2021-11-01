declare module Scandit {

export interface CapturedTextJSON {
    value: string;
    location: QuadrilateralJSON;
}
interface PrivateCapturedText {
    fromJSON(json: CapturedTextJSON): CapturedText;
}
export class CapturedText {
    private _value;
    get value(): string;
    private _location;
    get location(): Quadrilateral;
    private static fromJSON;
}


interface PrivateTextCapture extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    didChange: () => Promise<void>;
}
export class TextCapture implements DataCaptureMode {
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
    get context(): DataCaptureContext | null;
    static get recommendedCameraSettings(): CameraSettings;
    get feedback(): TextCaptureFeedback;
    set feedback(feedback: TextCaptureFeedback);
    private type;
    private _isEnabled;
    private _feedback;
    private settings;
    private _context;
    private listeners;
    private listenerProxy;
    private isInListenerCallback;
    static forContext(context: DataCaptureContext | null, settings: TextCaptureSettings): TextCapture;
    applySettings(settings: TextCaptureSettings): Promise<void>;
    addListener(listener: TextCaptureListener): void;
    removeListener(listener: TextCaptureListener): void;
    private didChange;
}


export interface TextCaptureSessionJSON {
    newlyCapturedTexts: CapturedTextJSON[];
    frameSequenceId: number;
}
interface PrivateTextCaptureSession {
    fromJSON(json: TextCaptureSessionJSON): TextCaptureSession;
}
export class TextCaptureSession {
    private _newlyCapturedTexts;
    get newlyCapturedTexts(): CapturedText[];
    private _frameSequenceID;
    get frameSequenceID(): number;
    private static fromJSON;
}
export interface TextCaptureListener {
    didCaptureText?(textCapture: TextCapture, session: TextCaptureSession): void;
}
interface PrivateTextCaptureFeedback {
    toJSON: () => object;
}
export class TextCaptureFeedback {
    success: Feedback;
    static get default(): TextCaptureFeedback;
}
interface PrivateTextCaptureOverlay {
    toJSON: () => object;
}
export class TextCaptureOverlay implements DataCaptureOverlay {
    private type;
    private textCapture;
    private _shouldShowScanAreaGuides;
    private _viewfinder;
    static get defaultBrush(): Brush;
    private _brush;
    get brush(): Brush;
    set brush(newBrush: Brush);
    get viewfinder(): Viewfinder | null;
    set viewfinder(newViewfinder: Viewfinder | null);
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    static withTextCapture(textCapture: TextCapture): TextCaptureOverlay;
    static withTextCaptureForView(textCapture: TextCapture, view: DataCaptureView | null): TextCaptureOverlay;
    private constructor();
}


export class TextCaptureSettings {
    duplicateFilter: number;
    locationSelection: LocationSelection | null;
    recognitionDirection: Direction;
    static fromJSON(json: {
        [key: string]: any;
    }): TextCaptureSettings | null;
    private constructor();
}

}
