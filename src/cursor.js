import { useRef, useEffect, useState } from "react";

export default function Cursor() {
    const documentRef = useRef(document);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setClicked(true);
        const handleMouseUp = () => setClicked(false);

        documentRef.current.addEventListener('mousemove', updatePosition);
        documentRef.current.addEventListener('mousedown', handleMouseDown);
        documentRef.current.addEventListener('mouseup', handleMouseUp);

        return () => {
            documentRef.current.removeEventListener('mousemove', updatePosition);
            documentRef.current.removeEventListener('mousedown', handleMouseDown);
            documentRef.current.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <div
                className={`cursor ${clicked ? 'clicked' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%)`,
                }}
            />
            <style jsx global>{`
              .cursor {
                pointer-events: none;
                position: fixed;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                background-color: #fff;
                mix-blend-mode: difference;
                transition: transform 0.2s ease;
                z-index: 9999;
                animation: breathing 4s infinite;
              }

              .cursor.clicked {
                animation: none;
                transform: translate(-50%, -50%) scale(0.7)!important;
              }

              @keyframes breathing {
                0%, 100% {
                  transform: translate(-50%, -50%) scale(1);
                }
                50% {
                  transform: translate(-50%, -50%) scale(1.2);
                }
              }
              @media (hover: none) {
                .cursor {
                display: none;
                }
            }
            `}</style>
        </>
    );
}