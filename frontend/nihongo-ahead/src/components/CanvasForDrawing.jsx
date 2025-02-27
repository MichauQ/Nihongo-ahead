import React, { useRef, useState, useEffect,useImperativeHandle, forwardRef, useContext} from "react";
import { Context } from "../App";
import { Button, Col } from "react-bootstrap";

const CanvasForDrawing = forwardRef(({ isDrawingDisabled, isButtonsDisabled}, ref) =>{
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const history = useRef([]); 
    const { colorMode } = useContext(Context);

    const saveCurrentState = () => {
        const canvas = canvasRef.current;
        history.current.push(canvas.toDataURL()); 
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 20;
        context.lineJoin = "round";
        contextRef.current = context;

        saveCurrentState(); 
    }, []);
    useEffect(() => {
        if (isDrawingDisabled) return;
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === "z") {
                event.preventDefault(); 
                undo();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isDrawingDisabled]);

    const startDrawing = ({ nativeEvent }) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        const x = (nativeEvent.clientX - rect.left) * scale;
        const y = (nativeEvent.clientY - rect.top) * scale;
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        if (!isDrawing) return;
        contextRef.current.closePath();
        setIsDrawing(false);
        saveCurrentState();
    };

    const draw = ({ nativeEvent }) => {
        if (isDrawingDisabled) return;
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        const x = (nativeEvent.clientX - rect.left) * scale;
        const y = (nativeEvent.clientY - rect.top) * scale;
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    };

    const undo = () => {
        if (history.current.length <= 1) return;
        history.current.pop();
        const lastState = history.current[history.current.length - 1];
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
            const canvas = canvasRef.current;
            const context = contextRef.current;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        };
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height);
        saveCurrentState();
    };
    const getCanvasImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          console.error("Canvas not found!");
          return null;
        }
        return canvas.toDataURL();  
      };
     // Zwracamy funkcję clearCanvas, aby była dostępna dla komponentu nadrzędnego
     useImperativeHandle(ref, () => ({
        clearCanvas,
        getCanvasImage
    }));

    return (
        <div style={{width:"500px"}}>
            <Col className="canvasWrapper">
                <canvas
                    ref={canvasRef}
                    className="CanvaArea"
                    width="500"
                    height="500"
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}                    
                ></canvas>
            </Col>
            <Col className="my-4" style={{width:"500px"}}>
                <Button style={{fontSize: "30px", fontWeight:"bold"}} className="mx-2" variant={colorMode? "dark":"light"} onClick={undo} disabled={isButtonsDisabled}>
                    &#11148;
                </Button>
                <Button style={{fontSize: "30px", fontWeight:"bold"}} className="mx-2" variant={colorMode? "dark":"light"} onClick={clearCanvas} disabled={isButtonsDisabled}>
                   &#10005; 
                </Button>
            </Col>
        </div>
    );
});
export default CanvasForDrawing;