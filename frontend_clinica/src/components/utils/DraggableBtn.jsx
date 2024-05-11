import React, { useState } from 'react';
import styles from 'src/components/utils/DraggableBtn.module.css'; // Importa los estilos CSS

function DraggableBtn() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDragStart = (event) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleDrag = (event) => {
    if (isDragging) {
      const offsetX = event.clientX - dragStart.x;
      const offsetY = event.clientY - dragStart.y;
      setPosition({ x: position.x + offsetX, y: position.y + offsetY });
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <button
      className={`${styles.draggableButton} ${isDragging ? styles.dragging : ''}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      Drag Me!
    </button>
  );
}

export default DraggableBtn;
