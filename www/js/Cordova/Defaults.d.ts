/// <amd-module name="scandit-cordova-datacapture-text.Defaults" />
import { CameraSettings } from 'Camera+Related';
import { Color, Direction } from 'Common';
import { CameraSettingsDefaultsJSON } from 'CoreDefaults';
export interface Defaults {
    TextCapture: {
        TextCaptureOverlay: {
            DefaultBrush: {
                fillColor: Color;
                strokeColor: Color;
                strokeWidth: number;
            };
        };
        TextCaptureSettings: {
            recognitionDirection: Direction;
            duplicateFilter: number;
        };
        RecommendedCameraSettings: CameraSettings;
    };
}
export interface DefaultsJSON {
    TextCapture: {
        TextCaptureOverlay: {
            DefaultBrush: {
                fillColor: string;
                strokeColor: string;
                strokeWidth: number;
            };
        };
        TextCaptureSettings: {
            recognitionDirection: string;
            duplicateFilter: number;
        };
        RecommendedCameraSettings: CameraSettingsDefaultsJSON;
    };
}
export declare const defaultsFromJSON: (json: DefaultsJSON) => Defaults;
