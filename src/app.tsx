import { useEffect, useRef, useState } from 'preact/hooks';
import interact from 'interactjs';
import './app.css';

export function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [cameraStarted, setCameraStarted] = useState<boolean>(false);

  // Función para iniciar cámara bajo demanda
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraStarted(true);
    } catch (err) {
      console.error('Error al iniciar cámara:', err);
    }
  };

  // Limpieza de la cámara cuando el componente se desmonta o reinicia cámara
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, []);

  // Carga imagen
  const handleImageUpload = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(input.files[0]);
    }
  };

  // Toggle pantalla completa
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Configura Interact.js para arrastre y gestos
  useEffect(() => {
    if (!overlayRef.current) return;

    interact(overlayRef.current)
      .draggable({
        listeners: {
          move(event) {
            setOffset((prev) => ({ x: prev.x + event.dx, y: prev.y + event.dy }));
          },
        },
      })
      .gesturable({
        listeners: {
          move(event) {
            setScale((s) => s * (1 + event.ds));
            setRotation((r) => r + event.da);
          },
        },
      });
  }, [imageSrc]);

  return (
    <div className="app">
      <h1>Camera Overlay App</h1>

      <div className="controls">
        {!cameraStarted && (
          <button onClick={startCamera}>Permitir Cámara</button>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <label>
          Opacidad
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onInput={(e) => setOpacity(parseFloat((e.target as HTMLInputElement).value))}
          />
        </label>
        <label>
          Escala
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={scale}
            onInput={(e) => setScale(parseFloat((e.target as HTMLInputElement).value))}
          />
        </label>
        <label>
          Rotación
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onInput={(e) => setRotation(parseFloat((e.target as HTMLInputElement).value))}
          />
        </label>
        <button onClick={toggleFullscreen}>Pantalla Completa</button>
      </div>

      <div className="video-container" ref={containerRef}>
        <video
          ref={videoRef}
          playsInline
          muted
          className="camera"
          style={{ display: cameraStarted ? 'block' : 'none' }}
        />
        {!cameraStarted && (
          <div className="camera-placeholder">
            <p>La cámara está inactiva.</p>
          </div>
        )}
        {imageSrc && (
          <img
            ref={overlayRef}
            src={imageSrc}
            className="overlay"
            style={{
              opacity,
              transform: `
                translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))
                scale(${scale})
                rotate(${rotation}deg)
              `,
            }}
            alt="Overlay"
          />
        )}
      </div>
    </div>
  );
}
