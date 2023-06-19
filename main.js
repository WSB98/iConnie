window.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('dropzone');
  const borderRadiusInput = document.getElementById('border-radius');
  const vignetteInput = document.getElementById('vignette');
  const edgeBlurInput = document.getElementById('edge-blur');
  const exportButton = document.getElementById('export-btn');
  const exportZone = document.getElementById('exportZone')

  let editedImage = null;

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('highlight');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('highlight');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('highlight');
    dropzone.style.border = 'none';
    dropzone.style.minHeight = 'auto';
    dropzone.style.minWidth = 'auto';
    dropzone.style.height = 'auto';
    dropzone.style.width = 'auto';
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      dropzone.innerHTML = '';
      dropzone.appendChild(image);
    };

    reader.readAsDataURL(file);
  });

  borderRadiusInput.addEventListener('input', () => {
    const image = dropzone.querySelector('img');
    if (image) {
      dropzone.style.borderRadius = `${borderRadiusInput.value}px`;
    }
  });

  vignetteInput.addEventListener('input', () => {
    const image = dropzone.querySelector('img');
    if (image) {
      var vignetteIntensity = vignetteInput.value;
      const vignetteSize = vignetteIntensity * 2 + 100;
      if(vignetteIntensity > 49){
        dropzone.style.boxShadow = `0px 0px ${vignetteIntensity}px 0px #22222250`;
      }
      else {
        vignetteIntensity = 49 - vignetteIntensity;
        dropzone.style.boxShadow = `inset 0px 0px ${vignetteIntensity}px 0px #22222250`;
      }
      
    }
  });

  edgeBlurInput.addEventListener('input', () => {
    const image = dropzone.querySelector('img');
    if (image) {
      image.style.filter = `blur(${edgeBlurInput.value}px)`;
    }
  });

  exportButton.addEventListener('click', () => {
    if (dropzone) {
      // Set the background color of the div to ensure it's captured correctly
      exportZone.style.backgroundColor = 'white';
      dropzone.style.backgroundColor = 'white';
  
      html2canvas(exportZone).then((canvas) => {
        const shadowCanvas = document.createElement('canvas');
        const shadowContext = shadowCanvas.getContext('2d');
  
        // Copy the captured canvas onto the shadow canvas
        shadowCanvas.width = canvas.width;
        shadowCanvas.height = canvas.height;
        shadowContext.drawImage(canvas, 0, 0);
  
        // Apply the box shadow effect to the shadow canvas
        const vignetteIntensity = vignetteInput.value;
        const vignetteSize = vignetteIntensity * 2 + 100;
        shadowContext.filter = `drop-shadow(0 0 ${vignetteSize}px rgba(0, 0, 0, ${vignetteIntensity}))`;
        shadowContext.drawImage(canvas, 0, 0);
  
        // Create a final canvas to composite the shadow and captured content
        const finalCanvas = document.createElement('canvas');
        const finalContext = finalCanvas.getContext('2d');
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
  
        // Draw the shadow canvas first, followed by the captured content
        finalContext.drawImage(shadowCanvas, 0, 0);
        finalContext.drawImage(canvas, 0, 0);
  
        const link = document.createElement('a');
        link.href = finalCanvas.toDataURL();
        link.download = 'edited_image.png';
        link.click();
  
        // Reset the background color after capturing the div
        dropzone.style.backgroundColor = '';
        exportZone.style.backgroundColor = '';
      });
    }
  });
  
  
  

});

  