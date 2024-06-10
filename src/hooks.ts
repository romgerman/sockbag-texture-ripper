import { createMemo, createSignal } from "solid-js";

export function createDnd(setFile: (blob: Blob) => void) {
  const [counter, setCounter] = createSignal(0);
  const isDragOver = createMemo(() => counter() > 0);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setCounter(0);
    }
  }

  function onDragEnter() {
    setCounter((prev) => prev + 1);
  }

  function onDragLeave() {
    setCounter((prev) => prev - 1);
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  return { isDragOver, onDrop, onDragEnter, onDragOver, onDragLeave };
}

export function createResize() {
  const [dragging, setDragging] = createSignal(false);
  const [width, setWidth] = createSignal(50);
  const left = () => width();
  const right = () => 100 - width();

  function onMouseMove(e: MouseEvent) {
    if (dragging()) {
      const width = (e.clientX / window.innerWidth) * 100;
      setWidth(width);
    }
  }

  function reset() {
    setWidth(50);
  }

  function activate() {
    setDragging(true);
  }

  function deactivate() {
    setDragging(false);
  }

  return { width, left, right, onMouseMove, reset, activate, deactivate };
}
