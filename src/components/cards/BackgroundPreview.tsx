import React, { useEffect, useRef, useState } from 'react';
import { ReactBitsComponent } from '../../types';

interface BackgroundPreviewProps {
  option: ReactBitsComponent;
}

export const BackgroundPreview: React.FC<BackgroundPreviewProps> = ({ option }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        const timer = setTimeout(() => {
          videoRef.current?.play().catch((error) => {
            console.log('Autoplay prevented:', error);
          });
        }, 100);
        return () => clearTimeout(timer);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  const videoName = option.id.replace(/-/g, '').toLowerCase();
  const webmUrl = `/videos/${videoName}.webm`;
  const mp4Url = `/videos/${videoName}.mp4`;

  const handleError = () => {
    console.log(`Video preview not available for: ${videoName}, showing placeholder`);
    setHasError(true);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      aria-label={`Preview of ${option.title}`}
    >
      {hasError || (!webmUrl && !mp4Url) ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-teal-900/30 animate-gradient-xy">
          <div className="text-center p-4 backdrop-blur-sm bg-black/20 rounded-lg">
            <div className="text-white text-sm font-medium mb-1">{option.title}</div>
            <div className="text-gray-400 text-xs">Preview placeholder</div>
          </div>
        </div>
      ) : isVisible ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          onError={handleError}
          onLoadedData={() => {
            videoRef.current?.play().catch(() => {
              // Autoplay might be blocked
            });
          }}
        >
          {webmUrl && <source src={webmUrl} type="video/webm" />}
          {mp4Url && <source src={mp4Url} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="text-gray-500 text-sm">Scroll to load</div>
        </div>
      )}
    </div>
  );
};

export default BackgroundPreview;
