/* Class to temporarily store images to reduce blob => base64 calculations */
export interface IAddProductImage {
    base64: string;
    file: File;
}
