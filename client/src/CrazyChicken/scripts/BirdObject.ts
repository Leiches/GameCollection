import type { Point } from "@/CrazyChicken/utils/custom-types/Point"

export class BirdObject {
  width: number;
  height: number;
  color: string;
  startPoint: Point;
  endPoint: Point;

  currentPoint: Point;
  controlPoint: Point;
  progress: number;
  speed: number;

  constructor(
    width: number,
    height: number,
    color: string,
    startPoint: Point,
    endPoint: Point,
    speed: number,
    windowHeight: number,
  ) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.startPoint = startPoint;
    this.endPoint = endPoint;

    this.currentPoint = { ...startPoint };

    // Calculate distance between start and end points
    const distance = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
      Math.pow(endPoint.y - startPoint.y, 2),
    );

    // Proportional vertical offset, adjusted if needed
    const verticalOffset = Math.max(distance * 0.2, 50);

    // Ensure the control point is within the viewport
    let controlY = (startPoint.y + endPoint.y) / 2 - verticalOffset;
    if (controlY < 0) {
      controlY = 0; // Prevent above top boundary
    } else if (controlY > windowHeight) {
      controlY = windowHeight; // Prevent below bottom boundary
    }

    this.controlPoint = {
      x: (startPoint.x + endPoint.x) / 2,
      y: controlY,
    };

    this.progress = 0;
    this.speed = speed;
  }


  private calculateBezierPoint(): void {
    const t = this.progress;
    const oneMinusT = 1 - t;

    const newX =
      oneMinusT ** 2 * this.startPoint.x +
      2 * oneMinusT * t * this.controlPoint.x +
      t ** 2 * this.endPoint.x;

    const newY =
      oneMinusT ** 2 * this.startPoint.y +
      2 * oneMinusT * t * this.controlPoint.y +
      t ** 2 * this.endPoint.y;

    this.currentPoint = { x: newX, y: newY };
  }

  public move(): void {
    if (this.progress < 1) {
      this.calculateBezierPoint();
      this.progress += this.speed; // Adjust speed as needed
    }
  }
}
