import type { Point } from "@/CrazyChicken/utils/custom-types/Point";

export class BirdObject {
  width: number;
  height: number;
  color: string;
  startPoint: Point;
  endPoint: Point;

  currentPoint: Point;
  controlPoints: Point[]; // Array of control points
  progress: number;
  speed: number;

  difficulty: number;
  isBadBird: boolean;

  constructor(
    width: number,
    height: number,
    color: string,
    startPoint: Point,
    endPoint: Point,
    speed: number,
    windowHeight: number,
    difficulty: number,
    isBadBird: boolean,
  ) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.startPoint = startPoint;
    this.endPoint = endPoint;

    this.currentPoint = { ...startPoint };
    this.difficulty = difficulty;
    this.isBadBird = isBadBird;

    const distance = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
      Math.pow(endPoint.y - startPoint.y, 2),
    );

    this.controlPoints = this.generateControlPoints(
      startPoint,
      endPoint,
      difficulty,
      distance,
      windowHeight,
    );

    this.progress = 0;
    this.speed = speed;
  }

  private generateControlPoints(
    startPoint: Point,
    endPoint: Point,
    difficulty: number,
    distance: number,
    windowHeight: number,
  ): Point[] {
    const controlPoints: Point[] = [];

    for (let i = 1; i < difficulty; i++) {
      const t = i / difficulty;
      const x = startPoint.x * (1 - t) + endPoint.x * t;
      let y = startPoint.y * (1 - t) + endPoint.y * t;

      const verticalOffset = Math.max(distance * 0.2, 50);
      y -= verticalOffset * (i % 2 === 0 ? -1 : 1);

      y = Math.max(0, Math.min(y, windowHeight));

      controlPoints.push({ x, y });
    }

    return controlPoints;
  }

  private calculateBezierPoint(): void {
    const t = this.progress;
    const points = [this.startPoint, ...this.controlPoints, this.endPoint];

    // De Casteljau's algorithm for Bezier curves
    const calculateRecursive = (pts: Point[], t: number): Point => {
      if (pts.length === 1) return pts[0];

      const newPoints: Point[] = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const x = pts[i].x * (1 - t) + pts[i + 1].x * t;
        const y = pts[i].y * (1 - t) + pts[i + 1].y * t;
        newPoints.push({ x, y });
      }
      return calculateRecursive(newPoints, t);
    };

    this.currentPoint = calculateRecursive(points, t);
  }

  public move(): void {
    if (this.progress < 1) {
      this.calculateBezierPoint();
      this.progress += this.speed;
    }
  }
}
