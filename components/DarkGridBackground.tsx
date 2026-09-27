import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  PropsWithChildren,
} from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface AnimationPoint {
  x: number;
  y: number;
  duration: number;
}

interface Dimensions {
  width: number;
  height: number;
}

const DarkGridBackground: React.FC<PropsWithChildren> = ({ children }) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [, setIsUserInteracting] = useState(false);

  const animationFrameRef = useRef<number>(0);
  const lastInteractionTime = useRef<number>(0);
  const currentPathIndex = useRef<number>(0);
  const animationPath = useRef<AnimationPoint[]>([]);

  const gridSize = 60;
  const cols = Math.ceil((dimensions.width || 0) / gridSize);
  const rows = Math.ceil((dimensions.height || 0) / gridSize);

  const generateRandomPoint = useCallback(() => {
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0:
        x = Math.random() * dimensions.width;
        y = 0;
        break;
      case 1:
        x = dimensions.width;
        y = Math.random() * dimensions.height;
        break;
      case 2:
        x = Math.random() * dimensions.width;
        y = dimensions.height;
        break;
      default:
        x = 0;
        y = Math.random() * dimensions.height;
    }

    return { x, y };
  }, [dimensions.width, dimensions.height]);

  const generateNewPath = useCallback(() => {
    const start = generateRandomPoint();
    const end = generateRandomPoint();
    const centerOffset = {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
    };

    return [
      {
        x: start.x,
        y: start.y,
        duration: 1000 + Math.random() * 1000,
      },
      {
        x: dimensions.width / 2 + centerOffset.x,
        y: dimensions.height / 2 + centerOffset.y,
        duration: 1000 + Math.random() * 1000,
      },
      {
        x: end.x,
        y: end.y,
        duration: 1000 + Math.random() * 1000,
      },
    ];
  }, [dimensions.width, dimensions.height, generateRandomPoint]);

  const animate = useCallback(
    (timestamp: number) => {
      if (!animationPath.current.length) {
        animationPath.current = generateNewPath();
        currentPathIndex.current = 0;
      }

      const currentPoint = animationPath.current[currentPathIndex.current];
      const nextPoint = animationPath.current[currentPathIndex.current + 1];

      if (!currentPoint || !nextPoint) {
        animationPath.current = generateNewPath();
        currentPathIndex.current = 0;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress =
        (timestamp - lastInteractionTime.current) / currentPoint.duration;

      if (progress >= 1) {
        lastInteractionTime.current = timestamp;
        currentPathIndex.current++;

        if (currentPathIndex.current >= animationPath.current.length - 1) {
          animationPath.current = generateNewPath();
          currentPathIndex.current = 0;
        }
      } else {
        const newX = currentPoint.x + (nextPoint.x - currentPoint.x) * progress;
        const newY = currentPoint.y + (nextPoint.y - currentPoint.y) * progress;
        setMousePosition({ x: newX, y: newY });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [generateNewPath]
  );

  // Initialize client-side state
  useEffect(() => {
    // The grid is decorative and drives a requestAnimationFrame loop that
    // mutates inline styles on every cell. Mounting it during hydration kept
    // the first frame from painting (LCP render delay ~11s with the hero text
    // already in the HTML), so wait for idle and let the content paint first.
    const showGrid = () => setIsClient(true);
    const hasIdle = "requestIdleCallback" in window;
    const idle: number = hasIdle
      ? window.requestIdleCallback(showGrid, { timeout: 2000 })
      : window.setTimeout(showGrid, 1200);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setMousePosition({
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.9,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      lastInteractionTime.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsUserInteracting(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsUserInteracting(false);
    lastInteractionTime.current = performance.now();
    animationPath.current = generateNewPath();
    currentPathIndex.current = 0;
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Show a simple placeholder during SSR
  if (!isClient) {
    return (
      <div className="relative min-h-screen w-full bg-black">
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(243,178,12,0.00)] via-[rgba(243,178,12,0.03)_82.5%] to-[rgba(243,178,12,0.03)] mix-blend-plus-lighter" />

      {/* Interactive Grid Pattern */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          className="[mask-image:radial-gradient(circle_at_center,white,transparent)]"
        >
          <defs>
            <radialGradient id="hoverGradient">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
            </radialGradient>
          </defs>

          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              const x = col * gridSize;
              const y = row * gridSize;
              const distance = calculateDistance(
                x + gridSize / 2,
                y + gridSize / 2,
                mousePosition.x,
                mousePosition.y
              );
              const opacity = Math.max(0, 1 - distance / 150);

              return (
                <rect
                  key={`${row}-${col}`}
                  x={x}
                  y={y}
                  width={gridSize - 2}
                  height={gridSize - 2}
                  fill="transparent"
                  stroke="rgba(255, 215, 0, 0.1)"
                  strokeWidth="1"
                  style={{
                    fill: `rgba(255, 215, 0, ${opacity * 0.25})`,
                  }}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 80%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>
  );
};

export default DarkGridBackground;
