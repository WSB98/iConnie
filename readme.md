# iConnie
This simple image editor is intended to be a streamlined way to create icons from any image. Use images with no background for the best results.

## Getting Started
To use the image editor, you need to include the following HTML elements in your webpage:

## html
```
<div id="dropzone"></div>
<input id="border-radius" type="range" min="0" max="50" />
<input id="vignette" type="range" min="0" max="100" />
<input id="edge-blur" type="range" min="0" max="10" />
<button id="export-btn">Export Image</button>
<div id="exportZone"></div>
```
Make sure to also include the necessary JavaScript libraries, such as html2canvas.

## Usage
When the DOM content is loaded, the code sets up event listeners and initializes variables.

The dropzone element is the area where the user can drag and drop an image file. The code adds event listeners to handle dragover, dragleave, and drop events. When an image is dropped, it is displayed in the dropzone element.

The borderRadiusInput, vignetteInput, and edgeBlurInput elements are range inputs that allow the user to adjust the border radius, vignette intensity, and edge blur of the image, respectively. Event listeners are added to these inputs to update the corresponding CSS properties of the dropzone element.

The exportButton triggers the export functionality. When clicked, the code captures the contents of the exportZone element using the html2canvas library. It then applies a box shadow effect to the captured content based on the vignette intensity. The final composition of the shadow and captured content is saved as a PNG image file.

## License
This image editor code is provided under the MIT License. Feel free to modify and use it in your projects.

## Acknowledgments
This image editor code utilizes the html2canvas library for capturing and manipulating the image.